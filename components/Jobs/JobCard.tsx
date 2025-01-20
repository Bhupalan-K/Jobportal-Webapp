'use client'

import Image from "next/image"
import { IoLocationOutline } from "react-icons/io5";
import { IoBriefcaseOutline } from "react-icons/io5";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

import './style.css'
import Job from "@/utils/types";
import getDateDifference from "@/utils/GetDays";

const JobCard = ({ companyname, title, location, salary, experience, skills, jobtype, posteddate }: Omit<Job, 'id'>) => {
    return (
        <div className='job-card'>
            <div className='company-details'>
                <div className='role-company'>
                    <p><span className="job-title">{title}</span>
                        <span className="items">
                            <HiOutlineBuildingOffice2 className='details-icon' /> {companyname}
                        </span>
                    </p>
                </div>
                <Image
                    className='company-image'
                    src='/images/cardlogo.png' alt='Logo'
                    width={70} height={100}
                />
            </div>
            <div className='job-details'>
                <div className="detail-items">
                    <p className="items">
                        <IoBriefcaseOutline className='details-icon' />{experience}
                    </p>
                    <p className='items'><LiaRupeeSignSolid className='details-icon' />
                        {salary ? `${salary}  Lacs PA` : 'Not Disclosed'}</p> <br />
                </div>
                <p className='items'><IoLocationOutline className='details-icon' />{location}</p>
                <div className="skills-date-type">
                    <p>Skills:</p>
                    <div className='skills'>
                        {skills.slice(0, 4).map((skill, index) => (
                            <span className="skill" key={index}>{skill}</span>
                        ))}
                    </div>
                    <div className='date-type'>
                        <div className="type">
                            <span className='items'>{getDateDifference(posteddate)}</span>
                            <span className='items span'>{jobtype}</span>
                        </div>
                        <span className='items'>View Details..</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobCard
