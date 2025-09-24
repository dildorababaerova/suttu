// import { useState, useEffect } from "react";
// import coutriesService from "./services/countries";
// import Country from "./components/Country";
// import CountryDetail from "./components/CountryDetail";

// const App = () => {
//   const [countries, setCountries] = useState([]);
//   const [searchCountry, setSearchCountry] = useState("");
//   const [country, setCountry] = useState(null);
//   const [forecast, setForecast] = useState(null);

//   useEffect(() => {
//     coutriesService.getAll().then((allCountry) => {
//       setCountries(allCountry);
//     });
//   }, []);

//   // 🔥 Новый эффект — если в фильтре осталась 1 страна
//   useEffect(() => {
//     if (countries.length === 0) return;

//     const filtered = countries.filter((c) =>
//       c.name.common.toLowerCase().includes(searchCountry.toLowerCase())
//     );

//     if (filtered.length === 1) {
//       const selected = filtered[0];
//       setCountry(selected);

//       if (!selected.capital || selected.capital.length === 0) return;
//       const capitalName = selected.capital[0];

//       coutriesService.getCoordinates(capitalName).then((result) => {
//         if (!result) return;

//         coutriesService
//           .getForecast(capitalName, result.lat, result.lon)
//           .then((results) => setForecast(results));
//       });
//     }
//   }, [searchCountry, countries]); // следим за фильтром и странами

//   const filterCountry = countries.filter((country) =>
//     country.name.common.toLowerCase().includes(searchCountry.toLowerCase())
//   );

//   return (
//     <div>
//       <input
//         type="text"
//         value={searchCountry}
//         onChange={(e) => setSearchCountry(e.target.value)}
//         placeholder="Search country..."
//       />

//       {filterCountry.length > 10 ? (
//         <div>Too many matches, specify another filter</div>
//       ) : filterCountry.map((country) => (
//         <Country key={country.cca3} country={country} />
//       ))}

//       {country && <CountryDetail country={country} forecast={forecast} />}
//     </div>
//   );
// };

// export default App;
