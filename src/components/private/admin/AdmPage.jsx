import React, { useState } from "react";

import "../../../styles/App.css";
import "../../../styles/AdmPage.css"

import Header from "../Header";
import AddLivro from "./AddLivro";
import DelLivro from "./DelLivro";
import DelUser from "./DelUser";

export default function AdmPage() {
    const [component, setComponent] = useState("ADD_LIVRO");

    return (
        <>
            <Header />
            <h2>Funções de administrador</h2>
            <div className="column-div">
                <div className="row-div">
                    <button
                        onClick={() => {
                            setComponent("ADD_LIVRO");
                        }}
                    >
                        Adicionar estoque
                    </button>
                    <button
                        onClick={() => {
                            setComponent("DEL_LIVRO");
                        }}
                    >
                        Remover estoque
                    </button>
                    <button
                        onClick={() => {
                            setComponent("DEL_USER");
                        }}
                    >
                        Deletar usuário
                    </button>
                </div>
                <div className="function">
                    {component === "ADD_LIVRO" ? (
                        <AddLivro />
                    ) : component === "DEL_LIVRO" ? (
                        <DelLivro />
                    ) : (
                        <DelUser />
                    )}
                </div>
            </div>
        </>
    );
}
