import React from "react";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

const schema = yup
    .object({
        email: yup
            .string()
            .email("Email inválido")
            .required("Email obrigatório"),
        senha: yup
            .string()
            .min(4, "Senha com no mínimo 4 caracteres")
            .required(),
    })
    .required();

export default function LoginForm({ switchState }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const submit = async (data) => {
        console.log(data);
        try {
            const response = await axios.post(
                "http://localhost:8080/usuarios/login",
                data
            );
            // sessionStorage.setItem("auth", response.data);
            console.log(response);
        } catch (error) {
            console.log(error);
            console.log("erro");
        }
    };

    return (
        <>
            <div className="divForms">
                <h2>Login</h2>
                <div className="login">
                    <form onSubmit={handleSubmit(submit)}>
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
