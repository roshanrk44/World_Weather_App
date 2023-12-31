import { useEffect, useRef, useState } from "react";
import { findUserLocation, getWeatherData } from "./components/WeatherUtils";
import InputSearch from "./components/InputSearch";
import WeeklyForecast from "./components/WeeklyForecast";
import TodayCondition from "./components/TodayCondition";
import CurrentWeather from "./components/CurrentWeather";

const WeatherLocApp = () => {
  const inputRef = useRef(null);
  const dropdownMenuRef = useRef(null);
  const [location, setLocation] = useState({
    name: "",
    country: "",
  });

  const [locData, setLocData] = useState({
    country: "",
    clouds: "",
    date: "",
    day: "",
    dateInTime: 0,
    description: "",
    forecast: [],
    found: true,
    name: "",
    month: "",
    monthIndex: "",
    real_feel: "",
    humidity: "",
    temperature: "",
    todayForecast: [],
    weeklyForecast: [],
    wind: "",
  });

  const getUserLocation = async () => {
    setLocData((prevData) => ({ ...prevData, found: true }));
    const userLocationData = await findUserLocation();
    setLocation((prevData) => ({ ...prevData, ...userLocationData }));
    inputRef.current.value = `${userLocationData.name}, ${userLocationData.country}`;
  };

  const getLocationWeather = async () => {
    const weatherData = await getWeatherData(location.name, location.country);
    if (weatherData) {
      setLocData((prevData) => ({ ...prevData, ...weatherData }));
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropdownMenuRef.current &&
        !dropdownMenuRef.current.contains(event.target)
      ) {
        dropdownMenuRef.current.innerHTML = "";
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (location.name != "") {
      getLocationWeather();
    }
  }, [location]);

  return (
    <div className="weather-container">
      <h1>World Weather App</h1>
      <div className="input-container">
        <InputSearch setLocation={setLocation} inputRef={inputRef} locData={locData} setLocData={setLocData}/>
        <button className="navigate-btn" onClick={getUserLocation}>
          Navigate
        </button>
      </div>
      <div
        className="dropdown-menu search-options"
        id="dropdownMenu"
        ref={dropdownMenuRef}
      ></div>
      {location.name != "" ? (
        locData.temperature != "" && locData.found ? (
          <div className="weather-panel">
            <div className="current-weather-container">
              <CurrentWeather locData={locData} location={location} />
              <TodayCondition locData={locData} />
            </div>
            <WeeklyForecast locData={locData} location={location} />
          </div>
        ) : !locData.found ? (
          <div></div>
        ) : (
          <h2>...Loading</h2>
        )
      ) : (
        <div className="no-search-display">
          <h1>Search the location</h1>
          <h1>OR</h1>
          <h1>Click on navigate</h1>
          <img src="images/location.png" alt="" />
        </div>
      )}
      {locData.found ? (
        <div></div>
      ) : (
        <div>
          <h2>Location Data Not Found</h2>
          <img src="images/no-data.png" alt="" />
        </div>
      )}
    </div>
  );
};

export default WeatherLocApp;