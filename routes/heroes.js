const express = require("express");
const app = express();
const heroesJson = require("../heroes.json");

app.get("/", (req, res) => {
  res.json(heroesJson);
});

app.get("/:slug", (req, res) => {
  const slug = heroesJson.find((heroe) => {
    return heroe.slug === req.params.slug;
  });
  res.send(slug);
});

app.get("/:slug/powers", (req, res) => {
  const power = heroesJson.find((heroe) => {
    return heroe.slug === req.params.slug;
  });
  res.send(power.power);
});

app.post("/", (req, res) => {
  const newHero = {
    slug: req.body.slug,
    name: req.body.name,
    power: req.body.power,
    color: req.body.color,
    isAlive: req.body.isAlive,
    age: req.body.age,
  };
  console.log(newHero);
  heroesJson.push(newHero);
  console.log(heroesJson);
});

app.put("/heroes/:slug/powers", (req, res) => {
    
});

module.exports = app;
