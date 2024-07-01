import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import "./styles/index.css";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import LoginPage from "./components/LoginPage.jsx";

function Error404() {
    return (
        <div className="errorPage">
            <h2>
                Isso é embaraçoso não? Esta página não existe, volte para a{" "}
                <Link to={"/"}>página principal</Link>
            </h2>
        </div>
    );
}

function Error401() {
    return (
        <div className="errorPage">
            <h2>
                A página que você está tentando acessar requer{" "}
                <Link to={"/"}>login</Link>
            </h2>
        </div>
    );
}

const routes = createBrowserRouter([
    {
        path: "/",
        errorElement: <Error404 />,
        element: <LoginPage />,
    },
    {
        path: "/app",
        errorElement: <Error401 />,
        element: <App />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={routes} />
);
