import React, { useState, useEffect, Component } from "react";

import LoginProvider from '../api/LoginProvider';
import LogIn from '../components/LogIn';
import CharacterCardList from '../components/CharacterCardList';

import "./App.css";

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem('user') ? localStorage.getItem('user') : ""); // either be a username or null
  const [inputValue, setInputValue] = useState("")
  const [openCard, setOpenCard] = useState(null)
  const [favoritesList, setFavoritesList] = useState(null)

  const onLogin = () => {
    if (inputValue) {
      localStorage.setItem('user', inputValue);
      setLoggedInUser(inputValue)
      setInputValue("")
    }
  }

  const onLogout = () => {
    localStorage.removeItem('user')
    setLoggedInUser(null)
    setFavoritesList(null)
  }

  if (!favoritesList) {
    return (
      <LoginProvider>
        <LogIn 
          inputValue={inputValue}
          setInputValue={e => setInputValue(e.target.value)}
          loggedInUser={loggedInUser}
          onLogin={() => onLogin()}
          setFavoritesList={(val) => setFavoritesList(val)}
        />
    </LoginProvider>
    )
  }
  
  return (
    <LoginProvider>
      <div className="LoggedInUserContainer">
        <h3 className="LoggedInUserName">{loggedInUser}</h3>
        <button className="LogoutButton" onClick={() => onLogout()}>LOGOUT</button>
      </div>
      <div className="CardsContainer">
        <CharacterCardList 
          favoritesList={favoritesList}
          setFavoritesList={val => setFavoritesList(val)}
          openCard={openCard} 
          setOpenCard={val => setOpenCard(val)}/>
      </div>
    </LoginProvider>
  );
}

export default App;
