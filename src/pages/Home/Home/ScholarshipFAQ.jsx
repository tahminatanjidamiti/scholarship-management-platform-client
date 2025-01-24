import React from 'react';

const ScholarshipFAQ = () => {
    return (
        <div className='w-11/12 mx-auto my-20'>
            <h1 className="text-center text-4xl font-bold mb-4">Scholarships FAQ!</h1>
            <p className='mb-6 w-9/12 mx-auto text-center'>Scholarship FAQs help clarify eligibility, application processes, deadlines, required documents, and tips for success, empowering students to make informed decisions and secure valuable financial support.</p>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row">
                    <img
                        src="https://i.ibb.co.com/6NpHwFY/th-4.jpg"
                        className="max-w-sm rounded-lg shadow-2xl" />
                    <div>
                        <div className="collapse collapse-arrow bg-base-200 border">
                            <input type="radio" name="my-accordion-2" defaultChecked />
                            <div className="collapse-title text-xl font-medium">Scholarship common requirements?</div>
                            <div className="collapse-content">
                                <p>
                                Common scholarship requirements include academic performance, financial need, recommendation letters, a personal statement, proof of enrollment, and sometimes standardized test scores or community involvement.</p>
                            </div>
                        </div>
                        <div className="collapse collapse-arrow bg-base-200 border mt-2">
                            <input type="radio" name="my-accordion-2" />
                            <div className="collapse-title text-xl font-medium">Bachelor, Master, Diploma criteria?</div>
                            <div className="collapse-content">
                                <p>Bachelor's requires high school completion, GPA, and test scores. Master's needs a Bachelor's degree, recommendations, and a purpose statement. Diplomas require high school completion and subject-specific prerequisites.</p>
                            </div>
                        </div>
                        <div className="collapse collapse-arrow bg-base-200 border my-2">
                            <input type="radio" name="my-accordion-2" />
                            <div className="collapse-title text-xl font-medium">Scholarships Costing?</div>
                            <div className="collapse-content">
                                <p>Scholarships typically do not cost anything to apply for. However, some may require minor fees for application processing or background checks, but the scholarship itself is usually awarded for free.</p>
                            </div>
                        </div>
                        <div className="collapse collapse-arrow bg-base-200 border">
                            <input type="radio" name="my-accordion-2" defaultChecked />
                            <div className="collapse-title text-xl font-medium">Tips for choosing a Scholarship?</div>
                            <div className="collapse-content">
                                <p>When choosing a scholarship, consider eligibility requirements, application deadlines, award amounts, renewal conditions, and whether the scholarship aligns with your academic and career goals.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScholarshipFAQ;