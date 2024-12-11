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
import JobApplicationForm from "../views/Job/JobApplicationForm";
import Internship from "../views/Internship/Internship";
import InternshipApplicationForm from "../views/Internship/InternshipApplicationForm";
import InternshipDetail from "../views/Internship/InternshipDetail";
import AdminRoute from "./AdminRoute";
import ChatBox from "../views/ChatBox/ChatBox";
import ViewApply from "../views/ViewApply/ViewApply";

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
        path: "job/:major/:mayjor",
        element: (
          <ProtectedRoute>
            <Job />
          </ProtectedRoute>
        ),
      },
      {
        path: "job/:major",
        element: (
          <ProtectedRoute>
            <Job />
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
      },
      {
        path: "/jobDetail/:id",
        element: (
          <ProtectedRoute>
            <JobDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "/internshipDetail/:id",
        element: (
          <ProtectedRoute>
            <InternshipDetail />
          </ProtectedRoute>
        ),
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
        path: "chatBox",
        element: (
          <ProtectedRoute>
            <ChatBox />
          </ProtectedRoute>
        ),
      },
      {
        path: "internship",
        element: (
          <ProtectedRoute>
            <Internship />
          </ProtectedRoute>
        ),
      },
      {
        path: "internshipCreate",
        element: (
          <ProtectedRoute>
            <InternshipApplicationForm />
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
        path: "createJob",
        element: (
          <AdminRoute>
            <JobApplicationForm />
          </AdminRoute>
        ),
      },
      {
        path: "job/editJob/:id",
        element: (
          <AdminRoute>
            <JobApplicationForm />
          </AdminRoute>
        ),
      },
      {
        path: "internship/editInternship/:id",
        element: (
          <AdminRoute>
            <InternshipApplicationForm />
          </AdminRoute>
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
        path: "viewApply",
        element: (
          <ProtectedRoute>
            <ViewApply />
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
