import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ScholarshipDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    // Fetch scholarship details
    const { data: scholarship = {} } = useQuery({
        queryKey: ["scholarship-details", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/scholarships-details/${id}`);
            return res.data;
        },
    });

    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        axiosSecure
            .get(`reviews/${id}`)
            .then((response) => setReviews(response.data))
            .catch((error) => {
                // console.error("Error fetching reviews:", error);
            });
    }, [id, axiosSecure]);

    // Slider settings
    const sliderSettings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
    };

    return  (
        <div className="container mx-auto p-6">
            {/* Main Section: Left (Image) and Right (Details) */}
            <div className="flex flex-col md:flex-row items-stretch gap-6 shadow-lg rounded-lg overflow-hidden">
                {/* Left Side: Image */}
                {scholarship.universityImage && (
                    <div className="flex-1 bg-gray-100">
                        <img
                            src={scholarship.universityImage}
                            alt={`${scholarship.universityName} Logo`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                {/* Right Side: Details */}
                <div className="flex-1 p-6 bg-white">
                    <h2 className="text-3xl font-bold mb-4">
                        {scholarship.universityName}
                    </h2>
                    <p className="text-gray-600 mb-6">
                        {scholarship.universityCity},{" "}
                        {scholarship.universityCountry}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h3 className="font-semibold">Scholarship Category:</h3>
                            <p>{scholarship.scholarshipCategory}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Application Deadline:</h3>
                            <p>{new Date(scholarship.applicationDeadline).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Subject Name:</h3>
                            <p>{scholarship.subjectCategory}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Stipend:</h3>
                            <p>{scholarship.stipend ? `$${scholarship.stipend}` : "Not provided"}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Post Date:</h3>
                            <p>{new Date(scholarship.scholarshipPostDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Service Charge:</h3>
                            <p>${scholarship.serviceCharge}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Application Fees:</h3>
                            <p>${scholarship.applicationFees}</p>
                        </div>
                    </div>
                    <div className="mt-6">
                        <h3 className="font-semibold">Scholarship Description:</h3>
                        <p>{scholarship.scholarshipDescription}</p>
                    </div>
                    <Link to={`/payment/${scholarship._id}`}><button className="btn btn-primary mt-6 block">
                        Apply Scholarship
                    </button></Link>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-10">
                {reviews.length > 0 ? (
                    <Slider {...sliderSettings}>
                        {reviews.map((review) => (
                            <div
                                key={review._id}
                                className="bg-gradient-to-r from-sky-500 via-pink-300 to-purple-300 p-6 rounded shadow-lg text-center"
                            >
                                {review.userImage && (
                                    <img
                                        src={review.userImage}
                                        alt={review.userName}
                                        className="w-16 h-16 rounded-full mx-auto mb-4"
                                    />
                                )}
                                <p className="text-yellow-400 font-bold">
                                    Rating: {review.rating} / 5
                                </p>
                                <h3 className="text-lg font-semibold">{review.userName}</h3>
                                <p className="text-sm text-sky-500">
                                    {review?.reviewDate}
                                </p>
                                <p className="italic text-xl text-sky">"{review?.comment}"</p>
                            </div>
                        ))}
                    </Slider>
                ) : (
                    <p className="text-center text-gray-600">No reviews available yet.</p>
                )}
            </div>
        </div>
    );
};


export default ScholarshipDetails;