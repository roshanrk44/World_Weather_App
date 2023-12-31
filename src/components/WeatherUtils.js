export const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  
  export const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  
  export const findUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const nav_response = await fetch(
                `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=4cb69279ed43fd0729031826cae5c55c`
              );
              const nav_Data = await nav_response.json();
              const pl_name = nav_Data[0].name.split("(")[0].trim();
              const pl_country = nav_Data[0].country;
              resolve({ name: pl_name, country: pl_country, geolocation: true });
            } catch (error) {
              reject({ geolocation: false });
            }
          },
          (error) => reject({ geolocation: false })
        );
      } else {
        reject({ geolocation: false });
      }
    });
  };
  
  export const getWeatherData = async (name, country) => {
    try {
      const w_url = `https://api.openweathermap.org/data/2.5/weather?q=${name},${country}&appid=4cb69279ed43fd0729031826cae5c55c`;
      const f_url = `https://api.openweathermap.org/data/2.5/forecast?q=${name},${country}&appid=4cb69279ed43fd0729031826cae5c55c`;
  
      const w_response = await fetch(w_url);
      const w_data = await w_response.json();
      const f_response = await fetch(f_url);
      const f_data = await f_response.json();
  
      const date = new Date(w_data.dt * 1000);
      const dt = date.getDate();
      const day = date.getDay();
      const month = date.getMonth();
  
      const todayForecastData = getTodayForecast(f_data, dt, month + 1);
      const weeklyForecastData = getWeeklyForecast(f_data, w_data.dt);
  
      return {
        description: w_data.weather[0].description,
        temperature: w_data.main.temp - 273.15,
        month: months[month],
        monthIndex: month + 1,
        date: dt,
        day: days[day],
        dateInTime: w_data.dt,
        real_feel: w_data.main.feels_like - 273.15,
        humidity: w_data.main.humidity,
        clouds: w_data.clouds.all,
        wind: w_data.wind.speed,
        forecast: f_data.list,
        found: true,
        dateInTime: w_data.dt,
        todayForecast: todayForecastData,
        weeklyForecast: weeklyForecastData,
        weather: w_data.weather[0],
      };
    } catch (err) {
      console.log("no location", err);
      return { found: false };
    }
  };
  
  const getTodayForecast = (f_data, date, monthIndex) => {
    const tf = f_data.list.filter(
      (item) =>
        date === +item.dt_txt.slice(8, 10) &&
        monthIndex === +item.dt_txt.slice(5, 7)
    );
    return tf;
  };
  
  const getWeeklyForecast = (f_data, dateInTime) => {
    const today = new Date(dateInTime * 1000);
    const nextDays = getNextDays(today);
    let i = 0;
    const wf = f_data.list.filter((item) => {
      if (item.dt_txt.slice(8, 10) == nextDays[i].slice(8, 10)) {
        i++;
        return true;
      } else return false;
    });
    return wf;
  };
  
  export const getNextDays = (today) => {
    const nextDays = [];
    for (let i = 0; i < 7; i++) {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);
      nextDays.push(nextDay.toDateString());
    }
    return nextDays;
  };