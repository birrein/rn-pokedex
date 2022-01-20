import AsyncStorage from "@react-native-async-storage/async-storage";
import { FAVORITE_STORAGE } from "../utils/constants";

export const getPokemonsFavoriteApi = async () => {
  try {
    const response = await AsyncStorage.getItem(FAVORITE_STORAGE);
    return JSON.parse(response) || [];
  } catch (error) {
    throw error;
  }
};

export const addPokemonFavoriteApi = async (id) => {
  try {
    const favorites = await getPokemonsFavoriteApi();
    favorites.push(id);
    await AsyncStorage.setItem(FAVORITE_STORAGE, JSON.stringify(favorites));
  } catch (error) {
    throw error;
  }
};

export const isPokemonFavoriteApi = async (id) => {
  try {
    const favorites = await getPokemonsFavoriteApi();
    return favorites.includes(id);
  } catch (error) {
    throw error;
  }
};

export const removePokemonFavoriteApi = async (id) => {
  try {
    const favorites = await getPokemonsFavoriteApi();
    const newFavorites = favorites.filter((e) => e !== id);
    await AsyncStorage.setItem(FAVORITE_STORAGE, JSON.stringify(newFavorites));
  } catch (error) {
    throw error;
  }
};
