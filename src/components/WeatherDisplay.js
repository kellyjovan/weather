import React, { useState } from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const WeatherDisplay = ({ weatherInfo }) => {
  if (!weatherInfo) {
    return <div>Please Input a location</div>;
  }

  const [showFaren, setFarenStatus] = useState(true);
  const { city, list } = weatherInfo;

  function formatTemp(tempInKelvin, isFaren) {
    if (isFaren) return (tempInKelvin * (9 / 5) - 459.67).toFixed(2);
    return (tempInKelvin - 273.15).toFixed(2);
  }

  const toggleFormat = () => setFarenStatus(!showFaren);

  const data = list
    .map((forecast) => {
      const { humidity, pressure, temp } = forecast.main;

      return {
        humidity,
        pressure,
        temp: formatTemp(temp, showFaren),
        hour: forecast.dt_txt,
      };
    });

  return (
    <div>
      <center>
        <h1>
          {`Weather Forcast for ${city.name}`}
        </h1>

        <button
          type="button"
          onClick={toggleFormat}
        >
          Show
          {showFaren ? 'Celcius' : ' Farenheight'}
        </button>
      </center>

      <div style={{ display: 'flex', margin: '1em' }}>
        <ResponsiveContainer width="50%" height={500}>
          <LineChart width={600} height={300} data={data}>
            <Line type="monotone" dataKey="humidity" stroke="#8884d8" />
            <Line type="monotone" dataKey="temp" stroke="#8884d8" />
            <Tooltip />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="hour" />
            <YAxis type="number" domain={['dataMin - 10', 'dataMax + 10']} />
          </LineChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="50%" height={500}>
          <LineChart width={600} height={300} data={data}>
            <Line type="monotone" dataKey="pressure" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="hour" />
            <Tooltip />
            <YAxis type="number" domain={['dataMin - 10', 'dataMax + 10']} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeatherDisplay;
