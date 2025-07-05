import { Request, Response, NextFunction } from "express";
import Playlist from "../models/playlist";
import Song from "../models/song";
import { UserInterface } from "../models/user/types";
import { Status } from "../utils/enums";
import httpStatus from "http-status";
import { responseMessages } from "../utils/messages/responseMessages";
import AppError from "../errors/appErrors";
import { errorMessages } from "../utils/messages/errorMessages";

export const getUserPlaylists = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req.user as UserInterface)._id;
    const playlists = await Playlist.findPlaylistsByOwner(userId);

    res.status(httpStatus.OK).json({
      status: Status.Success,
      message: responseMessages.playlistApi.fetchSuccess,
      data: { playlists },
    });
  } catch (error) {
    next(error);
  }
};

export const getPublicPlaylists = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const playlists = await Playlist.findPublicPlaylists();
    const paginatedPlaylists = playlists.slice(skip, skip + limitNum);
    const total = playlists.length;

    res.status(httpStatus.OK).json({
      status: Status.Success,
      message: responseMessages.playlistApi.fetchSuccess,
      data: {
        playlists: paginatedPlaylists,
        pagination: {
          currentPage: pageNum,
          totalPages: Math.ceil(total / limitNum),
          totalPlaylists: total,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getPlaylistById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const playlist = await Playlist.findPlaylistById(id);

    if (!playlist) {
      return next(
        new AppError(errorMessages.playlistNotFound, httpStatus.NOT_FOUND),
      );
    }

    const isOwner =
      (playlist.owner as unknown as UserInterface)._id.toString() ===
      (req.user as UserInterface)._id.toString();
    if (!playlist.isPublic && !isOwner) {
      return next(
        new AppError(errorMessages.playlistAccessDenied, httpStatus.FORBIDDEN),
      );
    }

    res.status(httpStatus.OK).json({
      status: Status.Success,
      message: responseMessages.playlistApi.fetchSuccess,
      data: { playlist },
    });
  } catch (error) {
    next(error);
  }
};

export const createPlaylist = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const playlistData = {
      ...req.body,
      owner: (req.user as UserInterface)._id,
    };

    const playlist = await Playlist.createPlaylist(playlistData);
    await playlist.populate("songs");

    res.status(httpStatus.CREATED).json({
      status: Status.Success,
      message: responseMessages.playlistApi.createSuccess,
      data: { playlist },
    });
  } catch (error) {
    next(error);
  }
};

export const updatePlaylist = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Check if playlist exists and user owns it
    const existingPlaylist = await Playlist.findById(id);
    if (!existingPlaylist) {
      return next(
        new AppError(errorMessages.playlistNotFound, httpStatus.NOT_FOUND),
      );
    }

    if (
      existingPlaylist.owner.toString() !==
      (req.user as UserInterface)._id.toString()
    ) {
      return next(
        new AppError(errorMessages.playlistAccessDenied, httpStatus.FORBIDDEN),
      );
    }

    const playlist = await Playlist.updatePlaylist(id, updateData);

    res.status(httpStatus.OK).json({
      status: Status.Success,
      message: responseMessages.playlistApi.updateSuccess,
      data: { playlist },
    });
  } catch (error) {
    next(error);
  }
};

export const deletePlaylist = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    // Check if playlist exists and user owns it
    const existingPlaylist = await Playlist.findById(id);
    if (!existingPlaylist) {
      return next(
        new AppError(errorMessages.playlistNotFound, httpStatus.NOT_FOUND),
      );
    }

    if (
      existingPlaylist.owner.toString() !==
      (req.user as UserInterface)._id.toString()
    ) {
      return next(
        new AppError(errorMessages.playlistAccessDenied, httpStatus.FORBIDDEN),
      );
    }

    await Playlist.deletePlaylist(id);

    res.status(httpStatus.OK).json({
      status: Status.Success,
      message: responseMessages.playlistApi.deleteSuccess,
    });
  } catch (error) {
    next(error);
  }
};

export const addSongToPlaylist = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { songId } = req.body;

    // Check if playlist exists and user owns it
    const existingPlaylist = await Playlist.findById(id);
    if (!existingPlaylist) {
      return next(
        new AppError(errorMessages.playlistNotFound, httpStatus.NOT_FOUND),
      );
    }

    if (
      existingPlaylist.owner.toString() !==
      (req.user as UserInterface)._id.toString()
    ) {
      return next(
        new AppError(errorMessages.playlistAccessDenied, httpStatus.FORBIDDEN),
      );
    }

    // Check if song exists
    const song = await Song.findById(songId);
    if (!song) {
      return next(
        new AppError(errorMessages.songNotFound, httpStatus.NOT_FOUND),
      );
    }

    const playlist = await Playlist.addSongToPlaylist(id, songId);

    res.status(httpStatus.OK).json({
      status: Status.Success,
      message: responseMessages.playlistApi.songAddSuccess,
      data: { playlist },
    });
  } catch (error) {
    next(error);
  }
};

export const removeSongFromPlaylist = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, songId } = req.params;

    // Check if playlist exists and user owns it
    const existingPlaylist = await Playlist.findById(id);
    if (!existingPlaylist) {
      return next(
        new AppError(errorMessages.playlistNotFound, httpStatus.NOT_FOUND),
      );
    }

    if (
      existingPlaylist.owner.toString() !==
      (req.user as UserInterface)._id.toString()
    ) {
      return next(
        new AppError(errorMessages.playlistAccessDenied, httpStatus.FORBIDDEN),
      );
    }

    const playlist = await Playlist.removeSongFromPlaylist(id, songId);

    res.status(httpStatus.OK).json({
      status: Status.Success,
      message: responseMessages.playlistApi.songRemoveSuccess,
      data: { playlist },
    });
  } catch (error) {
    next(error);
  }
};

export const searchPlaylists = async (
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

    const playlists = await Playlist.searchPlaylists(q as string);

    res.status(httpStatus.OK).json({
      status: Status.Success,
      message: responseMessages.playlistApi.searchSuccess,
      data: { playlists, query: q },
    });
  } catch (error) {
    next(error);
  }
};
