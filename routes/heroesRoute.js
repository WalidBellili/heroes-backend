const express = require("express");
const app = express();
const heroes = require("../heroes.json");
const { checkIfExists } = require("../middleware/heroes");

app.get("/", (req, res) => {
  res.json(heroes);
});
app.get("/:slug", checkIfExists, (req, res) => {
  res.json(req.hero);
});

module.exports = app;
