export const fetchData = async () => {
  setLoading(true);
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
    );
    const result = await response.json();

    const detailedPokemons = await Promise.all(
      result.results.map(async (poke: PokemonData) => {
        const res = await fetch(poke.url);
        return res.json();
      })
    );

    setPokemons(detailedPokemons);
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
  } finally {
    setLoading(false);
  }
};
