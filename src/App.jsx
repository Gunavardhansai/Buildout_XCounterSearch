import axios from "axios";
import "./styles.css";
import { useEffect, useState } from "react";

const App = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://restcountries.com/v3.1/all");
      setCountries(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Something went wrong", error);
      setLoading(false);
    }
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
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

      {loading && <p>Loading countries...</p>}

      <div className="countryGrid">
        {!loading && filteredCountries.length === 0 && <p>No countries found.</p>}

        {filteredCountries.map((country) => (
          <div key={country.cca3} className="countryCard">
            <img
              src={country.flags.png}
              alt={country.name.common}
              className="flag"
            />
            <p className="countryName">{country.name.common}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
