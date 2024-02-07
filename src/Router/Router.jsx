import { createBrowserRouter } from "react-router-dom";
import AuthLayouts from "../Layout/AuthLayout";
import Home from "../Pages/Dashboard/Home/Home";
import Login from "../Pages/Auth/Login/Login";
import Signup from "../Pages/Auth/Signup/Signup";
import DashboardLayout from "../Layout/DashboardLayout";
import PrivetRouter from "./PrivetRouter";
import Task from "../Pages/Dashboard/Task/Task/Task";
import Users from "../Pages/Dashboard/Users/Users";
import UserDetails from "../Components/UserComponents/UserDetails/UserDetails";
import Team from "../Pages/Dashboard/Team/Team/Team";
import TeamDetails from "../Components/TeamComponents/TeamDetails/TeamDetails";
import TaskDetails from "../Components/TaskComponents/TaskDetails/TaskDetails";
import MainHomePage from "../Pages/MainHomePage/MainHomePage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayouts />,
    children: [
      {
        path: "/",
        element: <MainHomePage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: (
          <PrivetRouter>
            <Home />
          </PrivetRouter>
        ),
      },
      {
        path: "/dashboard/task",
        element: (
          <PrivetRouter>
            <Task />
          </PrivetRouter>
        ),
      },
      {
        path: "/dashboard/task/:taskId",
        element: (
          <PrivetRouter>
            <TaskDetails />
          </PrivetRouter>
        ),
      },
      {
        path: "/dashboard/team",
        element: (
          <PrivetRouter>
            <Team />
          </PrivetRouter>
        ),
      },
      {
        path: "/dashboard/team/:teamId",
        element: (
          <PrivetRouter>
            <TeamDetails />
          </PrivetRouter>
        ),
      },
      {
        path: "/dashboard/users",
        element: (
          <PrivetRouter>
            <Users />
          </PrivetRouter>
        ),
      },
      {
        path: "/dashboard/user/:userId",
        element: (
          <PrivetRouter>
            <UserDetails />
          </PrivetRouter>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <h1>Notfound</h1>,
  },
]);

export default routes;
