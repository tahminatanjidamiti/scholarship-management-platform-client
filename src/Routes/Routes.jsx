import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import AllScholarship from "../pages/AllScholarship/AllScholarship";
import DashBoard from "../pages/DashBoard/DashBoard";
import ManageUsers from "../pages/DashBoard/ManageUsers";
import PrivateRoute from "./PrivateRoute";
import AddScholarship from "../pages/DashBoard/PrivateDashboard/AddScholarship";
import ScholarshipDetails from "../pages/ScholarshipDetails/ScholarshipDetails";
import Payment from "../pages/Payment/Payment";
import MyApplications from "../pages/DashBoard/UserDashboard/MyApplications";
import MyReviews from "../pages/DashBoard/UserDashboard/MyReviews";
import ManageScholarships from "../pages/DashBoard/PrivateDashboard/ManageScholarships";
import ManageApplications from "../pages/DashBoard/PrivateDashboard/ManageApplications";
import AdminRoute from "./AdminRoute";
import ManageReviews from "../pages/DashBoard/PrivateDashboard/ManageReviews";
import UserProfile from "../pages/DashBoard/UserProfile";
import ErrorPage from "../pages/ErrorPage";
import RoleRoute from "./RoleRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "login",
                element: <Login></Login>,
            },
            {
                path: "registration",
                element: <Registration></Registration>,
            },
            {
                path: "scholarshipDetails/:id",
                element: <PrivateRoute><ScholarshipDetails></ScholarshipDetails></PrivateRoute>,
            },
            {
                path: "allScholarship",
                element: <AllScholarship></AllScholarship>,
            },
            {
                path: "payment/:id",
                element: <PrivateRoute><Payment></Payment></PrivateRoute>,
            },
            {
                path: "dashboard",
                element: <PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
                children: [
                    {
                        path: "userProfile",
                        element: <PrivateRoute><UserProfile></UserProfile></PrivateRoute>,
                    },
                    {
                        path: "MyReviews/:email",
                        element: <PrivateRoute><MyReviews></MyReviews></PrivateRoute>,
                    },
                    {
                        path: "myApplications/:email",
                        element: <PrivateRoute><MyApplications></MyApplications></PrivateRoute>,
                    },
                    {
                        path: "addScholarship",
                        element: <PrivateRoute><RoleRoute><AddScholarship></AddScholarship></RoleRoute></PrivateRoute>,
                    },
                    {
                        path: "manageScholarships",
                        element: <PrivateRoute><RoleRoute><ManageScholarships></ManageScholarships></RoleRoute></PrivateRoute>,
                    },
                    {
                        path: "manageApplications",
                        element: <PrivateRoute><RoleRoute><ManageApplications></ManageApplications></RoleRoute></PrivateRoute>,
                    },
                    {
                        path: "manageReviews",
                        element: <PrivateRoute><RoleRoute><ManageReviews></ManageReviews></RoleRoute></PrivateRoute>,
                    },
                    {
                        path: "manageUsers",
                        element: <PrivateRoute><AdminRoute><ManageUsers></ManageUsers></AdminRoute></PrivateRoute>,
                    },
                ]
            },
        ]
    },
]);