import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';


const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext)
    if(loading){
        return <span className="loading loading-spinner text-info"></span>
    }
    if(user && user?.email){
        return children;
    }
    return (
        <Navigate to={"/login"}></Navigate>
    );
}
export default PrivateRoute;