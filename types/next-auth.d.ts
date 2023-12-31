import type { User } from 'next-auth';
import { UserRole, User } from "@prisma/client";
import { DefaultSession } from "next-auth";
import NextAuth from "next-auth/next";
import {JWT} from "next-auth/jwt"

type UserId = string
declare module 'next-auth'{
    interface User{
        id: number
    }
}
// declare module 'next-auth'{
//     interface Session{
//         user: User & {
//             id:UserId
//             role:UserRole
//         } & DefaultSession['user']
//     }
// }
declare module 'next-auth'{
    interface Session{
        user: {
            id: unknown
            firstname: unknown;
            lastname: unknown;
            email: unknown;
            password: unknown;
            role: unknown;
        }     
    }
}
// declare module 'next-auth/jwt'{
//     type JWT = User
// }