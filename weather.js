const elements = {
    place: document.querySelector("#h11"),
    DayDate: document.querySelector("#p1"),
    CurrentTemp: document.querySelector("#h1"),
    tempstatus: document.querySelector("#p"),
    tempferh:document.querySelector("#hightemp"),
    windststatus: document.querySelector("#windststatus"),
    sunrisetime: document.querySelector("#sunrisetime"),
    lowertemp: document.querySelector("#lowertemp"),
    rainper: document.querySelector("#rainper"),
    sunsettime: document.querySelector("#sunsettime"),
    div: document.querySelectorAll(".div3"),
    h4: document.querySelectorAll("#h4"),
    p: document.querySelectorAll("#p3"),
    Time: document.querySelector("#Time"),
    input: document.querySelector("#inp"),
    image: document.querySelector("#img1"),
    image2: document.querySelectorAll("#img2"), 
};


function fetchWeatherData(url) {
    return fetch(url)
        .then(res => {
            return res.json();
        })
        .catch(error => {
            console.error("Error fetching weather data:", error); 
        });
}

function updateWeatherElements(data) {
    const { location, current, forecast } = data;

    elements.place.textContent = `${location.name}, ${location.country}`;
    elements.DayDate.textContent = `${location.localtime}`;
    elements.CurrentTemp.textContent = `${current.temp_c}ºC`;
    elements.tempstatus.textContent = `${current.condition.text}`;
    elements.tempferh.textContent = `${current.temp_f}`;
    elements.windststatus.textContent = `${current.humidity}%`;
    elements.sunrisetime.textContent = `${current.wind_degree}`;
    elements.lowertemp.textContent = `${current.dewpoint_c}`;
    elements.rainper.textContent = `${current.precip_in}`;
    elements.sunsettime.textContent = `${current.cloud}`;
    elements.image.src = `${current.condition.icon}`;

    for (let i = 0; i <= 6; i++) {
        elements.h4[i].textContent = `${forecast.forecastday[0].hour[i].condition.text}`;
        elements.image2[i].src = `${forecast.forecastday[0].hour[i].condition.icon}`;
        elements.p[i].textContent = `${forecast.forecastday[0].hour[i].temp_c}ºC`;
    }
}

function fetchWeatherDataByGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const url = `https://api.weatherapi.com/v1/forecast.json?key=df268c3db39344268dd185158240706&q=${latitude},${longitude}&day=1`;
            fetchWeatherData(url)
                .then(data => updateWeatherElements(data))
                .catch(error => handleError(error));
        }, error => {
            handleError(error);
        });
    } else {
        console.error("Error.");
    }
}

elements.input.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        const value = event.target.value;
        const url = `https://api.weatherapi.com/v1/forecast.json?key=df268c3db39344268dd185158240706&q=${value}&day=1`;
        fetchWeatherData(url)
            .then(data => updateWeatherElements(data))
            .catch(error => handleError(error));

        elements.input.value = "";
    }
});

document.addEventListener("DOMContentLoaded", () => {
    fetchWeatherDataByGeolocation();
});

elements.input.value = "";
