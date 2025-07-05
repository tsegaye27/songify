import { Request, Response, NextFunction } from "express";
import Song from "../models/song";
import httpStatus from "http-status";
import { responseMessages } from "../utils/messages/responseMessages";
import { Status } from "../utils/enums";
import AppError from "../errors/appErrors";
import { errorMessages } from "../utils/messages/errorMessages";

export const getAllSongs = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { page = 1, limit = 10, search, artist, genre, album } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    let query: any = {};

    if (search) {
      query.$text = { $search: search as String };
    }

    if (artist) {
      query.artist = { $regex: artist as string, $options: "i" };
    }

    if (genre) {
      query.genre = { $regex: genre as string, $options: "i" };
    }

    if (album) {
      query.album = { $regex: album as string, $options: "i" };
    }

    const songs = await Song.find(query)
      .sort(search ? { score: { $meta: "textScore" } } : { createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await Song.countDocuments(query);

    res.status(httpStatus.OK).json({
      status: Status.Success,
      message: responseMessages.songApi.fetchSuccess,
      data: {
        songs,
        pagination: {
          currentPage: pageNum,
          totalPages: Math.ceil(total / limitNum),
          totalSongs: total,
          hasNextPage: pageNum < Math.ceil(total / limitNum),
          hasPrevPage: pageNum > 1,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getSongById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const song = await Song.findById(id);

    if (!song) {
      return next(
        new AppError(errorMessages.songNotFound, httpStatus.NOT_FOUND),
      );
    }

    res.status(httpStatus.OK).json({
      status: Status.Success,
      message: responseMessages.songApi.fetchSuccess,
      data: { song },
    });
  } catch (error) {
    next(error);
  }
};

export const createSong = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const songData = req.body;
    const song = await Song.createSong(songData);

    res.status(httpStatus.CREATED).json({
      status: Status.Success,
      message: responseMessages.songApi.createSuccess,
      data: { song },
    });
  } catch (error) {
    next(error);
  }
};

export const updateSong = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const song = await Song.updateSong(id, updateData);

    if (!song) {
      return next(
        new AppError(errorMessages.songNotFound, httpStatus.NOT_FOUND),
      );
    }

    res.status(httpStatus.OK).json({
      status: Status.Success,
      message: responseMessages.songApi.updateSuccess,
      data: { song },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSong = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const song = await Song.deleteSong(id);

    if (!song) {
      return next(
        new AppError(errorMessages.songNotFound, httpStatus.NOT_FOUND),
      );
    }

    res.status(httpStatus.OK).json({
      status: Status.Success,
      message: responseMessages.songApi.deleteSuccess,
    });
  } catch (error) {
    next(error);
  }
};

export const searchSongs = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { q } = req.query;

    if (!q) {
      return next(
        new AppError(errorMessages.searchQueryRequired, httpStatus.BAD_REQUEST),
      );
    }

    const songs = await Song.searchSongs(q as string);

    res.status(httpStatus.OK).json({
      status: Status.Success,
      message: responseMessages.songApi.searchSuccess,
      data: { songs, query: q },
    });
  } catch (error) {
    next(error);
  }
};

export const getDistinctGenres = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const genres = await Song.distinct("genre");

    const filteredGenres = genres.filter((g) => g && g.trim() !== "");
    res.status(httpStatus.OK).json({
      status: Status.Success,
      data: { genres: filteredGenres },
    });
  } catch (error) {
    next(error);
  }
};

export const getDistinctAlbums = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const albums = await Song.distinct("album");

    const filteredGenres = albums.filter((a) => a && a.trim() !== "");
    res.status(httpStatus.OK).json({
      status: Status.Success,
      data: { albums: filteredGenres },
    });
  } catch (error) {
    next(error);
  }
};
