import React from "react";

const SingleCity = ({
  removeCountry,
  index,
  data: { name, main, description, country, temp_max, temp_min, lat, lon },
}) => {
  return (
    <div className="Card" index={index}>
      <h2>
        {name}, {country}
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
      <button className="removeCountry" onClick={() => removeCountry(index)}>
        X
      </button>
    </div>
  );
};

export default SingleCity;
