import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";

const ManageScholarships = () => {
    const { loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: scholarships = [], refetch } = useQuery({
        queryKey: ["scholarships"],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get("/scholarships-manage");
            return res.data;
        },
    });


    const [selectedScholarship, setSelectedScholarship] = useState(null);

    const [formData, setFormData] = useState({
        scholarshipName: "",
        universityName: "",
        subjectCategory: "",
        degree: "",
        applicationFees: "",
    });

    useEffect(() => {
        if (selectedScholarship) {
            setFormData({
                scholarshipName: selectedScholarship.scholarshipName,
                universityName: selectedScholarship.universityName,
                subjectCategory: selectedScholarship.subjectCategory,
                degree: selectedScholarship.degree,
                applicationFees: selectedScholarship.applicationFees,
            });
        }
    }, [selectedScholarship]);

    const handleDelete = async (id) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "This scholarship will be permanently deleted!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
            });

            if (result.isConfirmed) {
                await axiosSecure.delete(`/scholarships/${id}`);
                refetch();
                Swal.fire("Deleted!", "Scholarship has been deleted.", "success");
            }
        } catch (error) {
            Swal.fire("Error!", "Failed to delete the scholarship.", "error");
        }
    };

    const handleEdit = (scholarship) => {
        setSelectedScholarship(scholarship);
    };

    const handleModalSubmit = async (e) => {
        e.preventDefault();

        try {
            await axiosSecure.put(`/scholarships/${selectedScholarship._id}`, formData);
            refetch();
            Swal.fire("Success!", "Scholarship has been updated.", "success");
            setSelectedScholarship(null);
        } catch (error) {
            Swal.fire("Error!", "Failed to update the scholarship.", "error");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="container mx-auto mt-6">
            <h2 className="w-full mx-auto text-xl lg:text-2xl font-bold mb-4">
                Manage Scholarships
            </h2>
            <table className="table-auto table-zebra w-full border border-gray-300 text-sm">
                <thead>
                    <tr className="bg-gray-200 text-sm">
                        <th className="hidden lg:table-cell border border-gray-300 px-1 pr-0 py-2">
                            Scholarship Name
                        </th>
                        <th className="hidden lg:table-cell border border-gray-300 px-1 py-2">
                            University
                        </th>
                        <th className="border border-gray-300 px-1 py-2">Subject Category</th>
                        <th className="hidden md:table-cell border border-gray-300 px-1 py-2">
                            Degree
                        </th>
                        <th className="border border-gray-300 px-1 py-2">
                            Application Fees
                        </th>
                        <th className="border border-gray-300 px-1 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {scholarships.map((scholarship) => (
                        <tr key={scholarship._id}>
                            <td className="hidden lg:table-cell border border-gray-300 px-1 py-2">
                                {scholarship.scholarshipName}
                            </td>
                            <td className="hidden lg:table-cell border border-gray-300 px-1 py-2">
                                {scholarship.universityName}
                            </td>
                            <td className="border border-gray-300 px-1 py-2">
                                {scholarship.subjectCategory}
                            </td>
                            <td className="hidden md:table-cell border border-gray-300 px-1 py-2">
                                {scholarship.degree}
                            </td>
                            <td className="border border-gray-300 px-1 py-2">
                                {scholarship.applicationFees}
                            </td>
                            <td className="border flex flex-col md:flex-row border-gray-300 px-1 space-y-2 md:space-x-1 lg:items-center py-2">
                                <Link to={`/scholarshipDetails/${scholarship._id}`}>
                                    <button className="bg-blue-500 text-white ml-2 px-1 py-1 rounded mt-3">
                                        <TbListDetails className="text-2xl mx-auto" />
                                    </button>
                                </Link>
                                <button
                                    className="bg-green-500 text-white px-1 py-1 rounded"
                                    onClick={() => handleEdit(scholarship)}
                                >
                                    <FaEdit className="text-2xl mx-auto" />
                                </button>
                                <button
                                    className="bg-red-500 text-white px-1 py-1 rounded"
                                    onClick={() => handleDelete(scholarship._id)}
                                >
                                    <FaTrashAlt className="text-2xl mx-auto" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit Modal */}
            {selectedScholarship && (
                <div className="fixed inset-0 flex items-center justify-center overflow-y-auto mt-24">
                    <div className="bg-white p-6 rounded shadow-lg w-1/3 max-h-screen overflow-y-auto">
                        <h3 className="text-xl font-bold mb-4">Edit Scholarship</h3>
                        <form onSubmit={handleModalSubmit}>
                            <div className="mb-4">
                                <label className="block font-medium mb-2">Scholarship Name</label>
                                <input
                                    name="scholarshipName"
                                    value={formData.scholarshipName}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium mb-2">University</label>
                                <input
                                    name="universityName"
                                    value={formData.universityName}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium mb-2">Subject Category</label>
                                <input
                                    name="subjectCategory"
                                    value={formData.subjectCategory}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium mb-2">Degree</label>
                                <input
                                    name="degree"
                                    value={formData.degree}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium mb-2">Application Fees</label>
                                <input
                                    name="applicationFees"
                                    value={formData.applicationFees}
                                    onChange={handleInputChange}
                                    type="number"
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="bg-gray-500 text-white px-3 py-2 rounded mr-2"
                                    onClick={() => setSelectedScholarship(null)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-3 py-2 rounded"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
export default ManageScholarships;