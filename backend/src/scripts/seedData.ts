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
    genre: "Rock",
    album: "A Night at the Opera",
  },
  {
    title: "Hotel California",
    artist: "Eagles",
    genre: "Rock",
    album: "Hotel California",
  },
  {
    title: "Imagine",
    artist: "John Lennon",
    genre: "Rock",
    album: "Imagine",
  },
  {
    title: "Hey Jude",
    artist: "The Beatles",
    genre: "Rock",
    album: "The Beatles 1967-1970",
  },
  {
    title: "Smells Like Teen Spirit",
    artist: "Nirvana",
    genre: "Grunge",
    album: "Nevermind",
  },
  {
    title: "Thriller",
    artist: "Michael Jackson",
    genre: "Pop",
    album: "Thriller",
  },
  {
    title: "Sweet Child o' Mine",
    artist: "Guns N' Roses",
    genre: "Rock",
    album: "Appetite for Destruction",
  },
  {
    title: "Boys Don't Cry",
    artist: "The Cure",
    genre: "Post-Punk",
    album: "Boys Don't Cry",
  },
  {
    title: "Shape of You",
    artist: "Ed Sheeran",
    genre: "Pop",
    album: "÷ (Divide)",
  },
  {
    title: "Rolling in the Deep",
    artist: "Adele",
    genre: "Soul",
    album: "21",
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
