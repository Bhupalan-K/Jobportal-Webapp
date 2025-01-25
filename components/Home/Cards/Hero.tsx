'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  isRecruiter: boolean | null
  setIsRecruiter: Dispatch<SetStateAction<boolean | null>>
}

const Hero = ({ isRecruiter, setIsRecruiter }: Props) => {
  return (
    <div className='hero'>
      <div className='text-sec'>
        <div>
          <p className='headline'>The Easiest way To get Your New Job</p>
          <p className='info'>
            Discover your dream job with ease! Explore top
            opportunities, connect with employers,
            and take the next step in your career journey
          </p>
        </div>

        {isRecruiter === null &&
          <div className='user-info'>
            <p>Are You a ?</p>
            <div className='buttons'>
              <button type='button'
                onClick={() => setIsRecruiter(false)}
              >Job Seeker</button>
              <button type='button'
                onClick={() => setIsRecruiter(true)}
              >Recruiter</button>
            </div>
          </div>
        }

        {isRecruiter === false && <div className='user-type-status'>
          <h2>Start Apply for Job</h2>
        </div>}
        {isRecruiter === true && 
        <Link href='/job/postjob' className='postjob-button'>
        <div><button>Post Job</button></div></Link>}

      </div>
      <div className='image-sec'>
        <Image className='image' src='/images/download.png'
          alt='Hero' width={600} height={800}
        />
      </div>
    </div>
  )
}

export default Hero
