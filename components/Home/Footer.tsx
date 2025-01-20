import { GoMail } from "react-icons/go";
import { IoLogoWhatsapp } from "react-icons/io5";
import { LuFacebook } from "react-icons/lu";
import { FaInstagram } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

import './style.css'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="info-icons">
        <div className='footer-info'>
          <h1>Jobportal Web</h1>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Quam magni, quo facere adipisci, cupiditate, sed possimus
            Quam magni, quo facere adipisci, cupiditate, sed possimus
          </p>
        </div>
        <div className='footer-icons'>
          <a href="mailto:bhupalan1711@gmail.com" target='_blank'>
            <GoMail className='footer-icon  active-icon' /></a>
          <a href="https://linkedin.com/in/bhupalan-k-487695247" target='_blank'>
            <FaLinkedin className='footer-icon active-icon' /></a>
          <a href="https://wa.me/7373562627" target='_blank'>
            <IoLogoWhatsapp className='footer-icon active-icon' /></a>
          <a href="https://github.com/Bhupalan-K" target='_blank'>
            <FaGithub className='footer-icon  active-icon' /></a>
          <LuFacebook className='footer-icon' />
          <FaInstagram className='footer-icon' />
          <IoLogoYoutube className='footer-icon' />
        </div>
      </div>

      <div className="quick-links">
        <h1>Quick Links</h1>
        <p>All Jobs</p>
        <p>Job Details</p>
        <p>How To Apply</p>
        <p>Resume</p>
      </div>

      <div className="contact">
        <h1>Contact Us</h1>
        <p>+91 7373562627</p>
        <a href="mailto:bhupalan1711@gmail.com" target='_blank'><p className='active-icon'>bhupalan1711@gmail.com</p></a>
        <a href="https://wa.me/7373562627" target='_blank'><p className='active-icon'>What&apos;s app</p></a>
        <a href="https://linkedin.com/in/bhupalan-k-487695247" target='_blank'><p className='active-icon'>LinkedIn</p></a>
        <a href="https://github.com/Bhupalan-K" target='_blank'><p className='active-icon'>Git</p></a>
      </div>
    </div>
  )
};

export default Footer
