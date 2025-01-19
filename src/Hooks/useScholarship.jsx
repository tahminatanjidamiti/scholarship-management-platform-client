import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useScholarship = () => {
    const axiosPublic = useAxiosPublic();
    const { data: scholarships = [], refetch } = useQuery({
        queryKey: ['scholarships'],
        queryFn: async () => {
            const res = await axiosPublic.get('/scholarships');
            return res.data;
        }
    })
    return [scholarships, refetch];
};

export default useScholarship;