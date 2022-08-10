const express = require("express");
const app = express();
const heroesJson = require("../heroes.json");

app.get("/", (req, res) => {
  res.json(heroesJson);
});
app.get("/:slug", (req, res) => {
  const { slug } = req.params;

  res.send(slug);
});

module.exports = app;
