const heroesJson = require("../heroes.json");
const _ = require("lodash");
// ici on test les doublon du 1er post l29
const verifyHero = (req, res, next) => {
  const sameName = heroesJson.find((hero) => {
    return hero.name === req.body.name;
  });
  if (!sameName) {
    // heroesJson.push(newHero);
    // res.json(newHero);
    next();
  } else {
    res.status(409).json("This hero already exists");
  }
};

// on verifie si le hero existe

const verifySlug = (req, res, next) => {
  const checkSlug = req.params.slug;

  const findIndex = heroesJson.findIndex((hero) => {
    return hero.slug === checkSlug;
  });
  //   console.log(findIndex);

  const isHerosExist = heroesJson.find((hero) => {
    return hero.slug === checkSlug;
  });
  if (isHerosExist) {
    req.hero = isHerosExist;
    req.heroIndex = findIndex;
    next();
  } else {
    res.status(404).json("Ce héros n'existe pas");
  }
};

const validateHero = (req, res, next) => {
  //   const stringifiedValues = JSON.stringify(req.hero);
  //   const stringifyedArrayJson = JSON.stringify(heroesJson);

  console.log(req.hero)

  const isEqualKeys = Object.keys(heroesJson[0]);
  //   console.log(isEqualKeys);
  const keysOfJson = Object.keys(req.body);
  //   console.log(keysOfJson);

  const isEqual = _.isEqual(isEqualKeys, keysOfJson);
  console.log(isEqual);

  if (isEqual) {
    next();
  } else {
    res.status(404).json("Ce héros n'existe pas");
  }
};

module.exports = {
  verifyHero: verifyHero,
  verifySlug: verifySlug,
  validateHero: validateHero,
};
