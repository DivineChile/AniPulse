import {
  Box,
  Heading,
  Image,
  Input,
  Spinner,
  VStack,
  Text,
  Link as ChakraLink,
  Dialog,
  Portal,
  Flex,
  Badge,
  useBreakpointValue,
  LinkBox,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import "../../../index.css";
import "./style.css";
import { useState, useCallback, useEffect } from "react";
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
  const backupApi = "https://kenjitsu-api-production.up.railway.app/";
  const proxy = "https://cors-anywhere-aifwkw.fly.dev/";

  // Fetch anime
  const fetchAnimeResults = async (query) => {
    try {
      const res = await fetch(
        `${proxy}${backupApi}api/hianime/anime/search?q=${query}&page=1`
      );
      const data = await res.json();

      return data.data || [];
    } catch (err) {
      throw new Error("Failed to fetch anime");
    }
  };

  // Fetch movies
  const fetchMovieResults = async (query) => {
    try {
      const res = await fetch(
        `${proxy}${backupApi}api/flixhq/media/search?q=${query}&page=1`
      );
      const data = await res.json();

      return data?.data || [];
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

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && query.trim()) {
      navigate(`/search/keyword/${query}`);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setAnimeResults([]);
      setMovieResults([]);
    }
  }, [isOpen]);

  const isLarge = useBreakpointValue({ base: false, md: true });

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose} unmountOnExit>
      <Portal>
        <Dialog.Backdrop bg="#0a0a0a81" backdropFilter="blur(7px)" />
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
              borderColor="var(--accent-color)"
              value={query}
              onChange={handleInputChange}
              // onKeyPress={handleKeyPress}
            />

            {/* RESULTS */}
            <Box mt={4} maxH="300px" overflowY="auto">
              {loading && query.trim() && (
                <VStack>
                  <Spinner color="var(--accent-color)" />
                  <Text color="var(--accent-color)">Loading...</Text>
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

              {(!loading && !error && animeResults.length > 0) ||
              (!loading && !error && movieResults.length > 0) ? (
                <VStack align="stretch" spacing={3}>
                  <Text fontSize={{ base: "md", md: "lg" }}>Anime</Text>
                  {animeResults.slice(0, 5).map((item) => (
                    <LinkBox
                      as={ReactRouterLink}
                      to={`/anime/${item.id}`}
                      display="flex"
                      gap="12px"
                      p="8px"
                      borderRadius="6px"
                      bg="var(--card-background-color)"
                      _hover={{
                        bg: "rgba(28, 28, 28, 0.8)",
                        cursor: "pointer",
                      }}
                      transition="all 0.2s ease"
                      key={item.id}
                    >
                      {/* THUMBNAIL */}
                      <Image
                        src={item.posterImage}
                        alt={item.name}
                        w="50px"
                        h="70px"
                        objectFit="cover"
                        borderRadius="4px"
                        bg="var(--primary-background-color)"
                      />

                      {/* INFO */}
                      <Flex
                        flexDirection="column"
                        justifyContent="center"
                        flex="1"
                        overflow="hidden"
                      >
                        <Text
                          fontSize="13px"
                          fontWeight="600"
                          color="var(--text-color)"
                          lineClamp={2}
                          mb="4px"
                          _hover={{ color: "var(--link-color)" }}
                        >
                          {item.name}
                        </Text>

                        <Flex
                          alignItems="center"
                          gap="6px"
                          fontSize="11px"
                          color="var(--text-secondary)"
                        >
                          {item.type && <Text>{item.type}</Text>}
                          <Text>•</Text>
                          {item.totalEpisodes && (
                            <Text>{item.totalEpisodes} Episodes</Text>
                          )}
                        </Flex>
                      </Flex>
                    </LinkBox>
                  ))}
                  <Text fontSize={{ base: "md", md: "lg" }} mt={3}>
                    Movies & TV Shows
                  </Text>
                  {movieResults.slice(0, 5).map((item) => (
                    <LinkBox
                      as={ReactRouterLink}
                      to={`/${item.type.toLowerCase()}/${item.id}`}
                      display="flex"
                      gap="12px"
                      p="8px"
                      borderRadius="6px"
                      bg="var(--card-background-color)"
                      _hover={{
                        bg: "rgba(28, 28, 28, 0.8)",
                        cursor: "pointer",
                      }}
                      transition="all 0.2s ease"
                      key={item.id}
                    >
                      {/* THUMBNAIL */}
                      <Image
                        src={item.posterImage}
                        alt={item.name}
                        w="50px"
                        h="70px"
                        objectFit="cover"
                        borderRadius="4px"
                        bg="var(--primary-background-color)"
                      />

                      {/* INFO */}
                      <Flex
                        flexDirection="column"
                        justifyContent="center"
                        flex="1"
                        overflow="hidden"
                      >
                        <Text
                          fontSize="13px"
                          fontWeight="600"
                          color="var(--text-color)"
                          lineClamp={2}
                          mb="4px"
                          _hover={{ color: "var(--link-color)" }}
                        >
                          {item.name}
                        </Text>

                        <Flex
                          alignItems="center"
                          gap="6px"
                          fontSize="11px"
                          color="var(--text-secondary)"
                        >
                          {item.type && <Text>{item.type}</Text>}
                          {item.quality && <Text>•</Text>}
                          {item.quality && <Text>{item.quality}</Text>}
                          {item.duration && <Text>•</Text>}
                          {item.type === "Movie" && (
                            <Text>{item.duration}</Text>
                          )}
                          {item.type === "TV" && <Text>•</Text>}
                          {item.type === "TV" && (
                            <Text>{item.seasons} Seasons</Text>
                          )}
                          {item.type === "TV" && <Text>•</Text>}
                          {item.type === "TV" && (
                            <Text>{item.totalEpisodes} Episodes</Text>
                          )}
                        </Flex>
                      </Flex>
                    </LinkBox>
                  ))}
                </VStack>
              ) : !loading &&
                !error &&
                animeResults.length < 1 &&
                movieResults.length < 1 ? (
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
