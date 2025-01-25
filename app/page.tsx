'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

import CategoryCard from "@/components/Home/Cards/CategoryCard";
import Hero from "@/components/Home/Cards/Hero";
import HomeTitlesCard from "@/components/Home/Cards/HomeTitlesCard";
import JobCard from "@/components/Jobs/JobCard";
import Job from "@/utils/types";
import './style.css'


const Home = () => {

  const API = 'https://678262eac51d092c3dcf4e8b.mockapi.io/jobs'

  const [jobCategory, setJobCategory] = useState('Development')
  const [isRecruiter, setIsRecruiter] = useState<boolean | null>(null)
  const [jobs, setJobs] = useState<Job[]>([])
  const [error, setError] = useState('')

  const getJobs = async () => {
    try {
      const jobsData = await axios.get(API)
      if (jobsData.data.length > 0) {
        setJobs(jobsData.data)
      }
      setError('')
    } catch (err) {
      setError((err as Error).message)
    }
  }

  const getCategory = (jobs: Job[]) => {
    const category: { [key: string]: number } = {}
    jobs.forEach((categoryCount) => {
      category[categoryCount.category] = (category[categoryCount.category] || 0) + 1
    })

    const categoryArray = Object.entries(category).map(([name, count]) => ({
      name, count
    }))
    return (
      <>
        {categoryArray.map((job, index) => (
          <div key={index}
            onClick={() => setJobCategory(job.name)}>
            <CategoryCard
              category={job.name}
              positions={job.count} />
          </div>
        ))}
      </>
    )
  }

  useEffect(() => {
    getJobs()
  }, [])

  return (
    <div style={{ width: '95%', margin: '8% auto' }}>
      <Hero isRecruiter={isRecruiter} setIsRecruiter={setIsRecruiter} />
      <div className='job-categories'>
        <HomeTitlesCard
          title='Job Category'
          info={`2000 total Jobs - ${jobs.length} Jobs posted today`} />
        <div className='job-types'>
          {getCategory(jobs)}
        </div>
      </div>

      <div className="sample-jobs-sec">
        <HomeTitlesCard title='Featured Jobs' info='sduhvbdsghudsvhdscv' />
        {error ? (<div className='loading'>
          <h2>Failed to Load Jobs, Please try again Later</h2>
        </div>) : (
          <div className='featured-jobs'>
            {jobs.length > 0 ? (
              jobs.filter((job) => job.category === jobCategory).sort((earlyDate, olderDate) =>
                new Date(olderDate.posteddate).getTime() - new Date(earlyDate.posteddate).getTime())
                .slice(0, 6).map((cardDetails) => (
                  <Link href={`/job/jobdetails?id=${cardDetails.id}`}
                    key={cardDetails.id} className='jobs-card'>
                    <div>
                      <JobCard
                        companyname={cardDetails.companyname}
                        title={cardDetails.title}
                        salary={cardDetails.salary}
                        location={cardDetails.location}
                        experience={cardDetails.experience}
                        skills={cardDetails.skills}
                        jobtype={cardDetails.jobtype}
                        category={cardDetails.category}
                        posteddate={cardDetails.posteddate} />
                    </div>
                  </Link>
                ))
            ) : (
              <div className='loading'>
                <h2>Please Wait, Loading Jobs...</h2>
              </div>
            )}
          </div>
        )}

        <Link href='/job'>
          <div className='button'>
            <button>View All Jobs</button>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Home
