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
            id: number 
            firstname: string;
            lastname: string;
            email: string;
            role: unknown;
        }     
    }
}
// declare module 'next-auth/jwt'{
//     type JWT = User
// }

// const UserRoles = {
//     Admin: 'Admin',
//     User: 'User',
//   } as const;
  
//   type UserRole = typeof UserRoles[keyof typeof UserRoles];
  