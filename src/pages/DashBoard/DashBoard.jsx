import { FaListAlt, FaShoppingCart, FaUser, FaUserCog, FaUsers } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { ImAddressBook } from "react-icons/im";
import { NavLink, Outlet } from "react-router-dom";
import { MdManageHistory } from "react-icons/md";
import useAdmin from "../../Hooks/useAdmin";
import useModerator from "../../Hooks/useModerator";
import useAuth from "../../Hooks/useAuth";


const DashBoard = () => {
    //TODO: get isAdmin value from the database
    const { user } = useAuth();
    const email = user.email;
    const [isAdmin] = useAdmin();
    const [isModerator] = useModerator();
    // Render admin-specific menu items
    const renderAdminMenu = () => (
        <>
            <li>
                <NavLink to="/dashboard/adminProfile">
                    <GrUserAdmin /> Admin Profile
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/addScholarship">
                    <ImAddressBook /> Add Scholarship
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/manageScholarship">
                    <MdManageHistory /> Manage Scholarship
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
                <NavLink to="/dashboard/moderatorProfile">
                    <FaUserCog /> Moderator Profile
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/addScholarship">
                    <ImAddressBook /> Add Scholarship
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/manageScholarship">
                    <MdManageHistory /> Manage Scholarship
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


    return (
        <div className='flex'>
            {/* dashboard side bar */}
            <div className='w-[180px] lg:w-64 min-h-screen bg-teal-300'>
                <ul className="menu space-y-2">
                    {isAdmin && renderAdminMenu()}
                    {!isAdmin && isModerator && renderModeratorMenu()}
                    {!isAdmin && !isModerator && user && renderUserMenu()}
                </ul>
            </div>
            {/* dashboard content */}
            <div className='flex-1 p-1 px-1 py-2'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashBoard;