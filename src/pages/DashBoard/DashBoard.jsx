import { FaHome, FaListAlt, FaShoppingCart, FaUser, FaUsers } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { ImAddressBook } from "react-icons/im";
import { MdOutlineLocalLibrary } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import { MdManageHistory } from "react-icons/md";
import useAdmin from "../../Hooks/useAdmin";


const DashBoard = () => {
    //TODO: get isAdmin value from the database
    const [isAdmin] = useAdmin();
    return (
        <div className='flex'>
            {/* dashboard side bar */}
            <div className='w-64 min-h-screen bg-teal-300'>
                <ul className='menu'>
                    {
                        isAdmin ?
                            <>
                                <li><NavLink to="/"><GrUserAdmin />Admin Profile</NavLink></li>
                                <li><NavLink to="/"><ImAddressBook /> Add Scholarship</NavLink></li>
                                <li><NavLink to="/"><MdManageHistory />
                                Manage Scholarship</NavLink></li>
                                <li><NavLink to="/"><FaListAlt></FaListAlt> Manage Applied Application</NavLink></li>
                                <li><NavLink to="/dashboard/manageUsers"><FaUsers></FaUsers>
                                Manage Users</NavLink></li>
                                <li><NavLink to="/"><img src="https://img.icons8.com/?size=20&id=w6FsxWMQQk0R&format=png" alt="Review!" />Manage Review</NavLink></li>
                            </>
                            : <>
                                <li><NavLink to="/"><FaUser></FaUser>User Profile</NavLink></li>
                                <li><NavLink to="/"><img src="https://img.icons8.com/?size=20&id=w6FsxWMQQk0R&format=png" alt="Review!" />My Reviews</NavLink></li>
                                <li><NavLink to="/"><FaShoppingCart></FaShoppingCart>My Application</NavLink></li>
                            </>
                    }
                    {/* shared nav links */}
                    <div className='divider'></div>
                    <li><NavLink to="/"><FaHome></FaHome>Home</NavLink></li>
                    <li><NavLink to="/allScholarship"><MdOutlineLocalLibrary />All Scholarship</NavLink></li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className='flex-1 p-8'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashBoard;