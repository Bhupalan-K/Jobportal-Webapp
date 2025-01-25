'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

import JobCard from '@/components/Jobs/JobCard'
import Job from '@/utils/types'
import Filter from '@/components/Jobs/Filter'
import SearchBar from '@/components/Jobs/SearchBar'
import './style.css'

const AllJobs = () => {

    const API = 'https://678262eac51d092c3dcf4e8b.mockapi.io/jobs'

    const [jobs, setJobs] = useState<Job[]>([])
    const [error, setError] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
    const [filter, setFilter] = useState({
        title: '',
        category: '',
        experience: '',
        jobType: '',
        workmode: ''
    })
    const [searchedJobs, setSearchedJobs] = useState('')
    const jobsPerPage = 10

    const getJobs = async () => {
        try {
            const jobsData = await axios.get(API)
            if (jobsData.data.length > 0) {
                setJobs(jobsData.data)
                setFilteredJobs(jobsData.data)
            }
            setError('')
        } catch (err) {
            setError((err as Error).message)
        }
    }

    const handleNextPage = () => {
        if (currentPage < Math.ceil(filteredJobs.length / jobsPerPage)) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleExperienceRange = (experience: string, filterExperience: string) => {
        const [min, max] = experience.split('-')
        const maxFormatted = max ? max.replace(/\s+/g, ''):''
        if (`${min}year`.includes(filterExperience) ||
            `${min}years`.includes(filterExperience) ||
            maxFormatted.includes(filterExperience)) {
            console.log(max)
            return true
        }
        return false
    }

    const handleLocation = (location: string, filterLocation: string) => {
        if (filterLocation === 'On-site') {
            return !location.includes('Hybrid') && !location.includes('Remote')
        }
        return location.includes(filterLocation)
    }

    const handleFilter = () => {
        if (filter.category || filter.experience || filter.jobType || filter.title || filter.workmode) {
            const selectedJobs = jobs.filter((job) =>
                job.title?.includes(filter.title) &&
                job.category?.includes(filter.category) && job.jobtype?.includes(filter.jobType) &&
                handleLocation(job.location, filter.workmode) && handleExperienceRange(job.experience, filter.experience))
            setFilteredJobs(selectedJobs)
        }
    }

    const handleClearFilter = () => {
        if (filter.category || filter.experience || filter.jobType || filter.title || filter.workmode) {
            setFilter({
                title: '',
                category: '',
                experience: '',
                jobType: '',
                workmode: ''
            })
            setFilteredJobs(jobs)
        }
    }

    const handleSearchJobs = () => {
        const keywords = searchedJobs.split(/[\s,;:\/|]+/).map(word => word.trim().toLowerCase())
        const selectedJobs = jobs.filter((job) => keywords.some(keyword =>
            job.title.toLowerCase().includes(keyword) ||
            job.category.toLowerCase().includes(keyword) ||
            job.companyname.toLowerCase().includes(keyword) ||
            handleExperienceRange(job.experience, keyword) ||
            job.jobtype.toLowerCase().includes(keyword) ||
            job.location.toLowerCase().includes(keyword) ||
            job.skills.some(skill => skill.toLowerCase().includes(keyword))
        ))
        setFilteredJobs(selectedJobs)
    }

    const handleClearSearchJobs = () => {
        if (searchedJobs.length > 0) {
            setSearchedJobs('')
            setFilteredJobs(jobs)
        }
    }

    const indexOfLastTask = currentPage * jobsPerPage
    const indexOfFirstTask = indexOfLastTask - jobsPerPage
    const currentJobs = filteredJobs.slice(indexOfFirstTask, indexOfLastTask)

    useEffect(() => {
        getJobs()
    }, [])

    return (
        <>
            <div className='filter'>
                <Filter setFilter={setFilter} handleFilter={handleFilter}
                    handleClearFilter={handleClearFilter} filter={filter} />
            </div>
            <div className='search-bar'>
                <SearchBar handleSearchJobs={handleSearchJobs} handleClearSearchJobs={handleClearSearchJobs}
                    searchedJobs={searchedJobs} setSearchedJobs={setSearchedJobs}
                />
            </div>
            {error ? (<div className='loading'>
                <p>Failed to Load Jobs, Please try again Later</p>
            </div>) : (
                <div className='all-jobs'>
                    {currentJobs.length > 0 ? (
                        <div className='jobs'>
                            {currentJobs.sort((earlyDate, olderDate) =>
                                new Date(olderDate.posteddate).getTime() -
                                new Date(earlyDate.posteddate).getTime()).map((job) => (
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
                <button disabled={currentPage >= Math.ceil(filteredJobs.length / jobsPerPage)}
                    onClick={handleNextPage} style={{
                        background: currentPage >= Math.ceil(filteredJobs.length / jobsPerPage) ? 'grey' : 'royalblue',
                    }}>Next</button>
            </div>
        </>
    )
}

export default AllJobs
