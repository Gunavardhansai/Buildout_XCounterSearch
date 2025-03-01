/** @format */
import axios from "axios";
import "./styles.css";
import { useEffect, useState } from "react";

const App = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
0
  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await axios.get(
        "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries"
      );
      console.log("API Response:", response.data); // Debugging line
      setCountries(response.data);
    } catch (error) {
      console.error("Something is wrong", error);
    }
  };

  const filteredCountries = countries.filter((country) =>
    country?.name?.toLowerCase().includes(search.toLowerCase()) // Adjusted to handle possible undefined values
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search for countries..."
        value={search}
        className="searchInput"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="countryGrid">
        {filteredCountries.map((country, index) => (
          <div key={index} className="countryCard">
            <img
              src={country?.flags?.png || ""}
              alt={country?.name || "No Name"}
              className="flag"
            />
            <p className="countryName">{country?.name || "Unknown"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
