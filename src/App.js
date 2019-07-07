import React, { useState, useEffect } from 'react';
import LocationInput from './components/LocationInput';
import WeatherDisplay from './components/WeatherDisplay';

const App = () => {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [error, setError] = useState(false);

  function buildRequest(location, isCoord) {
    const appId = '043d23e30eb3dba6d7dfb4dd28562f1d';
    let queryParams;

    if (isCoord) {
      const [lat, lon] = location.split(', ');

      queryParams = `lat=${lat}&lon=${lon}`;
    } else {
      queryParams = isNaN(location) ? `q=${location}` : `zip=${location}`;
    }

    return `https://api.openweathermap.org/data/2.5/forecast?${queryParams}&appid=${appId}`;
  }

  function getWeather(location, isCoord = true) {
    const request = buildRequest(location, isCoord);

    fetch(request)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error('Invalid Request');
        }

        if (error) setError(false); // Removing error message

        return res.json();
      })
      .then((data) => {
        setWeatherInfo(data);
      })
      .catch(() => {
        setError(true);
      });
  }

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        getWeather(`${position.coords.latitude}, ${position.coords.longitude}`);
      });
    }
  }, []);

  return (
    <div>
      <LocationInput getWeather={getWeather} error={error} />
      <WeatherDisplay weatherInfo={weatherInfo} />
    </div>
  );
};

export default App;
