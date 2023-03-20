import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Layout from "./components/Layout/Layout";
import PrivateRoute from "./components/Routes/PrivateRoute";
import About from "./pages/About";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Contact from "./pages/Contact";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import Policy from "./pages/Policy";
import Dashboard from "./pages/User/Dashboard";

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
            element: <About title={"About Us"} />,
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
                index: true,
                element: <Dashboard />,
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
