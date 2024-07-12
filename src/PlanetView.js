import React from 'react';
import './PlanetView.css';

function PlanetView({ planet, onPlanetClick, isSelected }) {
  const imageSrc = {
    planet: `${process.env.PUBLIC_URL}/planet.png`,
    asteroid: `${process.env.PUBLIC_URL}/asteroid.png`,
    wormhole: `${process.env.PUBLIC_URL}/wormhole.png`,
    supernova: `${process.env.PUBLIC_URL}/supernova.png`,
  }[planet.type];

  return (
    <div className={`planet ${isSelected ? 'selected' : ''}`} onClick={() => onPlanetClick(planet)}>
      <img src={imageSrc} alt={planet.type} />
    </div>
  );
}

export default PlanetView;
