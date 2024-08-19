document.addEventListener("DOMContentLoaded", function () {
    function updateWeatherDisplay(content) {
        document.getElementById("weather-result").innerHTML = content;
    }

    function fetchWeatherData(city) {
        const apiKey = "40f2d7fbd63d1a783cb0619da5d67940";
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error("City not found");
                }
                return response.json();
            })
            .then(data => {
                const weatherDescription = data.weather[0].description;
                const temperature = data.main.temp;
                const humidity = data.main.humidity;

                const content = `
                    <h2>Weather in ${city}</h2>
                    <p>Description: ${weatherDescription}</p>
                    <p>Temperature: ${temperature}°C</p>
                    <p>Humidity: ${humidity}%</p>
                `;
                updateWeatherDisplay(content);
            })
            .catch(error => {
                updateWeatherDisplay(`<p>Error: ${error.message}</p>`);
            });
    }

    document.getElementById("weather-form").addEventListener("submit", function (event) {
        event.preventDefault();

        const city = document.getElementById("city").value.trim();

        if (city === "") {
            updateWeatherDisplay("<p>Please enter a city name.</p>");
        } else {
            fetchWeatherData(city);
        }
    });
});
