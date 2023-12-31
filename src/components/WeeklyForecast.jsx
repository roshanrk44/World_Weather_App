import { getNextDays } from "./WeatherUtils";

const WeeklyForecast = ({ locData }) => {
  let today, newDays;

  if (locData.day != "") {
    today = new Date(locData.dateInTime * 1000);
    newDays = getNextDays(today);
  }

  return (
    <div className="weekly-forecast-container">
      <h2>Weekly Forecast</h2>
      <div className="weekly-forecast-items">
        {locData.weeklyForecast.map((item, index) => {
          return (
            <div
              className={
                index === 0
                  ? "weekly-forecast-item selected"
                  : "weekly-forecast-item"
              }
              key={index}
            >
              <div>{newDays[index].slice(0, 10)}</div>
              <img
                src={`https://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                alt="weekly weather forecast image"
              />
              <div>{Math.trunc(item.main.temp - 273.15)}&deg;C</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyForecast;