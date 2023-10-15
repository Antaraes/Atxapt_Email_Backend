const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routers = require("./routers/index");
app.use(cors());
app.use(bodyParser.json());
app.use(routers);

require("dotenv").config();

const dbUri = process.env.DATABASE_URL;
const PORT = process.env.PORT || 3000;
mongoose
  .connect(dbUri)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server listening ");
    });
  })
  .catch((err) => console.log(err));
