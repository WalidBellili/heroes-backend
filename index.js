const express = require("express");
const app = express();
const port = 5000;
const morgan = require("morgan");
const cors = require("cors");
const heroesRoutes = require("./routes/heroes");
const heroesJson = require("./heroes.json");

app.use(morgan("tiny"));
app.use(cors());
app.use("/heroes", heroesRoutes);




app.listen(port, () => {
  console.log("Server started on port: " + port);
});
