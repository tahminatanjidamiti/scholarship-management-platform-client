import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../Hooks/useAuth';

const UserProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/${user.email}`);
            return res.data;
        }
    });
    return (
        <div className="w-11/12 mx-auto p-4 bg-green-200 rounded-lg shadow-lg mt-10">
            <div className="flex items-center space-x-4 flex-col md:flex-row">
                {/* User Image */}
                <img
                    src={users.photo}
                    alt="User Profile"
                    className="w-16 h-16 rounded-full border-2 border-blue-500"
                />
                <div className="flex flex-col mt-4 md:mt-0">
                    <h2 className="text-2xl font-semibold text-gray-900">{users.name}</h2>
                    <p className="text-gray-600 text-xl">Role: <span className='text-green-500'>{users.role}.</span></p>
                </div>
            </div>

            {/* Additional user information */}
            <div className="mt-4">
                <div className="bg-teal-200 p-2 md:p-4 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800">User Details:</h3>
                    <div className="mt-2">
                        <p className="text-gray-600"><strong>Email:</strong> {users.email}.</p>
                        <p className="text-gray-600"><strong>User Id:</strong> {users._id}.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;