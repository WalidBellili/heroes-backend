const express = require("express");
const app = express();
const heroes = require("../heroes.json");
const {
  checkIfExists,
  checkIfOnPostAlreadyExist,
} = require("../middleware/heroes");

app.get("/", (req, res) => {
  res.json(heroes);
});
app.get("/:slug", checkIfExists, (req, res) => {
  res.json(req.hero);
});
app.get("/:slug/powers", checkIfExists, (req, res) => {
  res.json(req.hero.power);
});

app.post("/", checkIfOnPostAlreadyExist, (req, res) => {
  const hero = {
    ...req.body,
    slug: req.body.name.toLowerCase().replaceAll(" ", "-"),
  };
  heroes.push(hero);
  res.json(hero);
});

app.put("/:slug/powers", checkIfExists, (req, res) => {
  const { power } = req.body;

  heroes[req.heroIndex].power.push(power);
  res.json(heroes[req.heroIndex]);
});

app.delete("/:slug", checkIfExists, (req, res) => {
  heroes.slice(req.heroIndex, 1);
  res.status(204).json("hero deleted");
});

module.exports = app;
