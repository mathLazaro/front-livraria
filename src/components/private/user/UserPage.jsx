import React, { useEffect, useState } from "react";
import axios from "axios";
import { getUserRole } from "../../../services/auth";
import Header from "../Header";
import Perfil from "./Perfil";
import { BACK_URL } from "../../../services/serverConection";
import "../../../styles/UserPage.css";

export default function UserPage() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("home");
  const [livros, setLivros] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

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

  const getLivros = async (data = {}) => {
    try {
      const response = await axios.get(`${BACK_URL}/livros/`, { params: { titulo: data.titulo, autor: data.autor } });
      console.log("API response:", response.data);
      setLivros(Array.isArray(response.data.data) ? response.data.data : []);
      setErrorMsg("");
    } catch (error) {
      console.error("Error fetching livros:", error);
      setErrorMsg(error.response?.data?.msg || "An error occurred");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      titulo: formData.get("titulo"),
      autor: formData.get("autor"),
    };
    getLivros(data);
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="sidebar">
          {view === "home" ? (
            <>
              <h3>Bem vindo, {user?.perfil.nome}!</h3>
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
              <h2 id="consultar">Consulta de preços dos livros disponíveis</h2>
              <form className="buscaLivro" onSubmit={handleSubmit}>
                <div id="inputsBusca">
                  <input type="text" placeholder="Digite o titulo" id="titulo" name="titulo" />
                  <input type="text" placeholder="Digite o autor" id="autor" name="autor" />
                <button>Buscar</button>
                </div>
              </form>
              {errorMsg && <p className="error">{errorMsg}</p>}
              <ol className="listaLivros">
                {livros.map((livro) => (
                  <li key={livro.id} className="livro">
                    <picture><img src={livro.capa} alt="Capa do livro" /></picture>
                    <p>{livro.titulo} <br/> By: {livro.autor} <br/> Valor: R$ {livro.valor},00</p>
                  </li>
                ))}
              </ol>
            </>
          ) : view === "profile" ? (
            <Perfil user={user} setUser={setUser} handleViewChange={handleViewChange} />
          ) : null}
        </div>
      </div>
    </>
  );
}
