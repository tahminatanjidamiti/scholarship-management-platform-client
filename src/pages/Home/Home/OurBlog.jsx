import React from 'react';

const OurBlog = () => {
    return (
        <div className='w-11/12 mx-auto my-10'>
            <h1 className="text-center text-4xl font-bold mb-5">Explore Our Blogs</h1>
            <p className='mb-8 w-9/12 mx-auto text-center'>Learn our insightful blogs packed with expert advice, practical tips, and inspiring stories to empower your journey toward success and personal growth.</p>
            <div className='space-y-6'>
                <div className='flex flex-col md:flex-row gap-5'>
                    <div className="card bg-base-100 w-full md:w-2/3 shadow-xl">
                        <figure className='h-[200px]'>
                            <img className='h-full w-full object-cover'
                                src="https://i.ibb.co.com/y0vHgz1/ai-generated-9029092-1280.jpg"
                                alt="Scholarships!" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">Would you like to turn your dream of studying in the aboard into a reality?</h2>
                            <p>Scholarships transform lives, enabling students to pursue higher education and achieve dreams, often shared in inspiring success stories.Many individuals have inspiring success stories showcasing how scholarships helped them overcome challenges, achieve their academic goals, and realize their dreams.</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-info"><strong>Date:</strong>20.12.2024</button>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-base-100 w-full md:w-1/3 shadow-xl">
                        <figure className='h-[200px]'>
                            <img className='h-full w-full object-cover'
                                src="https://i.ibb.co.com/ys38cjf/international-day-education-cartoon-style.jpg"
                                alt="Scholarships!" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">Scholarships Final Processing!</h2>
                            <p>Final requirements include acceptance letters, proof of enrollment, and a commitment to maintain eligibility.</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-info"><strong>Date:</strong>16.12.2024</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row gap-5'>
                    <div className="card bg-base-100 w-full md:w-1/3 shadow-xl">
                        <figure className='h-[200px]'>
                            <img className='h-full w-full object-cover'
                                src="https://i.ibb.co.com/SrJ8NGz/th-3.jpg"
                                alt="Scholarships!" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">Applications Process!</h2>
                            <p>The scholarship process involves researching, applying, submitting documents, and waiting for approval.</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-info"><strong>Date:</strong>12.12.2024</button>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-base-100 w-full md:w-2/3 shadow-xl">
                        <figure className='h-[200px]'>
                            <img className='h-full w-full object-cover'
                                src="https://i.ibb.co.com/qsM4BHZ/problem-3804254-1280.jpg"
                                alt="Scholarships!" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">Scholarships Initial Requirements!</h2>
                            <p>Scholarships generally require applicants to meet certain criteria, including a strong academic record that reflects their dedication to education. Applicants must also demonstrate financial need to show their economic circumstances.</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-info"><strong>Date:</strong>04.12.2024</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurBlog;