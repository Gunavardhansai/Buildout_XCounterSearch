import { useEffect, useState } from "react";
import axios from "axios";
import CountriesSearch from "./CountriesSearch";

function App() {
  const [countryData, setCountryData] = useState([]);
  const [filterCountryData, setFilterCountryData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const fetchCountryData = async () => {
    const url =
      "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries";
    try {
      const response = await axios.get(url);
      setCountryData(response.data);
      setFilterCountryData(response.data);
    } catch (error) {
      console.error("Error fetching country data:", error);
    }
  };

  useEffect(() => {
    fetchCountryData();
  }, []);

  useEffect(() => {
    if (!searchText.trim()) {
      setFilterCountryData(countryData);
    } else {
      const filteredData = countryData.filter(
        (country) =>
          country.common?.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilterCountryData(filteredData);
    }
  }, [searchText, countryData]);

  return (
    <div>
      <div className="searchSection">
        <input
          type="text"
          placeholder="Search for countries..."
          value={searchText}
          onChange={handleChange}
        />
      </div>
      <div className="App">
        {filterCountryData.length > 0 ? (
          filterCountryData.map((country, index) => (
            <CountriesSearch key={index} data={country} />
          ))
        ) : (
          <p>No countries found</p>
        )}
      </div>
    </div>
  );
}

export default App;
