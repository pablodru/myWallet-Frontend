import axios from "axios";
import { useContext, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components"
import { UserContext } from "../contexts/UserContext";

export default function TransactionsPage() {

  const navigate = useNavigate();
  const { tipo } = useParams();
  console.log(tipo)

  const { token } = useContext(UserContext);

  let [value, setValue] = useState('');
  let [description, setDescription] = useState('');
  let [type, setType] = useState((tipo==='entrada') ? 'in' : 'out')

  const URLPOST = `${import.meta.env.VITE_API_URL}/transation`;

  function newTransaction(e) {
    e.preventDefault();

    const correctValue = Number(value.replace(',', '.'));
    
    const body = { value: correctValue, description, type };
    console.log(body)

    axios.post(URLPOST, body, {headers:{'Authorization': `Bearer ${token}`}})
      .then(res => navigate('/home'))
      .catch(err => alert(err.response.data.message))
  }

  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form onSubmit={newTransaction} >
        <input placeholder="Valor" type="text" required value={value} onChange={(e) => setValue(e.target.value)} data-test="registry-amount-input" />
        <input placeholder="Descrição" type="text" required value={description} onChange={(e) => setDescription(e.target.value)} data-test="registry-name-input" />
        <button type ="Submit" data-test="registry-save" >Salvar TRANSAÇÃO</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
