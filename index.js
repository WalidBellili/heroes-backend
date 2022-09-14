const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const morgan = require("morgan");

app.use(morgan("tiny"));
app.use(cors("*"));

app.listen(port, () => {
  console.log(`server running at ${port}`);
});
