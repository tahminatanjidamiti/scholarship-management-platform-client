import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../Hooks/useAuth';
import useAdmin from '../../Hooks/useAdmin';
import {  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

//custom shape for the bar chart
const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
    Z`;
};

const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};


const UserProfile = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isAdmin, isAdminLoading] = useAdmin();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/${user.email}`);
            return res.data;
        }
    });

    const { data: chartData = {} } = useQuery({
        queryKey: ['admin-dashboard'],
        enabled: !isAdminLoading,
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-dashboard');
            return res.data;
        }
    });
   
    const barChartData = chartData.length
    ? [
          { category: 'All Users', value: chartData[0] },
          { category: 'Scholarships', value: chartData[1] },
          { category: 'Applications', value: chartData[2] },
          { category: 'Reviews', value: chartData[3] },
      ]
    : [];
    return (
        <div>
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
            {
                isAdmin && (
                    <div className="mt-10 bg-white shadow-lg rounded-lg">
                    {barChartData.length > 0 ? (
                        <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                        <BarChart
                                data={barChartData}
                                margin={{ top: 20, right: 0, left: 0, bottom: 5 }}
                                className="w-full max-w-[600px] md:max-w-[768px] lg:max-w-[1024px] mx-auto"
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="category" />
                                <YAxis />
                                <Tooltip />
                                <Bar
                                    dataKey="value"
                                    fill="#8884d8"
                                    shape={<TriangleBar />}
                                    label={{ position: 'top' }}
                                >
                                    {barChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">No data available to display.</p>
                    )}
                </div>
                )
            }
        </div>
    );
};

export default UserProfile;