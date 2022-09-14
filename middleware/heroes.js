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
    // req.heroIndex = heroIndex;
    next();
  } else {
    res.status(404).json("not found");
  }
};

module.exports = { checkIfExists };
