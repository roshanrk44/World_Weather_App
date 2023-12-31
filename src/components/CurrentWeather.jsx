const CurrentWeather = ({ location, locData }) => {
    return (
      <div className="current-weather">
        <div className="display-weather">
          <div className="display-weather-image">
            <img
              src={`https://openweathermap.org/img/w/${locData.weather.icon}.png`}
              alt="current temperature image"
            />
            <div className="display-weather-temp">
              {Math.trunc(locData.temperature)}&deg;C
            </div>
          </div>
          <div className="weather-location">
            <div>Location: {location.name}, {location.country} </div>
            <div>Today {locData.date} {locData.month}</div>
            <br />
          </div>
          <div className="weather-info">
            <h2>Weather</h2>
            <p>{locData.description}</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default CurrentWeather;