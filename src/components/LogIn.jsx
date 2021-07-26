import React, { Component, useEffect } from "react";
import { useQuery, gql } from '@apollo/client';

import "./LogIn.css";

const QUERY_FOR_USER = gql`
  query GetUser($name: String){
    user(name: $name)
  }
`

const LogIn = ({
  inputValue,
  setInputValue,
  loggedInUser,
  onLogin,
  setFavoritesList
}) => {
  const { loading, error, data } = useQuery(
    QUERY_FOR_USER,
    {
      variables: {
        name: loggedInUser
      },
    }
  );

  useEffect(() => {
    if (data?.user) {
      setFavoritesList(JSON.parse(data.user))
    }
  }, [data])

  return (
    <div className="LogInContainer">
      <label htmlFor="LogInInput" className="LogInLabel">USERNAME</label>
      <input id="LogInInput" name="LogInInput" type="text" className="LogInInput" value={inputValue} onChange={setInputValue} />
      <button onClick={onLogin} className="LogInButton">LOGIN</button>
    </div>
  )
}

export default LogIn;