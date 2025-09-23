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

const CountryDetail = ({ country, forecast }) => {
  if (!country) return null;

  const language = Object.values(country.languages);
  const flagStyle = { width: "100px", height: "70px" };

  // Безопасно достаём данные
  const daily = forecast?.daily;
  const date = daily?.time?.[0];
  const minTemp = daily?.temperature_2m_min?.[0];
  const maxTemp = daily?.temperature_2m_max?.[0];
  const weatherCode = Number(daily?.weathercode?.[0]);
  const icon = weatherIcons[weatherCode] || "🌥️";

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>
        Capital: {country.capital ? country.capital.join(", ") : "нет столицы"}
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

      {daily ? (
        <div>
          <h2>Weather (today)</h2>
          <p>Date: {date}</p>
          <p>
            Weather: {icon} (code: {daily.weathercode[0]})
          </p>
          <p>Low temperature: {minTemp} °C</p>
          <p>High temperature: {maxTemp} °C</p>
        </div>
      ) : (
        <p>Прогноз ещё загружается...</p>
      )}
    </div>
  );
};


export default CountryDetail;
