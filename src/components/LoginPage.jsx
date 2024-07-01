import "../styles/LoginPage.css";
import LoginForm from "./LoginForm";
import background from "../assets/bookstore-background.jpg";
import CadastroForm from "./CadForm";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../services/auth";

export default function LoginPage() {
    const [component, setComponent] = useState("login");
    const [auth, setAuth] = useState(isAuthenticated());

    return auth ? (
        <Navigate to={"/app"} />
    ) : (
        <>
            <img src={background} alt="background image" />
            <div className="background-auth">
                <h1>Livraria</h1>
                {component === "login" ? (
                    <LoginForm
                        switchState={setComponent}
                        navigate={setAuth}
                    />
                ) : (
                    <CadastroForm switchState={setComponent} />
                )}
            </div>
        </>
    );
}
