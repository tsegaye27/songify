const mongoose = require("mongoose");
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;
const db = process.env.DB;

app.use(express.json());

app.use("/songs", songsRouter);

mongoose
  .connect(`${db}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection established successfully");
  })
  .catch((err) => {
    console.log("Failed to connect to DB", err);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
