import "../styles/LoginPage.css";
import LoginForm from "./LoginForm";
import background from "../assets/bookstore-background.jpg";
import CadastroForm from "./CadForm";
import React, { useState } from "react";

export default function LoginPage() {
    const [component, setComponent] = useState("login");

    const updateComponent = (c) => {
        setComponent(c);
    };

    return (
        <>
            <img src={background} alt="background image" />
            <div className="background-auth">
                <h1>Livraria</h1>
                {component === "login" ? (
                    <LoginForm switchState={updateComponent} />
                ) : (
                    <CadastroForm switchState={updateComponent} />
                )}
            </div>
        </>
    );
}
