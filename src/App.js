import React, { useState } from "react";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Usuário cadastrado com sucesso!");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login realizado com sucesso!");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("E-mail de recuperação enviado!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>{isRegistering ? "Cadastro" : "Login"}</h1>
      {isRegistering && (
        <div>
          <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="number" placeholder="Idade" value={age} onChange={(e) => setAge(e.target.value)} />
          <label>
            <input type="checkbox" required /> Li e aceito os termos
          </label>
        </div>
      )}
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
      {isRegistering ? (
        <button onClick={handleRegister}>Cadastrar</button>
      ) : (
        <button onClick={handleLogin}>Entrar</button>
      )}
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? "Já tem uma conta? Faça login" : "Não tem conta? Cadastre-se"}
      </button>
      <button onClick={handleResetPassword}>Esqueci minha senha</button>
    </div>
  );
}

export default App;