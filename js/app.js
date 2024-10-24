document.addEventListener('DOMContentLoaded', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      const url1 = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
      const url2 = `https://weather-proxy.freecodecamp.rocks/api/current?lat=${latitude}&lon=${longitude}`;

      fetch(url2)
        .then((res) => res.json())
        .then((data) => {
          if(data){
            console.log(data);
            const rootElem = document.getElementById('root')
           rootElem.innerHTML +=`
           <img src="${data.weather[0].icon}" alt="weather-icon">
           <p>Current Temprature: ${data.main.temp} C</p>
           <p>Min-Temprature: ${data.main.temp_min}</p>
           <p>Max-Temprature: ${data.main.temp_max}</p>`

          }else{
            console.log('No weather data recived!');
            
          }

        })
        .catch((err) => console.error('Fetch weather error', err))




      fetch(url1)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            const city = data.address.town;
            const pElem = document.getElementById('location');
            pElem.textContent += ` City: ${city}`;
          } else {
            console.error('No city data received!');
          }
        })
        .catch((error) => console.error('Fetch city error:', error)); // Füge einen Fehlerbehandler hinzu
    });
  }


});
