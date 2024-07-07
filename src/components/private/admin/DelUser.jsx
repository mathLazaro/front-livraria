import React from "react";
import { useState } from "react";

export default function DelUser() {
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e) => {};

    const handleChange = (e) => {};

    return (
        <>
            <form className="form-adm" onSubmit={handleSubmit}>
                <h3>Deletar usuário</h3>
                <div className="input-item">
                    <label htmlFor="id">Id do usuário</label>
                    <input id="titulo" name="titulo" type="text" onChange={handleChange} />
                </div>
                <p className="error">{errorMsg}</p>
                <button type="submit">Criar Livro</button>
            </form>
        </>
    );
}
