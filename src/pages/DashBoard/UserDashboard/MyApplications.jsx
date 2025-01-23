import React, { useState } from 'react';
import { Dialog, Transition, DialogPanel, DialogTitle } from '@headlessui/react';
import { Fragment } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { TbListDetails } from 'react-icons/tb';
import { FaEdit } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const MyApplications = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isOpen, setIsOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [review, setReview] = useState({
        rating: '',
        comment: '',
    });

    const [editForm, setEditForm] = useState({
        phoneNumber: '',
        photo: null,
        address: '',
        gender: '',
        degree: '',
        sscResult: '',
        hscResult: '',
        studyGap: '',
    });

    const { data: applications = [], refetch } = useQuery({
        queryKey: ['applications', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/applications/${user.email}`);
            return res.data;
        },
    });
    
    const handleEditOpen = (application) => {
        setSelectedApplication(application);
        setEditForm({
            phoneNumber: application.phoneNumber || '',
            address: application.address || '',
            gender: application.gender || '',
            degree: application.degree || '',
            sscResult: application.sscResult || '',
            hscResult: application.hscResult || '',
            studyGap: application.studyGap || '',
            photo: null,
        });
        setEditOpen(true);
    };

    const closeEditModal = () => {
        setEditOpen(false);
        setEditForm({
            phoneNumber: '',
            photo: null,
            address: '',
            gender: '',
            degree: '',
            sscResult: '',
            hscResult: '',
            studyGap: '',
        });
    };

    const handleFileChange = (e) => {
        setEditForm((prev) => ({ ...prev, photo: e.target.files[0] }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditSave = async () => {
        try {
            let photoUrl = selectedApplication.photo;

            if (editForm.photo) {
                const formData = new FormData();
                formData.append('image', editForm.photo);

                const imgResponse = await fetch(image_hosting_api, {
                    method: 'POST',
                    body: formData,
                });

                const imgData = await imgResponse.json();
                if (imgData.success) {
                    photoUrl = imgData.data.display_url;
                } else {
                    Swal.fire('Error!', 'Failed to upload the photo.', 'error');
                    return;
                }
            }

            const updatedData = {
                ...editForm,
                photo: photoUrl,
            };

            await axiosSecure.put(`/applications/${selectedApplication._id}`, updatedData);
            Swal.fire('Success!', 'Your application has been updated.', 'success');
            setEditOpen(false);
            refetch();
        } catch (error) {
            Swal.fire('Error!', 'Failed to update the application.', 'error');
        }
    };

    const handleCancel = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to cancel this application?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, cancel it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/applications/${id}`);
                    Swal.fire('Cancelled!', 'Your application has been canceled.', 'success');
                    refetch();
                } catch (error) {
                    Swal.fire('Error!', 'Failed to cancel the application.', 'error');
                }
            }
        });
    };

    const openReviewModal = (application) => {
        setSelectedApplication(application);
        setIsOpen(true);
    };

    const closeReviewModal = () => {
        setIsOpen(false);
        setReview({ rating: '', comment: '' });
    };

    const handleReviewSubmit = async () => {
        if (!review.rating || !review.comment) {
            Swal.fire('Error', 'Please provide a rating and comment before submitting.', 'error');
            return;
        }
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        };
        const reviewData = {
            ...review,
            scholarshipName: selectedApplication.scholarshipName,
            universityName: selectedApplication.universityName,
            universityId: selectedApplication.scholarshipId,
            userName: user.displayName,
            userEmail: user.email,
            userImage: user.photoURL,
            reviewDate: new Date().toLocaleString('en-US', options),
        };

        try {
            await axiosSecure.post('/reviews', reviewData);
            Swal.fire('Success', 'Your review has been submitted successfully!', 'success');
            setIsOpen(false);
            setReview({ rating: '', comment: '' });
        } catch (error) {
            Swal.fire('Error', 'Failed to submit the review.', 'error');
        }
    };

    return (
        <div className="container mx-auto p-1">
            <h1 className="text-center text-xl lg:text-4xl font-bold mb-6">My Applications</h1>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 text-sm">
                            <th className="hidden md:table-cell">University Name</th>
                            <th className="hidden lg:table-cell">University Address</th>
                            <th className="hidden lg:table-cell">Subject Category</th>
                            <th className="hidden lg:table-cell">Degree</th>
                            <th className="hidden lg:table-cell">Application Fees</th>
                            <th className="p-1 hidden lg:table-cell">Service Charge</th>
                            <th className="p-1">Status</th>
                            <th className="p-1">Feedback</th>
                            <th className="p-1 hidden md:table-cell md:p-1">Actions</th>
                            <th className="p-1">Review</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((application) => (
                            <tr key={application._id} className="text-sm">
                                <td className="p-1 hidden md:table-cell">{application.universityName}</td>
                                <td className="p-1 hidden lg:table-cell">{application.universityCity}, {application.universityCountry}</td>
                                <td className="p-1 hidden lg:table-cell">{application.subjectCategory}</td>
                                <td className="p-1 hidden lg:table-cell">{application.degree}</td>
                                <td className="p-1 hidden lg:table-cell lg:p-1">${application.applicationFees}</td>
                                <td className="p-1 hidden lg:table-cell">${application.serviceCharge}</td>
                                <td className="p-1">
                                    <span
                                        className={`px-2 py-1 rounded ${application.status === 'Pending'
                                            ? 'bg-yellow-100 text-yellow-600'
                                            : application.status === 'Processing'
                                                ? 'bg-blue-100 text-blue-600'
                                                : application.status === 'Completed'
                                                    ? 'bg-green-100 text-green-600'
                                                    : 'bg-red-100 text-red-600'
                                            }`}
                                    >
                                        {application.status}
                                    </span>
                                </td>
                                <td>{application.feedback || 'N/A'}</td>
                                <td className="hidden md:flex items-center space-x-2">
                                    <div className="dropdown dropdown-left dropdown-end">
                                        <div tabIndex={0} role="button" className="btn m-2">Buttons</div>
                                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-32 p-2 shadow space-y-1">
                                            <Link to={`/scholarshipDetails/${application._id}`}>
                                                <button className="bg-blue-500 text-white px-3 py-1 rounded-md w-full mx-auto text-2xl">
                                                    <TbListDetails className='mx-auto'></TbListDetails>
                                                </button>
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    application.status === 'Pending'
                                                        ? handleEditOpen(application)
                                                        : Swal.fire('Cannot Edit', 'The application cannot be edited.', 'error')
                                                }
                                                className="bg-green-500 text-white px-3 py-1 rounded-md text-2xl"
                                            >
                                                <FaEdit className='mx-auto'></FaEdit>
                                            </button>
                                            <button
                                                onClick={() => handleCancel(application._id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded-md text-2xl"
                                            >
                                               <MdCancel className='mx-auto'></MdCancel>
                                            </button>

                                        </ul>
                                    </div>
                                </td>
                                <td className="p-1"><button
                                    onClick={() => openReviewModal(application)}
                                    className="bg-amber-500 text-white px-3 py-1 rounded-md"
                                >
                                    <img src="https://img.icons8.com/?size=30&id=101113&format=png" alt="Add review!" />
                                </button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            <Transition appear show={editOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeEditModal}>
                    <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto mt-32">
                        <DialogPanel className="w-full max-w-md bg-white rounded shadow-lg p-6 max-h-screen overflow-y-auto">
                            <DialogTitle className="text-xl font-semibold mb-4">Edit Application</DialogTitle>
                            <form>
                                <label className="block mb-2">Phone Number</label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={editForm.phoneNumber}
                                    onChange={handleInputChange}
                                    className="block w-full mb-4 p-1 border rounded"
                                />
                                <label className="block mb-2">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={editForm.address}
                                    onChange={handleInputChange}
                                    className="block w-full mb-4 p-1 border rounded"
                                />
                                <label className="block mb-2">Degree</label>
                                <input
                                    type="text"
                                    name="degree"
                                    value={editForm.degree}
                                    onChange={handleInputChange}
                                    className="block w-full mb-4 p-1 border rounded"
                                />
                                <label className="block mb-2">SSC Result</label>
                                <input
                                    type="text"
                                    name="sscResult"
                                    value={editForm.sscResult}
                                    onChange={handleInputChange}
                                    className="block w-full mb-4 p-1 border rounded"
                                />
                                <label className="block mb-2">HSC Result</label>
                                <input
                                    type="text"
                                    name="hscResult"
                                    value={editForm.hscResult}
                                    onChange={handleInputChange}
                                    className="block w-full mb-4 p-1 border rounded"
                                />
                                <label className="block mb-2">Study Gap</label>
                                <input
                                    type="text"
                                    name="studyGap"
                                    value={editForm.studyGap}
                                    onChange={handleInputChange}
                                    className="block w-full mb-4 p-1 border rounded"
                                />
                                <label className="block mb-2">Photo</label>
                                <input
                                    type="file"
                                    name="photo"
                                    onChange={handleFileChange}
                                    className="block w-full mb-4 p-1 border rounded"
                                />
                                <div className="flex justify-end space-x-2">
                                    <button
                                        type="button"
                                        onClick={handleEditSave}
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        onClick={closeEditModal}
                                        className="bg-gray-300 px-4 py-2 rounded"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </DialogPanel>
                    </div>
                </Dialog>
            </Transition>

            {/* Review Modal */}
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeReviewModal}>
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <DialogPanel className="w-full max-w-md bg-white rounded shadow-lg p-6">
                            <DialogTitle className="text-xl font-semibold mb-4">Add Review</DialogTitle>
                            <form>
                                <label className="block mb-2">Rating (1-5)</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="5"
                                    value={review.rating}
                                    onChange={(e) => setReview({ ...review, rating: Number(e.target.value) })}
                                    className="block w-full mb-4 p-1 border rounded"
                                />
                                <label className="block mb-2">Comment</label>
                                <textarea
                                    rows="4"
                                    value={review.comment}
                                    onChange={(e) => setReview({ ...review, comment: e.target.value })}
                                    className="block w-full mb-4 p-1 border rounded"
                                />
                                <div className="flex justify-end space-x-2">
                                    <button
                                        type="button"
                                        onClick={handleReviewSubmit}
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                        Submit
                                    </button>
                                    <button
                                        type="button"
                                        onClick={closeReviewModal}
                                        className="bg-gray-300 px-4 py-2 rounded"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </DialogPanel>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};



export default MyApplications;