import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

export default function SignInPage() {

  const navigate = useNavigate();

  const { setToken, setName } = useContext(UserContext);

  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');

  const URLPOST = `${import.meta.env.VITE_API_URL}/signin`;

  if (localStorage.getItem('data')){
    const data = JSON.parse(localStorage.getItem('data'));
    const newobj = {email: data.email, password:data.password}

    axios.post(URLPOST, newobj)
      .then(res => {
        setToken(res.data.token);
        setName(res.data.name);

        navigate('/home');
      })
      .catch(err => alert(err.response.data.message));
  }

  function signIn(e){
    e.preventDefault();

    const body = { email, password };

    axios.post(URLPOST, body)
      .then(res => {
        setToken(res.data.token);
        setName(res.data.name);

        localStorage.setItem('data', JSON.stringify({email, password, token:res.data.token }));

        navigate('/home');
      })
      .catch(err => alert(err.response.data.message));
  }

  return (
    <SingInContainer>
      <form onSubmit={(e) => signIn(e)} >
        <MyWalletLogo />
        <input placeholder="E-mail" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} data-test="email" />
        <input placeholder="Senha" type="password" autoComplete="new-password" required value={password} onChange={(e) => setPassword(e.target.value)} data-test="password" />
        <button type="Submit" data-test="sign-in-submit" >Entrar</button>
      </form>

      <Link to='/cadastro'>
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
