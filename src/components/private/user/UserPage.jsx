import React, { useState, useEffect } from "react";
import { BACK_URL } from "../../../services/serverConection";
import axios from "axios";
import "../../../styles/App.css";

export default function UserPage() {
    const [livros, setLivros] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        getLivros();
    }, []);

    const getLivros = async (data = {}) => {
        try {
            const response = await axios.get(`${BACK_URL}/livros/`, { params: { titulo: data.titulo, autor: data.autor } });
            console.log("API response:", response.data);
            setLivros(Array.isArray(response.data.data) ? response.data.data : []);
            setErrorMsg("");
        } catch (error) {
            console.error("Error fetching livros:", error);
            setErrorMsg(error.response?.data?.msg || "An error occurred");
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {
            titulo: formData.get("titulo"),
            autor: formData.get("autor"),
        };
        getLivros(data);
    };

    return (
        <div>
            <h1>USER PAGE</h1>
            <form className="buscaLivro" onSubmit={handleSubmit}>
                <div>
                    <input type="text" placeholder="Digite o titulo" id="titulo" name="titulo" />
                </div>
                <div>
                    <input type="text" placeholder="Digite o autor" id="autor" name="autor" />
                </div>
                <button>Buscar</button>
            </form>
            {errorMsg && <p className="error">{errorMsg}</p>}
            <ol className="listaLivros">
                {livros.map((livro) => (
                    <li key={livro.id} className="livro">
                        <picture><img src={livro.capa} alt="Capa do livro" /></picture>
                        <p>{livro.titulo}</p>
                        <p>{livro.autor}</p>
                        <p>Valor: R$ {livro.valor}</p>
                    </li>
                ))}
            </ol>
        </div>
    );
}
