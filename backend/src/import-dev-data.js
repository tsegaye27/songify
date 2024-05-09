const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Song = require("./models/Song");

dotenv.config({ path: "./config.env" });

const db = process.env.DB;

mongoose
  .connect(db)
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => {
    console.log("Failed to Connect to DB", err);
  });

const songs = JSON.parse(fs.readFileSync(`./src/songs.json`, "utf-8"));

const importData = async () => {
  try {
    await Song.create(songs);
    console.log("Data loaded successfully");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Song.deleteMany();
    console.log("Data deleted successfully");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
