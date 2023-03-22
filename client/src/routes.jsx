import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Layout from "./components/Layout/Layout";
import AdminRoute from "./components/Routes/AdminRoute";
import PrivateRoute from "./components/Routes/PrivateRoute";
import About from "./pages/About";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Contact from "./pages/Contact";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import Policy from "./pages/Policy";
import Dashboard from "./pages/User/Dashboard";
import Orders from "./pages/User/Orders";
import Profile from "./pages/User/Profile";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Homepage />,
          },
          {
            path: "/contact",
            element: <Contact />,
          },
          {
            path: "/about",
            element: <About />,
          },
          {
            path: "/policy",
            element: <Policy />,
          },
          {
            path: "/dashboard",
            element: <PrivateRoute />,
            children: [
              {
                path: "user",
                element: <Dashboard />,
              },
              {
                path: "user/profile",
                element: <Profile />,
              },
              {
                path: "user/orders",
                element: <Orders />,
              },
            ],
          },
          {
            path: "/dashboard",
            element: <AdminRoute />,
            children: [
              {
                path: "admin",
                element: <AdminDashboard />,
              },
              {
                path: "admin/create-category",
                element: <CreateCategory />,
              },
              {
                path: "admin/create-product",
                element: <CreateProduct />,
              },
              {
                path: "admin/users",
                element: <Users />,
              },
            ],
          },
          {
            path: "/register",
            element: <Register />,
          },
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/forgot-password",
            element: <ForgotPassword />,
          },
          {
            path: "/*",
            element: <PageNotFound />,
          },
        ],
      },
    ],
  },
]);
