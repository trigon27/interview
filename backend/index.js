const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const userRoutes = require("./routes/user");
const todo = require("./routes/Todos");
const port = process.env.PORT || 4000;
const cors = require("cors");

// const User = require("./models/Users");
// const TodoRoutes = require("./routes/TodoRoutes");

const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: whitelist,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/", userRoutes);
app.use("/", todo);
// app.use("/", TodoRoutes);
const connectionUrl = process.env.MONGOURL;
const mongoURI = connectionUrl;
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
