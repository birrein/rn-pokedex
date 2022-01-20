import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_HOST } from "../utils/constants";

export async function getPokemonsApi(endpointUrl) {
  try {
    const url = `${API_HOST}/pokemon?limit=20&offset=0`;
    const response = await fetch(endpointUrl || url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getPokemonDetailsByUrlApi(url) {
  try {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getPokemonDetailsApi(id) {
  try {
    const url = `${API_HOST}/pokemon/${id}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function savePokemonListToStorage() {
  try {
    const response = await getPokemonsApi(
      `${API_HOST}/pokemon?limit=2000&offset=0`
    );
    const pokemons = response.results;
    await AsyncStorage.setItem("POKEMON_LIST", JSON.stringify(pokemons));
  } catch (error) {
    throw error;
  }
}

export async function getPokemonListFromStorage() {
  try {
    const response = await AsyncStorage.getItem("POKEMON_LIST");
    return JSON.parse(response) || [];
  } catch (error) {
    throw error;
  }
}
