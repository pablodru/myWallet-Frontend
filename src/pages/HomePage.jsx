import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../contexts/UserContext"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function HomePage() {

  const navigate = useNavigate();
  const URLGET = `${import.meta.env.VITE_API_URL}/transation`;
  const { name, token } = useContext(UserContext);
  console.log(token)

  const [transactions, setTransactions] = useState([]);
  let [amount, setAmount] = useState(0);

  function logout(){
    localStorage.removeItem('data');
    navigate('/');
  }

  useEffect(() => {
    axios.get(URLGET, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(res => {
        setTransactions(res.data);
      })
      .catch(err => console.log(err.response.data.message));
  }, []);
  
  useEffect(() => {
    setAmount(0)
    transactions.forEach(transaction => {
      if (transaction.type === 'in') {
        setAmount(prevAmount => prevAmount + transaction.value);
        console.log('somei: ', amount)
      }
      if (transaction.type === 'out') {
        setAmount(prevAmount => prevAmount - transaction.value);
        console.log('tirei: ', amount)
      }
    });
  }, [transactions]);
  
  


  return (
    <HomeContainer>
      <Header>
        <h1 data-test="user-name" >Olá, {name}</h1>
        <BiExit onClick={logout} data-test="logout" />
      </Header>

      <TransactionsContainer>
        <ul>

          {transactions.map(item => {
            return (
            <ListItemContainer>
              <div>
                <span>{item.day}</span>
                <strong data-test="resgistry-name" >{item.description}</strong>
              </div>
              <Value color={item.type} data-test="registry-amount">{item.value}</Value>
            </ListItemContainer>
          )})}
          
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={amount>0 ? 'in' : 'out'} data-test="total-amount" >{amount}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <button onClick={() => navigate('/nova-transacao/entrada')} data-test="new-income" >
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button onClick={() => navigate('/nova-transacao/saida')} data-test="new-expense" >
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "in" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`