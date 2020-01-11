const path = require("path");
const express = require("express");
const hbs = require("hbs");
const request = require("request");
const geocode = require("./Utils/geocode");
const weather = require("./Utils/weather");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Set up handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Yoadd"
  });
});

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Yoadd"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    content: "Help Works!",
    name: "Yoadd"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    content: "About Works!",
    name: "Yoadd"
  });
});

const response = app.get("/weather", (req, res) => {
  if (!req.query.address)
    return res.send({
      error: "You must provide an address"
    });

  geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
    if (error) return res.send({ error });

    weather(longitude, latitude, (error, forecast) => {
      if (error) return res.send({ error });

      return res.send({
        forecast,
        location,
        address: req.query.address
      });
    });
  });
});

app.get("*", (req, res) => {
  res.render("pageNotFound");
});

app.listen(3001, () => {
  console.log("Server is up on port 3001.");
});

module.exports = {
  response
}
