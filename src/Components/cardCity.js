import React from "react";
import { Link } from "react-router-dom";

const SingleCity = ({
  removeCountry,
  data: { id, name, main, description, country, temp_max, temp_min, lat, lon },
}) => {
  return (
    <div className="Card" index={id}>
      <h2>
        <Link to={`/${id}`}>
          {name}, {country}
        </Link>
      </h2>
      <div className="card-weather">
        <h3>{main}</h3>
        <p>{description}</p>
      </div>
      <p>max temp: {temp_max}</p>
      <p>min temp: {temp_min}</p>
      <p>
        Location: {lat}, {lon}
      </p>
      <button className="removeCountry" onClick={() => removeCountry(id)}>
        X
      </button>
    </div>
  );
};

export default SingleCity;
