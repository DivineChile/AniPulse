import { Box, Breadcrumb, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Error from "../../components/ErrorPage/Error";
import { ChevronDown } from "lucide-react";

import "./style.css";
import Loading from "../../components/ErrorPage/Loading";
import Player from "../../components/Anime/VideoPlayer/Player";
import { PlayerContext } from "../../contexts/PlayerContext";
import DownloadLinksSelect from "./DownloadLinksSelect";
import MoviePlayer from "../../components/Anime/VideoPlayer/MoviePlayer";

const Stream = () => {
  const { watchId } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const season = searchParams.get("season");
  const episode = searchParams.get("episode");
  const activeEpId = searchParams.get("ep"); // e.g., "138379"
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
  const [dubStatus, setDubStatus] = useState(null);
  const [isDub, setIsDub] = useState({});
  const [subStatus, setSubStatus] = useState(null);

  const [activeLink, setActiveLink] = useState(null);
  const [activeDubLink, setActiveDubLink] = useState(null);
  const [currentEpisode, setCurrentEpisode] = useState(null);
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

  //Base URLS
  const backup_api = "https://anime-api-production-bc3d.up.railway.app/";
  const proxy = "https://cors-anywhere-aifwkw.fly.dev/";
  const streamProxy =
    "https://divinechile-deno-m3u8-p-11.deno.dev/m3u8-proxy?url=";

  const animePahe_api = "https://paheapi-production.up.railway.app/";
  const TMDB_API = "https://api.themoviedb.org/3";
  const TMDB_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const fullPath = `${watchId}${location.search}`;

  const handleClick = (index) => {
    setActiveLink(index); // Update the active link index;
    setActiveDubLink(null);
    setSubStatus(true);
    setDubStatus(false);
  };

  const handleDubClick = (index) => {
    setActiveDubLink(index);
    setActiveLink(null);
    setDubStatus(true);
    setSubStatus(false);
  };

  // Determine content type
  useEffect(() => {
    if (season && episode) {
      setContentType("series");
    } else if (!isNaN(watchId)) {
      setContentType("movie");
    } else {
      setContentType("anime");
    }
  }, [watchId, season, episode]);

  //Fetch Anime data
  useEffect(() => {
    if (contentType !== "anime") return;

    const fetchAnimeData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${proxy}${backup_api}/api/info?id=${watchId}`
        );
        const data = await response.json();

        setAnimeData(data.results.data);
        setAnimeTitle(data.results.data.title);
        setAnimeRating(data.results.data.animeInfo["MAL Score"]);
        setIsDub(data.results.data.animeInfo.tvInfo.dub);
      } catch (error) {
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    //Fetch anime episodes
    const fetchEpisodes = async () => {
      setEpLoading(true);
      setEpError(null);
      try {
        const response = await fetch(
          `${proxy}${backup_api}/api/episodes/${watchId}`
        );
        const data = await response.json();

        setEpisodes(data.results.episodes || []);
      } catch {
        setEpError(true);
      } finally {
        setEpLoading(false);
      }
    };

    fetchAnimeData();
    fetchEpisodes();
  }, [watchId, contentType]);

  // TMDb Logic (Movies & Series)
  useEffect(() => {
    if (contentType === "anime") return;

    const fetchTMDb = async () => {
      setLoading(true);
      setEpLoading(true);
      try {
        if (contentType === "movie") {
          const res = await fetch(
            `${TMDB_API}/movie/${watchId}?api_key=${TMDB_KEY}`
          );
          const data = await res.json();
          setAnimeTitle(data.title);
          setAnimeRating(data.vote_average);
          setEpisodes([
            {
              title: `Full Movie - ${animeTitle}`,
              number: 1,
              episodeId: watchId, // or just `watchId` if your system expects that
            },
          ]);
          setCurrentEpisode(`Full Movie - ${animeTitle}`);
          setEpisodeNumber(1);
          document.title = `Watching ${data.title} | AniPulse`;
        } else if (contentType === "series") {
          const res = await fetch(
            `${TMDB_API}/tv/${watchId}?api_key=${TMDB_KEY}`
          );
          const data = await res.json();
          setAnimeTitle(data.name);
          setAnimeRating(data.vote_average);
          document.title = `Watching ${data.name} S${season}E${episode} | AniPulse`;

          // Fetch episodes for the series
          const episodesRes = await fetch(
            `${TMDB_API}/tv/${watchId}/season/${season}?api_key=${TMDB_KEY}`
          );
          const episodesData = await episodesRes.json();
          const formattedEpisodes = episodesData.episodes.map((ep) => ({
            title: ep.name,
            number: ep.episode_number,
            episodeId: `${watchId}-s${season}-e${ep.episode_number}`,
          }));
          setEpisodes(formattedEpisodes);
          setCurrentEpisode(
            `Episode ${episode} - ${
              formattedEpisodes.find((ep) => ep.number === parseInt(episode))
                ?.title || "Unknown"
            }`
          );
          setEpisodeNumber(parseInt(episode));
        }
      } catch (err) {
        setError("Failed to load movie/series data");
      } finally {
        setLoading(false);
        setEpLoading(false);
      }
    };

    fetchTMDb();
  }, [watchId, contentType, season]);
  // Set the document title based on the anime title and current episode
  // This will update the title whenever animeTitle, contentType, season, or episode changes
  useEffect(() => {
    if (!animeTitle || !contentType) return;

    let title = "AniPulse";
    let episodeText = "";

    const searchParams = new URLSearchParams(location.search);
    const activeEpId = searchParams.get("ep");

    if (contentType === "series" && season && episode) {
      const current = episodes?.find((ep) => ep.number === parseInt(episode));
      title = `Watching ${animeTitle} S${season}E${episode} | AniPulse`;
      episodeText = `Episode ${episode} - ${current?.title || "Unknown"}`;
    } else if (contentType === "anime" && activeEpId) {
      const current = episodes?.find((ep) =>
        ep.id.endsWith(`ep=${activeEpId}`)
      );

      const currentEpNo = current?.episode_no ?? "??";

      title = `Watching ${animeTitle} Episode ${currentEpNo} | AniPulse`;
      episodeText = `Episode ${currentEpNo} - ${current?.title || "Unknown"}`;
    } else if (contentType === "movie") {
      title = `Watching ${animeTitle} | AniPulse`;
      episodeText = animeTitle;
    }

    document.title = title;
    setCurrentEpisode(episodeText);
  }, [animeTitle, contentType, season, episode, episodes, location.search]);

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

  return (
    <Box>
      <Navbar />
      <Box background="var(--primary-background-color)">
        <Box
          maxW={{
            base: "90%",
            sm: "95%",
            xl: "85%",
            "2xl": "container.xl",
          }}
          margin="auto"
          py="20px"
        >
          {/* BreadCrumb Links */}
          <Breadcrumb.Root mb="20px">
            <Breadcrumb.List>
              <Breadcrumb.Item
                fontSize={{ base: "15.13px", lg: "18.75px" }}
                lineHeight={{ base: "24px", lg: "30px" }}
                letterSpacing="0.5px"
                color="var(--text-color)"
                _hover={{ color: "var(--link-hover-color)" }}
              >
                <Breadcrumb.Link
                  as={Link}
                  to={contentType === "anime" ? `/` : "/movies"}
                >
                  {contentType === "anime"
                    ? "Anime"
                    : contentType === "movie"
                    ? "Movies"
                    : "Movies"}
                </Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Separator />
              <Breadcrumb.Item
                isCurrentPage
                fontSize={{ base: "15.13px", lg: "18.75px" }}
                lineHeight={{ base: "24px", lg: "30px" }}
                letterSpacing="0.5px"
                color="var(--link-color)"
                _hover={{ color: "var(--link-hover-color)" }}
              >
                <Breadcrumb.Link>Stream</Breadcrumb.Link>
              </Breadcrumb.Item>

              <Breadcrumb.Separator />
              <Breadcrumb.Item>
                <Breadcrumb.CurrentLink>
                  $
                  {contentType === "anime"
                    ? dubStatus
                      ? `${animeTitle} ${currentEpisode} (Dub)`
                      : `${animeTitle} ${currentEpisode}`
                    : contentType === "movie"
                    ? animeTitle
                    : `${animeTitle} Season ${season} ${currentEpisode}`}
                </Breadcrumb.CurrentLink>
              </Breadcrumb.Item>
            </Breadcrumb.List>
          </Breadcrumb.Root>

          {/* Anime Stream */}
          <Box>
            <Box className="player-wrapper" width="100%" height="100%">
              <Grid
                gridTemplateColumns="repeat(6, 1fr)"
                gap={{ base: "30px 0", xl: "30px 30px" }}
              >
                {/* Anime Video */}

                <GridItem
                  colSpan={{ base: 6, xl: 4 }}
                  h={{
                    base: "250px",
                    sm: "350px",
                    md: "400px",
                    xl: "450px!important",
                    "2xl": "600px!important",
                  }}
                  boxShadow="0 0 20px 0 var(--card-background-color)"
                  bg="var(--primary-background-color)"
                  borderRadius="10px"
                  pos="relative"
                >
                  {contentType === "anime" ? (
                    <Player dub={dubStatus} sub={subStatus} />
                  ) : (
                    <MoviePlayer />
                  )}
                </GridItem>

                <GridItem
                  colSpan={{ base: 6, xl: 2 }}
                  h={{
                    base: "250px",
                    sm: "300px",
                    md: "350px",
                    lg: "450px",
                    "2xl": "600px",
                  }}
                  overflowY="scroll"
                  boxShadow="0 0 10px 0 var(--card-background-color)"
                  bg="var(--primary-background-color)"
                  borderRadius="10px"
                  width={{ base: "220px", md: "50%", lg: "100%" }}
                  transition="all ease 0.25s"
                >
                  <Box
                    width="100%"
                    bg="transparent"
                    display="flex"
                    alignItems="center"
                    justifyContent="start"
                  >
                    {/* Season box */}
                    <Box width="100%">
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        gap="0 10px"
                        cursor="pointer"
                        pos="relative"
                        height="60px"
                        ps="20px"
                      >
                        <Text
                          color="var(--text-color)"
                          fontSize="17.58px"
                          lineHeight="24px"
                        >
                          {contentType === "anime"
                            ? `Season`
                            : contentType === "movie"
                            ? "Movie"
                            : `Season ${season}`}
                        </Text>
                        <ChevronDown
                          h="18px"
                          w="18px"
                          color="var(--text-color)"
                        />
                      </Box>

                      {/* Episodes List */}
                      <Box
                        display={{ base: "flex" }}
                        flexDir={{ base: "column" }}
                        pos="relative"
                        alignItems="flex-start"
                      >
                        {(() => {
                          if (epLoading)
                            return <Loading bg="var(--linear-gradient)" />;
                          if (epError) return <Error bg="none" msg={epError} />;

                          if (!episodes || episodes.length === 0) {
                            return (
                              <Error bg="none" msg="No episodes available." />
                            );
                          }

                          const renderLink = (to, label, isActive) => (
                            <Link
                              key={to}
                              to={to}
                              style={{
                                textDecoration: "none",
                                fontFamily: "var(--font-family)",
                              }}
                              className={
                                isActive ? "episode active" : "episode"
                              }
                            >
                              {label}
                            </Link>
                          );

                          return (
                            <>
                              {contentType === "anime" &&
                                episodes.map(
                                  ({ episode_no: episode_no, id }) => {
                                    const isActive = id.endsWith(
                                      `ep=${activeEpId}`
                                    );

                                    return renderLink(
                                      `/watch/${id}`,
                                      `Episode ${episode_no}`,
                                      isActive
                                    );
                                  }
                                )}

                              {contentType === "movie" &&
                                episodes.map(({ title, episodeId }) => {
                                  return renderLink(
                                    `/watch/${episodeId}`,
                                    animeTitle,
                                    location.pathname === `/watch/${episodeId}`
                                  );
                                })}

                              {contentType === "series" &&
                                episodes.map(({ title, number, episodeId }) =>
                                  renderLink(
                                    `/watch/${watchId}?season=${season}&episode=${number}`,
                                    `Episode ${number}`,
                                    location.search ===
                                      `?season=${season}&episode=${number}`
                                  )
                                )}
                            </>
                          );
                        })()}
                      </Box>
                    </Box>
                  </Box>
                </GridItem>
                {/* Anime Dets / Servers / Downlaod */}
                <GridItem
                  colSpan="6"
                  boxShadow="0 0 10px 0 var(--card-background-color)"
                  bg="var(--primary-background-color)"
                  borderRadius="10px"
                  transition="all ease 0.25s"
                  p="20px"
                  w="100%"
                  display={{ base: "grid", xl: "flex" }}
                  gridTemplateColumns="repeat(12, 1fr)"
                  justifyContent={{ base: "initial", xl: "space-between" }}
                  gap={{ base: "20px 0", md: "20px 20px", lg: "20px 40px" }}
                >
                  {/* Anime Details */}
                  <GridItem
                    colSpan={{ base: "12", lg: "6", xl: "3" }}
                    width={{ base: "initial", xl: "30%" }}
                    textAlign={{ base: "center", md: "start" }}
                  >
                    <Text
                      color="var(--text-color)"
                      fontSize="15.38px"
                      lineHeight="24px"
                      letterSpacing="0.5px"
                      fontFamily="var(--body-font)"
                    >
                      You&apos;re watching{" "}
                      <Text as="span" color="var(--link-color)">
                        {contentType === "anime"
                          ? `Episode ${realEpNo}`
                          : contentType === "movie"
                          ? animeTitle
                          : `Season ${season} Episode ${episode}`}
                      </Text>
                    </Text>
                    <Text
                      fontSize="15.38px"
                      lineHeight="24px"
                      letterSpacing="0.5px"
                      color="var(--text-color)"
                      fontFamily="var(--body-font)"
                    >
                      If current servers dosen&apos;t work, please try other
                      servers.
                    </Text>
                  </GridItem>
                  {/* Anime Servers (DUB & SUB) */}
                  <GridItem
                    borderLeft={{ base: "none", md: "1px solid #616161" }}
                    padding="0 20px"
                    display="flex"
                    flexDir="column"
                    gap="15px 0"
                    colSpan={{ base: "12", lg: "6", xl: "5" }}
                    width={{ base: "initial", xl: "50%" }}
                  >
                    {/* Sub */}
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent={{ base: "center", md: "start" }}
                      flexDir={{ base: "column", md: "row" }}
                      gap={{ base: "10px 0", md: "0 10px" }}
                    >
                      <Text
                        color={
                          dubStatus ? "var(--text-color)" : "var(--link-color)"
                        }
                        letterSpacing="0.5px"
                        lineHeight="24px"
                        fontFamily="var(--body-font)"
                      >
                        SUB:
                      </Text>
                      <Flex
                        gap={{ base: "10px", md: "10px" }}
                        flexWrap="wrap"
                        justifyContent={{ base: "center", md: "start" }}
                      >
                        {["Server 1", "Server 2", "Server 3", "Server 4"].map(
                          (server, index) => (
                            <Link
                              key={index}
                              className={
                                activeLink === index
                                  ? "server active"
                                  : "server"
                              }
                              style={{ fontFamily: "var(--body-font)" }}
                              onClick={() => handleClick(index)} // Set the active index on click
                            >
                              {server}
                            </Link>
                          )
                        )}
                      </Flex>
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent={{ base: "center", md: "start" }}
                      flexDir={{ base: "column", md: "row" }}
                      gap={{ base: "10px 0", md: "0 10px" }}
                    >
                      <Text
                        color={
                          dubStatus ? "var(--link-color)" : "var(--text-color)"
                        }
                        letterSpacing="0.5px"
                        lineHeight="24px"
                        fontFamily="var(--body-font)"
                      >
                        DUB:
                      </Text>
                      <Flex
                        gap={{ base: "10px", md: "10px" }}
                        flexWrap="wrap"
                        justifyContent={{ base: "center", md: "start" }}
                      >
                        {isDub ? (
                          ["Server 1", "Server 2", "Server 3", "Server 4"].map(
                            (server, index) => (
                              <Link
                                key={index}
                                className={
                                  activeDubLink === index
                                    ? "server active"
                                    : "server"
                                }
                                style={{ fontFamily: "var(--body-font)" }}
                                onClick={() => handleDubClick(index)} // Set the active index on click
                              >
                                {server}
                              </Link>
                            )
                          )
                        ) : (
                          <Text
                            color="var(--text-color)"
                            fontFamily="var(--body-font)"
                          >
                            N/A
                          </Text>
                        )}
                      </Flex>
                    </Box>
                  </GridItem>

                  {/* Anime Download */}
                  <GridItem
                    display="flex"
                    flexDir={{ base: "column", sm: "row", lg: "column" }}
                    gap={{ base: "10px 0", sm: "0 10px", lg: "10px 0" }}
                    alignItems={{ base: "center", lg: "start" }}
                    justifyContent={{ base: "center", md: "start" }}
                    colSpan={{ base: "12", lg: "12", xl: "3" }}
                    mt={{ base: "20px", md: "0" }}
                    width={{ base: "initial" }}
                  >
                    <DownloadLinksSelect
                      episodeSession={sesssionEpisode}
                      sessionId={sessionId}
                      nextSessionEpisode={nextSessionEpisode}
                    />

                    <Text
                      fontSize={{ base: "15.58px", "2xl": "24.41px" }}
                      lineHeight={{ base: "28.8px", "2xl": "37.5px" }}
                      letterSpacing="0.5px"
                      color="var(--text-color)"
                      textTransform="uppercase"
                    >
                      {" "}
                      Rating: {animeRating ? `${animeRating} /10` : "N/A"}
                    </Text>
                  </GridItem>
                </GridItem>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Stream;
