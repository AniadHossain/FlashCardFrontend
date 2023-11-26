import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth, { NextAuthOptions } from "next-auth"
import api from "@/app/api/axiosConfig";
import { JWT } from "next-auth/jwt";

async function refreshToken(token:JWT):Promise<JWT>{
  const res = (await api.post("api/v1/auth/refresh-token",{},{headers:{Authorization:"Bearer " + token.tokens.refreshToken}})).data
 
  return {
    ...token,
    tokens:res
  }
}

export const authOptions: NextAuthOptions = {
    
    providers: [
      CredentialsProvider({
        name: 'credentials',
        credentials: {
          email: { label: 'email', type: 'text' },
          password: { label: 'password', type: 'password' }
        },
        async authorize(credentials,req) {
            
            if (!credentials?.email || !credentials?.password) {
                return null
            }
             
            
            const res = (await api.post("api/v1/auth/login",
            {email:credentials.email,password:credentials.password},
            {headers:{
              "Content-Type":"application/json"
            }
          }))
            if (res.status === 401 || res.status === 400){
              console.log(res.statusText)
              return null
            }

            const user = res.data
            return user           
            
        }
      })
      
    ],
    callbacks:{
      async jwt({token,user}){
        
        if(user) {
          return {...token, ...user}
        }

        if(new Date().getTime() < token.tokens.expiresAt){
          return token
        }
        
        return await refreshToken(token)

        //return token

      },
      async session({token,session}) {
        session.user = token.user
        session.tokens = token.tokens
        return session
      }
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
      strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
  }
  
  const handler = NextAuth(authOptions);
  
  export { handler as GET, handler as POST };