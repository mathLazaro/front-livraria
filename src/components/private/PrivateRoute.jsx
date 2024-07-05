import React from "react";
import { isAuthenticated, getUserRole } from "../../services/auth";
import AdmPage from "./admin/AdmPage";
import UserPage from "./user/UserPage";
import { Error401, Error403 } from "../error/ErrorPages";

// para o projeto apenas o usuário com id === 1 será considerado como administrador
export default function PrivateRoute({ adminLevel }) {
    if (isAuthenticated()) {
        // console.log(getUserRole());
        const idStoraged = getUserRole();

        if (adminLevel && idStoraged !== "1") {
            // cliente tenta acessar a pagina adm (forbidden)
            return Error403();
        }
        if (adminLevel && idStoraged === "1") {
            // admin acessa pagina
            return <AdmPage />;
        }
        else {
            // admin ou user acessam a pagina de usuario
            return <UserPage />;
        }
    } else {
        return Error401();
    }
}
