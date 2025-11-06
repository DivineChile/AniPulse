import { Search } from "lucide-react";
import {
  Box,
  Heading,
  Image,
  Input,
  Group,
  Button,
  Spinner,
  VStack,
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
  const animeApi = "https://anime-api-production-bc3d.up.railway.app/";
  const proxy = "https://cors-anywhere-aifwkw.fly.dev/";
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
        `${proxy}${animeApi}/api/search?keyword=${query}`
      );
      const data = await res.json();

      return data.results.data || [];
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
      width={{ base: "100%", lg: "300px", xl: "350px", "2xl": "400px" }}
      display={displayProp}
      pos="relative"
    >
      <Group
        h="40px"
        w={{ base: "100%", lg: "300px", xl: "350px", "2xl": "400px" }}
        attached
      >
        <Button
          background="none"
          color="var(--text-color)"
          borderRight="none"
          borderColor="var(--link-hover-color)"
          cursor="pointer"
          onClick={() => query.trim() && navigate(`/search/keyword/${query}`)}
        >
          <Search color="var(--link-hover-color)" />
        </Button>
        <Input
          borderLeft="none"
          placeholder="Search anime or movies"
          _placeholder={{ color: "var(--text-secondary)" }}
          color="var(--text-color)"
          borderColor="var(--link-hover-color)"
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyPress}
        />
      </Group>

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
            <VStack>
              <Spinner color="var(--link-hover-color)" />
              <Text color="var(--link-hover-color)">Loading...</Text>
            </VStack>
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
              <Heading fontSize="16px" mb="10px" color="var(--text-color)">
                Anime
              </Heading>
              {animeResults.slice(0, 3).map((item) => (
                <ChakraLink
                  as={ReactRouterLink}
                  key={item.id}
                  _hover={{
                    color: "var(--link-hover-color)",
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
                    alt={item.title}
                  />
                  <Box>
                    <Heading
                      fontSize="15px"
                      color="var(--link-color)"
                      _hover={{ color: "var(--link-hover-color)" }}
                      transition="all ease 0.25s"
                    >
                      {item.title}
                    </Heading>
                    <Flex gap="5px" fontSize="12px" color="var(--text-color)">
                      <Text>Sub: {item.tvInfo.sub || "N/A"}</Text>
                      <Text>Dub: {item.tvInfo.dub || "N/A"}</Text>
                    </Flex>
                    <Text fontSize="12px" color="var(--text-secondary)">
                      {item.tvInfo.showType}
                    </Text>
                  </Box>
                </ChakraLink>
              ))}
            </Box>
          )}

          {/* {movieResults.length > 0 && (
            <Box>
              <Heading fontSize="16px" mb="10px" color="var(--text-color)">
                Movies & TV Shows
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
                    color: "var(--link-hover-color)",
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
                      color="var(--link-color)"
                      _hover={{ color: "var(--link-hover-color)" }}
                      transition="all ease 0.25s"
                    >
                      {movie.title ? movie.title : movie.name}
                    </Heading>
                    <Text fontSize="12px" color="var(--text-color)">
                      {movie.release_date
                        ? movie.release_date
                        : movie.first_air_date}
                    </Text>
                    <Text
                      fontSize="12px"
                      color="var(--text-secondary)"
                      textTransform="uppercase"
                    >
                      {movie.media_type ? movie.media_type : movie.media_type}
                    </Text>
                  </Box>
                </ChakraLink>
              ))}
            </Box>
          )} */}
        </Box>
      )}
    </Box>
  );
};

export default SearchBar;
