const apiKey = "5183e9c086664fab7bf462df1e235639";

function checkWeather() {
  const location = document.getElementById("location").value;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${location}&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      return response.json();
    })
    .then((data) => {
      const cityElement = document.getElementById("city");
      const tempElement = document.getElementById("temp");
      const humidityElement = document.getElementById("humidity");
      const windElement = document.getElementById("wind");

      cityElement.textContent = data.name;
      tempElement.textContent = `${data.main.temp}°C`;
      humidityElement.textContent = `${data.main.humidity}%`;
      windElement.textContent = `${data.wind.speed} m/s`;
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
}
