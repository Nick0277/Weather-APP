const typeCity = document.querySelector(".typeCity");
const submit = document.querySelector(".submit");
const displayTemperature = document.querySelector(".temperatureNum");
const condition = document.querySelector(".condition");
const cityName = document.querySelector(".cityName");
const currentTime = document.querySelector(".date");
const weekdays = document.querySelectorAll(".weekDays");
const forecastIcon = document.querySelectorAll(".forecastIcon");
const highestTemperature = document.querySelectorAll(".highestTemperature");
const lowestTemperature = document.querySelectorAll(".lowestTemperature");
const template = document.querySelector(".template");
const switcher = document.querySelector(".switcher");
const sliderBall = document.querySelector(".sliderBall");

const weekDayList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const cities = ['london', 'paris', 'new york', 'moscow', 'dubai', 'tokyo', 'singapore', 'los angeles', 'barcelona', 'madrid', 'rome', 'doha',
   'chicago', 'jakarta', 'abu dhabi', 'san francisco', 'amsterdam', 'st.petersburg', 'toronto', 'sydney', 'berlin', 'las vegas', 'washington', 'istanbul',
   'vienna', 'beijing', 'nagoya', 'seoul', 'prague', 'milan', 'tbilisi', 'batumi', 'san diego', 'hong kong', 'dublin', 'manchester',
   'liverpool', 'miami', 'budapest', 'sao paulo', 'munich', 'bangkok', 'frankfurt', 'delhi', 'lisbon', 'zagreb', 'osaka', 'san jose', 'riyadh',
   'tel aviv', 'cairo', 'buenos aires', 'taipei', 'rio de janeiro', 'kuwait city', 'warsaw', 'athens', 'helsinki', 'oslo', 'stockholm', 'vilnius',
   'talin', 'shanghai', 'santiago', 'marseille', 'bogota', 'cape town', 'abuja', 'lagos', 'algiers', 'rabat', 'mexico city', 'lima'];

window.addEventListener("load", () => {
   let randomNum = Math.floor(Math.random() * cities.length - 1);
   typeCity.value = cities[randomNum];
   submit.click();
   submit.click();
});

window.addEventListener('keydown', (e) => {
   if (e.key === 'Enter') submit.click();
})

submit.addEventListener('click', () => {
   typeCity.style.display = "unset";
   typeCity.classList.toggle("typeCity2");
})


submit.addEventListener('click', () => {
   let futureWeatherApiKey = "0883def437524c4d8f9596bc23c871d1";
   let futureWeatherApi = `https://api.weatherbit.io/v2.0/forecast/daily?city=${typeCity.value}&key=${futureWeatherApiKey}`;
   let currentCityTimeAPI = "566fbac33ef840c5ba0880df22286b87";
   let currentCityTime = `https://api.ipgeolocation.io/timezone?apiKey=${currentCityTimeAPI}&location=${typeCity.value}`;
   if (typeCity.value !== "") {
      typeCity.value = "";
      fetch(currentCityTime)
         .then(Response => {
            return Response.json()
         })
         .then(data => {
            const date = data.date_time_txt;
            let dateArray = date.split(" ");
            let month = dateArray[1];
            let day = dateArray[2].slice(0, 2);
            let time = dateArray[4].slice(0, 5);
            currentTime.innerText = `${month} ${day} - ${time}`;
            setBackground();
            function setBackground() {
               let partsOfTheDay = parseInt(time.substring(0, 2));
               if (partsOfTheDay >= 0) {
                  template.style.backgroundImage = "url(./Media/lateNightBackground.png)";
                  if (condition.innerText.includes("rain")) {
                     template.style.backgroundImage = "url(./Media/rain.png), url(./Media/lateNightBackground.png)";
                  }
               }
               if (partsOfTheDay > 5) {
                  template.style.backgroundImage = "url(./Media/morningBackgroundD.png)";
                  if (condition.innerText.includes("rain")) {
                     template.style.backgroundImage = "url(./Media/rain.png), url(./Media/morningBackgroundD.png)";
                  }
               }
               if (partsOfTheDay > 12) {
                  template.style.backgroundImage = "url(./Media/noonBackground.png)";
                  if (condition.innerText.includes("rain")) {
                     template.style.backgroundImage = "url(./Media/rain.png), url(./Media/noonBackground.png)";
                  }
               }
               if (partsOfTheDay > 16) {
                  template.style.backgroundImage = "url(./Media/eveningBackground.png)";
                  if (condition.innerText.includes("rain")) {
                     template.style.backgroundImage = "url(./Media/rain.png), url(./Media/eveningBackground.png)";
                  }
               }
               if (partsOfTheDay > 19) {
                  template.style.backgroundImage = "url(./Media/nightBackground.png)";
                  if (condition.innerText.includes("rain")) {
                     template.style.backgroundImage = "url(./Media/rain.png), url(./Media/nightBackground.png)";
                  }
               }
            }
         })
      checkFullForecast();

      function checkFullForecast() {
         fetch(futureWeatherApi)
            .then(Response => {
               return Response.json()
            })
            .then(data => {
               const temp_c = data.data[0].temp;
               const text = data.data[0].weather.description;
               const name = data.city_name;
               displayTemperature.innerHTML = Math.round(temp_c);
               condition.innerText = text;
               cityName.innerText = name.toUpperCase();
               const dateCheck = new Date();
               let day = dateCheck.getDay();
               weekdays.forEach(element => {
                  if (day > 6) day = 0;
                  element.innerText = weekDayList[day++]
               });
               for (let i = 0; i < 4; i++) {
                  const { icon } = data.data[i].weather;
                  forecastIcon[i].src = `./Media/icons/${icon}.png`;
                  const { high_temp, low_temp } = data.data[i];
                  highestTemperature[i].innerText = Math.round(high_temp);
                  lowestTemperature[i].innerText = Math.round(low_temp);
                  switcher.addEventListener('click', () => {
                     if (switcher.checked) {
                        highestTemperature[i].innerText = Math.round(high_temp * 1.8 + 32);
                        lowestTemperature[i].innerText = Math.round(low_temp * 1.8 + 32);
                     }
                     else {
                        highestTemperature[i].innerText = Math.round(high_temp);
                        lowestTemperature[i].innerText = Math.round(low_temp);
                     }
                  });
               }
               switcher.addEventListener('click', () => {
                  if (switcher.checked) {
                     sliderBall.style.transform = "translateX(12px)";
                     displayTemperature.innerHTML = Math.round(temp_c * 1.8 + 32);
                  }
                  else {
                     sliderBall.style.transform = "";
                     displayTemperature.innerHTML = Math.round(temp_c);
                  }
               });
            })
            .catch(err => console.log("ERROR"));
      }
   }
});
