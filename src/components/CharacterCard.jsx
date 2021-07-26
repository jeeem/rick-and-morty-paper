import React, { Component } from "react";

import "./CharacterCard.css";

const CharacterCard = ({
  character,
  favoritesList, 
  setFavoritesList,
  lastThreeEpisodes,
  openCard,
  setOpenCard
}) => {
  const { name, image, origin, gender, status, species } = character;

  const viewMore = (targetChecked) => {
    if (targetChecked) {
      return setOpenCard(name)
    }
    return setOpenCard(null)
  }
  const checkedValue = openCard === name;

  const renderEpisodes = () => {
    return (
      <div className={`EpisodesContainer ${checkedValue ? 'EpisodesContainerOpen' : ''}`}>
        <h5 className="card-subtitle">Episodes</h5>
        { lastThreeEpisodes.map(episode => {
          return (
            <p key={`${character?.name} ${episode?.name}`} className="card-text">{episode?.name}, {episode?.air_date}</p>
          )
        }) }
      </div>
    )
  }

  const isFavorite = !!favoritesList[name];

  const toggleFavorite = () => {
    const favoritesClone = Object.assign({}, favoritesList);
    if (isFavorite) {
      delete favoritesClone[name]
    } else {
      favoritesClone[name] = true
    }
    setFavoritesList(favoritesClone);
  }

  const renderHeader = () => {
    return (
      <div className="card-header">
        <fieldset className="form-group">
          <label htmlFor={`favoriteSwitch${name}`} className="paper-switch-label">
            Toggle Favorite
          </label>
          <label className="paper-switch">
            <input id={`favoriteSwitch${name}`} name={`favoriteSwitch${name}`} type="checkbox" checked={isFavorite} onChange={toggleFavorite}/>
            <span className="paper-switch-slider round"></span>
          </label>
        </fieldset>
      </div>
    )
  }

  return (
  <div className="card">
    { renderHeader() }
    <img src={image} alt={`${name} image`} />
    <div className="card-body">
      <h4 className="card-title">{name}</h4>
      <p className="card-text">origin: {origin?.name}</p>
      <p className="card-text">dimension: {origin?.dimension}</p>
      <p className="card-text">species: {species}</p>
      <p className="card-text">gender: {gender}</p>
      <p className="card-text">status: {status}</p>
      <fieldset className="form-group">
        <label htmlFor={`paperSwitch${name}`} className="paper-switch-tile">
          <input id={`paperSwitch${name}`} name={`paperSwitch${name}`}  type="checkbox" checked={checkedValue} onChange={e => viewMore(e.target.checked)}/>
          <div className="paper-switch-tile-card border">
            <div className="paper-switch-tile-card-front border background-success">More</div>
            <div className="paper-switch-tile-card-back border background-danger">Less</div>
          </div>
        </label>
      </fieldset>
      { renderEpisodes() }
    </div>
  </div>
  );
}

export default CharacterCard;