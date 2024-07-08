import axios from "axios";
import React from "react";
import { useState } from "react";
import { getAuth } from "../../../services/auth";
import { BACK_URL } from "../../../services/serverConection";

export default function DelUser() {
    const [errorMsg, setErrorMsg] = useState("");
    const [idUser, setIdUser] = useState("")

    const config = {
        headers: {
            Authorization: "Bearer " + getAuth()
        }
      }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const url = `${BACK_URL}/usuarios/${idUser}`
        try{
            const res = await axios.delete(url, config)
            setErrorMsg(res.data.msg)
        }
        catch(error){
            setErrorMsg(error.response.data.msg)
        }
    };

    const handleChange = (e) => {
        setErrorMsg("")
        setIdUser(e.target.value)
    };

    return (
        <>
            <form className="form-adm" onSubmit={handleSubmit}>
                <h3>Deletar usuário</h3>
                <div className="input-item">
                    <label htmlFor="idUser">Id do usuário</label>
                    <input id="idUser" name="idUser" type="text" onChange={handleChange} />
                </div>
                <p className="error">{errorMsg}</p>
                <button type="submit">Deletar</button>
            </form>
        </>
    );
}
