const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const dotenv = require('dotenv');
app.use(
  cors({
    origin: "*",
  })
);

dotenv.config({path: './config.env'})
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const router = require("./Routes/routes");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(process.env.databaseLink);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function callback() {
  console.log("Database Connected!");
});

app.use("/api", router);
app.listen(process.env.port, () => {
  console.log("Server Running...");
});
