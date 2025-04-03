import React from "react";

const CountriesSearch = ({ data }) => {
  return (
    <div className="countryCard">
      {data.common && data.png ? (
        <img src={data.png} alt={data.common} />
      ) : (
        <p>No Flag Available</p>
      )}
      <h2>{data?.common }</h2>
    </div>
  );
};

export default CountriesSearch;
