import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../views/Home";
import Register from "../views/Register/Register";
import Login from "../views/Login/Login";
import { About } from "../views/About/About";
import { UserProvider } from "../context/useAuth";
import { Category } from "../views/Category/Category";
import { Company } from "../views/Company";
import { Blog } from "../views/Blog";
import Job from "../views/Job/Job";
import GuestRoute from "./GuestRoute";
import Dashboard from "../views/Dashboard/Dashboard";
import JobDetail from "../views/Job/JobDetail";
import { Profile } from "../views/Profile/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserProvider>
        <App />
      </UserProvider>
    ),
    children: [
      { path: "", element: <Home /> },
      {
        path: "login",
        element: (
          <GuestRoute>
            <Login />
          </GuestRoute>
        ),
      },
      {
        path: "register",
        element: (
          <GuestRoute>
            <Register />
          </GuestRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "job",
        element: (
          <ProtectedRoute>
            <Job />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "english",
            element: <Job />,
          },
          {
            path: "tradition",
            element: <Job />,
          },
          {
            path: "korean",
            element: <Job />,
          },
          {
            path: "japanese",
            element: <Job />,
          },
          {
            path: "russia",
            element: <Job />,
          },
          {
            path: "chinese",
            element: <Job />,
          },
          {
            path: "arap",
            element: <Job />,
          },
          {
            path: "economy",
            element: <Job />,
          },
          {
            path: "german",
            element: <Job />,
          },
          {
            path: "french",
            element: <Job />,
          },
        ],
      },
      {
        path: "/jobDetail",
        element: <JobDetail />,
      },
      {
        path: "company",
        element: (
          <ProtectedRoute>
            <Company />
          </ProtectedRoute>
        ),
      },
      {
        path: "blog",
        element: (
          <ProtectedRoute>
            <Blog />
          </ProtectedRoute>
        ),
      },
      {
        path: "about",
        element: (
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        ),
      },
      {
        path: "category",
        element: (
          <ProtectedRoute>
            <Category />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <div>Page Not Found</div>,
      },
    ],
  },
]);
