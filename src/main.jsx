import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import LoginPage from "./components/auth/LoginPage.jsx";
import PrivateRoute from "./components/private/PrivateRoute.jsx";
import {Error404} from "./components/error/ErrorPages.jsx";

const routes = createBrowserRouter([
    {
        path: "/",
        errorElement: <Error404 />,
        element: <LoginPage />,
    },
    {
        path: "/app",
        element: <PrivateRoute />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(<RouterProvider router={routes} />);
