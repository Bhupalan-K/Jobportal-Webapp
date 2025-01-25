import { ChangeEvent, Dispatch, SetStateAction } from 'react'

import {experience} from '@/utils/Options'
import './style.css'

interface Filters {
    title: string,
    category: string,
    experience: string,
    jobType: string,
    workmode: string
}

interface Props {
    filter: Filters
    setFilter: Dispatch<SetStateAction<Filters>>
    handleFilter: () => void
    handleClearFilter: () => void
}

const Filter = ({ setFilter, handleFilter, handleClearFilter, filter }: Props) => {

    const handleFilterItems = (e: ChangeEvent<HTMLSelectElement>) => {
        setFilter((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }

    return (
        <div className='filters'>
            <div className='filter-items'>
                <select name='title' value={filter.title} onChange={handleFilterItems}>
                    <option value='' disabled hidden>Job Role</option>
                    <option value="Frontend Developer">Frontend Developer</option>
                    <option value="Backend Developer">Backend Developer</option>
                    <option value="Data Analyst">Data Analyst</option>
                    <option value="UI/UX Designer">UI/UX Designer</option>
                    <option value="Software Engineer">Software Engineer</option>
                    <option value="Software Engineer Intern">Software Engineer Intern</option>
                    <option value="QA Tester">QA Tester</option>
                    <option value="Devops Engineer">Devops Engineer</option>
                    <option value="Sales Manager">Sales Manager</option>
                </select>

                <select name='category' value={filter.category} onChange={handleFilterItems}>
                    <option value='' disabled hidden>Job Category</option>
                    <option value="Development">Development</option>
                    <option value="Design">Design</option>
                    <option value="Finance">Finance</option>
                    <option value="Sales">Sales</option>
                    <option value="Customer Service">Customer Service</option>
                    <option value="Project Management">Project Management</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="HR">HR</option>
                    <option value="Marketing">Marketing</option>
                </select>

                <select name='experience' value={filter.experience} onChange={handleFilterItems}>
                    {experience.map((options,index) => (
                        <option disabled={options.disabled} hidden={options.hidden} 
                        value={options.value} key={index}>{options.label}</option>
                    ))}
                </select>

                <select name='jobType' value={filter.jobType} onChange={handleFilterItems}>
                    <option value='' disabled hidden>Job Type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                </select>

                <select name='workmode' value={filter.workmode} onChange={handleFilterItems}>
                    <option value='' disabled hidden>Work Mode</option>
                    <option value="On-site">On-site</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Remote">Remote</option>
                </select>
            </div>

            <div className='buttons'>
                <button onClick={handleFilter}>Apply Filters</button>
                <button onClick={handleClearFilter}>Clear Filters</button>
            </div>
        </div>
    )
}

export default Filter
