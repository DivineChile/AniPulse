import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Spinner,
  Text,
  Link as ChakraLink,
  Flex,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import "../../../index.css";
import "./style.css";
import { useState, useCallback } from "react";
import { debounce } from "lodash";

const SearchBar = ({ above, below, displayProp }) => {
  const [query, setQuery] = useState("");
  const [animeResults, setAnimeResults] = useState([]);
  const [movieResults, setMovieResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  // APIs
  const animeApi = "https://aniwatch-api-production-68fd.up.railway.app/";
  const proxy = "https://fluoridated-recondite-coast.glitch.me/";
  const url = `https://api.themoviedb.org/3/search/multi`;
  const BEARER_TOKEN = import.meta.env.VITE_TMDB_BEARER_TOKEN;

  const headers = {
    Authorization: `Bearer ${BEARER_TOKEN}`,
    "Content-Type": "application/json;charset=utf-8",
  };

  // Fetch anime
  const fetchAnimeResults = async (query) => {
    try {
      const res = await fetch(
        `${proxy}${animeApi}/api/v2/hianime/search?q=${query}`
      );
      const data = await res.json();
      return data.data.animes || [];
    } catch (err) {
      throw new Error("Failed to fetch anime");
    }
  };

  // Fetch movies
  const fetchMovieResults = async (query) => {
    try {
      const res = await fetch(
        `${url}?query=${query}&include_adult=false&language=en-US&page=1`,
        {
          headers: headers,
        }
      );
      const data = await res.json();
      return data.results || [];
    } catch (err) {
      throw new Error("Failed to fetch movies");
    }
  };

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (value) => {
      if (!value.trim()) {
        setAnimeResults([]);
        setMovieResults([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const [anime, movies] = await Promise.all([
          fetchAnimeResults(value),
          fetchMovieResults(value),
        ]);
        setAnimeResults(anime);
        setMovieResults(movies);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }, 1000),
    []
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim()) {
      debouncedSearch(value);
    } else {
      setAnimeResults([]);
      setMovieResults([]);
    }
  };

  const handleInputFocus = () => setShowDropdown(true);
  const handleInputBlur = () => setTimeout(() => setShowDropdown(false), 200);
  const handleKeyPress = (event) => {
    if (event.key === "Enter" && query.trim()) {
      navigate(`/search/keyword/${query}`);
    }
  };

  return (
    <Box
      hideBelow={below}
      hideFrom={above}
      width={{ base: "100%", lg: "150px", xl: "250px", "2xl": "400px" }}
      display={displayProp}
      pos="relative"
    >
      <InputGroup
        h="40px"
        w={{ base: "100%", lg: "150px", xl: "250px", "2xl": "400px" }}
      >
        <InputLeftAddon
          background="none"
          color="var(--text-color)"
          borderRight="none"
          borderColor="#d4d4d4"
          cursor="pointer"
          onClick={() => query.trim() && navigate(`/search/keyword/${query}`)}
        >
          <SearchIcon color="#d4d4d4" />
        </InputLeftAddon>
        <Input
          borderLeft="none"
          placeholder="Search Anime or Movies"
          _placeholder={{ color: "#d4d4d4" }}
          color="var(--text-color)"
          borderColor="#d4d4d4"
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyPress}
        />
      </InputGroup>

      {showDropdown && (
        <Box
          width={{ base: "100%", sm: "400px", md: "500px" }}
          top="50px"
          right="0"
          bg="var(--primary-background-color)"
          borderRadius="10px"
          p="20px"
          boxShadow="0 0 10px 0 rgba(0,0,0,0.6)"
          position="absolute"
          zIndex="999"
        >
          <Box borderBottom="1px solid #444444" mb="20px">
            <Heading
              as="h4"
              color="var(--text-color)"
              fontSize="20px"
              mb="5px"
              fontWeight="400"
              fontFamily="var(--font-family)"
            >
              Search Results
            </Heading>
          </Box>

          {loading && (
            <Box display="flex" justifyContent="center">
              <Spinner color="var(--accent-color)" />
            </Box>
          )}

          {error && (
            <Text
              as="span"
              color="var(--text-color)"
              fontFamily="var(--body-font)"
            >
              {error}
            </Text>
          )}

          {animeResults.length > 0 && (
            <Box mb="20px">
              <Heading fontSize="16px" mb="10px" color="var(--accent-color)">
                Anime
              </Heading>
              {animeResults.slice(0, 3).map((item) => (
                <ChakraLink
                  as={ReactRouterLink}
                  key={item.id}
                  _hover={{
                    color: "var(--accent-color)",
                    textDecoration: "none",
                  }}
                  to={`/anime/${item.id}`}
                  display="flex"
                  gap="15px"
                  mb="10px"
                  alignItems="center"
                  transition="0.2s ease"
                >
                  <Image
                    h="60px"
                    w="50px"
                    borderRadius="6px"
                    src={item.poster}
                    alt={item.name}
                  />
                  <Box>
                    <Heading
                      fontSize="15px"
                      color="var(--secondary-color)"
                      _hover={{ color: "var(--accent-color)" }}
                      transition="all ease 0.25s"
                    >
                      {item.name}
                    </Heading>
                    <Flex gap="5px" fontSize="12px" color="var(--text-color)">
                      <Text>Sub: {item.episodes.sub || "N/A"}</Text>
                      <Text>Dub: {item.episodes.dub || "N/A"}</Text>
                    </Flex>
                    <Text fontSize="12px" color="gray.400">
                      {item.type}
                    </Text>
                  </Box>
                </ChakraLink>
              ))}
            </Box>
          )}
          {console.log(movieResults)}
          {movieResults.length > 0 && (
            <Box>
              <Heading fontSize="16px" mb="10px" color="var(--accent-color)">
                Movies
              </Heading>
              {movieResults.slice(0, 3).map((movie) => (
                <ChakraLink
                  as={ReactRouterLink}
                  textDecor="none"
                  key={movie.id}
                  to={
                    movie.media_type === "tv"
                      ? `/movies/tv/${movie.id}`
                      : `/movies/movie/${movie.id}`
                  }
                  display="flex"
                  gap="15px"
                  mb="10px"
                  alignItems="center"
                  _hover={{
                    color: "var(--accent-color)",
                    textDecoration: "none",
                  }}
                  transition="0.2s ease"
                >
                  <Image
                    h="60px"
                    w="50px"
                    borderRadius="6px"
                    bg="#191919"
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "/placeholder.png"
                    }
                    alt={movie.title ? movie.title : movie.name}
                  />
                  <Box>
                    <Heading
                      fontSize="15px"
                      color="var(--secondary-color)"
                      _hover={{ color: "var(--accent-color)" }}
                      transition="all ease 0.25s"
                    >
                      {movie.title ? movie.title : movie.name}
                    </Heading>
                    <Text fontSize="12px" color="gray.400">
                      {movie.release_date
                        ? movie.release_date
                        : movie.first_air_date}
                    </Text>
                    <Text
                      fontSize="12px"
                      color="gray.400"
                      textTransform="uppercase"
                    >
                      {movie.media_type ? movie.media_type : movie.media_type}
                    </Text>
                  </Box>
                </ChakraLink>
              ))}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default SearchBar;
