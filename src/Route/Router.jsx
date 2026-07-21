import { createBrowserRouter } from "react-router";
import Root from "../LayOut/Root";
import Home from "../Pagas/Home";
import AuthLayout from "../LayOut/AuthLayOut";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import ForgotPassword from "../Auth/ForgotPassword";
import AddJob from "../Pagas/AddJob";
import MyApplications from "../Pagas/MyApplications";
import UserProfile from "../Auth/UserProfile";
import Dashboard from "../Pagas/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/addJob",
        element: <AddJob></AddJob>
      },
      {
        path: "/myApplications",
        element: <MyApplications></MyApplications>
      },
      {
        path: "/profile",
        element: <UserProfile></UserProfile>
      },
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword></ForgotPassword>,
      },
    ],
  },
]);
