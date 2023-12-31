const TodayCondition = ({ locData }) => {
    return (
      <div className="today-conditions-widget">
        <div className="today-forecast-container">
          <div className="today-forecast-heading">
            Today's Forecast
          </div>
          <div className="today-forecast-items">
            {locData.todayForecast.map((item, index) => (
              <div className="today-forecast-item" key={index}>
                <div>{item.dt_txt.slice(11, 16)}</div>
                <div>
                  <img
                    src={`https://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                    alt="today's weather image"
                  />
                </div>
                <div>{Math.trunc(item.main.temp - 273.15)}&deg;C</div>
              </div>
            ))}
          </div>
        </div>
        <div className="air-condition-container">
          <h2>Air Conditions</h2>
          <div className="air-condition-items">
            <div className="air-condition-item">
              <div className="air-condition-term">
                <img src="/images/realFeel.png" alt="temp image" />
                <p>Real Feel</p>
              </div>
              {Math.trunc(locData.real_feel)}&deg;C 
            </div>
            <div className="air-condition-item">
              <div className="air-condition-term">
                <img src="/images/humidity.png" alt="humidity image" />
                <p>Humidity</p>
              </div>
              {locData.humidity} %
            </div>
            <div className="air-condition-item">
              <div className="air-condition-term">
                <img src="/images/clouds.png" alt="cloud image" />
                <p>Clouds</p>
              </div>
              {locData.clouds} % 
            </div>
            <div className="air-condition-item">
              <div className="air-condition-term">
                <img src="/images/wind.png" alt="wind image" />
                <p>Wind</p>
              </div>
              {locData.wind} m/s
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default TodayCondition;