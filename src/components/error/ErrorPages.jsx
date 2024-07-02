import React from "react";
import { Link } from "react-router-dom";

export function Error404() {
    return (
        <div className="errorPage">
            <h2>
                Isso é embaraçoso não? Esta página não existe, volte para a{" "}
                <Link to={"/"}>página principal</Link>
            </h2>
        </div>
    );
}

export function Error401() {
    return (
        <div className="errorPage">
            <h2>
                A página que você está tentando acessar requer <Link to={"/"}>login</Link>
            </h2>
        </div>
    );
}

export function Error403() {
    return (
        <div className="errorPage">
            <h2>
                A página que você está tentando acessar requer conta com nível administrador. <Link to={"/app/"}>Votar</Link>
            </h2>
        </div>
    );
}
