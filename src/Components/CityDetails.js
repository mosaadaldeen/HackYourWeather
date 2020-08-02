import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Chart from "./chart";

const KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

const CityDetails = () => {
  const { cityId } = useParams();
  const history = useHistory();
  const [dataChart, setDataChart] = useState([]);
  const [cityName, setCityName] = useState("");
  const [hasError, setError] = useState(false);

  const fetchCityDetails = async (id) => {
    try {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?id=${id}&units=metric&appid=${KEY}`
      );
      let result = await data.json();
      setCityName(result.city.name);
      let chartData = [];
      for (let i = 0; i < result.list.length; i += 8)
        chartData = [
          ...chartData,
          {
            name: result.list[i].dt_txt,
            uv: result.list[i].main.temp,
          },
        ];
      return chartData;
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    fetchCityDetails(cityId).then((data) => setDataChart(data));
  });

  return (
    <div className="cityDetails">
      {cityName}
      {!hasError && <Chart dataChart={dataChart}></Chart>}
      <div>{hasError && <p>Sorry can't load chart</p>}</div>
      <button
        onClick={() => {
          history.goBack();
        }}
      >
        Home
      </button>
    </div>
  );
};

export default CityDetails;
