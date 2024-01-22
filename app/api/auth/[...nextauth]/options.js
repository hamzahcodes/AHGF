import { connectToDB } from "@/utils/database";
import User from "@/models/User"
import bcrypt from "bcrypt"
import CredentialsProvider from "next-auth/providers/credentials"   

export const options = {
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60
    },
    pages: {
        signIn: "/login"
    },
    secret: process.env.NEXTAUTH_SECRET,
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
                console.log(existingUser, "#29");
                if(!existingUser) return null
        
                const validPassword = await bcrypt.compare(password, existingUser.password)
                console.log(validPassword, "#33");
                if(!validPassword) return null

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