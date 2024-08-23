import { Grid, GridItem, HStack, Show } from "@chakra-ui/react";
import "./App.css";
import NavBar from "./components/navBar";
import GamesGrid from "./components/gamesGrid";
import GenreList from "./components/genreList";
import axios, { CanceledError } from "axios";
import { useState, useEffect } from "react";
import apiClient from "./services/api-client";
import PlatformLIst from "./components/platformList";
import GenreListSmall from "./components/genreListSmall";

interface genre {
  id: number;
  name: string;
  image_background: string;
}

interface fetchGenreResponse {
  count: number;
  results: genre[];
}

interface Platform {
  id: number;
  name: string;
}

interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platform: { platform: Platform }[];
  metacritic: number;
}

interface fetchGameResponse {
  count: number;
  results: Game[];
}

interface fetchPlatformResponse {
  count: number;
  results: Platform[];
}

function App() {
  const [genreState, setGenreState] = useState<genre | null>(null);
  const [games, setGames] = useState<Game[]>([]);
  const [gameErrors, setGameErrors] = useState("");
  const [isGameloading, setIsGameLoading] = useState(false);
  const [genres, setGenres] = useState<genre[]>([]);
  const [errors, setErrors] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [platformError, setPlatformError] = useState("");
  const [search, setSearch] = useState("");
  const [SelectedPlatform, setSelectedPlatform] = useState<Platform | null>(
    null
  );

  useEffect(() => {
    const controller = new AbortController();
    if (genreState == null && SelectedPlatform === null) {
      setIsGameLoading(true);
      apiClient
        .get<fetchGameResponse>("/games", { signal: controller.signal })
        .then((res) => {
          setGames(res.data.results);
          setIsGameLoading(false);
        })
        .catch((err) => {
          if (err instanceof CanceledError) {
            return;
          }
          setGameErrors(err.message);
          setIsGameLoading(false);
        });
    } else if (genreState != null && SelectedPlatform === null) {
      setIsGameLoading(true);
      axios
        .get<fetchGameResponse>(
          "https://api.rawg.io/api/games?key=93a5f52692ba4e83aeaab1cd6fd33e7b&genres=" +
            genreState.id,
          {
            signal: controller.signal,
          }
        )
        .then((res) => {
          setGames(res.data.results);
          setIsGameLoading(false);
        })
        .catch((err) => {
          if (err instanceof CanceledError) {
            return;
          }
          setGameErrors(err.message);
          setIsGameLoading(false);
        });
    } else if (genreState === null && SelectedPlatform != null) {
      setIsGameLoading(true);
      axios
        .get<fetchGameResponse>(
          "https://api.rawg.io/api/games?key=93a5f52692ba4e83aeaab1cd6fd33e7b&platforms=" +
            SelectedPlatform.id,
          {
            signal: controller.signal,
          }
        )
        .then((res) => {
          setGames(res.data.results);
          setIsGameLoading(false);
        })
        .catch((err) => {
          if (err instanceof CanceledError) {
            return;
          }
          setGameErrors(err.message);
          setIsGameLoading(false);
        });
    } else {
      setIsGameLoading(true);
      axios
        .get<fetchGameResponse>(
          "https://api.rawg.io/api/games?key=93a5f52692ba4e83aeaab1cd6fd33e7b&platforms=" +
            SelectedPlatform?.id +
            "&genres=" +
            genreState?.id,
          {
            signal: controller.signal,
          }
        )
        .then((res) => {
          setGames(res.data.results);
          setIsGameLoading(false);
        })
        .catch((err) => {
          if (err instanceof CanceledError) {
            return;
          }
          setGameErrors(err.message);
          setIsGameLoading(false);
        });
    }

    return () => controller.abort();
  }, [genreState, SelectedPlatform]);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    apiClient
      .get<fetchGenreResponse>("/genres", { signal: controller.signal })
      .then((res) => {
        setGenres(res.data.results);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) {
          return;
        }
        setErrors(err.message);
        setIsLoading(false);
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    apiClient
      .get<fetchPlatformResponse>("/platforms", { signal: controller.signal })
      .then((res) => {
        setPlatforms(res.data.results);
      })
      .catch((err) => {
        if (err instanceof CanceledError) {
          return;
        }
        setPlatformError(err.message);
      });
    return () => controller.abort();
  }, []);
  return (
    <>
      <Grid
        templateAreas={{
          base: `"nav" "main"`,
          lg: `"nav nav" "aside main"`,
        }}
      >
        <GridItem area="nav" paddingY={"10px"}>
          <NavBar
            onSubmit={(value) => {
              const controller = new AbortController();
              setSearch(value);
              setIsGameLoading(true);
              axios
                .get<fetchGameResponse>(
                  "https://api.rawg.io/api/games?key=93a5f52692ba4e83aeaab1cd6fd33e7b&search=" +
                    search,
                  {
                    signal: controller.signal,
                  }
                )
                .then((res) => {
                  setGames(res.data.results);
                  setIsGameLoading(false);
                })
                .catch((err) => {
                  if (err instanceof CanceledError) {
                    return;
                  }
                  setGameErrors(err.message);
                  setIsGameLoading(false);
                });
              return () => controller.abort();
            }}
          />
        </GridItem>
        <Show above="lg">
          <GridItem area="aside">
            <GenreList
              selected_genre={genreState}
              errors={errors}
              isLoading={isloading}
              genres={genres}
              onclick={(genre) => setGenreState(genre)}
            />
          </GridItem>
        </Show>
        <GridItem area="main">
          <HStack spacing={10}>
            <PlatformLIst
              selectedPlatform={SelectedPlatform}
              errors={platformError}
              platforms={platforms}
              onClick={(platform) => setSelectedPlatform(platform)}
            />
            <Show below="lg">
              <GenreListSmall
                selected_genre={genreState}
                onclick={(genre) => setGenreState(genre)}
                errors={errors}
                genres={genres}
              />
            </Show>
          </HStack>
          <GamesGrid
            errors={gameErrors}
            isGameLoading={isGameloading}
            games={games}
          />
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
