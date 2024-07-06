import React, { useState } from "react";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { BACK_URL } from "../../services/serverConection";
import { isAuthenticated, setAuth } from "../../services/auth";

// formuláro de submissão
const schema = yup
    .object({
        email: yup.string().email("Email inválido").required("Email obrigatório"),
        senha: yup.string().min(4, "Senha com no mínimo 4 caracteres").required(),
    })
    .required();

export default function LoginForm({ switchState, loginCallback }) {
    // funções e propriedades do yup
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    // observer de erro
    const [errorMsg, setErrorMsg] = useState("");

    // lida com a ação de login
    const handleLogin = async (data) => {
        try {
            const response = await axios.post(`${BACK_URL}/usuarios/login`, data);

            // armazena o token e id do usuário
            setAuth(response.data.data.id, response.data.token);

            // console.log(sessionStorage);

            setErrorMsg("");

            // seta a variavel observada para redirecionamento de página
            loginCallback(isAuthenticated());
        } catch (error) {
            setErrorMsg(error.response.data.msg);
        }
    };

    return (
        <>
            <div className="divForms">
                <h2>Login</h2>
                <div className="login">
                    <form className="form-div-login" onSubmit={handleSubmit(handleLogin)}>
                        <div className="inputDiv">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                className="inputField"
                                id="email"
                                name="email"
                                {...register("email")}
                            />
                            <p className="error">{errors.email?.message}</p>
                        </div>
                        <div className="inputDiv">
                            <label htmlFor="senha">Senha</label>
                            <input
                                type="password"
                                className="inputField"
                                id="senha"
                                name="senha"
                                {...register("senha")}
                            />
                            <p className="error">{errors.senha?.message}</p>
                        </div>
                        <div hidden>Mensagem de erro</div>
                        <button type="submit">Entrar</button>
                    </form>
                </div>
            </div>
            <div className="error-div">
                <p className="error">{errorMsg}</p>
            </div>
            <div className="change-state-login">
                <p>Não possui conta?</p>
                <button
                    className="change-state-button"
                    onClick={() => {
                        switchState("cadastro");
                    }}
                >
                    Cadastrar
                </button>
            </div>
        </>
    );
}
