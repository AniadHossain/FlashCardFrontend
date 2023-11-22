import NextAuth from "next-auth/next";

declare module "next-auth"{
    interface Session{
        user:{
            id:object
            name:string
            email:string
            image:string
        }

        tokens:{
            accessToken:string
            refreshToken: string
            expiresAt: number
        }

    }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt"{
    interface JWT{
        user:{
            id:object
            name:string
            email:string
            image:string
        }

        tokens:{
            accessToken:string
            refreshToken: string
            expiresAt: number
        }
    }
}