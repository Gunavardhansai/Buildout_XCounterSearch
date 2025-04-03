import React from "react";

const CountriesSearch = ({ data }) => {
  return (
    <div className="countryCard">
      {data.flags && data.flags.svg ? (
        <img src={data.flags.svg} alt={data.name.common} />
      ) : (
        <p>No Flag Available</p>
      )}
      <h2>{data.name?.common || "Unknown Country"}</h2>
    </div>
  );
};

export default CountriesSearch;
