console.log("Client side javascript is loaded!");

// XPP8+PVR %2342 V R Balaji, Prashanti Niketan Layout, Seetharampalya - Hoodi Rd, Seetharampalya, Hoodi, Bengaluru, Karnataka 560048

const weatherForm = document.querySelector('form');
const searchEl = document.querySelector('input');
const msgOne = document.querySelector('#msg-one');
const msgTwo = document.querySelector('#msg-two');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = searchEl.value;
    const url = `http://localhost:3000/weather?address=${location}`;

    msgOne.textContent = 'Loading..';
    msgTwo.textContent = '';

    fetch(url)
        .then((response) => response.json())
        .then(data => {
            if (data.error) {
                msgOne.textContent = data.error;
            }
            else {
                msgOne.textContent = data.address;
                msgTwo.textContent = data.weather_description;
            }
        })
})