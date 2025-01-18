import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useModerator = () => {
    const axiosSecure = useAxiosSecure();
    const {user, loading} = useAuth();
    const {data: isModerator, isPending: isModeratorLoading} = useQuery({
        queryKey: [user?.email, 'isModerator'],
        enabled: !loading,
        queryFn: async () => {
            if (!user?.email) {
                return [];
            }
            const res = await axiosSecure.get(`/users/moderator/${user.email}`);
            // console.log(res.data);
            return res.data?.moderator;
        }
    })
    return [isModerator, isModeratorLoading];
};

export default useModerator;