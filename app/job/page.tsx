'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

import JobCard from '@/components/Jobs/JobCard'
import Job from '@/utils/types'
import './style.css'

const AllJobs = () => {

    const API = 'https://678262eac51d092c3dcf4e8b.mockapi.io/jobs'

    const [jobs, setJobs] = useState<Job[]>([])
    const [error, setError] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const jobsPerPage = 10

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

    const indexOfLastTask = currentPage * jobsPerPage
    const indexOfFirstTask = indexOfLastTask - jobsPerPage
    const currentJobs = jobs.slice(indexOfFirstTask, indexOfLastTask)

    const handleNextPage = () => {
        if (currentPage < Math.ceil(jobs.length / jobsPerPage)) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    useEffect(() => {
        getJobs()
    }, [])

    return (
        <>
            {error ? (<div className='loading'>
                <p>Failed to Load Jobs, Please try again Later</p>
            </div>) : (
                <div className='all-jobs'>
                    {currentJobs.length > 0 ? (
                        <div className='jobs'>
                            {currentJobs.map((job) => (
                                <Link href={`/job/jobdetails?id=${job.id}`} key={job.id}
                                    className='all-jobs-card'>
                                    <div>
                                        <JobCard
                                            companyname={job.companyname}
                                            title={job.title}
                                            salary={job.salary}
                                            location={job.location}
                                            experience={job.experience}
                                            skills={job.skills}
                                            jobtype={job.jobtype}
                                            category={job.category}
                                            posteddate={job.posteddate}
                                        />
                                    </div>
                                </Link>
                            ))}
                        </div>) : (<p className='loading'>Please Wait, Loading Jobs...</p>)}
                </div>
            )}
            <div className="prev-next-buttons">
                <button disabled={currentPage === 1} onClick={handlePrevPage}
                    style={{
                        background: currentPage === 1 ? 'grey' : 'royalblue',
                    }}
                >Prev</button>
                <button disabled={currentPage >= Math.ceil(jobs.length / jobsPerPage)}
                    onClick={handleNextPage} style={{
                        background: currentPage >= Math.ceil(jobs.length / jobsPerPage) ? 'grey' : 'royalblue',
                    }}>Next</button>
            </div>
        </>
    )
}

export default AllJobs
