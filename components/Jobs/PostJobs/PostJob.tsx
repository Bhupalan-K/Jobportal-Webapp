import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import CreatableSelect from 'react-select/creatable'

import { experience, skillOptions } from '@/utils/Options'
import './style.css'

interface Salary {
  min: number | null
  max: number | null
}

interface Experience {
  min: string
  max: string
}

interface Details {
  jobRole: string,
  companyName: string,
  experience: Experience
  salary: Salary,
  location: string,
  skills: string[]
  jobType: string
  jobCategory: string
  date: string
}

type Skill = {
  value: string
  label: string
}

const API = 'https://678262eac51d092c3dcf4e8b.mockapi.io/jobs'

const PostJob = () => {

  const dates = new Date()
  const format = `${dates.getFullYear()}-${dates.getMonth() + 1 >= 10 ?
    dates.getMonth() + 1 : `0${dates.getMonth() + 1}`}-${dates.getDate() >= 10 ?
      dates.getDate() : `0${dates.getDate()}`}`

  const [jobDetails, setJobDetails] = useState<Details>({
    jobRole: '',
    companyName: '',
    experience: { min: '', max: '' },
    salary: { min: null, max: null },
    location: '',
    skills: [],
    jobType: '',
    jobCategory: '',
    date: format
  })

  const description = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem, \
  dignissimos architecto. Animi alias corporis et, consequatur similique assumenda? Reprehenderit \
  laboriosam quaerat eveniet sit perferendis ducimus repudiandae laborum consequuntur natus quisquam.\
  Animi alias corporis et, consequatur similique assumenda? Reprehenderit laboriosam quaerat eveniet \
  sit perferendis ducimus repudiandae laborum consequuntur natus quisquam.'

  const customStyles = {
    control: () => ({
      border: '1px solid grey',
      borderRadius: '5px',
      fontSize: '16px',
      padding: '5px 4px',
      cursor: 'pointer',
      outline: 'none',
      display: 'flex'
    }),
  }

  const getSkills = (skills: Skill[]) => {
    const selectedSkills = skills ? skills.map(skill => skill.label) : []
    if (skills.length > 0) {
      setJobDetails((prev) => ({
        ...prev, skills: selectedSkills
      }))
    }
  }

  const validateForm = () => {
    if (!jobDetails.jobRole) {
      return 'Please Enter JobRole'
    } else if (!jobDetails.companyName) {
      return 'Please Enter Company Name'
    }
    else if (!jobDetails.experience.min && !jobDetails.experience.max) {
      return 'Please Enter Experience Level'
    }
    else if (jobDetails.experience.min > jobDetails.experience.max) {
      return 'Min Experience cannot be more than Max Experience'
    }
    else if (!jobDetails.salary.min || !jobDetails.experience.max) {
      return 'Please Enter Salary'
    }
    else if ((jobDetails.salary.min ? jobDetails.salary.min : 0) >
      (jobDetails.salary.max ? jobDetails.salary.max : 0)) {
      return 'Min Salary cannot be more than Max Salary'
    }
    else if (!jobDetails.location) {
      return 'Please Enter Location'
    }
    else if (jobDetails.skills.length <= 0) {
      return 'Please Enter Skills'
    }
    else if (!jobDetails.jobType) {
      return 'Please Select Job Jobtype'
    }
    else if (!jobDetails.jobCategory) {
      return 'Please Select Job Category'
    }

    return null
  }

  function formatDetails<T extends Experience | Salary>(item: T) {
    if ((item.min && item.max) && (item.min !== item.max)) {
      return `${item.min} - ${item.max}`
    } else if ((item.min && item.max) && (item.min === item.max)) {
      return `${item.max}`
    } else if (item.min && !item.max) {
      return `${item.min}`
    } else if (item.max && !item.min) {
      return `${item.max}`
    }
    if (item.min === item.max) {
      return `${item.max}`
    }
    return ''
  }

  const formatSalary = (salary: Salary) => {
    const formattedSalary = {
      min: salary.min !== null ? new Intl.NumberFormat().format(salary.min) : '',
      max: salary.max !== null ? new Intl.NumberFormat().format(salary.max) : ''
    };
    return formatDetails(formattedSalary)
  }

  const postJob = async () => {
    const jobData = {
      companyname: jobDetails.companyName,
      title: jobDetails.jobRole,
      salary: formatSalary(jobDetails.salary),
      location: jobDetails.location,
      experience: formatDetails(jobDetails.experience),
      skills: jobDetails.skills,
      jobtype: jobDetails.jobType,
      category: jobDetails.jobCategory,
      posteddate: jobDetails.date
    }

    const errorMessage = validateForm()
    if (errorMessage) {
      toast.warning(errorMessage)
    } else {
      try {
        const response = await axios.post(API, jobData)
        if (response.status === 200 || response.status === 201) {
          toast.success('Job Posted Successfully!')
          setJobDetails({
            jobRole: '',
            companyName: '',
            experience: { min: '', max: '' },
            salary: { min: null, max: null },
            location: '',
            skills: [],
            jobType: '',
            jobCategory: '',
            date: format
          })
        } else {
          toast.error('Please try again')
        }
      }
      catch (err) {
        toast.error((err as Error).message)
      }
    }
  }

  const cancelPost = () => {
    setJobDetails({
      jobRole: '',
      companyName: '',
      experience: { min: '', max: '' },
      salary: { min: null, max: null },
      location: '',
      skills: [],
      jobType: '',
      jobCategory: '',
      date: format
    })
  }

  return (
    <div className='postjob'>
      <h2>Post Job</h2>
      <form onSubmit={(e) => e.preventDefault()}>

        <div className='postjob-items'>
          <label htmlFor='role'>Job Role</label>
          <input required id='role' type="text"
            placeholder='Software Engineer'
            value={jobDetails.jobRole}
            onChange={(e) => setJobDetails({
              ...jobDetails, jobRole: e.target.value
            })}
          />
        </div>

        <div className='postjob-items'>
          <label htmlFor='company'>Company Name</label>
          <input required id='company' type="text"
            placeholder='Example Tech PVT. LTD'
            value={jobDetails.companyName}
            onChange={(e) => setJobDetails({
              ...jobDetails, companyName: e.target.value
            })}
          />
        </div>

        <div className='postjob-items'>
          <label htmlFor='experience'>Experience Level</label>
          <div className='experience'>
            <select id='experience' value={jobDetails.experience.min}
              onChange={(e) => setJobDetails({
                ...jobDetails, experience: {
                  ...jobDetails.experience, min: e.target.value
                }
              })}
            >
              <option value='' hidden disabled>Minimum Experience</option>
              {experience.filter((_, index) => index !== 0).map((exp, index) => (
                <option value={exp.value} key={index}>{exp.label}</option>
              ))}
            </select>
            <select id='experience' value={jobDetails.experience.max}
              onChange={(e) => setJobDetails({
                ...jobDetails, experience: {
                  ...jobDetails.experience, max: e.target.value
                }
              })}
            >
              <option value='' hidden disabled>Maximum Experience</option>
              {experience.filter((_, index) => index !== 0).map((exp, index) => (
                <option value={exp.value} key={index}>{exp.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className='postjob-items'>
          <label htmlFor='salary'>Salary</label>
          <div className='salary'>
            <input required id='salary' type="number" placeholder='Minimum Salary'
              value={jobDetails.salary.min ? jobDetails.salary.min : ''}
              onChange={(e) => setJobDetails({
                ...jobDetails, salary: {
                  ...jobDetails.salary, min: Number(e.target.value) || null
                }
              })}
            />
            <input required id='salary' type="number"
              placeholder='Maximum Salary'
              value={jobDetails.salary.max ? jobDetails.salary.max : ''}
              onChange={(e) => setJobDetails({
                ...jobDetails, salary: {
                  ...jobDetails.salary, max: Number(e.target.value) || null
                }
              })} />
          </div>
        </div>

        <div className='postjob-items'>
          <label htmlFor='location'>Location</label>
          <input required id='location' type="text"
            placeholder='Coimbatore, India, Remote, Hybrid'
            value={jobDetails.location}
            onChange={(e) => setJobDetails({
              ...jobDetails, location: e.target.value
            })}
          />
        </div>

        <div className='postjob-items'>
          <label htmlFor='skills'>Skills</label>
          <CreatableSelect
            id='skills'
            styles={customStyles}
            placeholder='React,Javascript,Java'
            isMulti options={skillOptions}
            value={jobDetails.skills.map((skill) =>
              ({ value: skill.toLowerCase(), label: skill }))}
            onChange={(options) => getSkills(options as Skill[])}
          />
        </div>

        <div className='postjob-items'>
          <label htmlFor="">Description</label>
          <textarea required disabled
            placeholder='Coimbatore, India, Remote, Hybrid'
            defaultValue={description} />
        </div>

        <div className='postjob-items'>
          <label htmlFor='jobtype'>Job Type</label>
          <select id='jobtype' value={jobDetails.jobType}
            onChange={(e) => setJobDetails({ ...jobDetails, jobType: e.target.value })}>
            <option value='' disabled hidden>Job Type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
          </select>
        </div>

        <div className='postjob-items'>
          <label htmlFor='jobcategory'>Job Category</label>
          <select id='jobcategory' value={jobDetails.jobCategory}
            onChange={(e) => setJobDetails({ ...jobDetails, jobCategory: e.target.value })}>
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
        </div>
      </form>

      <div className='postjob-buttons'>
        <button type='submit' onClick={postJob}>Post</button>
        <button type='reset' onClick={cancelPost}>Cancel</button>
      </div>
    </div>
  )
}

export default PostJob
