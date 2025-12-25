import {
  Box,
  Breadcrumb,
  Button,
  Collapsible,
  Grid,
  GridItem,
  Heading,
  HStack,
  IconButton,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useContext, useEffect, useState, useMemo } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Error from "../../components/ErrorPage/Error";
import { ChevronDown, Download } from "lucide-react";

import "./style.css";
import Player from "../../components/Anime/VideoPlayer/Player";
import { PlayerContext } from "../../contexts/PlayerContext";
import DownloadLinksSelect from "./DownloadLinksSelect";
import MoviePlayer from "../../components/Anime/VideoPlayer/MoviePlayer";
import { cacheFetch } from "../../utils/cacheFetch";
import EpisodeList from "../../components/Anime/EpisodeList/EpisodeList";

const Stream = () => {
  const { watchId } = useParams();
  const location = useLocation();
  const activeEpId =
    location.pathname.includes("episode") &&
    location.pathname.split("-")[location.pathname.split("-").length - 1]; // e.g., "138379"
  const [contentType, setContentType] = useState(null);
  const [epLoading, setEpLoading] = useState(true);
  const [epError, setEpError] = useState(null);
  const [animeData, setAnimeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [episodeNumber, setEpisodeNumber] = useState("");
  const [animeRating, setAnimeRating] = useState("");
  const [animeTitle, setAnimeTitle] = useState("");
  const [dubStatus, setDubStatus] = useState(false);
  const [isDub, setIsDub] = useState(null);
  const [activeArr, setActiveArr] = useState([]);

  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [season, setSeason] = useState(null);

  const {
    selectedQuality,
    availableQualities,
    setSelectedQuality,
    setAvailableQualities,
  } = useContext(PlayerContext);

  const [sessionId, setSessionId] = useState("");
  const [sesssionEpisode, setSessionEpisode] = useState("");
  const [nextSessionEpisode, setNextSessionEpisode] = useState("");
  const [sessionResult, setSessionResult] = useState({});
  const [version, setVersion] = useState("sub");
  const [collapsed, setCollapsed] = useState(false);

  //Base URLS
  const backup_api = "https://anime-api-production-bc3d.up.railway.app/";
  const kenjitsu_api = "https://kenjitsu-api-production.up.railway.app/";
  const proxy = "https://cors-anywhere-aifwkw.fly.dev/";

  const animePahe_api = "https://pahe-api.fly.dev/";
  const TMDB_API = "https://api.themoviedb.org/3";
  const TMDB_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const fullPath = `${watchId}${location.search}`;

  // Determine content type
  useEffect(() => {
    if (location.pathname.includes("/tv")) {
      setContentType("series");
    } else if (location.pathname.includes("/movie")) {
      setContentType("movie");
    } else {
      setContentType("anime");
    }
  }, [location.pathname]);

  //Fetch Anime data
  useEffect(() => {
    if (contentType !== "anime") return;

    const fetchAnimeData = async () => {
      setLoading(true);
      setError(null);

      const animeArr = watchId.split("-");
      const animeName = animeArr.splice(0, animeArr.length - 2).join("-");
      const cacheKey = `animeInfo_${animeName}`;

      try {
        const data = await cacheFetch(`api/hianime/anime/${animeName}`, {
          cacheKey,
        });

        setAnimeData(data.data);
        setAnimeTitle(data.data.name);
        setAnimeRating(data.data.score);
        setIsDub(data.data.episodes.dub);
        setDubStatus(data.data.episodes?.dub ? true : false);
        setEpisodes(data.providerEpisodes || []);
        setActiveArr(
          data?.providerEpisodes?.filter((ep) => ep.episodeId === watchId)
        );
        setCurrentEpisode(
          `Episode ${
            data.providerEpisodes.find((ep) => ep.episodeId === watchId)
              .episodeNumber
          }`
        );
      } catch (error) {
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeData();
  }, [watchId, contentType]);

  // TMDb Logic (Movies & Series)
  useEffect(() => {
    if (contentType === "anime") return;

    const fetchMediaData = async () => {
      setLoading(true);
      setEpLoading(true);
      const mediaArr = watchId.split("-");
      const mediaName = mediaArr.splice(0, mediaArr.length - 2).join("-");
      const newMediaName = mediaName
        .split("-")
        .toSpliced(1, 0, "watch")
        .join("-");
      const cacheKey = `mediaInfo_${newMediaName}`;

      try {
        if (contentType === "movie") {
          const data = await cacheFetch(`api/flixhq/media/${newMediaName}`, {
            cacheKey,
          });

          setAnimeTitle(data?.data?.name);
          setAnimeRating(data?.data.score);
          setActiveArr(
            data?.providerEpisodes?.filter((ep) => ep.episodeId === watchId)
          );
          setEpisodes([
            {
              title: `Full Movie - ${data?.data?.name}`,
              number: 1,
              episodeId: watchId, // or just `watchId` if your system expects that
            },
          ]);
          setCurrentEpisode(`Full Movie - ${data?.data?.name}`);
          setEpisodeNumber(1);
          document.title = `Watching ${data?.data?.name} | AniPulse`;
        } else if (contentType === "series") {
          const data = await cacheFetch(`api/flixhq/media/${newMediaName}`, {
            cacheKey,
          });

          setAnimeTitle(data?.data?.name);
          setAnimeRating(data?.data.score);
          setActiveArr(
            data?.providerEpisodes?.filter((ep) => ep.episodeId === watchId)
          );
          document.title =
            data?.providerEpisodes?.filter((ep) =>
              ep.episodeId === watchId
                ? `Watching ${data?.data?.name} S${ep.seasonNumber} E${ep.episodeNumber} | AniPulse`
                : null
            )[0] || `Watching ${data?.data?.name} | AniPulse`;

          // Fetch episodes for the series

          setEpisodes(data?.providerEpisodes || []);
          setCurrentEpisode(
            `Episode ${data?.providerEpisodes.find(
              ((ep) => ep.episodeId === watchId)?.episodeNumber
            )} - ${
              data?.providerEpisodes.find((ep) => ep.episodeId === watchId)
                ?.title || "Unknown"
            }`
          );
          setSeason(
            data?.providerEpisodes.find((ep) => ep.episodeId === watchId)
              ?.seasonNumber
          );
          setEpisodeNumber(
            data?.providerEpisodes.find((ep) => ep.episodeId === watchId)
              ?.episodeNumber
          );
        }
      } catch (err) {
        setError("Failed to load movie/series data");
      } finally {
        setLoading(false);
        setEpLoading(false);
      }
    };

    fetchMediaData();
  }, [watchId, contentType]);
  // Set the document title based on the anime title and current episode
  // This will update the title whenever animeTitle, contentType, season, or episode changes
  useEffect(() => {
    if (!animeTitle || !contentType) return;

    let title = "AniPulse";
    let episodeText = "";

    if (contentType === "series") {
      title = `Watching ${animeTitle} S${activeArr[0]?.seasonNumber}E${activeArr[0]?.episodeNumber} | AniPulse`;
      episodeText = `Episode ${activeArr[0]?.episodeNumber} - ${
        activeArr[0]?.title || "Unknown"
      }`;
    } else if (contentType === "anime" && activeEpId) {
      const currentEpNo = activeArr[0]?.episodeNumber ?? "??";

      title = `Watching ${animeTitle} Episode ${currentEpNo} ${
        version === "dub" ? "(Dub)" : ""
      } | AniPulse`;
      console.log(title);
      episodeText = `Episode ${currentEpNo} - ${
        activeArr[0]?.title || "Unknown"
      }`;
    } else if (contentType === "movie") {
      title = `Watching ${animeTitle} | AniPulse`;
      episodeText = animeTitle;
    }

    document.title = title;
    setCurrentEpisode(episodeText);
  }, [animeTitle, contentType, season, episodes, activeArr, version]);

  // Fetch session ID of anime
  const fetchSessionId = async () => {
    if (!animeTitle) return;

    try {
      const response = await fetch(
        `${animePahe_api}/search/${encodeURIComponent(animeTitle)}`
      );
      const data = await response.json();

      const results = data.results || [];

      // Normalize strings for better matching
      const normalize = (str) => str?.toLowerCase().replace(/[^a-z0-9]/g, "");

      // Try to find a close match
      const exactMatch =
        results.find(
          (anime) =>
            normalize(anime.title) === normalize(animeTitle) ||
            normalize(anime.japanese_title) === normalize(animeTitle)
        ) ||
        results.find(
          (anime) =>
            anime.title?.toLowerCase().includes(animeTitle.toLowerCase()) ||
            anime.japanese_title
              ?.toLowerCase()
              .includes(animeTitle.toLowerCase())
        ) ||
        results[0]; // fallback to first result

      if (exactMatch?.session_id) {
        setSessionId(exactMatch.session_id);
        setSessionResult(exactMatch);
      } else {
        console.error("No matching anime with a session ID found.");
      }
    } catch (error) {
      console.error("Error fetching session ID:", error);
    }
  };

  // Fetch session ID when animeTitle or contentType changes
  // This ensures we only fetch the session ID for anime content type
  useEffect(() => {
    if (contentType !== "anime") return;
    if (animeTitle) {
      fetchSessionId();
    }
  }, [animeTitle, contentType]);

  let epNo = currentEpisode?.match(/\d+/);
  let realEpNo = epNo ? parseInt(epNo[0]) : null;

  // Fetch episode session of anime — only when sessionId & realEpNo are valid
  useEffect(() => {
    if (contentType !== "anime") return;
    if (!sessionId || !realEpNo) return;

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

        if (!allEpisodes || allEpisodes.length === 0) {
          console.error(`[❌] No episodes found for this anime.`);
          return;
        }

        const apiFirstEp = Math.min(
          ...allEpisodes.map((ep) => parseInt(ep.episode))
        );
        const offset = apiFirstEp - 1;
        const adjustedEpisode = realEpNo + offset;
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
        console.error(`[🔥] Error fetching episode session:`, err);
      }
    };

    fetchEpisodeSession();
  }, [sessionId, realEpNo, contentType]);

  // Derived episode IDs array for EpisodeList prop
  const episodeIds = useMemo(
    () => episodes.map((e) => e.episodeId),
    [episodes]
  );

  const crumbLabel = useMemo(() => {
    if (contentType === "anime") {
      if (version === "dub") return `${animeTitle} ${currentEpisode} (Dub)`;
      else return `${animeTitle} ${currentEpisode}`;
    } else if (contentType === "movie") return animeTitle;
    else {
      return `${animeTitle} Season ${activeArr[0]?.seasonNumber} ${currentEpisode}`;
    }
  }, [contentType, animeTitle, currentEpisode, version]);

  return (
    <Box>
      <Navbar />
      <Box bg="var(--primary-background-color)" minH="70vh" pb="40px">
        <Box
          maxW={{ base: "95%", md: "95%", xl: "85%", "2xl": "container.xl" }}
          mx="auto"
          pt={{ base: "90px", md: "100px" }}
          pb={10}
        >
          {/* Breadcrumb */}
          <Breadcrumb.Root mb={4}>
            <Breadcrumb.List>
              <Breadcrumb.Item>
                <Breadcrumb.Link
                  as={Link}
                  to={contentType === "anime" ? "/" : "/movies"}
                >
                  {contentType === "anime" ? "Anime" : "Movies"}
                </Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Separator />

              <Breadcrumb.Item>
                <Breadcrumb.Link>Stream</Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Separator />

              <Breadcrumb.Item>
                <Breadcrumb.CurrentLink>{crumbLabel}</Breadcrumb.CurrentLink>
              </Breadcrumb.Item>
            </Breadcrumb.List>
          </Breadcrumb.Root>

          {/* Layout grid: player (main) + sidebar (episodes) */}
          <Grid
            templateColumns={{ base: "1fr", xl: "2fr 1fr" }}
            gap={{ base: 6, xl: 8 }}
            alignItems="start"
          >
            {/* PLAYER + ACTIONS (left/main column) */}
            <GridItem>
              <Box
                bg="var(--primary-background-color)"
                borderRadius="12px"
                shadow="md"
                overflow="hidden"
              >
                {/* Player container */}
                <Box
                  pos="relative"
                  w="100%"
                  h={{ base: "220px", md: "420px", lg: "500px" }}
                >
                  {contentType === "anime" ? (
                    <Player version={version} />
                  ) : (
                    <MoviePlayer />
                  )}
                </Box>

                {/* Below player: controls / meta */}
                <Box
                  p={4}
                  borderTop="1px solid rgba(255,255,255,0.03)"
                  // divideY="2px"
                  gap={3}
                  display="flex"
                  flexDir={{ base: "column", md: "row" }}
                  justifyContent={{ base: "center", md: "space-between" }}
                  alignItems={{ base: "center", md: "center" }}
                >
                  <Stack
                    direction={{ base: "column" }}
                    // justify="space-between"
                    align={{ base: "center", md: "flex-start" }}
                    gap={4}
                    pb={2}
                  >
                    <VStack
                      align="start"
                      alignItems={{ base: "center", md: "start" }}
                      spacing={1}
                    >
                      <Heading
                        size="md"
                        color="var(--text-color)"
                        textAlign={{ base: "center", md: "left" }}
                      >
                        {animeTitle || "Unknown title"}
                      </Heading>
                      <Text color="var(--text-secondary)" fontSize="sm">
                        {contentType === "anime"
                          ? `${currentEpisode}`
                          : contentType === "series"
                          ? `Season ${activeArr[0]?.seasonNumber} Episode ${activeArr[0]?.episodeNumber}`
                          : "Now Playing"}
                      </Text>
                    </VStack>

                    <HStack spacing={3}>
                      {/* Sub / Dub toggle */}
                      <HStack spacing={0}>
                        <Button
                          size="sm"
                          variant={version === "sub" ? "solid" : "outline"}
                          onClick={() => setVersion("sub")}
                          aria-pressed={version === "sub"}
                        >
                          SUB
                        </Button>
                        <Button
                          size="sm"
                          variant={version === "dub" ? "solid" : "outline"}
                          onClick={() => setVersion("dub")}
                          aria-pressed={version === "dub"}
                          disabled={!dubStatus}
                        >
                          DUB
                        </Button>
                      </HStack>

                      {/* Download / Rating */}
                      <HStack spacing={2}>
                        <Download size={16} />
                        <Text fontSize="sm" color="var(--text-color)">
                          {animeRating ? `${animeRating}/10` : "N/A"}
                        </Text>
                      </HStack>
                    </HStack>
                  </Stack>

                  {/* Download selector + extra actions (compact) */}
                  <DownloadLinksSelect
                    episodeSession={sesssionEpisode}
                    sessionId={sessionId}
                    nextSessionEpisode={nextSessionEpisode}
                  />
                </Box>
              </Box>
            </GridItem>

            {/* SIDEBAR: Episode list (right column on xl) */}
            <GridItem>
              <Box
                bg="var(--primary-background-color)"
                borderRadius="12px"
                p={4}
                h={{ base: "auto", xl: "auto" }}
                shadow="md"
              >
                <HStack justify="space-between" mb={3}>
                  <Heading size="sm" color="var(--text-color)">
                    Episodes
                  </Heading>
                  <HStack>
                    <Text fontSize="sm" color="var(--text-secondary)">
                      {episodes.length} total
                    </Text>
                    <IconButton
                      aria-label="collapse"
                      size="sm"
                      variant="ghost"
                      onClick={() => setCollapsed(!collapsed)}
                      transform={collapsed ? "rotate(0deg)" : "rotate(180deg)"}
                    >
                      <ChevronDown color="var(--text-secondary)" />
                    </IconButton>
                  </HStack>
                </HStack>

                {/* episode list area: scrollable on large screens, full width on mobile */}
                <Box
                  maxH={{ base: "auto", xl: "54vh" }}
                  overflowY={{ base: "visible", xl: "auto" }}
                  // pr={2}
                >
                  <Collapsible.Root
                    open={collapsed}
                    onOpenChange={() => setCollapsed(!collapsed)}
                  >
                    <Collapsible.Content>
                      <Box>
                        {loading ? (
                          <Text color="var(--accent-color)" fontSize="20px">
                            Loading...
                          </Text>
                        ) : error ? (
                          <Error bg="none" msg={epError} />
                        ) : episodes.length === 0 ? (
                          <Text color="var(--text-secondary)">
                            No episodes available
                          </Text>
                        ) : (
                          <EpisodeList
                            items={episodes}
                            itemId={episodeIds}
                            streaming={true}
                            activeEP={activeEpId}
                          />
                        )}
                        {/* {console.log(episodeIds)} */}
                      </Box>
                    </Collapsible.Content>
                  </Collapsible.Root>
                </Box>
              </Box>
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Stream;
