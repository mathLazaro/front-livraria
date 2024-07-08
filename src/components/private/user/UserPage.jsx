import React, { useEffect, useState } from "react";
import { getUserRole } from "../../../services/auth";
import Header from "../Header";
import Perfil from "./Perfil";
import { BACK_URL } from "../../../services/serverConection";
import "../../../styles/UserPage.css";

export default function UserPage() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("home");

  useEffect(() => {
    const fetchUser = async () => {
      const userId = getUserRole();
      const userResponse = await fetch(`${BACK_URL}/usuarios/${userId}`);
      const userData = await userResponse.json();
      setUser(userData.data);
    };

    fetchUser();
  }, []);

  const handleViewChange = (view) => {
    setView(view);
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="sidebar">
          {view === "home" ? (
            <>
              <h2>Bem vindo, {user?.perfil.nome}!</h2>
              <p>Nesta tela poderá visualizar sua coleção.</p>
              <button className="link" onClick={() => handleViewChange("profile")}>
                Ver Perfil
              </button>
            </>
          ) : (
            <button className="link" onClick={() => handleViewChange("home")}>
              Voltar
            </button>
          )}
        </div>
        <div className="content">
          {view === "home" ? (
            <>
              <h1>Coleção</h1>
              <p><br/><br/><br/><br/><br/><br/>COLEÇÃO<br/><br/><br/><br/><br/><br/></p>
            </>
          ) : view === "profile" ? (
            <Perfil user={user} setUser={setUser} handleViewChange={handleViewChange} />
          ) : null}
        </div>
      </div>
    </>
  );
}