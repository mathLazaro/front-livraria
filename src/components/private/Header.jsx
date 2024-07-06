import React from "react";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../services/auth";
import "../../styles/Header.css";

export default function Header() {
    const redirect = useNavigate();

    const handleLogOut = () => {
        logOut();
        redirect("/");
    };

    return (
        <header>
            <h1>LIVRARIA</h1>
            <button onClick={handleLogOut}>LogOut</button>
        </header>
    );
}
