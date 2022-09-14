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
app.put("/:slug", checkIfExists, (req, res) => {
  heroes[req.heroIndex] = {
    ...req.hero,
    ...req.body,
    slug: req.body.name.toLowerCase().replaceAll(" ", "-"),
  };
  res.json(heroes[req.heroIndex]);
});

app.delete("/:slug", checkIfExists, (req, res) => {
  heroes.splice(req.heroIndex, 1);
  res.status(204).json("hero deleted");
});

app.delete("/:slug/powers/:power", checkIfExists, (req, res) => {
  const { power } = req.params;

  const powerHero = heroes[req.heroIndex].power;
  const powerIndex = powerHero.findIndex((p) => {
    return p === power;
  });

  if (powerIndex > -1) {
    powerHero.splice(powerIndex, 1);
  } else {
    res.status(404).json("power not found");
  }

  res.json(heroes[req.heroIndex]);
});

module.exports = app;
