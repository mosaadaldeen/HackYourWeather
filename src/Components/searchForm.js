import React, { useState } from "react";
import CardCountry from "./Cards";
import "../App.css";

function SearchForm() {
  const [country, setCountry] = useState("");
  const [data, setData] = useState(null);
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
        const {
          name,
          sys: { country },
          main: { temp_max, temp_min },
          weather: [{ main, description }],
          coord: { lat, lon },
        } = result;
        setData({
          name,
          country,
          main,
          description,
          lat,
          lon,
          temp_max,
          temp_min,
        });
      })
      .catch((err) => {
        setHasError(true);
      });
  }
  const submitHandler = (e) => {
    e.preventDefault();
    fetchedData();
    setHasError(false);
    setCountry("");
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
          <button onClick={fetchedData}>search</button>
        </div>
      </form>
      {hasError && <p className="error">Something went wrong</p>}
      {!hasError && data === null && (
        <p className="search">Enter a city name</p>
      )}
      {!hasError && data !== null && <CardCountry data={data} />}
    </div>
  );
}

export default SearchForm;
