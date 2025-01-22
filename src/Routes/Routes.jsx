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

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
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
                        path: "myApplications/:email",
                        element: <MyApplications></MyApplications>,
                    },
                    {
                        path: "addScholarship",
                        element: <AddScholarship></AddScholarship>,
                    },
                    {
                        path: "manageUsers",
                        element: <ManageUsers></ManageUsers>,
                    },
                ]
            },
        ]
    },
]);