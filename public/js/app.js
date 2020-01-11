const form = document.querySelector("form");
const input = document.querySelector("input");
const loc = document.querySelector("#loc");
const forecast = document.querySelector("#forecast");

form.addEventListener("submit", e => {
  e.preventDefault();
  fetch("http://localhost:3001/weather?address=" + input.value).then(
    response => {
      response.json().then(data => {
        if (data.error) {
          loc.textContent = data.error;
        }
        loc.textContent = data.location;
        forecast.textContent = data.forecast;
      });
    }
  );
});
