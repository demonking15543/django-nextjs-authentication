import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

const options = {
    secret: '8u99hbbhjnklkuyvjnm',

  providers: [
    CredentialsProvider({
      id:"django",  
      name: 'Django',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          const response = await axios.post('http://localhost:3000/api/auth/signin', credentials);
        //   console.log("response", response)
          if (response.data) {
            
            return  response.data?.user;
          } else {
            return Promise.reject(new Error(response.data.error));
          }
        } catch (error) {
          return Promise.reject(new Error(error.message));
        }
      },
    }),
  ],
  callbacks: {
    async jwt({token, user, account}) {

      if (user) {
        token.accessToken = user?.token,
        token.id=user?.user_id
        token.user=user
      
      }
      // console.log("async token",token  )

      return token;
    },
    async session({session, token}) {
      // console.log("async session",session, token )

        

    //   session = session?.token?.token?.user;
    if (token){
    session.accessToken=token?.accessToken
    session.id=token.id
    session.user=token.user
    }
      return session;
    },
  },
  secret: process.env.JWT_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
    maxAge: 2 * 60 * 60
  },
  

  pages: {
    signIn: '/auth/signin',
  },
};

export default (req, res) => NextAuth(req, res, options);
