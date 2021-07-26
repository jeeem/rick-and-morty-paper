import React, { useEffect, Component } from "react";
import { useMutation, useQuery, gql } from '@apollo/client';
import CharacterCard from './CharacterCard';

import "./CharacterCardList.css";

// const QUERY_FOR_ALL_CHARACTERS = gql`
//   query GetAllCharacters { 
//     characters(page: 1) {
//       results {
//         id
//         name
//         image
//         species
//         gender
//         status
//         origin {
//           name
//           dimension
//         }
//         episode {
//           name
//           air_date
//         }
//       }
//     }
//   }`;

const UPDATE_USER = gql`
  mutation UpdateUser ($input: UpdateUserInput) { 
    updateuser (input: $input)
  }
`;

const QUERY_FOR_ALL_CHARACTERS = gql`
  query GetAllCharacters { 
    characters
  }`;


const CharacterCardList = ({
  favoritesList,
  loggedInUser,
  setFavoritesList,
  openCard,
  setOpenCard,
}) => {
  const { loading, error, data } = useQuery(QUERY_FOR_ALL_CHARACTERS);
  const [updateUser, { loading: loadingMutation }] = useMutation(UPDATE_USER,
    {
      variables: {
        input: {
          userobject: JSON.stringify(favoritesList),
          currentuser: loggedInUser
        },
      }
    });

  const favoritesListLength = Object.keys(favoritesList).length
  
  useEffect(() => {
    if (loggedInUser && favoritesListLength > 0) {
      updateUser()
    }
  }, [favoritesListLength])
  
  if (loading) 
  return <p>Loading...</p>;

  if (error || !data || !data.characters)
    return <p>Error :(</p>;
      
  const parsedResponse = JSON.parse(data.characters)
  const { characters: { results } } = parsedResponse;
  return results.map(character => {
    const lastThreeEpisodes = () => {
      const clonedArray = character.episode.slice(0);
      clonedArray.reverse();
      if (clonedArray.length < 4) return clonedArray;
      return clonedArray.slice(0, 3)
    }
    return (
      <CharacterCard 
        key={character?.name}
        favoritesList={favoritesList}
        setFavoritesList={setFavoritesList}
        character={character}
        lastThreeEpisodes={lastThreeEpisodes()}
        openCard={openCard} 
        setOpenCard={val => setOpenCard(val)} />
    )
  })
}

export default CharacterCardList;