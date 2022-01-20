import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { getPokemonsApi, getPokemonDetailsByUrlApi } from "../api/pokemon";
import PokemonList from "../components/PokemonList";
import Search from "../components/Search";
import { API_HOST } from "../utils/constants";

export default function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    (async () => {
      await loadPokemons();
    })();
  }, []);

  useEffect(() => {
    if (pokemons.length === 0 && searchValue === "") {
      loadPokemons();
    }
  }, [pokemons, searchValue]);

  const loadPokemons = async () => {
    try {
      const response = await getPokemonsApi(nextUrl);
      setNextUrl(response.next);

      const pokemonsArray = await getPokemonsArray(response.results);
      setPokemons([...pokemons, ...pokemonsArray]);
    } catch (error) {
      console.error(error);
    }
  };

  const searchPokemons = async (searchValue) => {
    try {
      const response = await getPokemonsApi(
        `${API_HOST}/pokemon?limit=20&offset=0`
      );
      const pokemonsRes = response.results.filter((pokemon) =>
        pokemon.name.includes(searchValue)
      );
      setNextUrl(null);

      const pokemonsArray = await getPokemonsArray(pokemonsRes);
      setPokemons(pokemonsArray);
    } catch (error) {
      console.error(error);
    }
  };

  const getPokemonsArray = async (pokemons) => {
    const pokemonsArray = [];
    for await (const pokemon of pokemons) {
      const pokemonDetails = await getPokemonDetailsByUrlApi(pokemon.url);
      pokemonsArray.push({
        id: pokemonDetails.id,
        name: pokemonDetails.name,
        type: pokemonDetails.types[0].type.name,
        order: pokemonDetails.order,
        image: pokemonDetails.sprites.other["official-artwork"].front_default,
      });
    }
    return pokemonsArray;
  };

  return (
    <SafeAreaView>
      <Search
        searchPokemons={searchPokemons}
        loadPokemons={loadPokemons}
        pokemons={pokemons}
        setPokemons={setPokemons}
        setNextUrl={setNextUrl}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <PokemonList
        pokemons={pokemons}
        loadPokemons={loadPokemons}
        isNext={nextUrl}
      />
    </SafeAreaView>
  );
}
