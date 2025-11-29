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
  Dialog,
  Portal,
  Flex,
  Badge,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import "../../../index.css";
import "./style.css";
import { useState, useCallback, useEffect, useRef } from "react";
import { debounce } from "lodash";

const SearchBar = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [animeResults, setAnimeResults] = useState([]);
  const [movieResults, setMovieResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
          // fetchMovieResults(value),
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

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && query.trim()) {
      navigate(`/search/keyword/${query}`);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setAnimeResults([]);
    }
  }, [isOpen]);

  const isLarge = useBreakpointValue({ base: false, md: true });

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose} unmountOnExit>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            width={{ base: "90%", md: "600px" }}
            borderRadius="lg"
            p={4}
          >
            {/* SEARCH INPUT */}
            <Input
              placeholder="Search anime or movies"
              _placeholder={{ color: "var(--text-secondary)" }}
              color="var(--text-color)"
              borderColor="var(--link-hover-color)"
              value={query}
              onChange={handleInputChange}
              // onKeyPress={handleKeyPress}
            />

            {/* RESULTS */}
            <Box mt={4} maxH="300px" overflowY="auto">
              {loading && query.trim() && (
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

              {!loading && !error && animeResults.length > 0 ? (
                <VStack align="stretch" spacing={3}>
                  {animeResults.slice(0, 10).map((item) => (
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
                        h={{ base: "90px", md: "120px" }}
                        w={{ base: "70px", md: "90px" }}
                        borderRadius="5px"
                        src={item.poster}
                        bg="var(--primary-background-color)"
                        alt={item.title}
                      />
                      <Box display="flex" flexDirection="column" gap="5px">
                        <Heading
                          fontSize={{ base: "14px", md: "16px" }}
                          color="var(--link-color)"
                          _hover={{ color: "var(--link-hover-color)" }}
                          transition="all ease 0.25s"
                          lineHeight="20px"
                        >
                          {isLarge
                            ? item.title.length > 40
                              ? item.title.slice(0, 40) + "..."
                              : item.title
                            : item.title.length > 30
                            ? item.title.slice(0, 25) + "..."
                            : item.title}
                        </Heading>
                        <Text
                          fontSize={{ base: "12px", md: "13px" }}
                          color="var(--text-secondary)"
                          fontStyle="italic"
                        >
                          {isLarge
                            ? item.title.length > 40
                              ? item.title.slice(0, 30) + "..."
                              : item.title
                            : item.title.length > 30
                            ? item.title.slice(0, 20) + "..."
                            : item.title}
                        </Text>
                        <Flex
                          gap="5px"
                          fontSize="12px"
                          color="var(--text-color)"
                        >
                          {item.tvInfo.sub && (
                            <Badge variant="surface" size="xs">
                              {`SUB: ${item.tvInfo.sub}`}
                            </Badge>
                          )}

                          {item.tvInfo.dub && (
                            <Badge variant="surface" size="xs">
                              {`DUB: ${item.tvInfo.dub}`}
                            </Badge>
                          )}
                          {item.tvInfo.showType && (
                            <Badge variant="surface" size="xs">
                              {item.tvInfo.showType}
                            </Badge>
                          )}
                          {item.tvInfo.rating && (
                            <Badge variant="surface" size="xs">
                              {item.tvInfo.rating}
                            </Badge>
                          )}
                        </Flex>
                      </Box>
                    </ChakraLink>
                  ))}
                </VStack>
              ) : !loading && !error && animeResults.length < 1 ? (
                <Text
                  as="span"
                  color="var(--text-color)"
                  fontFamily="var(--body-font)"
                >
                  No results found
                </Text>
              ) : null}
            </Box>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default SearchBar;
