const express = require("express");
const app = express();
const heroesJson = require("../heroes.json");
const { verifyHero, verifySlug } = require("../middleware/heroes");

app.get("/", (req, res) => {
  res.json(heroesJson);
});

// on gere l'id dynamique
app.get("/:slug", verifySlug, (req, res) => {
  res.json(slug);
});

// ici on recupere les pouvoir d'un hero
app.get("/:slug/powers", verifySlug, (req, res) => {
  res.json(req.hero.power);
  // res.json(isHerosExist.power);
});

// ici on met un nouvelle obj et on verifie les doublons
app.post("/", verifyHero, (req, res) => {
  const newHero = {
    slug: req.body.slug,
    name: req.body.name,
    power: req.body.power,
    color: req.body.color,
    isAlive: req.body.isAlive,
    age: req.body.age,
  };
  heroesJson.push(newHero);
  res.json(newHero);
});

// trouver le héros lui ajouter un pouvoir
app.put("/:slug/powers", verifySlug, (req, res) => {
  heroesJson[req.heroIndex].power.push(req.body.power);
  // console.log(req.hero);
  res.json(heroesJson[req.heroIndex]);
});

// Delete un héros

app.delete("/:slug", verifySlug, (req, res) => {
  heroesJson.splice(1);
  res.json(heroesJson);
});

module.exports = app;
