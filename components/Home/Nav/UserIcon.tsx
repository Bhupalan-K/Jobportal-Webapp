'use client'

import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import Image from 'next/image'

import './style.css'

interface Props {
  session: Session
}

const UserIcon = ({ session }: Props) => {
  return (
    <div className='user-items'>
      <Image
        className='user-icon'
        src={`${session?.user?.image}` || '/images/cristiano.jpg'}
        alt='User Icon' width={40} height={40}
      />
      <button type='button'
        onClick={() => {
          signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_URL}/signup` })
        }}
      >Sign Out</button>
    </div>
  )
}

export default UserIcon
