let cityName;
let lat = "hey";
let lon;
let button = document.querySelector(".city-name");
button.addEventListener("change", search);

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "c3b7d4e687mshaa41ee6ea066434p157c9djsnf935dca691cd",
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

function search() {
  let latLon;

  console.log(lat);
  cityName = document.querySelector(".city-name").value;
  document.getElementById("result").innerHTML = cityName;
  return fetch(
    `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${cityName}`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      data.data.forEach((user) => {
        const markup = `<li class="options">${user.name}, ${user.region}, ${user.countryCode}</li>`;

        latLon = `lat=${user.latitude}&lon=${user.longitude}`;

        console.log(`${user.latitude}`);

        document
          .querySelector("#result2")
          .insertAdjacentHTML("beforeend", markup);
      });

      let options = document.querySelector(".options");
      options.addEventListener("click", weather);

      console.log(latLon);
    })

    .catch((err) => console.error(err));

  console.log(document.querySelector(".options").innerHTML);

  function weather() {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?${latLon}&appid=d55428fbb4da136be0728cb7df6548f4&units=metric`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const markupWeather = `<p class="weather">Temperature: ${data.main.temp}</p>`;
        console.log(data);
        document
          .querySelector(".weather-wrapper")
          .insertAdjacentHTML("beforeend", markupWeather);

        const forecastCurrent = `<li class="forecast">${data.main.temp}</li>`;
        document
          .querySelector(".forecast-wrapper")
          .insertAdjacentHTML("beforeend", forecastCurrent);
      });
    console.log("weather function");

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?${latLon}&appid=d55428fbb4da136be0728cb7df6548f4&units=metric`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data.list.forEach((day) => {
          const markupForecast = `<li class="forecast">${day.main.temp}</li>`;

          document
            .querySelector(".forecast-wrapper")
            .insertAdjacentHTML("beforeend", markupForecast);
        });
        console.log(data);
        var currentDate = new Date();
        console.log(currentDate);
        var currentTime = currentDate.getHours();
        console.log(currentTime);
      });
  }
  //document.getElementById("result2").innerHTML = search;
}

console.log(lat);
