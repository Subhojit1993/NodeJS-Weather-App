console.log("Client side javascript is loaded!");

// XPP8+PVR %2342 V R Balaji, Prashanti Niketan Layout, Seetharampalya - Hoodi Rd, Seetharampalya, Hoodi, Bengaluru, Karnataka 560048

const weatherForm = document.querySelector('form');
const searchEl = document.querySelector('input');
const weather = document.querySelector('#weather');
const description = document.querySelector('#description');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = searchEl.value;
    const url = `/weather?address=${location}`;

    weather.textContent = 'Loading..';
    weather.classList.add('maximize');
    description.innerHTML = '';

    fetch(url)
        .then((response) => response.json())
        .then(data => {
            if (data.error) {
                weather.textContent = data.error;
            }
            else {
                weather.classList.remove('maximize');
                weather.innerHTML = data.weather_icons && data.weather_icons.length > 0 ? `
                    <img src=${data.weather_icons[0]} />
                ` : null;
                description.innerHTML = `
                    <p>Location: ${data.address}</p>
                    <p>It's ${data.weather_description}!</p>
                    <p>With the Wind Speed being ${data.wind_speed} km / hr,</p>
                    <p>Today, it's ${data.humidity}% humid!</p>
                `;
            }
        })
})