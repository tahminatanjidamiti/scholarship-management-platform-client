import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const ManageReviews = () => {
    const axiosSecure = useAxiosSecure();
    const { data: reviews = [], refetch } = useQuery({
        queryKey: ["reviews"],
        queryFn: async () => {
            const res = await axiosSecure.get('/manage-reviews');
            return res.data;
        },
    });

    const handleDelete = async (reviewId) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
            });

            if (result.isConfirmed) {
                await axiosSecure.delete(`/manage-reviews/${reviewId}`);
                refetch();
                Swal.fire("Deleted!", "Review has been deleted.", "success");
            }
        } catch (error) {
            // console.error("Error deleting review:", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">Manage Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {reviews.map((review) => (
                    <div key={review._id} className="flex flex-col flex-grow card shadow-md rounded-lg overflow-hidden">
                        <img src={review.userImage} alt={review.userName} className="w-20 h-20 object-cover" />
                        <div className="p-4">
                            <h3 className="font-semibold text-lg">{review.universityName}</h3>
                            <h3 className="font-semibold text-teal-600">{review.userName}</h3>
                            <p className="text-sm text-gray-500">{review.subjectCategory}</p>
                            <p className="font-bold text-amber-500">{review.comment}</p>
                            <p className="text-sm text-gray-400">{review.reviewDate}</p>
                            <div className="flex items-center space-x-2 my-2">
                                <span className="font-semibold text-amber-800">Rating:</span>
                                <span>{review.rating}</span>
                            </div>
                            <p className="text-sm text-gray-700">{review.comments}</p>
                            <button
                                onClick={() => handleDelete(review._id)}
                                className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default ManageReviews;