import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectToDB } from '@utils/database'
import User from '@models/User'
import bcrypt from "bcrypt"

export const authOptions = {
    pages: { signIn: "/" },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials) {
                const { phoneNumber, password } = credentials
                try {
                    await connectToDB()
                    const user1 = await User.findOne({ phoneNumber })
                    if(!user1) return null

                    const validPassword = await bcrypt.compare(password, user1.password)
                    if(validPassword) {
                        console.log(user1);
                        const user = {
                            email: {
                                username: user1.username,
                                _id: user1._id,
                                phone: user1.phoneNumber
                            },
                        }
                        return user
                    }
                    
                    return null
                } catch (error) {
                    console.log(error.message);
                }
            }
        })
    ],
    session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
    secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }