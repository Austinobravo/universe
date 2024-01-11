import  CredentialsProvider  from 'next-auth/providers/credentials';
import  bcrypt  from 'bcrypt';
import type { NextAuthOptions } from "next-auth";

import dbConfig from "@/lib/dbConfig";
import { z } from 'zod';

const loginUserSchema = z.object({
    email: z.string().email("This field must be an email."),
    password: z.string().min(6, "This must have at least 6 characters.")
})

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
                // const {email, password} = loginUserSchema.parse(credentials)
                if (!credentials.email || !credentials.password) throw new Error("Invalid credentials")
                const user = await dbConfig.user.findUnique({
                    where: {
                        email: credentials.email,
                    }
                })
                if(!user || !user.password) throw new Error("User not Found ")
                
                const isCorrectPassword = await bcrypt.compare(credentials.password, user.password)
                if(!isCorrectPassword) throw new Error("Incorrect Password ")
                
                const {password, ...UserWithOutPass} = user

                return UserWithOutPass
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
                session.user.id = token.id as number
                session.user.firstname = token.firstname as string
                session.user.lastname = token.lastname as string
                session.user.email = token.email as string
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
        strategy: "jwt",
        maxAge: 24 * 60 * 60
    },
    secret:  process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development'
}