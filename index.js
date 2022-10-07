// require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const morgan = require("morgan");

const heroesRoute = require("./routes/heroesRoute");

app.use(morgan("tiny"));
app.use(cors("*"));
app.use(express.json());

app.use("/heroes", heroesRoute);

app.listen(port, () => {
  console.log(`server running at ${port}`);
});
