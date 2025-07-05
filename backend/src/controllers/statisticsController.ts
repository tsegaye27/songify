import { Status } from "../utils/enums";
import Song from "../models/song";
import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";

export const getStatistics = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const totalSongs = await Song.countDocuments();

    const uniqueArtists = await Song.distinct("artist");
    const totalArtists = uniqueArtists.length;

    const uniqueAlbums = await Song.distinct("album");
    const totalAlbums = uniqueAlbums.filter(
      (album) => album && album.trim() !== "",
    ).length;

    const uniqueGenres = await Song.distinct("genre");
    const totalGenres = uniqueGenres.filter(
      (genre) => genre && genre.trim() !== "",
    ).length;

    const songsByGenre = await Song.aggregate([
      {
        $match: {
          $and: [
            { genre: { $ne: null } },
            { genre: { $ne: "" } },
            { genre: { $exists: true } },
          ],
        },
      },
      {
        $group: {
          _id: "$genre",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          genre: "$_id",
          count: 1,
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    const songsByArtist = await Song.aggregate([
      {
        $group: {
          _id: "$artist",
          songCount: { $sum: 1 },
          albums: { $addToSet: "$album" },
        },
      },
      {
        $project: {
          _id: 0,
          artist: "$_id",
          songCount: 1,
          albumCount: {
            $size: {
              $filter: {
                input: "$albums",
                cond: {
                  $and: [{ $ne: ["$$this", null] }, { $ne: ["$$this", ""] }],
                },
              },
            },
          },
        },
      },
      {
        $sort: { songCount: -1 },
      },
    ]);

    const songsByAlbum = await Song.aggregate([
      {
        $match: {
          $and: [
            { album: { $ne: null } },
            { album: { $ne: "" } },
            { album: { $exists: true } },
          ],
        },
      },
      {
        $group: {
          _id: { album: "$album", artist: "$artist" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          album: "$_id.album",
          artist: "$_id.artist",
          songCount: "$count",
        },
      },
      {
        $sort: { songCount: -1 },
      },
    ]);

    const statistics = {
      totals: {
        songs: totalSongs,
        artists: totalArtists,
        albums: totalAlbums,
        genres: totalGenres,
      },
      songsByGenre,
      songsByArtist,
      songsByAlbum,
    };

    res.status(httpStatus.OK).json({
      status: Status.Success,
      message: "Statistics fetched successfully",
      data: { statistics },
    });
  } catch (error) {
    return next(error);
  }
};
