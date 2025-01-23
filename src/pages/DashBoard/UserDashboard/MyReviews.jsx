import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";

const MyReviews = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [selectedReview, setSelectedReview] = useState(null);
    const { data: reviews = [], refetch } = useQuery({
        queryKey: ["reviews", user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/review/${user.email}`);
            return res.data;
        },
    });

    const handleDelete = async (id) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
            });

            if (result.isConfirmed) {
                await axiosSecure.delete(`/reviews/${id}`);
                refetch();
                Swal.fire("Deleted!", "Your review has been deleted.", "success");
            }
        } catch (error) {
            Swal.fire("Error!", "Failed to delete the review.", "error");
        }
    };

    const handleEdit = (review) => {
        setSelectedReview(review);
    };

    const handleModalSubmit = async (e) => {
        e.preventDefault();
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        };
        const formData = new FormData(e.target);
        const updatedReview = {
            rating: formData.get("reviewRating"),
            comment: formData.get("reviewComment"),
            reviewDate: new Date().toLocaleString('en-US', options),
        };

        try {
            await axiosSecure.put(`/reviews/${selectedReview._id}`, updatedReview);
            refetch();
            setSelectedReview(null);
            Swal.fire("Success!", "Your review has been updated.", "success");
        } catch (error) {
            Swal.fire("Error!", "Failed to update the review.", "error");
        }
    };

    return (
        <div className="container mx-auto mt-6">
            <h2 className="text-xl lg:text-2xl font-bold mb-4">My Reviews: {reviews.length}</h2>
            <table className="table-auto w-auto border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200 text-sm">
                        <th className="hidden lg:table-cell border border-gray-300 px-1 py-2">Scholarship Name</th>
                        <th className="border border-gray-300 px-1 py-2">University Name</th>
                        <th className="hidden lg:table-cell border border-gray-300 px-1 py-2">Review Comments</th>
                        <th className="hidden lg:table-cell border border-gray-300 px-1 py-2">Review Date</th>
                        <th className="border border-gray-300 px-1 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.map((review) => (
                        <tr key={review._id}>
                            <td className="hidden lg:table-cell border border-gray-300 px-1 py-2">{review.scholarshipName}</td>
                            <td className="border border-gray-300 px-1 py-2">{review.universityName}</td>
                            <td className="hidden lg:table-cell border border-gray-300 px-1 py-2">{review.comment}</td>
                            <td className=" hidden lg:table-cell border border-gray-300 px-1 py-2">{review.reviewDate}</td>
                            <td className="border border-gray-300 px-1 space-y-2 py-2">
                                <button
                                    className="bg-green-500 text-white px-1 py-2 rounded mr-2"
                                    onClick={() => handleEdit(review)}
                                >
                                    <FaEdit></FaEdit>
                                </button>
                                <button
                                    className="bg-red-500 text-white px-1 py-2 rounded"
                                    onClick={() => handleDelete(review._id)}
                                >
                                    <FaTrash></FaTrash>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit Modal */}
            {selectedReview && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg w-1/3">
                        <h3 className="text-xl font-bold mb-4">Edit Review</h3>
                        <form onSubmit={handleModalSubmit}>
                            <div className="mb-4">
                                <label className="block mb-2">Rating (1-5)</label>
                                <input
                                    name="reviewRating"
                                    type="number"
                                    min="1"
                                    max="5"
                                    defaultValue={selectedReview.rating}
                                    className="block w-full mb-4 p-1 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium mb-2">Review Comments</label>
                                <textarea
                                    name="reviewComment"
                                    defaultValue={selectedReview.comment}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                    rows="4"
                                    required
                                ></textarea>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="bg-gray-500 text-white px-1 py-2 rounded mr-2"
                                    onClick={() => setSelectedReview(null)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-1 py-2 rounded"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyReviews;