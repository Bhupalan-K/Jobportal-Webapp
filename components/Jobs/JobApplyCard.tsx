import { Dispatch, SetStateAction, useState } from "react"
import ReactDOMServer from 'react-dom/server';
import { toast } from "react-toastify";

import './style.css'

interface Props {
  jobTitle: string
  companyName: string
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

const JobApplyCard = ({ jobTitle, companyName, setOpenModal }: Props) => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [file, setFile] = useState<File | null>(null);

  const validation = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name) {
      return 'Please Enter Your Name'
    }
    if (!email) {
      return 'Please Enter Your Email'
    }
    if (!emailRegex.test(email)) {
      return 'Please Enter a Valid Email'
    }
    if (!file) {
      return 'Please Upload Your Resume'
    }
    return ''
  }

  const handleSendEmail = () => {
    const errorMessage = validation()

    if (errorMessage) {
      toast.warning(errorMessage)
    }
    else {  
      const emailMessage =
        ReactDOMServer.renderToStaticMarkup(
          <div>
            <p>{`Dear ${name},`}</p>
            <p>
              You have successfully applied for the
              <strong>{jobTitle}</strong> role at <strong>{companyName}</strong> !
            </p>
          </div>
        )
        fetch('/api/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: email,
            subject: `Application for ${jobTitle} - ${name}`,
            message: emailMessage
          }),
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to send Email');
          }
          return response.json();
        })
        .then(() => {
          toast.success('Email sent successfully')
          setOpenModal(false);
        })
        .catch(err => {
          toast.error(err.message);
        });
    }
  }

  const handleCloseModal = () => {
    setName('')
    setEmail('')
    setFile(null)
    setOpenModal(false)
  }

  return (
    <div className='applycard'>
      <h1>{jobTitle}</h1>
      <div className='applycard-inputs'>

        <div className='input-items'>
          <p>Your Name</p>
          <input type='text'
            placeholder='Your Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className='input-items'>
          <p>Your Email</p>
          <input
            type='email'
            placeholder='Your Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='input-items files'>
          <p>Your Resume</p>
          <input
            type='file'
            accept=".pdf,.doc,.docx"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>
      </div>

      <div className='buttons'>
        <button type='submit'
          onClick={handleSendEmail}
        >Apply</button>
        <button type='reset'
          onClick={handleCloseModal}
        >Cancel</button>
      </div>
    </div>
  )
}

export default JobApplyCard
