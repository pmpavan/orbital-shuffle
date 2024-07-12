import React, { useState, useEffect } from 'react';
import PlanetView from './PlanetView';
import './PlanetGrid.css';

function PlanetGrid({ planets, onPlanetSwap, gridSize }) {
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  useEffect(() => {
    document.documentElement.style.setProperty('--grid-size', gridSize);
  }, [gridSize]);

  const handlePlanetClick = (planet) => {
    if (!selectedPlanet) {
      setSelectedPlanet(planet);
    } else {
      if (isAdjacent(selectedPlanet, planet, gridSize)) {
        onPlanetSwap(selectedPlanet, planet);
      }
      setSelectedPlanet(null);
    }
  };

  const isAdjacent = (planet1, planet2, gridSize) => {
    const diff = Math.abs(planet1.id - planet2.id);
    return (
      (diff === 1 && Math.floor(planet1.id / gridSize) === Math.floor(planet2.id / gridSize)) ||
      diff === gridSize
    );
  };

  return (
    <div className="grid">
      {planets.map((planet) => (
        <div key={planet.id} className="grid-item">
          <PlanetView
            planet={planet}
            onPlanetClick={handlePlanetClick}
            isSelected={selectedPlanet && selectedPlanet.id === planet.id}
          />
        </div>
      ))}
    </div>
  );
}

export default PlanetGrid;
