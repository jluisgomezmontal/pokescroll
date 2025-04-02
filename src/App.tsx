/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Spinner } from "./components/Spinner";
import { Pokemon } from "./components/Pokemon";
import { DetailedPokemon } from "./interface";

interface PokemonData {
  name: string;
  url: string;
}

function App() {
  const [pokemons, setPokemons] = useState<DetailedPokemon[]>([]);
  const [limit, setLimit] = useState<number>(20);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const observerRef = useRef<any>(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}?offset=${limit - 20}`
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
  useEffect(() => {
    fetchData();
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observerRef.current.click();
        }
      },
      { threshold: 0.5 } // Se activa cuando al menos el 50% del elemento es visible
    );
    observer.observe(observerRef.current);
  }, [limit]);

  return (
    <Box p={2}>
      <h1>Pokémons</h1>
      {loading ? (
        <Spinner />
      ) : (
        pokemons.map((pokemon) => (
          <Pokemon pokeProp={pokemon} key={pokemon.name} />
        ))
      )}
      <Button
        fullWidth
        loading={loadMore}
        loadingPosition="end"
        variant="text"
        ref={observerRef}
        onClick={() => {
          setLoadMore((prev) => !prev);
          setLimit((limit) => limit + 20);
          setTimeout(() => {
            setLoadMore(false);
          }, 1000);
        }}
      >
        Load More
      </Button>
    </Box>
  );
}

export default App;
