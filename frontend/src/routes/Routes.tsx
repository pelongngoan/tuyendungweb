import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../views/Home";
import Register from "../views/Register/Register";
import Login from "../views/Login/Login";
import { About } from "../views/About/About";
import { Account } from "../views/Account/Account";
import { UserProvider } from "../context/useAuth"; // Import UserProvider
import { Category } from "../views/Category/Category";
import { Company } from "../views/Company";
import { Blog } from "../views/Blog";
import Job from "../views/Job";

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
          // <GuestRoute>
          <Login />
          // </GuestRoute>
        ),
      },
      {
        path: "register",
        element: (
          // <GuestRoute>
          <Register />
          // </GuestRoute>
        ),
      },
      {
        path: "account",
        element: (
          <ProtectedRoute>
            <Account />
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
