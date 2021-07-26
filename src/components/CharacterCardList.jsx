import React, { Component } from "react";
import { useQuery, gql } from '@apollo/client';
import CharacterCard from './CharacterCard';

import "./CharacterCardList.css";

const QUERY_FOR_ALL_CHARACTERS = gql`
  query GetAllCharacters { 
    characters(page: 1) {
      results {
        id
        name
        image
        species
        gender
        status
        origin {
          name
          dimension
        }
        episode {
          name
          air_date
        }
      }
    }
  }`;

const CharacterCardList = ({
  favoritesList,
  setFavoritesList,
  openCard,
  setOpenCard,
}) => {
  const { loading, error, data } = useQuery(QUERY_FOR_ALL_CHARACTERS);

  if (loading) 
    return <p>Loading...</p>;

  if (error || !data || !data.characters || !data.characters.results.length > 0)
    return <p>Error :(</p>;

  const { characters: { results } } = data;
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