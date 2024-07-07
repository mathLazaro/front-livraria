import React from "react";
import { Link } from "react-router-dom";
import "../../../styles/UserPage.css";

export default function UserPage() {
    return (
        <div className="container">
            <div className="sidebar">
                <h3>Bem vindo [nome]!</h3>
                <p>Nesta tela poderá visualizar sua coleção.</p>

                <Link className="link" to="/settings">
                    Ver Perfil
                </Link>
            </div>
            <div className="content">
                <h1>Coleção</h1>
                <p>
                    [COLEÇÃO]
                </p>
            </div>
        </div>
    );
}
