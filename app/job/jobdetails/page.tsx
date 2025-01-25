'use client'

import { IoLocationOutline } from "react-icons/io5";
import { IoBriefcaseOutline } from "react-icons/io5";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

import Job from "@/utils/types";
import JobCard from "@/components/Jobs/JobCard";
import getDateDifference from "@/utils/GetDays";
const JobApplyCard = dynamic(() => import("@/components/Jobs/JobApplyCard"), { ssr: false })
import '../style.css';

const JobDetail = () => {

  const API = 'https://678262eac51d092c3dcf4e8b.mockapi.io/jobs'

  const searchParams = useSearchParams()
  const id = searchParams?.get("id")
  const [jobDetail, setJobDetail] = useState<Partial<Job>>({})
  const [relatedJobs, setRelatedJobs] = useState<Job[]>([])
  const [openModal, setOpenModal] = useState(false)
  const [jobDetailError, setJobDetailError] = useState('')

  const getJobDetails = async () => {
    try {
      const jobs = await axios.get(API)
      const jobDetails = jobs.data
      if (jobDetails.length > 0 && id) {
        const detail = jobDetails.find((detail: Job) => detail.id.toString() === id)

        if (detail) {
          setJobDetail(detail)
          const relatedJobs = jobDetails.filter((jobs: Job) =>
            jobs.category === detail.category)
          setRelatedJobs(relatedJobs)
        }
      }
    } catch (err) {
      setJobDetailError((err as Error).message)
    }
  }

  useEffect(() => {
    getJobDetails()
  }, [id])

  return (
    <>
      {jobDetailError ? (<div className='loading'>
        <p>Failed to Load Job Details, Please try again Later</p>
      </div>) : (
        <div className='jobdetail-page'>
          <div className='jobdetail-page-title'>
            <h1>Job Details</h1>
          </div>

          <div className='jobdetail-header'>
            <div className="header-title">
              <h1>{jobDetail.title ? jobDetail.title : 'Job Title'}</h1>
              <p className='icon-line'>
                <HiOutlineBuildingOffice2 className='icon' />
                {jobDetail.companyname ? jobDetail.companyname : 'Company Name'}
              </p>
            </div>

            <div className="header-details">
              <p className='icon-line'>
                <IoLocationOutline className="icon" />{jobDetail.location ? jobDetail.location : 'Company Location'}
              </p>
              <p className='icon-line'>
                <IoBriefcaseOutline className='icon' />{jobDetail.experience ? jobDetail.experience : 'Experience'}
              </p>
              <p className='icon-line'>
                <LiaRupeeSignSolid className="icon" />{jobDetail.salary ? `${jobDetail.salary} Lacs PA` : 'Not Disclosed'}
              </p>
              <div className='jobdetail-date-type'>
                <span className='items'>{getDateDifference(jobDetail.posteddate ? jobDetail.posteddate : 'Freshness')}</span>
                <span className='jobdetail-type'>{jobDetail.jobtype ? jobDetail.jobtype : 'Job Type'}</span>
              </div>
            </div>

            <button type='button'
              onClick={() =>setOpenModal(true)}
            >Apply</button>
          </div>

          <div className="jobdetail-page-details">
            <div className="page-details">
              <h1>Skills:</h1>
              <div className='jobdetail-page-skills'>
                {jobDetail.skills ? (jobDetail.skills.map((skill, index) => (
                  <span key={index}>{skill}</span>
                ))) : (<span>Skills</span>)}
              </div>
            </div>

            <div className="page-details">
              <h1>Description:</h1>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing
                elit. Officia quo dolorem consequatur atque obcaecati
                error dolorum nobis culpa, aliquid esse inventore
                labore, vel ducimus, excepturi cumque ullam repudiandae
                eaque recusandaeLorem, ipsum dolor sit amet consectetur
                adipisicing elit. Officia quo dolorem consequatur atque
                obcaecatierror dolorum nobis culpa, aliquid esse inventore
                labore, vel ducimus, excepturi cumque ullam repudiandaeeaque
                recusandaeLorem, ipsum dolor sit amet consectetur
                adipisicing elit. Officia quo dolorem consequatur atque
                obcaecatierror dolorum nobis culpa, aliquid esse inventore
                labore, vel ducimus, excepturi cumque ullam repudiandae
              </p>
            </div>

            <div className="page-details">
              <h1>Requirments:</h1>
              <ul>
                <li>que recusandaeLorem, ipsum dolor sit amet consectetur
                  adipisicing elit. Officia quo dolorem consequatur atque
                  obcaecatierror dolorum nobis culpa,</li>
                <li>que recusandaeLorem, ipsum dolor sit amet consectetur
                  adipisicing elit. Officia quo dolorem consequatur atque
                  obcaecatierror dolorum nobis culpa,</li>
                <li>que recusandaeLorem, ipsum dolor sit amet consectetur
                  adipisicing elit. Officia quo dolorem consequatur atque
                  obcaecatierror dolorum nobis culpa,</li>
              </ul>
            </div>

            <div className="page-details">
              <h1>Responsibilities:</h1>
              <ul>
                <li>que recusandaeLorem, ipsum dolor sit amet consectetur
                  adipisicing elit. Officia quo dolorem consequatur atque
                  obcaecatierror dolorum nobis culpa,que recusandaeLorem,
                  ipsum dolor sit amet consectetur
                  adipisicing elit. Officia quo dolorem consequatur atque
                  obcaecatierror dolorum nobis culpa,</li>
                <li>que recusandaeLorem, ipsum dolor sit amet consectetur
                  adipisicing elit. Officia quo dolorem consequatur atque
                  obcaecatierror dolorum nobis culpa,</li>
                <li>que recusandaeLorem, ipsum dolor sit amet consectetur
                  adipisicing elit. Officia quo dolorem consequatur atque
                  obcaecatierror dolorum nobis culpa,</li>
              </ul>
            </div>
          </div>

          <div className="related-jobs">
            <h1>Related Jobs:</h1>
            {relatedJobs.length > 0 ? (
              <div className='jobs'>
                {relatedJobs.filter((job) =>
                  job.id !== jobDetail.id)
                  .sort((earlyDate,olderDate) => 
                    new Date(olderDate.posteddate).getTime()-
                    new Date(earlyDate.posteddate).getTime())
                  .map((job) => (
                    <Link href={`/job/jobdetails?id=${job.id}`}
                      key={job.id} className='jobs-card'>
                      <div key={job.id}>
                        <JobCard
                          category={job.category}
                          companyname={job.companyname}
                          title={job.title}
                          salary={job.salary}
                          location={job.location}
                          experience={job.experience}
                          skills={job.skills}
                          jobtype={job.jobtype}
                          posteddate={job.posteddate} />
                      </div>
                    </Link>
                  ))}
              </div>) : (<p className='loading'>No Related Jobs Available</p>)}
          </div>

          <div className='apply-modal' style={{
            display: openModal ? 'block' : 'none'
          }}>
            <JobApplyCard
              setOpenModal={setOpenModal}
              jobTitle={jobDetail.title ? jobDetail.title : 'Job Title'}
              companyName={jobDetail.companyname ? jobDetail.companyname : 'Company Name'} />
          </div>

        </div>
      )}

    </>
  )
}

export default JobDetail
