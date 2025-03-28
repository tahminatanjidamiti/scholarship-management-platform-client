import { Navigate } from 'react-router-dom';
import useModerator from '../Hooks/useModerator';
import useAuth from '../Hooks/useAuth';

const ModeratorRoute = () => {
    const {user, loading} = useAuth();
    const [isModerator, isModeratorLoading] = useModerator();
    if (loading || isModeratorLoading) {
        return <span className="loading loading-spinner text-info"></span>
    }
    if (user && isModerator) {
        return children;
    }
    return <Navigate to={"/login"}></Navigate>
};

export default ModeratorRoute;