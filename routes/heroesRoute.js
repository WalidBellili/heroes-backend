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
app.get("/:slug/powers", checkIfExists, (req, res) => {
  res.json(req.hero.power);
});

app.post("/", (req, res) => {
  const hero = {
    ...req.body,
    slug: req.body.name.toLowerCase().replaceAll(" ", "-"),
  };
  heroes.push(hero);
  res.json(hero);
});

app.delete("/:slug", checkIfExists, (req, res) => {
  heroes.slice(req.heroIndex, 1);
  res.status(204).json("hero deleted");
});

module.exports = app;
