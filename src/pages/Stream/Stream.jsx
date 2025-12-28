import {
  Box,
  Flex,
  Grid,
  Heading,
  Text,
  Button,
  IconButton,
  HStack,
  VStack,
  Badge,
} from "@chakra-ui/react";
import { useEffect, useState, useMemo } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Star,
  List,
  Share2,
} from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import Error from "../../components/ErrorPage/Error";
import Loading from "../../components/ErrorPage/Loading";
import Player from "../../components/Anime/VideoPlayer/Player";
import EpisodeList from "../../components/Anime/EpisodeList/EpisodeList";
import DownloadLinksSelect from "./DownloadLinksSelect";
import { cacheFetch } from "../../utils/cacheFetch";

const Stream = () => {
  const { watchId } = useParams();
  const location = useLocation();

  // Extract episode ID from URL
  const activeEpId = location.pathname.includes("episode")
    ? location.pathname.split("-")[location.pathname.split("-").length - 1]
    : null;

  // State management
  const [initialLoading, setInitialLoading] = useState(true); // Only for first load
  const [error, setError] = useState(null);
  const [animeData, setAnimeData] = useState(null);
  const [animeId, setAnimeId] = useState(null); // Store anime ID separately
  const [episodes, setEpisodes] = useState([]);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [version, setVersion] = useState("sub");
  const [episodesCollapsed, setEpisodesCollapsed] = useState(false);

  // Download related state
  const [sessionId, setSessionId] = useState("");
  const [sessionEpisode, setSessionEpisode] = useState("");
  const [nextSessionEpisode, setNextSessionEpisode] = useState("");

  const animePahe_api = "https://pahe-api.fly.dev/";

  // ============================================================
  // FIRST EFFECT: Fetch anime data ONLY ONCE (on initial load)
  // ============================================================
  useEffect(() => {
    const fetchAnimeData = async () => {
      setInitialLoading(true);
      setError(null);

      try {
        // Extract anime name from watchId
        const animeArr = watchId.split("-");
        const animeName = animeArr.splice(0, animeArr.length - 2).join("-");
        const cacheKey = `animeInfo_${animeName}`;

        // Store anime ID for future reference
        setAnimeId(animeName);

        const data = await cacheFetch(`api/hianime/anime/${animeName}`, {
          cacheKey,
        });

        const anime = data.data;
        setAnimeData(anime);
        console.log(data);
        setEpisodes(data.providerEpisodes || []);

        // Find current episode
        const currentEp = data.providerEpisodes?.find(
          (ep) => ep.episodeId === watchId
        );

        if (currentEp) {
          setCurrentEpisode(currentEp);
        }

        // Update document title
        document.title = `Watching ${anime.name} Episode ${
          currentEp?.episodeNumber || "?"
        } ${version === "dub" ? "(Dub)" : ""} | AniPulse`;
      } catch (err) {
        setError("Failed to load anime data. Please try again.");
        console.error("Error fetching anime data:", err);
      } finally {
        setInitialLoading(false);
      }
    };

    // Only fetch if we don't have anime data yet OR if the anime ID changed
    const animeArr = watchId.split("-");
    const currentAnimeName = animeArr.splice(0, animeArr.length - 2).join("-");

    if (!animeData || animeId !== currentAnimeName) {
      fetchAnimeData();
    }
  }, [watchId, animeData, animeId, version]);

  // ============================================================
  // SECOND EFFECT: Update current episode when watchId changes
  // (NO LOADING - just update state)
  // ============================================================
  useEffect(() => {
    if (!episodes || episodes.length === 0) return;

    // Find the new current episode
    const newCurrentEpisode = episodes.find((ep) => ep.episodeId === watchId);

    if (newCurrentEpisode) {
      setCurrentEpisode(newCurrentEpisode);

      // Update document title
      document.title = `Watching ${animeData?.name || "Anime"} Episode ${
        newCurrentEpisode.episodeNumber || "?"
      } ${version === "dub" ? "(Dub)" : ""} | AniPulse`;

      // Scroll to top of player (optional - improves UX)
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [watchId, episodes, animeData?.name, version]);

  // ============================================================
  // THIRD EFFECT: Fetch session ID for downloads (unchanged)
  // ============================================================
  useEffect(() => {
    if (!animeData?.name) return;

    const fetchSessionId = async () => {
      try {
        const response = await fetch(
          `${animePahe_api}/search/${encodeURIComponent(animeData.name)}`
        );
        const data = await response.json();
        const results = data.results || [];

        const normalize = (str) => str?.toLowerCase().replace(/[^a-z0-9]/g, "");

        const exactMatch =
          results.find(
            (anime) =>
              normalize(anime.title) === normalize(animeData.name) ||
              normalize(anime.japanese_title) === normalize(animeData.name)
          ) ||
          results.find(
            (anime) =>
              anime.title
                ?.toLowerCase()
                .includes(animeData.name.toLowerCase()) ||
              anime.japanese_title
                ?.toLowerCase()
                .includes(animeData.name.toLowerCase())
          ) ||
          results[0];

        if (exactMatch?.session_id) {
          setSessionId(exactMatch.session_id);
        }
      } catch (error) {
        console.error("Error fetching session ID:", error);
      }
    };

    fetchSessionId();
  }, [animeData?.name]);

  // ============================================================
  // FOURTH EFFECT: Fetch episode session for downloads
  // ============================================================
  useEffect(() => {
    if (!sessionId || !currentEpisode?.episodeNumber) return;

    const fetchEpisodeSession = async () => {
      try {
        const firstPageRes = await fetch(
          `${animePahe_api}episodes/${sessionId}/page=1`
        );
        const firstPageData = await firstPageRes.json();
        const totalPages = firstPageData.total_pages;

        const getAllEpisodes = async () => {
          if (totalPages > 1) {
            const pageNumbers = Array.from(
              { length: totalPages },
              (_, i) => i + 1
            );
            const pages = await Promise.all(
              pageNumbers.map((p) =>
                fetch(`${animePahe_api}episodes/${sessionId}/page=${p}`).then(
                  (res) => res.json()
                )
              )
            );
            return pages.flatMap((p) => p.episodes);
          } else {
            return firstPageData.episodes;
          }
        };

        const allEpisodes = await getAllEpisodes();

        if (!allEpisodes || allEpisodes.length === 0) return;

        const apiFirstEp = Math.min(
          ...allEpisodes.map((ep) => parseInt(ep.episode))
        );
        const offset = apiFirstEp - 1;
        const adjustedEpisode = currentEpisode.episodeNumber + offset;
        const adjustedNextEpisode = adjustedEpisode + 1;

        const matchedCurrent = allEpisodes.find(
          (ep) => parseInt(ep.episode) === adjustedEpisode
        );
        const matchedNext = allEpisodes.find(
          (ep) => parseInt(ep.episode) === adjustedNextEpisode
        );

        if (matchedCurrent?.session) {
          setSessionEpisode(matchedCurrent.session);
        }

        if (matchedNext?.session) {
          setNextSessionEpisode(matchedNext.session);
        }
      } catch (err) {
        console.error("Error fetching episode session:", err);
      }
    };

    fetchEpisodeSession();
  }, [sessionId, currentEpisode?.episodeNumber]);

  // Derived values
  const episodeIds = useMemo(
    () => episodes.map((e) => e.episodeId),
    [episodes]
  );

  const hasDub = animeData?.episodes?.dub > 0;

  if (initialLoading) {
    return (
      <Box>
        <Navbar />
        <Loading
          bg="var(--linear-gradient)"
          isLoading={initialLoading}
          pos="absolute"
          top={{ base: "70px", md: "73px", lg: "84px" }}
          height={{
            base: "calc(100dvh - 70px)",
            md: "calc(100dvh - 73px)",
            lg: "calc(100dvh - 84px)",
          }}
        />
      </Box>
    );
  }

  if (error || !animeData) {
    return (
      <Box>
        <Navbar />
        <Error
          height="100vh"
          bg="var(--primary-background-color)"
          msg={error || "Failed to load anime"}
        />
      </Box>
    );
  }

  return (
    <Box bg="var(--primary-background-color)" minH="100vh">
      <Navbar />

      <Box
        maxW={{
          base: "100%",
          sm: "95%",
          xl: "90%",
          "2xl": "container.xl",
        }}
        mx="auto"
        pt={{ base: "90px", md: "100px" }}
        pb="60px"
        px={{ base: "0", sm: "16px" }}
      >
        {/* BREADCRUMB / BACK NAVIGATION */}
        <Flex
          alignItems="center"
          gap="12px"
          mb={{ base: "16px", md: "24px" }}
          px={{ base: "16px", sm: "0" }}
        >
          <IconButton
            as={Link}
            to={`/anime/${animeData.id}`}
            aria-label="Back to anime details"
            size="sm"
            bg="rgba(28, 28, 28, 0.8)"
            border="1px solid rgba(255, 255, 255, 0.1)"
            color="var(--text-color)"
            borderRadius="8px"
            _hover={{
              bg: "var(--primary-color)",
              borderColor: "var(--primary-color)",
            }}
            transition="all 0.2s ease"
          >
            <ChevronLeft size={14} />
          </IconButton>

          <VStack align="flex-start" spacing="2px" flex="1">
            <Text
              fontSize={{ base: "12px", md: "13px" }}
              color="var(--text-secondary)"
              fontWeight="500"
            >
              Now Watching
            </Text>
            <Heading
              as="h1"
              fontSize={{ base: "16px", md: "18px" }}
              fontWeight="600"
              color="var(--text-color)"
              noOfLines={1}
            >
              {animeData.name} - Episode {currentEpisode?.episodeNumber || "?"}
            </Heading>
          </VStack>
        </Flex>

        {/* MAIN CONTENT GRID */}
        <Grid
          templateColumns={{ base: "1fr", xl: "1fr 380px" }}
          gap={{ base: "20px", md: "24px" }}
        >
          {/* LEFT COLUMN - VIDEO PLAYER */}
          <Box>
            {/* VIDEO PLAYER CONTAINER */}
            <Box
              bg="var(--card-background-color)"
              border="1px solid rgba(255, 255, 255, 0.05)"
              borderRadius="12px"
              overflow="hidden"
              boxShadow="0 10px 15px -3px rgba(0, 0, 0, 0.6)"
            >
              {/* PLAYER */}
              <Box
                position="relative"
                w="100%"
                h={{
                  base: "220px",
                  sm: "320px",
                  md: "420px",
                  lg: "520px",
                  xl: "580px",
                }}
                bg="#000"
              >
                <Player version={version} />
              </Box>

              {/* PLAYER CONTROLS & INFO */}
              <Box p={{ base: "16px", md: "24px" }}>
                {/* TITLE & EPISODE INFO */}
                <VStack align="stretch" spacing="12px" mb="20px">
                  <Heading
                    as="h2"
                    fontSize={{ base: "18px", md: "22px" }}
                    fontWeight="700"
                    color="var(--text-color)"
                  >
                    {animeData.name}
                  </Heading>

                  <Flex
                    alignItems="center"
                    gap="12px"
                    flexWrap="wrap"
                    fontSize="14px"
                    color="var(--text-secondary)"
                  >
                    <Text fontWeight="500">
                      Episode {currentEpisode?.episodeNumber || "?"}
                    </Text>
                    {currentEpisode?.title && (
                      <>
                        <Text>•</Text>
                        <Text noOfLines={1}>{currentEpisode.title}</Text>
                      </>
                    )}
                  </Flex>

                  {/* RATING */}
                  {animeData.score && (
                    <Flex alignItems="center" gap="8px">
                      <HStack gap="4px">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            color={
                              i < Math.floor(parseFloat(animeData.score) / 2)
                                ? "var(--secondary-color)"
                                : "rgba(255, 255, 255, 0.2)"
                            }
                          />
                        ))}
                      </HStack>
                      <Text
                        fontSize="14px"
                        fontWeight="600"
                        color="var(--text-color)"
                      >
                        {(parseFloat(animeData.score) / 2).toFixed(1)}/5
                      </Text>
                      <Text fontSize="13px" color="var(--text-secondary)">
                        ({animeData.score}/10)
                      </Text>
                    </Flex>
                  )}
                </VStack>

                <Box
                  borderBottom="1px solid rgba(255, 255, 255, 0.1)"
                  mb="20px"
                />

                {/* ACTION BUTTONS ROW */}
                <Flex
                  direction={{ base: "column", md: "row" }}
                  gap="12px"
                  alignItems={{ base: "stretch", md: "center" }}
                  justifyContent="space-between"
                >
                  {/* SUB/DUB TOGGLE */}
                  <HStack gap="0">
                    <Button
                      size="md"
                      bg={
                        version === "sub"
                          ? "var(--accent-color)"
                          : "rgba(255, 255, 255, 0.05)"
                      }
                      border="1px solid"
                      borderColor={
                        version === "sub"
                          ? "var(--accent-color)"
                          : "rgba(255, 255, 255, 0.1)"
                      }
                      color={
                        version === "sub"
                          ? "var(--text-color)"
                          : "var(--text-secondary)"
                      }
                      borderRadius="8px 0 0 8px"
                      fontWeight="600"
                      fontSize="14px"
                      onClick={() => setVersion("sub")}
                      _hover={{
                        bg:
                          version === "sub"
                            ? "var(--accent-color)"
                            : "rgba(255, 255, 255, 0.08)",
                      }}
                      transition="all 0.2s ease"
                    >
                      SUB
                    </Button>
                    <Button
                      size="md"
                      bg={
                        version === "dub"
                          ? "var(--accent-color)"
                          : "rgba(255, 255, 255, 0.05)"
                      }
                      border="1px solid"
                      borderColor={
                        version === "dub"
                          ? "var(--accent-color)"
                          : "rgba(255, 255, 255, 0.1)"
                      }
                      borderLeft="none"
                      color={
                        version === "dub"
                          ? "var(--text-color)"
                          : "var(--text-secondary)"
                      }
                      borderRadius="0 8px 8px 0"
                      fontWeight="600"
                      fontSize="14px"
                      onClick={() => setVersion("dub")}
                      isDisabled={!hasDub}
                      _hover={{
                        bg:
                          version === "dub"
                            ? "var(--accent-color)"
                            : "rgba(255, 255, 255, 0.08)",
                      }}
                      transition="all 0.2s ease"
                    >
                      DUB
                      {!hasDub && (
                        <Badge
                          ml="6px"
                          fontSize="9px"
                          px="6px"
                          py="2px"
                          bg="rgba(255, 255, 255, 0.1)"
                          color="var(--text-secondary)"
                        >
                          N/A
                        </Badge>
                      )}
                    </Button>
                  </HStack>

                  {/* DOWNLOAD & SHARE BUTTONS */}
                  <HStack spacing="8px" alignItems="center">
                    <DownloadLinksSelect
                      episodeSession={sessionEpisode}
                      sessionId={sessionId}
                      nextSessionEpisode={nextSessionEpisode}
                    />

                    <IconButton
                      aria-label="Share"
                      bg="rgba(255, 255, 255, 0.05)"
                      border="1px solid rgba(255, 255, 255, 0.1)"
                      color="var(--text-color)"
                      borderRadius="8px"
                      _hover={{
                        bg: "rgba(255, 255, 255, 0.08)",
                        borderColor: "var(--text-color)",
                      }}
                      transition="all 0.2s ease"
                    >
                      <Share2 size={16} />
                    </IconButton>
                  </HStack>
                </Flex>
              </Box>
            </Box>

            {/* DESCRIPTION SECTION (Below player on mobile/tablet) */}
            <Box
              display={{ base: "block", xl: "none" }}
              mt="20px"
              bg="var(--card-background-color)"
              border="1px solid rgba(255, 255, 255, 0.05)"
              borderRadius="12px"
              p={{ base: "16px", md: "20px" }}
            >
              <Heading
                as="h3"
                fontSize="18px"
                fontWeight="600"
                color="var(--text-color)"
                mb="12px"
              >
                About this Anime
              </Heading>
              <Text
                fontSize="14px"
                lineHeight="1.7"
                color="var(--text-secondary)"
                noOfLines={4}
              >
                {animeData.synopsis}
              </Text>
              <Button
                as={Link}
                to={`/anime/${animeData.id}`}
                variant="ghost"
                size="sm"
                color="var(--link-color)"
                mt="8px"
                _hover={{
                  color: "var(--link-hover-color)",
                  bg: "transparent",
                }}
              >
                View Full Details
              </Button>
            </Box>
          </Box>

          {/* RIGHT COLUMN - EPISODES LIST */}
          <Box>
            <Box
              position={{ base: "relative", xl: "sticky" }}
              top={{ xl: "100px" }}
              bg="var(--card-background-color)"
              border="1px solid rgba(255, 255, 255, 0.05)"
              borderRadius="12px"
              overflow="hidden"
              boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.5)"
            >
              {/* EPISODES HEADER */}
              <Flex
                alignItems="center"
                justifyContent="space-between"
                p={{ base: "16px", md: "20px" }}
                borderBottom="1px solid rgba(255, 255, 255, 0.05)"
              >
                <Flex alignItems="center" gap="10px">
                  <List size={18} color="var(--primary-color)" />
                  <Heading
                    as="h3"
                    fontSize={{ base: "16px", md: "18px" }}
                    fontWeight="700"
                    color="var(--text-color)"
                  >
                    Episodes
                  </Heading>
                  <Badge
                    bg="var(--primary-color)"
                    color="var(--text-color)"
                    fontSize="11px"
                    fontWeight="700"
                    px="8px"
                    py="4px"
                    borderRadius="4px"
                  >
                    {episodes.length}
                  </Badge>
                </Flex>

                <IconButton
                  aria-label="Toggle episodes"
                  icon={
                    episodesCollapsed ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronUp size={16} />
                    )
                  }
                  size="sm"
                  variant="ghost"
                  color="var(--text-secondary)"
                  display={{ base: "flex", xl: "none" }}
                  onClick={() => setEpisodesCollapsed(!episodesCollapsed)}
                  _hover={{
                    color: "var(--text-color)",
                    bg: "rgba(255, 255, 255, 0.05)",
                  }}
                />
              </Flex>

              {/* EPISODES LIST */}
              <Box
                display={{
                  base: episodesCollapsed ? "none" : "block",
                  xl: "block",
                }}
                maxH={{ base: "400px", xl: "calc(100vh - 200px)" }}
                overflowY="auto"
                p={{ base: "12px", md: "16px" }}
                css={{
                  "&::-webkit-scrollbar": {
                    width: "8px",
                  },
                  "&::-webkit-scrollbar-track": {
                    background: "rgba(255, 255, 255, 0.03)",
                    borderRadius: "4px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "rgba(255, 255, 255, 0.2)",
                    borderRadius: "4px",
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    background: "rgba(255, 255, 255, 0.3)",
                  },
                }}
              >
                {episodes.length > 0 ? (
                  <EpisodeList
                    items={episodes}
                    itemId={episodeIds}
                    streaming={true}
                    activeEP={activeEpId}
                  />
                ) : (
                  <Text
                    textAlign="center"
                    color="var(--text-secondary)"
                    fontSize="14px"
                    py="40px"
                  >
                    No episodes available
                  </Text>
                )}
              </Box>
            </Box>

            {/* ANIME INFO CARD (Desktop only) */}
            <Box
              display={{ base: "none", xl: "block" }}
              mt="20px"
              bg="var(--card-background-color)"
              border="1px solid rgba(255, 255, 255, 0.05)"
              borderRadius="12px"
              p="20px"
            >
              <Heading
                as="h3"
                fontSize="16px"
                fontWeight="600"
                color="var(--text-color)"
                mb="12px"
              >
                About
              </Heading>
              <Text
                fontSize="13px"
                lineHeight="1.7"
                color="var(--text-secondary)"
                noOfLines={6}
              >
                {animeData.synopsis}
              </Text>
              <Button
                as={Link}
                to={`/anime/${animeData.id}`}
                variant="ghost"
                size="sm"
                color="var(--link-color)"
                mt="12px"
                w="100%"
                _hover={{
                  color: "var(--link-hover-color)",
                  bg: "rgba(255, 255, 255, 0.03)",
                }}
              >
                View Full Details
              </Button>

              {/* GENRES */}
              {animeData.genres && animeData.genres.length > 0 && (
                <Box mt="16px">
                  <Text
                    fontSize="13px"
                    fontWeight="600"
                    color="var(--text-color)"
                    mb="8px"
                  >
                    Genres
                  </Text>
                  <Flex gap="6px" flexWrap="wrap">
                    {animeData.genres.slice(0, 4).map((genre) => (
                      <Badge
                        key={genre}
                        bg="rgba(99, 102, 241, 0.15)"
                        border="1px solid var(--accent-color)"
                        color="var(--accent-color)"
                        fontSize="11px"
                        fontWeight="500"
                        px="10px"
                        py="4px"
                        borderRadius="4px"
                      >
                        {genre}
                      </Badge>
                    ))}
                  </Flex>
                </Box>
              )}
            </Box>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};

export default Stream;
