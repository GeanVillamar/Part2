import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    if (query) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then((response) => {
          const filtered = response.data.filter((country) =>
            country.name.common.toLowerCase().includes(query.toLowerCase())
          );
          setCountries(filtered);
        });
    } else {
      setCountries([]);
    }
  }, [query]);

  return (
    <div>
      <h1>Country Finder</h1>
      <input
        type="text"
        placeholder="Search for a country..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {countries.length > 10 ? (
        <p>Too many matches, please specify further.</p>
      ) : countries.length === 1 ? (
        <div>
          <h2>{countries[0].name.common}</h2>
          <p>Capital: {countries[0].capital}</p>
          <p>Area: {countries[0].area}</p>
          <p>Languages: {Object.values(countries[0].languages).join(", ")}</p>
          <img
            src={countries[0].flags.svg}
            alt={`Flag of ${countries[0].name.common}`}
            width="150"
          />
        </div>
      ) : (
        countries.map((country) => (
          <p key={country.cca3}>{country.name.common}</p>
        ))
      )}
    </div>
  );
}

export default App;
