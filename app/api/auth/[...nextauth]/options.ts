import  CredentialsProvider  from 'next-auth/providers/credentials';
import  bcrypt  from 'bcrypt';
import type { NextAuthOptions } from "next-auth";

import dbConfig from "@/lib/dbConfig";


export const options:NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "email",
                    type: "text",
                    placeholder: "Your email"
                },
                password: {
                    label: "password",
                    type: "password",
                    placeholder: "Your password"
                },
            },
            async authorize(credentials:any){
                if (!credentials.email || !credentials.password) throw new Error("Invalid credentials")
                const user = await dbConfig.user.findUnique({
                    where: {
                        email: credentials.email,
                    }
                })
                if(!user || !user.password) throw new Error("User not Found ")
                
                const isCorrectPassword = await bcrypt.compare(credentials.password, user.password)
                if(!isCorrectPassword) throw new Error("Incorrect Password ")
                console.log("User", user)

                return user
            }
        })
    ],
    pages: {
        signIn: "/signin",
        error: "/error"
    },
    callbacks: {
        session: async ({session, token}) => {
            if (session.user){
                session.user.id = token.id
                session.user.firstname = token.firstname
                session.user.lastname = token.lastname
                session.user.email = token.email
                session.user.password = token.password
                session.user.role = token.role
            }
            return session
        },
        jwt: async ({user, token}) => {
            const dbUser = await dbConfig.user.findUnique({
                where: {
                    email: token.email!,
                },
            })
            if (!dbUser){
                token.id = user!.id
                return token
            }
            // if(user){
            //     token.uid = user.id
            // }
            return {
                id: dbUser.id,
                firstname: dbUser.firstName,
                lastname: dbUser.lastName,
                email: dbUser.email,
                role: dbUser.role,
                password: dbUser.password
            }
        }
    },
    session: {
        strategy: "jwt"
    },
    secret:  process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development'
}