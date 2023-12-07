import { Link } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import axios from "axios";

export default function SignUpPage() {

  let [name, setName] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [confirmPassword, setConfirmPassword] = useState('');

  const URLPOST = `${import.meta.env.VITE_API_URL}/signup`

  function signUp(e){
    e.preventDefault();
    
    if (password !== confirmPassword) return alert("As senhas não coincidem!");

    const body = { name, email, password };

    axios.post(URLPOST, body)
      .then(res => {})
      .catch(err => alert(err.response.data.message));
  }


  return (
    <SingUpContainer>
      <form onSubmit={(e) => signUp(e)} >
        <MyWalletLogo />
        <input placeholder="Nome" type="text" required value={name} onChange={(e) => setName(e.target.value)} data-test="name"/>
        <input placeholder="E-mail" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} data-test="email" />
        <input placeholder="Senha" type="password" autoComplete="new-password" required value={password} onChange={(e) => setPassword(e.target.value)} data-test="password" />
        <input placeholder="Confirme a senha" type="password" autoComplete="new-password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} data-test="conf-password" />
        <button type="submit" data-test="sign-up-submit" >Cadastrar</button>
      </form>

      <Link to='/' >
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
