import React, { useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const ManageApplications = () => {
    const axiosSecure = useAxiosSecure();
    const { data: applications = [], refetch } = useQuery({
        queryKey: ['applications'],
        queryFn: async () => {
            const res = await axiosSecure.get('/application/manage');
            return res.data;
        },
    });

    const [detailsModal, setDetailsModal] = useState(null);
    const [feedbackModal, setFeedbackModal] = useState(null);
    const [feedback, setFeedback] = useState("");
    const [sortOption, setSortOption] = useState("");

    // Handle Status Change
    const handleStatusChange = async (id, status) => {
        await axiosSecure.patch(`/applications-status/${id}`, { status });
        refetch();
    };

    // Handle Cancel
    const handleCancel = async (id) => {
        await axiosSecure.patch(`/applications-cancelStatus/${id}`, { status: "Rejected" });
        refetch();
        Swal.fire('Application Canceled', 'The application status is set to rejected.', 'success');
    };

    // Handle Feedback Submission
    const handleSubmitFeedback = async (id) => {
        await axiosSecure.patch(`/applications-feedback/${id}`, { feedback });
        refetch();
        setFeedback("");
        setFeedbackModal(null);
        Swal.fire('Feedback Submitted', 'Your feedback has been sent to the applicant.', 'success');
    };

    //  Sorting
    const sortedApplications = () => {
        if (sortOption === "appliedDate") {
            return [...applications].sort(
                (a, b) => new Date(a.currentDate) - new Date(b.currentDate)
            );
        } else if (sortOption === "scholarshipDeadline") {
            return [...applications].sort(
                (a, b) => new Date(a.applicationDeadline) - new Date(b.applicationDeadline)
            );
        }
        return applications;
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Manage Applications: {applications.length}</h1>


            <div className="flex justify-center mb-4">
                <select
                    className="border px-4 py-2"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                >
                    <option value="">Sort By</option>
                    <option value="appliedDate">Applied Date</option>
                    <option value="scholarshipDeadline">Scholarship Deadline</option>
                </select>
            </div>

            <table className="min-w-full bg-white border">
                <thead>
                    <tr className="bg-gray-200 text-left">
                        <th className="px-4 py-2">Scholarship Name</th>
                        <th className="px-4 py-2">Applicant Name</th>
                        <th className="px-4 py-2">Photo</th>
                        <th className="px-4 py-2">SSC Result</th>
                        <th className="px-4 py-2">HSC Result</th>
                        <th className="px-4 py-2">Applied Date</th>
                        <th className="px-4 py-2">Scholarship Deadline</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedApplications().map((app) => (
                        <tr key={app._id} className="border-t">
                            <td className="px-4 py-2">{app.scholarshipName}</td>
                            <td className="px-4 py-2">{app.userName}</td>
                            <td className="px-4 py-2">
                                <img
                                    src={app.photo}
                                    alt={app.userName}
                                    className="w-10 h-10 rounded-full"
                                />
                            </td>
                            <td className="px-4 py-2">{app.sscResult}</td>
                            <td className="px-4 py-2">{app.hscResult}</td>
                            <td className="px-4 py-2">{app.currentDate}</td>
                            <td className="px-4 py-2">{app.applicationDeadline}</td>
                            <td className="px-4 py-2">
                                <select
                                    value={app.status}
                                    onChange={(e) => handleStatusChange(app._id, e.target.value)}
                                    className="border px-2 py-1"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </td>
                            <td className="flex flex-col px-1 py-2 space-y-2">
                                <button
                                    className="bg-blue-500 text-white px-1 py-1 rounded"
                                    onClick={() => setDetailsModal(app)}
                                >
                                    Details
                                </button>
                                <button
                                    className="bg-yellow-500 text-white px-1 py-1 rounded"
                                    onClick={() => setFeedbackModal(app)}
                                >
                                    Feedback
                                </button>
                                <button
                                    className="bg-red-500 text-white px-1 py-1 rounded"
                                    onClick={() => handleCancel(app._id)}
                                >
                                    Cancel
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Details Modal */}
            {detailsModal && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h2 className="text-2xl font-bold">Application Details</h2>
                        <p><strong>Applied University:</strong> {detailsModal.universityName}</p>
                        <p><strong>Degree:</strong> {detailsModal.degree}</p>
                        <p><strong>Scholarship Category:</strong> {detailsModal.scholarshipCategory}</p>
                        <div className="modal-action">
                            <button className="btn" onClick={() => setDetailsModal(null)}>Close</button>
                        </div>
                    </div>
                </div>
            )}

            {feedbackModal && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h2 className="text-2xl font-bold">Provide Feedback</h2>
                        <textarea
                            className="textarea w-full"
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder="Enter your feedback here"
                        ></textarea>
                        <div className="modal-action">
                            <button
                                className="btn btn-success"
                                onClick={() => handleSubmitFeedback(feedbackModal._id)}
                            >
                                Submit Feedback
                            </button>
                            <button className="btn" onClick={() => setFeedbackModal(null)}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


export default ManageApplications;