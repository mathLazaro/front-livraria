import React, { useState } from "react";
import InputMask from "react-input-mask";
import { useForm } from "react-hook-form";
import { getUserRole, getAuth } from "../../../services/auth";
import { BACK_URL } from "../../../services/serverConection";
import "../../../styles/UserPage.css";

export default function Perfil({ user, setUser, handleViewChange }) {
  const { register, handleSubmit } = useForm();
  const [isEditing, setIsEditing] = useState(false);

  const onSubmit = async (data) => {
    const userId = getUserRole();
    const token = getAuth();

    try {

      /* PUT Request para atualizar os dados do usuário */

    } catch (error) {
      console.error("Erro ao atualizar usuário:", error.message);
    }
  };

  return (
    <div className="profile-section">
      {isEditing ? (
        <div className="edit-profile-section">
          <h2>Editar Perfil</h2>
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
      ) : (
        <div className="profile-section">
          <h2>Dados do Usuário</h2>
          <div className="data-field">
            <p><strong>Nome:</strong> {user.perfil.nome}</p>
          </div>
          <div className="data-field">
            <p><strong>Email:</strong> {user.email}</p>
          </div>
          <div className="data-field">
            <p><strong>Telefone:</strong> {user.perfil.telefone}</p>
          </div>
          <button onClick={() => setIsEditing(true)}>Editar Perfil</button>
        </div>
      )}
    </div>
  );
}
