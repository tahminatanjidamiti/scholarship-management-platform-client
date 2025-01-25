import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {
    const axiosSecure = useAxiosSecure();
    const {user, loading} = useAuth();
    const {data: isRole, isPending: isRoleLoading} = useQuery({
        queryKey: [user?.email, 'isRole'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role/${user.email}`);
            // console.log(res.data);
            return res.data?.role;
        }
    })
    return [isRole, isRoleLoading];
};

export default useRole;