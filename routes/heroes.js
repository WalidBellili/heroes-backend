const express = require("express");
const app = express();
const heroesJson = require("../heroes.json");

app.get("/", (req, res) => {
  res.json(heroesJson);
});

module.exports = app;
