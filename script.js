const form = document.querySelector("form");
const submitBtn = document.querySelector(".submit-btn");

form.addEventListener("submit", handleSubmit);
submitBtn.addEventListener("click", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  const input = document.querySelector('input[type="text"]');
  const location = input.value;
  console.log(location);
  fetchData(location);
}

const fetchData = async (location) => {
  const response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=1986480656ec490d950204923202611&q=${location}`,
    { mode: "cors" }
  );
  const weatherData = await response.json();
  const data = processedData(weatherData);
  const display = displayData(data);
  console.log(weatherData);
};

const processedData = (weatherData) => {
  const myData = {
    condition: weatherData.current.condition.text,
    location:
      weatherData.location.name.toUpperCase() +
      ", " +
      weatherData.location.country.toUpperCase(),
    temp: Math.round(weatherData.current.temp_f),
    feelsLike: "FEELS LIKE: " + Math.round(weatherData.current.feelslike_f),
    wind: "WIND: " + weatherData.current.wind_kph,
    humidity: "HUMIDITY: " + weatherData.current.humidity,
  };
  return myData;
};

const displayData = (data) => {
  document.querySelector(".condition").textContent = data.condition;
  document.querySelector(".location").textContent = data.location;
  document.querySelector(".degrees").textContent = data.temp;
  document.querySelector(".feels-like").textContent = data.feelsLike;
  document.querySelector(".wind-kph").textContent = data.wind;
  document.querySelector(".humidity").textContent = data.humidity;
};
