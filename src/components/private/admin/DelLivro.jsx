import React from "react";
import { useState } from "react";
import axios from "axios";
import { BACK_URL } from "../../../services/serverConection";
import { getAuth } from "../../../services/auth";



export default function DelLivro() {
    const [errorMsg, setErrorMsg] = useState("");
    const [idLivro, setIdLivro] = useState("");

    const config = {
        headers: {
            Authorization: "Bearer " + getAuth()
        }
      }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = `${BACK_URL}/livros/${idLivro}`
        try {
            const res = await axios.delete(url, config)
            setErrorMsg(res.data.msg);
        }
        catch(error) {
            setErrorMsg(error.response.data.msg);
        }
    };

    return (
        <>
            <form className="form-adm" onSubmit={handleSubmit}>
                <h3>Remover livro</h3>
                <div className="input-item">
                    <label htmlFor="livroId">Id do livro</label>
                    <input
                        id="livroId"
                        name="livroId"
                        type="text"
                        onChange={(e) => {
                            setErrorMsg("");
                            setIdLivro(e.target.value);
                        }}
                    />
                </div>
                <p className="error">{errorMsg}</p>
                <button type="submit">Deletar</button>
            </form>
        </>
    );
}
