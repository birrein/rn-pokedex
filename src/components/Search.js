import React from "react";
import { StyleSheet, View, TextInput, Platform } from "react-native";

const Search = ({
  searchPokemons,
  setPokemons,
  setNextUrl,
  searchValue,
  setSearchValue,
}) => {
  const onTextSearchChange = (text) => {
    setSearchValue(text);
    if (text.length > 2) {
      searchPokemons(text);
    } else if (text.length === 0) {
      setNextUrl(null);
      setPokemons([]);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Buscar Pokémon"
        style={styles.input}
        autoCapitalize="none"
        value={searchValue}
        onChangeText={(text) => onTextSearchChange(text)}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? 30 : 0,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
});
