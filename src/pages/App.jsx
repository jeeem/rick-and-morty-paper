import React, { useState, Component } from "react";

import Provider from '../api/Provider';
// import PickleRick from '../components/PickleRick';
import CharacterCard from '../components/CharacterCard';
import CharacterCardList from '../components/CharacterCardList';

import "./App.css";

const App = () => {
  // const [loggedInUser, setLoggedInUser] = useState(null); // either be a username or null
  const [loggedInUser, setLoggedInUser] = useState("foo bar"); // either be a username or null
  const [inputValue, setInputValue] = useState("")
  const [openCard, setOpenCard] = useState(null)

  console.log('loggedInUser', loggedInUser);

  const onLogin = () => {
    console.log('attempting to log in inputValue', inputValue);
    if (inputValue) {
      setLoggedInUser(inputValue)
      setInputValue("")
    }
  }

  const onLogout = () => {
    console.log('attempting to log out inputValue', inputValue);
    setLoggedInUser(null)
  }

  if (!loggedInUser) {
    return (
      <div className="LogInContainer">
        <label htmlFor="LogInInput" className="LogInLabel">USERNAME</label>
        <input id="LogInInput" name="LogInInput" type="text" className="LogInInput" value={inputValue} onChange={e => setInputValue(e.target.value)} />
        <button onClick={() => onLogin()} className="LogInButton">LOGIN</button>
      </div>
    )
  }
  
  return (
    <Provider>
      <div className="LoggedInUserContainer">
        <h3 className="LoggedInUserName">{loggedInUser}</h3>
        <button className="LogoutButton" onClick={() => onLogout()}>LOGOUT</button>
      </div>
      <div className="CardsContainer">
        <CharacterCardList openCard={openCard} setOpenCard={val => setOpenCard(val)}/>
      </div>
    </Provider>
  );
}

export default App;
