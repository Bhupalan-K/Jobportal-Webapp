'use client'

import Image from 'next/image'
import { signIn } from 'next-auth/react'

import './style.css'

const SignUp = () => {
  return (
    <div className='signup'>
      <Image
        className='postjob-image'
        src='/images/postjob.jpg'
        alt='' width={300} height={300} />
      <button onClick={() => {
        signIn('google', { callbackUrl: process.env.NEXT_PUBLIC_URL })
      }}>Sign Up Now</button>
    </div>
  )
}

export default SignUp
