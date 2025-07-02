import mongoose from "mongoose";
import { MONGO_URI } from "../config/environments";
import Song from "../models/song";
import User from "../models/user";
import Playlist from "../models/playlist";
import logger from "../config/winston";

const sampleSongs = [
  {
    title: "Bohemian Rhapsody",
    artist: "Queen",
    duration: 355,
    genre: "Rock",
    album: "A Night at the Opera",
    year: 1975,
  },
  {
    title: "Hotel California",
    artist: "Eagles",
    duration: 391,
    genre: "Rock",
    album: "Hotel California",
    year: 1976,
  },
  {
    title: "Imagine",
    artist: "John Lennon",
    duration: 183,
    genre: "Rock",
    album: "Imagine",
    year: 1971,
  },
  {
    title: "Hey Jude",
    artist: "The Beatles",
    duration: 431,
    genre: "Rock",
    album: "The Beatles 1967-1970",
    year: 1968,
  },
  {
    title: "Smells Like Teen Spirit",
    artist: "Nirvana",
    duration: 301,
    genre: "Grunge",
    album: "Nevermind",
    year: 1991,
  },
  {
    title: "Thriller",
    artist: "Michael Jackson",
    duration: 357,
    genre: "Pop",
    album: "Thriller",
    year: 1982,
  },
  {
    title: "Sweet Child o' Mine",
    artist: "Guns N' Roses",
    duration: 356,
    genre: "Rock",
    album: "Appetite for Destruction",
    year: 1987,
  },
  {
    title: "Boys Don't Cry",
    artist: "The Cure",
    duration: 142,
    genre: "Post-Punk",
    album: "Boys Don't Cry",
    year: 1980,
  },
  {
    title: "Shape of You",
    artist: "Ed Sheeran",
    duration: 233,
    genre: "Pop",
    album: "÷ (Divide)",
    year: 2017,
  },
  {
    title: "Rolling in the Deep",
    artist: "Adele",
    duration: 228,
    genre: "Soul",
    album: "21",
    year: 2010,
  },
];

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    logger.info("Connected to MongoDB for seeding");
  } catch (error) {
    logger.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Song.deleteMany({});
    await Playlist.deleteMany({});
    logger.info("Cleared existing data");

    // Create songs
    const createdSongs = await Song.create(sampleSongs);
    logger.info(`Created ${createdSongs.length} songs`);

    // Find a user to create sample playlists (you'll need at least one user)
    const user = await User.findOne();
    if (user) {
      const samplePlaylists = [
        {
          name: "Rock Classics",
          description: "The best rock songs of all time",
          owner: user._id,
          songs: createdSongs.slice(0, 4).map((song) => song._id),
          isPublic: true,
          tags: ["rock", "classic", "hits"],
        },
        {
          name: "Modern Hits",
          description: "Popular songs from recent years",
          owner: user._id,
          songs: createdSongs.slice(8, 10).map((song) => song._id),
          isPublic: true,
          tags: ["modern", "pop", "hits"],
        },
      ];

      const createdPlaylists = await Playlist.create(samplePlaylists);
      logger.info(`Created ${createdPlaylists.length} playlists`);
    }

    logger.info("Data seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    logger.error("Error during data seeding:", error);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await connectDB();

    await Song.deleteMany({});
    await Playlist.deleteMany({});

    logger.info("Data deleted successfully!");
    process.exit(0);
  } catch (error) {
    logger.error("Error during data deletion:", error);
    process.exit(1);
  }
};

// Command line arguments
if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
} else {
  logger.info("Usage:");
  logger.info("npm run seed -- --import  # Import sample data");
  logger.info("npm run seed -- --delete  # Delete all data");
}
