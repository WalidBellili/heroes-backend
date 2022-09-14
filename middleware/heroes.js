const heroes = require("../heroes.json");

const checkIfExists = (req, res, next) => {
  const { slug } = req.params;

  const hero = heroes.find((hero) => {
    return slug === hero.slug;
  });

  const heroIndex = heroes.findIndex((hero) => {
    return slug === hero.slug;
  });

  if (hero) {
    req.hero = hero;
    req.heroIndex = heroIndex;
    next();
  } else {
    res.status(404).json("not found");
  }
};

const checkIfOnPostAlreadyExist = (req, res, next) => {
  const { name } = req.body;

  const hero = heroes.find((hero) => {
    return hero.name === name;
  });

  if (!hero) {
    next();
  } else {
    res.status(409).json("hero already exists");
  }
};

const validateHero = (req, res, next) => {
  const modelKeys = Object.keys(heroes[0]);
  console.log(modelKeys);
  const keysFrombody = Object.keys(req.body);
  console.log(keysFrombody);
};

module.exports = { checkIfExists, checkIfOnPostAlreadyExist, validateHero };
