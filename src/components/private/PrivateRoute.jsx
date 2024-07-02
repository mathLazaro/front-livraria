import React from "react";
import { isAuthenticated, getUserRole } from "../../services/auth";
import AdmPage from "./admin/AdmPage";
import UserPage from "./user/UserPage";
import { Error401 } from "../error/ErrorPages";

export default function PrivateRoute() {
    // para o projeto apenas o usuário com id === 1 será considerado como administrador
    if (isAuthenticated()) {
        console.log(getUserRole());
        if (getUserRole() === "1") {
            // retorna a pagina de usuário administrador
            return <AdmPage />;
        } else {
            // retorna a pagina de usuário comum
            return <UserPage />;
        }
    } else {
        return Error401();
    }
}
