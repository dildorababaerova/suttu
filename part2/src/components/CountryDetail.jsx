// Словарь иконок для weathercode
const weatherIcons = {
  0: "☀️",
  1: "🌤️",
  2: "⛅",
  3: "☁️",
  45: "🌫️",
  48: "🌫️",
  51: "🌦️",
  53: "🌦️",
  55: "🌧️",
  61: "🌦️",
  63: "🌧️",
  65: "🌧️",
  71: "🌨️",
  73: "❄️",
  75: "❄️",
  77: "❄️",
  80: "🌦️",
  81: "🌧️",
  82: "🌧️",
  85: "🌨️",
  86: "❄️",
  95: "⛈️",
  96: "⛈️",
  99: "⛈️"
};

const CountryDetail = ({ country, forecast, handleDetail }) => {
  if (!country) return null;

  const language = Object.values(country.languages);
  const flagStyle = { 
    width: "100px", 
    height: "70px" 
  };

  

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>
        Capital: {country.capital ? country.capital.join(", ") : "--"}
      </div>
      <div>Area: {country.area}</div>

      <h2>Languages</h2>
      <ul>
        {language.map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        style={flagStyle}
      />

      <h2>Weather</h2>
      {!forecast ? (
        <div>
          <p>Weather is loading...</p>
        </div>
      ): (
          <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Date</th>
              <th>Min temp (°C)</th>
              <th>Max temp (°C)</th>
              <th>Weather</th>
            </tr>
          </thead>
          <tbody>
            {forecast.daily.time.map((date, i) => (
              <tr key={date}>
                <td>{date}</td>
                <td>{forecast.daily.temperature_2m_min[i]}</td>
                <td>{forecast.daily.temperature_2m_max[i]}</td>
                <td>{weatherIcons[forecast.daily.weathercode[i]] || "❔"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
       </div>
    );
  };


export default CountryDetail;
