import React, { useState } from "react";
import SingleCity from "./cardCity";
import "../App.css";

function SearchForm() {
  const [country, setCountry] = useState("");
  const [data, setData] = useState([]);
  const [hasError, setHasError] = useState(false);
  const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${country}&units=metric&appid=${API_KEY}`;
  function fetchedData() {
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("something is wrong");
        }
      })
      .then((result) => {
        const results = {
          name: result.name,
          country: result.sys.country,
          weather: result.weather[0].main,
          description: result.weather[0].description,
          max_temp: result.main.temp_max,
          min_temp: result.main.temp_min,
          lon: result.coord.lon,
          lat: result.coord.lat,
        };
        setData((oldResult) => [results, ...oldResult]);
      })
      .catch(() => {
        setHasError(true);
      });
  }
  const submitHandler = (e) => {
    e.preventDefault();
    fetchedData();
    setHasError(false);
    setCountry("");
  };

  const removeCountry = (index) => {
    const newCity = [...data];
    newCity.splice(index, 1);
    setData(newCity);
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="search-input">
          <input
            placeholder="search a city"
            type="text"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          />
          <button type="submit">search</button>
        </div>
      </form>
      {hasError && <p className="error">Something went wrong</p>}
      {!hasError && data === null && (
        <p className="search">Enter a city name</p>
      )}
      {!hasError &&
        data !== null &&
        data.map((cityWeather, index) => (
          <SingleCity
            key={index}
            removeCountry={removeCountry}
            data={cityWeather}
          />
        ))}
    </div>
  );
}
export default SearchForm;
