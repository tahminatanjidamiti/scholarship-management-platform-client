import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useScholarship = (filters) => {
    const axiosPublic = useAxiosPublic();

    const { data = {}, refetch } = useQuery({
        queryKey: ['scholarships', filters],
        queryFn: async () => {
            const res = await axiosPublic.get('/scholarships', { params: filters });
            return res.data;
        },
    });

    const { scholarships = [], total = 0, totalPages = 1, currentPage = 1 } = data;

    return { scholarships, total, totalPages, currentPage, refetch };
};


export default useScholarship;