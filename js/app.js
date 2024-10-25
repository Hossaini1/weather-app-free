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
            const rootElem = document.getElementById('root')
            rootElem.innerHTML += `
          
           <img class='weather_icon' src="${data.weather[0].icon}" alt="weather-icon">
           <h3 class="current_temp">${data.main.temp}&#8451</h3>
          <div class="temps_container">
           <p>L: ${data.main.temp_min}&#8451</p>
           <p>H: ${data.main.temp_max}&#8451</p></div>
           <p>${date}</p>
         
           
           `
          } else {
            console.log('No weather data recived!');
          }

        })
        .catch((err) => console.error('Fetch weather error', err))

    });
  }


});
