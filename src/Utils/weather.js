const request = require("request");

const weather = (long, lat, callback) => {
  const url =
    "https://api.darksky.net/forecast/f63eee0812508e9e6c782e61c5cbed2f/" +
    long +
    "," +
    lat;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services!");
    } else if (body.error) {
      callback("Unable to find location!");
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +
          " It is currently " +
          body.currently.temperature +
          " degrees out there. There is a " +
          body.currently.precipProbability +
          "% chance of rain."
      );
    }
  });
};

module.exports = weather;
