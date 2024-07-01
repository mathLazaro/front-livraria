import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import "./styles/index.css";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import LoginPage from "./components/LoginPage.jsx";

function Error404() {
    return (
        <h2>
            Isso é embaraçoso não? Esta página não existe, volte para a{" "}
            <Link to={"/"}>página principal</Link>
        </h2>
    );
}

const routes = createBrowserRouter([
    {
        path: "/",
        errorElement: <Error404 />,
        element: <LoginPage />,
    },
    {
        path:"/app",
        element: <App/>
    }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={routes} />
);
