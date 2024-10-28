document.addEventListener('DOMContentLoaded', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      const url1 = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
      const url2 = `https://weather-proxy.freecodecamp.rocks/api/current?lat=${latitude}&lon=${longitude}`;

      fetch(url1)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            const city = data.address.town;
            const h2Elem = document.getElementById('location');
            h2Elem.textContent += `${city}`;
          } else {
            console.error('No city data received!');
          }
        })
        .catch((error) => console.error('Fetch city error:', error));


      fetch(url2)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            console.log(data);
            const option = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }
            const date = new Date().toLocaleDateString('de-DE', option)
            const rootElem = document.getElementById('root');

            let isCelsius = true;
            let {temp:tempCelsius,temp_min:minTempCelsius,temp_max:maxTempCelsius}=data.main;
           

            rootElem.innerHTML += `
           <img class='weather_icon' src="${data.weather[0].icon}" alt="weather-icon">
           <h3 class="current_temp">${tempCelsius}&#8451</h3>
          <div class="temps_container">
           <p class="temp_min">L: ${minTempCelsius}&#8451</p>
           <p class="temp_max">H: ${maxTempCelsius}&#8451</p>
           </div>
           <p>${date}</p>
           <button class='toggleBtn'>Farenheit</button>
           `;

            const toggleBtn = document.querySelector('.toggleBtn');

            toggleBtn.addEventListener('click', () => {
              const currentTemp = document.querySelector('.current_temp');
              const minTemp = document.querySelector('.temp_min');
              const MaxTemp = document.querySelector('.temp_max');


              if (isCelsius) {
                const currentTempFarenheit = (tempCelsius * 9 / 5) + 32;
                const minTempFarenheit = (minTempCelsius * 9 / 5) + 32;
                const maxTempFarenheit = (maxTempCelsius * 9 / 5) + 32;

                currentTemp.innerHTML = `${currentTempFarenheit.toFixed(2)}&#8457;`;
                minTemp.innerHTML = `L: ${minTempFarenheit.toFixed(2)}&#8457;`;
                MaxTemp.innerText = `H: ${maxTempFarenheit.toFixed(2)}℉`;
                // akhari fuer test hast 

                toggleBtn.textContent='Celsius';

              } else {
                currentTemp.innerHTML = `${tempCelsius}&#8451`;
                minTemp.innerHTML = `L: ${minTempCelsius}&#8451`;
                MaxTemp.innerHTML = `H: ${maxTempCelsius}&#8451`;
                toggleBtn.textContent='Farenheit';

              }
              isCelsius = !isCelsius;
            })

          } else {
            console.log('No weather data recived!');
          }

        })
        .catch((err) => console.error('Fetch weather error', err))

    });
  }


});
