import Link from 'next/link'
import { getServerSession } from 'next-auth'
import Image from 'next/image'

import { authOptions } from '@/auth'
import UserIcon from './UserIcon'
import './style.css'

const Navbar = async () => {

  const session = await getServerSession(authOptions)

  return (
    <div className='navbar'>
      <div>
        <Link href='/'>
          <Image
            src='/images/logo.jpg' alt='Logo'
            width={100} height={100}
          />
        </Link>
      </div>

      <div className='nav-links'>
        <Link href='/'><span>Home</span></Link>
        <Link href='/job'><span>All Jobs</span></Link>
      </div>

      {!session ?
        (<Link href='/signup' className='button'>
          <button>Sign Up</button>
        </Link>) : (
          <div>
            <UserIcon session={session} />
          </div>)
      }
    </div>
  )
}

export default Navbar
