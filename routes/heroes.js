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
  res.json(slug);
});

app.get("/:slug/powers", (req, res) => {
  const power = heroesJson.find((heroe) => {
    return heroe.slug === req.params.slug;
  });
  res.json(power.power);
});

// Fonction qui servira de middleware
// const notTwiceSameId = () => {
//   const { name } = req.params;
//   const heroDouble = heroesJson.find((hero) => hero.name === name);

//   if (heroDouble) {
//     res.json(heroDouble);
//   } else {
//     res.status(409).send("This heroe already exists");
//   }
// };

app.post("/", (req, res) => {
  const newHero = {
    slug: req.body.slug,
    name: req.body.name,
    power: req.body.power,
    color: req.body.color,
    isAlive: req.body.isAlive,
    age: req.body.age,
  };

  const sameName = heroesJson.find((hero) => {
    return hero.name === req.body.name;
  });
  if (!sameName) {
    heroesJson.push(newHero);
    res.json(newHero);
  } else {
    res.status(409).send("This hero already exists");
  }
});

// app.put("/heroes/:slug/powers", (req, res) => {});

module.exports = app;
