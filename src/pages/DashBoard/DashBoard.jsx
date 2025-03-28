import { FaListAlt, FaShoppingCart, FaUser, FaUserCog, FaUsers } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { ImAddressBook } from "react-icons/im";
import { NavLink, Outlet } from "react-router-dom";
import { MdManageHistory } from "react-icons/md";
import useAdmin from "../../Hooks/useAdmin";
import useModerator from "../../Hooks/useModerator";
import useAuth from "../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";


const DashBoard = () => {

    //TODO: get isAdmin value from the database
    const { user, loading } = useAuth();
    const email = user.email;
    const [isAdmin, isAdminLoading] = useAdmin();
    const [isModerator, isModeratorLoading] = useModerator();


    // Render admin-specific menu items
    const renderAdminMenu = () => (
        <>
            <li>
                <NavLink to="/dashboard/userProfile">
                    <GrUserAdmin /> Admin Profile
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/addScholarship">
                    <ImAddressBook /> Add Scholarship
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/manageScholarships">
                    <MdManageHistory /> Manage Scholarships
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/manageApplications">
                    <FaListAlt /> Manage Applied Applications
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/manageUsers">
                    <FaUsers /> Manage Users
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/manageReviews">
                    <img
                        src="https://img.icons8.com/?size=20&id=w6FsxWMQQk0R&format=png"
                        alt="Review!"
                    />
                    Manage Reviews
                </NavLink>
            </li>
        </>
    );

    // Render moderator-specific menu items
    const renderModeratorMenu = () => (
        <>
            <li>
                <NavLink to="/dashboard/userProfile">
                    <FaUserCog /> Moderator Profile
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/addScholarship">
                    <ImAddressBook /> Add Scholarship
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/manageScholarships">
                    <MdManageHistory /> Manage Scholarships
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/manageApplications">
                    <FaListAlt /> Manage Applied Applications
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/manageReviews">
                    <img
                        src="https://img.icons8.com/?size=20&id=w6FsxWMQQk0R&format=png"
                        alt="Review!"
                    />
                    Manage Reviews
                </NavLink>
            </li>
        </>
    );

    // Render user-specific menu items
    const renderUserMenu = () => (
        <>
            <li>
                <NavLink to="/dashboard/userProfile">
                    <FaUser /> User Profile
                </NavLink>
            </li>
            <li>
                <NavLink to={`/dashboard/MyReviews/${email}`}>
                    <img
                        src="https://img.icons8.com/?size=20&id=w6FsxWMQQk0R&format=png"
                        alt="Review!"
                    />
                    My Reviews
                </NavLink>
            </li>
            <li>
                <NavLink to={`/dashboard/myApplications/${email}`}>
                    <FaShoppingCart /> My Applications
                </NavLink>
            </li>
        </>
    );

    if (loading || isAdminLoading || isModeratorLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <p className="text-sky-600 font-bold text-xl">Loading Dashboard...</p>
                    <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-sky-500"></div>
                </div>
            </div>
        );
    }

    return (
        <div className='flex'>
            <Helmet>
                <title>ScholarBridge | Dashboard</title>
            </Helmet>
           
                 {/* dashboard side bar */}
            <div className='w-[180px] lg:w-64 min-h-screen bg-sky-300'>
            <ul className="menu space-y-2">
                {isAdmin && renderAdminMenu()}
                {!isAdmin && isModerator && renderModeratorMenu()}
                {!isAdmin && !isModerator && user && renderUserMenu()}
            </ul>
        </div>
        {/* dashboard content */}
        <div className='flex-1 px-3 py-2'>
            <h2 className="mt-6  w-11/12 mx-auto font-bold text-xl lg:text-4xl text-gray-100">Dashboard</h2>
            <p className="text-sky-100 w-11/12 mx-auto font-bold">Take a look at the sidebar to simplify your experience!</p>
            <Outlet></Outlet>
        </div>
        </div>
    );
};

export default DashBoard;