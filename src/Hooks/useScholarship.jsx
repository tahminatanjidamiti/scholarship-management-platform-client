import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';


const useScholarship = (filters) => {

    const axiosPublic = useAxiosPublic();
    const { loading } = useAuth();
    const { data = {}, refetch } = useQuery({
        queryKey: ['scholarships', filters],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosPublic.get('/scholarships', { params: filters });
            return res.data;
        },
    });

    const { scholarships = [], total = 0, totalPages = 4, currentPage = 1 } = data;

    return { scholarships, total, totalPages, currentPage, refetch };
};


export default useScholarship;