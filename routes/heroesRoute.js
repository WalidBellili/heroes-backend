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
app.delete("/:slug", checkIfExists, (req, res) => {
  heroes.slice(req.heroIndex, 1);
  res.status(204).json("hero deleted");
});

module.exports = app;
