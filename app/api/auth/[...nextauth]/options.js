import { connectToDB } from "@/utils/database";
import User from "@/models/User"
import bcrypt from "bcrypt"
import CredentialsProvider from "next-auth/providers/credentials"   

export const options = {
    session: {
        strategy: "jwt",
        expiresIn: "1d"
    },
    pages: {
        signIn: "/login"
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                phoneNumber: {},
                password: {}
            },
            async authorize(credentials) {

                const { phoneNumber, password } = credentials
                console.log(phoneNumber, password);
                await connectToDB()
        
                const existingUser = await User.findOne({ phoneNumber })
                if(!existingUser) return NextResponse.json({ message: "User does not exist"}, { status: 400 })
        
                const validPassword = await bcrypt.compare(password, existingUser.password)
                if(!validPassword) return NextResponse.json({ message: "Invalid Password"}, {status: 400})

                if (validPassword) {
                    return {
                        id: existingUser._id.toString(),
                        name: existingUser.username,
                        phone: existingUser.phoneNumber
                    }
                } else {
                    return null
                }
            }
        })
    ],
    callbacks: {
        // session is called whenever we request session
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token and user id from a provider.
            session.user.phone = token.phone
            session.user.id = token.id            
            return session
        },
        // user object is passed only when you first do login
        jwt: ({ token, user }) => {
            // console.log('JWT Callback', {token, user});
            if(user) {
                return {
                    ...token,
                    id: user.id,
                    phone: user.phone
                }
            }
            return token
        }
    }
}

// 768768872