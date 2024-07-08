import React, { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import { useForm } from "react-hook-form";
import { getUserRole, getAuth } from "../../../services/auth";
import { BACK_URL } from "../../../services/serverConection";
import "../../../styles/UserPage.css";

export default function Perfil({ user, setUser, handleViewChange }) {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
  };

  return (
    <div className="edit-profile-section">
      <h1>Editar Perfil</h1>
      <form className="edit-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            defaultValue={user.perfil.nome}
            {...register("nome", { required: true })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={user.email}
            {...register("email", { required: true })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="telefone">Telefone:</label>
          <InputMask
            className="input-mask"
            mask="(99) 99999 - 9999"
            maskChar=" "
            defaultValue={user.perfil.telefone}
            {...register("telefone", { required: true })}
          />
        </div>
        <button type="submit" className="submit-button">
          Salvar
        </button>
      </form>
    </div>
  );
}
