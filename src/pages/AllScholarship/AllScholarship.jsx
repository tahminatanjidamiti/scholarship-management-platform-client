import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useScholarship from "../../Hooks/useScholarship";
import { Helmet } from "react-helmet-async";

const AllScholarship = () => {
    const [filters, setFilters] = useState({
        search: "",
        minPrice: 0,
        maxPrice: Infinity,
        page: 1,
        limit: 4,
    });

    const { scholarships, total, totalPages, currentPage, refetch } = useScholarship(filters);



    useEffect(() => {
        refetch();
    }, [filters, refetch]);

    const handlePageChange = (newPage) => {
        setFilters((prev) => ({ ...prev, page: newPage }));
    };

    return (
        <div className="container mx-auto p-4">
            <Helmet>
                <title>ScholarBridge | All Scholarship</title>
            </Helmet>
            <h1 className="text-center text-4xl font-bold mb-6">All Scholarships</h1>

            {/* Search and Filter Controls */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search by name, university, or degree"
                    className="border px-4 py-2 flex-1"
                    value={filters.search}
                    onChange={(e) =>
                        setFilters((prev) => ({ ...prev, search: e.target.value, page: 1 }))
                    }
                />
                <input
                    type="number"
                    placeholder="Min Price"
                    className="border px-4 py-2"
                    value={filters.minPrice}
                    onChange={(e) =>
                        setFilters((prev) => ({ ...prev, minPrice: Number(e.target.value) || 0 }))
                    }
                />
                <input
                    type="number"
                    placeholder="Max Price"
                    className="border px-4 py-2"
                    value={filters.maxPrice === Infinity ? "" : filters.maxPrice}
                    onChange={(e) =>
                        setFilters((prev) => ({
                            ...prev,
                            maxPrice: Number(e.target.value) || Infinity,
                        }))
                    }
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mt-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>

            {/* Scholarships Grid */}
            <div className="w-10/12 mx-auto grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {scholarships.length > 0 ? (
                    scholarships.map((scholarship) => (
                        <div
                            key={scholarship._id}
                            className="rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col h-full relative"
                        >
                            <div className="absolute inset-0 animate-neon-glow -z-10"></div>
                            <img
                                src={scholarship.universityImage}
                                alt={`${scholarship.universityName} logo`}
                                className="w-full h-32 object-cover"
                            />
                            <div className="p-4 flex flex-col flex-grow">
                                <h2 className="text-xl font-semibold mb-2">{scholarship.universityName}</h2>
                                <p className="text-sm text-gray-600 mb-1">
                                    <strong>Category:</strong> {scholarship?.scholarshipCategory}
                                </p>
                                <p className="text-sm text-gray-600 mb-1">
                                    <strong>Subject Category:</strong> {scholarship?.subjectCategory}
                                </p>
                                <p className="text-sm text-gray-600 mb-1">
                                    <strong>Degree:</strong> {scholarship?.degree}
                                </p>
                                <p className="text-sm text-gray-600 mb-1">
                                    <strong>Location:</strong> {scholarship.universityCity}, {scholarship.universityCountry}
                                </p>
                                <p className="text-sm text-gray-600 mb-1">
                                    <strong>Application Fees:</strong> ${scholarship.applicationFees}
                                </p>
                                <p className="text-sm text-gray-600 mb-1">
                                    <strong>Deadline:</strong> {scholarship?.applicationDeadline}
                                </p>
                                <p className="text-sm text-gray-600 mb-3">
                                    <strong>Rating:</strong>
                                    {scholarship?.averageRating?.toFixed(1) || "N/A"} / 5
                                </p>
                                {/* Button */}
                                <div className="mt-auto">
                                    <Link to={`/scholarshipDetails/${scholarship._id}`}>
                                        <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
                                            Scholarship Details
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="self-center">
                        <span className="loading loading-spinner text-info"></span>
                    </div>
                )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-6">
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            className={`px-4 py-2 mx-1 border ${currentPage === i + 1
                                ? "bg-blue-500 text-white"
                                : "bg-white text-gray-700"
                                }`}
                            onClick={() => handlePageChange(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
export default AllScholarship;