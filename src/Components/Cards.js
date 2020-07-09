import React from "react";
import CityWeather from "../city-weather.json";

function cardCountry() {
  return (
    <div>
      {CityWeather.map((data) => {
        return (
          <div className="Card" key={data.sys.id}>
            <h2>
              {data.name}, {data.sys.country}
            </h2>
            <div className="card-weather">
              <h3>{data.weather[0].main}</h3>
              <p>{data.weather[0].description}</p>
            </div>
            <p>max temp: {data.main.temp_max}</p>
            <p>min temp: {data.main.temp_min}</p>
            <p>
              Location: {data.coord.lat}, {data.coord.lon}
            </p>
          </div>
        );
      })}
    </div>
  );
}
export default cardCountry;
