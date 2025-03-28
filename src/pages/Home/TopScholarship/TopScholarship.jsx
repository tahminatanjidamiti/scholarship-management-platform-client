import React from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';


const TopScholarship = () => {
 const {loading} = useAuth();
    const axiosPublic = useAxiosPublic();
    const { data: scholarships = [] } = useQuery({
        queryKey: ['scholarships-top'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosPublic.get('/scholarship/top');
            return res.data;
        }
    })

    return (
        <div className="container mx-auto p-4 mt-10 mb-5">
            <h1 className="text-center text-4xl font-bold mb-5 text-transparent bg-clip-text bg-gradient-to-r from-sky-300 from-40% via-sky-950 to-sky-300 to-60%">Top Scholarships</h1>
            <p className='mb-10 w-9/12 mx-auto text-center'>Unlock an array of premier scholarship opportunities, essential criteria, and expert guidance to streamline your path and transform your dreams into achievements.</p>
            <div className="w-10/12 mx-auto grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {scholarships.map((scholarship, index) => {
                    const {
                        _id,
                        universityName,
                        universityImage,
                        scholarshipCategory,
                        universityCity,
                        universityCountry,
                        applicationDeadline,
                        subjectCategory,
                        applicationFees,
                        averageRating,
                    } = scholarship;

                    return (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full"
                        >
                            {/* University Image */}
                            <img
                                src={universityImage}
                                alt={`${universityName} logo`}
                                className="w-full h-32 object-cover"
                            />
                            {/* Card Content */}
                            <div className="p-4 flex flex-col flex-grow">
                                <h2 className="text-xl font-semibold mb-2">{universityName}</h2>
                                <p className="text-sm text-gray-600 mb-1">
                                    <strong>Category:</strong> {scholarshipCategory}
                                </p>
                                <p className="text-sm text-gray-600 mb-1">
                                    <strong>Location:</strong> {universityCity}, {universityCountry}
                                </p>
                                <p className="text-sm text-gray-600 mb-1">
                                    <strong>Deadline:</strong> {applicationDeadline}
                                </p>
                                <p className="text-sm text-gray-600 mb-1">
                                    <strong>Subject Category:</strong> {subjectCategory}
                                </p>
                                <p className="text-sm text-gray-600 mb-1">
                                    <strong>Application Fees:</strong> ${applicationFees}
                                </p>
                                <p className="text-sm text-gray-600 mb-3">
                                    <strong>Rating:</strong> {averageRating || "N/A"} / 5
                                </p>
                                {/* Button */}
                                <div className="mt-auto">
                                    <Link to={`/scholarshipDetails/${_id}`}>
                                        <button className="w-full bg-sky-500 text-white py-2 rounded-md hover:bg-sky-600 transition">
                                            Scholarship Details
                                        </button></Link>

                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <Link to="/allScholarship">
                <button className="w-3/12 mx-auto flex justify-center items-center my-5 bg-sky-500 text-black font-bold border border-sky-950 py-2 rounded-md hover:bg-sky-700 transition">
                    All Scholarship
                </button></Link>
        </div>
    );
};

export default TopScholarship;