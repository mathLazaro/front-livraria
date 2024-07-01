import React, { useState } from "react";
import InputMask from "react-input-mask";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { BACK_URL } from "../services/serverConection";
import { isAuthenticated } from "../services/auth";

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
        senhaConfirma: yup
            .string()
            .required("Confirme a senha")
            .oneOf([yup.ref("senha")], "As senhas devem coincidir!"),
        nome: yup.string().min(1, "É obrigatório inserir o nome").required(),
        telefone: yup.string().min(11, "Insira um número completo").required(),
    })
    .required();

export default function CadastroForm({ switchState }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [errorMsg, setErrorMsg] = useState("");

    const submit = async (data) => {
        data["role"] = true;
        try {
            const response = await axios.post(`${BACK_URL}/usuarios/`, data);

            if (response.status === 200) {
                switchState("login");
            }
        } catch (error) {
            setErrorMsg(error.response.data.msg);
        }
    };

    return (
        <>
            <div className="divForms">
                <h2>Cadastro</h2>
                <form onSubmit={handleSubmit(submit)}>
                    <div className="row-div">
                        <div className="column-div">
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
                            <div className="inputDiv">
                                <label htmlFor="senha-confirma">
                                    Confirme a senha
                                </label>
                                <input
                                    type="password"
                                    className="inputField"
                                    id="senha-confirma"
                                    name="senha-confirma"
                                    {...register("senhaConfirma")}
                                />
                                <p className="error">
                                    {errors.senhaConfirma?.message}
                                </p>
                            </div>
                        </div>
                        <div className="column-div">
                            <div className="inputDiv">
                                <label htmlFor="nome">Nome</label>
                                <input
                                    type="text"
                                    className="inputField"
                                    id="nome"
                                    name="nome"
                                    {...register("nome")}
                                />
                                <p className="error">{errors.nome?.message}</p>
                            </div>
                            <div className="inputDiv">
                                <label htmlFor="telefone">Telefone</label>
                                <InputMask
                                    className="inputDiv"
                                    id="telefone"
                                    name="telefone"
                                    mask="(99) 99999 - 9999"
                                    maskChar=" "
                                    {...register("telefone")}
                                />
                                <p className="error">
                                    {errors.telefone?.message}
                                </p>
                            </div>
                        </div>
                    </div>
                    <button type="submit">Cadastrar</button>
                </form>
            </div>
            <div className="error-div">
                <p className="error">{errorMsg}</p>
            </div>
            <div className="change-state-login">
                <p>Já possui conta?</p>
                <button
                    className="change-state-button"
                    onClick={() => {
                        switchState("login");
                    }}
                >
                    Login
                </button>
            </div>
        </>
    );
}
