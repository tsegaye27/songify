const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config({ path: "config.env" });
const songsRouter = require("./routes/songsRouter");
const playlistsRouter = require("./routes/playlistsRouter");

const app = express();

const port = process.env.PORT;
const db = process.env.DB;

app.use(express.json());
app.use(morgan("dev"));

app.use(cors());
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

app.use("/songs", songsRouter);
app.use("/playlists", playlistsRouter);

mongoose
  .connect(db)
  .then(() => {
    console.log("DB connection established successfully");
  })
  .catch((err) => {
    console.log("Failed to connect to DB", err);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
