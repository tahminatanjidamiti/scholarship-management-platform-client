import React from 'react';
import { motion } from 'framer-motion';

const OurBlog = () => {
    return (
        <div className='w-11/12 mx-auto my-10' id='blog'>
            <h1 className="text-center text-4xl font-bold mb-5">Explore Our Blogs</h1>
            <p className='mb-10 w-9/12 mx-auto text-center'>
                Learn our insightful blogs packed with expert advice, practical tips, and inspiring stories 
                to empower your journey toward success and personal growth.
            </p>
            <div className='space-y-6'>
                <div className='flex flex-col md:flex-row gap-5'>
                    <BlogCard
                        imgSrc="https://i.ibb.co/y0vHgz1/ai-generated-9029092-1280.jpg"
                        title="Would you like to turn your dream of studying abroad into a reality?"
                        description="Scholarships transform lives, enabling students to pursue higher education and achieve dreams, often shared in inspiring success stories."
                        date="20.12.2024"
                        widthClass="w-full md:w-2/3"
                    />
                    <BlogCard
                        imgSrc="https://i.ibb.co/ys38cjf/international-day-education-cartoon-style.jpg"
                        title="Scholarships Final Processing!"
                        description="Final requirements include acceptance letters, proof of enrollment, and a commitment to maintain eligibility."
                        date="16.12.2024"
                        widthClass="w-full md:w-1/3"
                    />
                </div>
                <div className='flex flex-col md:flex-row gap-5'>
                    <BlogCard
                        imgSrc="https://i.ibb.co/SrJ8NGz/th-3.jpg"
                        title="Applications Process!"
                        description="The scholarship process involves researching, applying, submitting documents, and waiting for approval."
                        date="12.12.2024"
                        widthClass="w-full md:w-1/3"
                    />
                    <BlogCard
                        imgSrc="https://i.ibb.co/qsM4BHZ/problem-3804254-1280.jpg"
                        title="Scholarships Initial Requirements!"
                        description="Scholarships generally require applicants to meet certain criteria, including a strong academic record and financial need."
                        date="04.12.2024"
                        widthClass="w-full md:w-2/3"
                    />
                </div>
            </div>
        </div>
    );
};

const BlogCard = ({ imgSrc, title, description, date, widthClass }) => {
    return (
        <motion.div 
            className={`relative card bg-base-100 shadow-xl overflow-hidden p-1 ${widthClass}`}
            whileHover={{
                scale: 1.03,
                boxShadow: "0px 0px 15px rgba(255, 255, 255, 0.5)",
            }}
        >
            <motion.div 
                className="absolute inset-0 z-0"
                animate={{
                    background: [
                        "linear-gradient(45deg, #082f49, #00c6ff)",
                        "linear-gradient(45deg, #00c6ff, #0072ff)",
                        "linear-gradient(45deg, #082f49, #00c6ff)"
                    ],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "mirror"
                }}
                style={{
                    filter: "blur(15px)",
                    opacity: 0.7,
                    borderRadius: "inherit"
                }}
            />
            <div className="relative bg-base-100 p-3 rounded-xl">
                <figure className='h-[200px] rounded-xl overflow-hidden'>
                    <img className='h-full w-full object-cover' src={imgSrc} alt={title} />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{title}</h2>
                    <p>{description}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-info"><strong>Date:</strong> {date}</button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default OurBlog;