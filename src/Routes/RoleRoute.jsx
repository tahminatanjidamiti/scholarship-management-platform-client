import React from 'react';
import useRole from '../Hooks/useRole';
import useAuth from '../Hooks/useAuth';
import { Navigate } from 'react-router-dom';

const RoleRoute = ({ children }) => {
    const {user, loading} = useAuth();
    const [isRole, isRoleLoading] = useRole();
    if (loading || isRoleLoading) {
        return <span className="loading loading-spinner text-info"></span>
    }
    if (user && isRole) {
        return children;
    }
    return <Navigate to={"/login"}></Navigate>
};

export default RoleRoute;