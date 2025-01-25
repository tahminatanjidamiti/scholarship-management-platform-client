
import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });
    const [filterRole, setFilterRole] = useState('');

    const handleRoleChange = async (userId, newRole) => {
        try {
            await axiosSecure.patch(`/users/${userId}`, { role: newRole });
            refetch();
        } catch (error) {
            // console.error("Failed to update user role:", error);
        }
    };

    const handleDeleteUser = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "User has been deleted.",
                                icon: "success"
                            });
                        }
                    });
            }
        });
    };

    const filteredUsers = filterRole
        ? users.filter(user => user.role.toLowerCase() === filterRole.toLowerCase())
        : users;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
            <div className="mb-4">
                <label className="mr-2">Filter by Role: </label>
                <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="select select-bordered w-full sm:w-auto"
                >
                    <option value="">All</option>
                    <option value="user">User</option>
                    <option value="moderator">Moderator</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full text-sm sm:text-base">
                    <thead>
                        <tr>
                            <th className="hidden md:table-cell text-xs md:text-sm">User Name</th>
                            <th className="hidden md:table-cell text-xs md:text-sm">User Email</th>
                            <th className="text-xs md:text-sm">User Role</th>
                            <th className="text-xs md:text-sm">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user._id}>
                                <td className="hidden md:table-cell">{user.name}</td>
                                <td className="hidden md:table-cell">{user.email}</td>
                                <td>
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                        className="select select-bordered w-full"
                                    >
                                        <option value="user">User</option>
                                        <option value="moderator">Moderator</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteUser(user)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


export default ManageUsers;