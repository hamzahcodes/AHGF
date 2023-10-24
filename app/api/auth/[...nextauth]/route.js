import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectToDB } from '@utils/database'
import User from '@models/User'
import bcrypt from "bcrypt"

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                // phoneNumber: { label: "Phone Number", type: "text", placeholder: "Your Phone" },
                // password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const { phoneNumber, password } = credentials
                try {
                    await connectToDB()
                    const existingUser = await User.findOne({ phoneNumber })
                    if(!existingUser) return null

                    const validPassword = await bcrypt.compare(password, existingUser.password)
                    if(!validPassword) return null

                    return existingUser
                } catch (error) {
                    console.log(error.message);
                }
            }
        })
    ],
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
    pages: { signIn: "/" }
})

export { handler as GET, handler as POST }