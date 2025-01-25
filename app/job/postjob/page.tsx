'use client'

import dynamic from "next/dynamic"

const PostJob = dynamic(() => import('@/components/Jobs/PostJobs/PostJob'), {ssr: false})

const PostJobs = () => {
  return (
    <div style={{width:'100%'}}>
      <PostJob />
    </div>
  )
}

export default PostJobs
