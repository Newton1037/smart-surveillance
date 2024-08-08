'use client'
import { FaGithub , FaLinkedin , FaInstagram } from "react-icons/fa"

const ContactMeLinks = () => {
    return (
        <div className='flex flex-row gap-4'>
            <a href="https://github.com/Newton1037" target="_blank" rel="noopener noreferrer">
                <FaGithub size={24} />
            </a>
            <a href="https://www.instagram.com/nitin_kumar1037/" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={24} />
            </a>
            <a href="https://www.linkedin.com/in/nitin-kumar-7753a1259/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={24} />
            </a>
        </div>
    )
}

export default ContactMeLinks