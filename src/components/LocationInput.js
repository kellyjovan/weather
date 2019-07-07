import React, { useState } from 'react';

const LocationInput = ({ getWeather, error }) => {
  const [location, setLocation] = useState('');
  const [isCoord, setIsCoord] = useState(false);

  const updateLocation = newLocation => setLocation(newLocation);

  const placeholder = isCoord ? 'Input coordinates ex.(-40, 72)' : 'Input City or Zip';

  return (
    <div>
      {error
        && <p style={{ color: 'red' }}>Invalid Location</p>}

      <input
        type="text"
        value={location}
        onChange={e => updateLocation(e.target.value)}
        placeholder={placeholder}
      />
      <select value={isCoord} onChange={e => setIsCoord(JSON.parse(e.target.value))}>
        <option value={false}>City/Zip</option>
        <option value={true}>Coordinates</option>
      </select>
      <button
        type="button"
        onClick={() => getWeather(location, isCoord)}
      >
        Get data
      </button>
    </div>
  );
};

export default LocationInput;
