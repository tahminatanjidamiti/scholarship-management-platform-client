import { Navigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import useAdmin from '../Hooks/useAdmin';

const AdminRoute = ({ children }) => {
    const {user, loading} = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    if (loading || isAdminLoading) {
        return <span className="loading loading-bars loading-lg"></span>
    }
    if (user && isAdmin) {
        return children;
    }
    return <Navigate to={"/login"}></Navigate>
};

export default AdminRoute;