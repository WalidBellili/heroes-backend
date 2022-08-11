const express = require("express");
const app = express();
const heroesJson = require("../heroes.json");

const {
  verifyHero,
  verifySlug,
  validateHero,
} = require("../middleware/heroes");

app.get("/", (req, res) => {
  res.json(heroesJson);
});

// on gere l'id dynamique
app.get("/:slug", verifySlug, (req, res) => {
  res.json(req.hero.slug);
});

// ici on recupere les pouvoir d'un hero
app.get("/:slug/powers", verifySlug, (req, res) => {
  res.json(req.hero.power);
  // res.json(isHerosExist.power);
});

// ici on met un nouvelle obj et on verifie les doublons
app.post("/", verifyHero, validateHero, (req, res) => {
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
app.put("/:slug/powers", verifySlug, validateHero, (req, res) => {
  heroesJson[req.heroIndex].power.push(req.body.power);
  // console.log(req.hero);
  res.json(heroesJson[req.heroIndex]);
});

// Delete un héros

app.delete("/:slug", verifySlug, (req, res) => {
  heroesJson.splice(req.heroIndex, 1);
  res.json(`${req.hero.slug} a bien été éffacé`);
});

// Delete un power

app.delete("/:slug/powers/:power", verifySlug, (req, res) => {
  req.hero.power.splice(req.heroIndex.power, 1);
  res.json(`${req.hero.power} a bien été éffacé`);
});

// le put qui remplace toutes les valeurs

app.put("/:slug", verifySlug, validateHero, (req, res) => {
  const newObjValues = {
    slug: req.body.slug,
    name: req.body.name,
    power: req.body.power,
    color: req.body.color,
    isAlive: req.body.isAlive,
    age: req.body.age,
  };
  heroesJson[req.heroIndex] = newObjValues;
  res.json(newObjValues);

  // console.log(isEqualKeys);
  // const diff = difference(heroesJson, isEqualKeys);
  // console.log(diff);
});

module.exports = app;
