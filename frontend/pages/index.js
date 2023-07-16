import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
 const {data:session} = useSession()
 console.log(session)
 const router = useRouter()
//  if(loading){
//   return <p>loading ....</p>
//  }

  return( <p> Welcom {session?.user?.email} !</p>)
}
