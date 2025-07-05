import { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { ISong } from "../../../app/models/song";
import { RootState } from "../../../redux/store/store";
import { useDispatch } from "react-redux";
import {
  loadFavorites,
  toggleFavorite as toggleFavoriteAction,
} from "../../../redux/slices/favoritesSlice";

const getFavoritesKey = (userId: string | undefined): string | null =>
  userId ? `songify_favorites_${userId}` : null;

export const useFavorites = (songId?: string) => {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const favorites = useSelector((s: RootState) => s.favorites.list);

  useEffect(() => {
    dispatch(loadFavorites(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    const key = getFavoritesKey(userId);
    const onStorage = (e: StorageEvent) => {
      if (e.key === key) {
        dispatch(loadFavorites(userId));
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [dispatch, userId]);

  const isFavorite = songId
    ? favorites.some((fav) => fav._id === songId)
    : false;

  const toggleFavorite = useCallback(
    (song: ISong) => {
      dispatch(toggleFavoriteAction(song));
    },
    [dispatch],
  );

  return { favorites, isFavorite, toggleFavorite };
};
