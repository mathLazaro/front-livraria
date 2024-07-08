import React, { useState } from "react";
import axios from "axios";
import { BACK_URL } from "../../../services/serverConection";
import { getAuth } from "../../../services/auth";

export default function AddLivro() {
    const [errorMsg, setErrorMsg] = useState("");
    const [filePath, setFilePath] = useState("");

    const [propriedade, setPropriedade] = useState({
        titulo: "",
        autor: "",
        estoque: 1,
        valor: 0,
    });

    const handleChange = (e) => {
        const novoValor = {
            [e.target.name]: e.target.value,
        };

        setPropriedade({ ...propriedade, ...novoValor });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = getAuth();
        const url = `${BACK_URL}/livros/`;
        const formData = new FormData();

        formData.append("capa", filePath);
        formData.append("titulo", propriedade.titulo);
        formData.append("autor", propriedade.autor);
        formData.append("estoque", propriedade.estoque);
        formData.append("valor", propriedade.valor);

        try {
            const res = await axios.post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.log(error);
        }

        setErrorMsg(res.data.msg);
    };

    return (
        <>
            <form className="form-adm" onSubmit={handleSubmit}>
                <h3>Adicionar livro</h3>
                <div className="input-item">
                    <label htmlFor="titulo">Título</label>
                    <input id="titulo" name="titulo" type="text" onChange={handleChange} />
                </div>
                <div className="input-item">
                    <label htmlFor="autor">Autor</label>
                    <input id="autor" name="autor" type="text" onChange={handleChange} />
                </div>
                <div className="input-item">
                    <label htmlFor="estoque">Estoque</label>
                    <input id="estoque" name="estoque" type="number" onChange={handleChange} />
                </div>
                <div className="input-item">
                    <label htmlFor="valor">Valor</label>
                    <input id="valor" name="valor" type="number" onChange={handleChange} />
                </div>
                <div className="input-item">
                    <label htmlFor="capa">Capa</label>
                    <input
                        id="capa"
                        name="capa"
                        type="file"
                        onChange={(e) => {
                            setFilePath(e.target.files[0]);
                        }}
                    />
                </div>
                <p className="error">{errorMsg}</p>
                <button type="submit">Criar Livro</button>
            </form>
        </>
    );
}
