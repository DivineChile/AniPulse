import {
  Box,
  Text,
  Grid,
  GridItem,
  Heading,
  Link as ChakraLink,
  Flex,
  TagRoot,
  TagLabel,
  Button,
  Image,
  IconButton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  useParams,
  Link as ReactRouterLink,
  useLocation,
} from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import Error from "../../ErrorPage/Error";

import EpisodeList from "../EpisodeList/EpisodeList";
import Loading from "../../ErrorPage/Loading";
import {
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  Layers,
  ListVideo,
  Loader,
  Star,
  Tag,
  TagIcon,
} from "lucide-react";
import { cacheFetch } from "../../../utils/cacheFetch";

/* Small reusable card */
const DetailCard = ({ icon, label, value }) => (
  <Box
    bg="rgba(255,255,255,0.05)"
    border="1px solid rgba(255,255,255,0.1)"
    p="20px"
    borderRadius="12px"
    color="var(--text-color)"
  >
    <Flex align="center" gap="10px" mb="5px">
      {icon}
      <Text fontSize="16px" fontWeight="600">
        {label}
      </Text>
    </Flex>

    <Text fontSize="14px" color="var(--text-secondary)">
      {value || "Unknown"}
    </Text>
  </Box>
);

const View = () => {
  const { id } = useParams();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animeData, setAnimeData] = useState([]);

  const [animeGenres, setAnimeGenres] = useState([]);
  const [animeStudios, setAnimeStudios] = useState([]);
  const [animeTitle, setAnimeTitle] = useState("");

  const [episodes, setEpisodes] = useState([]);
  const [episodeCount, setEpisodeCount] = useState(0);

  const [isExpanded, setIsExpanded] = useState(false);

  const backup_api = "https://anime-api-production-bc3d.up.railway.app/";
  const kenjitsu_api = "https://kenjitsu-api-production.up.railway.app";
  const proxy = "https://cors-anywhere-aifwkw.fly.dev/";

  const fetchAnimeData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Unique cache key per anime
      const cacheKey = `animeInfo_${id}`;

      // Fetch + cache for 10 minutes
      const data = await cacheFetch(`api/hianime/anime/${id}`, { cacheKey });

      const anime = data.data;

      // Update state
      setAnimeData(anime);
      setAnimeTitle(anime.name);
      setAnimeGenres(anime.genres);
      setAnimeStudios(anime.studios);
      setEpisodes(data.providerEpisodes);
      setEpisodeCount(anime.totalEpisodes);

      // Update document title
      document.title = `${anime.name} - AniPulse`;
    } catch (err) {
      setError("Failed to load anime data. Please try again.");
      console.error("Error fetching anime data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimeData();
  }, [location.pathname]);

  document.body.style.overflow = isLoading ? "hidden!important" : "initial";
  const animeInfoAired = animeData.releaseDate ? animeData.releaseDate : "";
  const animeInfoSeason = animeData.type ? animeData.type : "";
  const animeInfoStatus = animeData.status ? animeData.status : "";

  return (
    <Box>
      <Navbar />
      <Loading bg="var(--linear-gradient)" isLoading={isLoading} fullscreen />

      {error && (
        <Error
          height="100vh"
          bg="var(--primary-background-color)"
          msg="Still Loading..."
        />
      )}

      {!isLoading && !error && (
        <Box bg="var(--primary-background-color)">
          {/* ================= HERO SECTION ================= */}
          <Box
            h={{ base: "auto", md: "550px" }}
            pos="relative"
            overflow="hidden"
            pb={{ base: "30px", md: "30px" }}
            pt={{ base: "60px", md: "0" }}
          >
            <Box
              w="100%"
              h="100%"
              pos="absolute"
              bottom="0"
              background="linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.99))"
              zIndex="1"
            ></Box>
            {/* Background */}
            <Box
              pos="absolute"
              inset="0"
              bgImage={`url(${animeData.posterImage})`}
              bgSize="cover"
              bgPos="center"
              transform={{ base: "scale(1.1)", md: "scale(1)" }}
            ></Box>

            {/* Foreground content */}
            <Flex
              maxW={{
                base: "90%",
                sm: "95%",
                xl: "85%",
                "2xl": "container.xl",
              }}
              m="auto"
              direction={{ base: "column", md: "row" }}
              pos="relative"
              zIndex="2"
              h={{ base: "auto", md: "full" }}
              px={{ base: "0", md: "50px" }}
              pt={{ base: "40px", md: "0" }}
              gap={{ base: "25px", md: "30px" }}
              alignItems={{ base: "center", md: "end" }}
            >
              {/* Back button */}
              <IconButton
                as={ReactRouterLink}
                to="/"
                variant="subtle"
                position="absolute"
                top={{ base: "40px", md: "100px" }}
                left="0"
                zIndex="2"
              >
                <ChevronLeft size={20} color="var(--text-secondary)" />
              </IconButton>
              {/* Poster */}
              <Image
                src={animeData.posterImage}
                alt={animeData.name}
                w={{ base: "180px", md: "250px" }}
                h={{ base: "270px", md: "350px" }}
                borderRadius="12px"
                objectFit="cover"
                shadow="xl"
                mx={{ base: "auto", md: "0" }}
              />

              {/* Title + Info */}
              <Box
                color="white"
                maxW="650px"
                textAlign={{ base: "center", md: "left" }}
                mx={{ base: "auto", md: "0" }}
              >
                <Heading
                  fontSize={{ base: "28px", md: "48px" }}
                  lineHeight="1.15"
                  color="var(--text-color)"
                  mb="10px"
                >
                  {animeData.name.length > 30
                    ? `${animeData.name.slice(0, 27)}...`
                    : animeData.name}
                </Heading>
                <Heading
                  fontSize={{ base: "18px", md: "22px" }}
                  fontWeight="400"
                  color="var(--text-secondary)"
                  mb="15px"
                  fontStyle="italic"
                >
                  {animeData.romaji.length > 40
                    ? `${animeData.romaji.slice(0, 37)}...`
                    : animeData.romaji}
                </Heading>

                <Flex
                  justify={{ base: "center", md: "flex-start" }}
                  gap="12px"
                  wrap="wrap"
                  fontSize={{ base: "14px", md: "15px" }}
                  opacity={0.9}
                >
                  <Text>{animeInfoSeason}</Text>
                  <Text>•</Text>
                  <Text>{animeInfoAired}</Text>
                  <Text>•</Text>
                  <Text>{episodeCount} Episodes</Text>
                </Flex>

                <Button
                  as={ReactRouterLink}
                  to={`/watch/${episodes[0].episodeId}`}
                  mt="25px"
                  bg="var(--accent-color)"
                  _hover={{
                    bg: "var(--link-hover-color)",
                    color: "var(--accent-color)",
                  }}
                  w={{ base: "100%", md: "200px" }}
                  h="50px"
                  fontSize="18px"
                  borderRadius="8px"
                  color="var(--link-color)"
                >
                  Watch Now
                </Button>
              </Box>
            </Flex>
          </Box>

          {/* ================= CONTENT SECTION ================= */}
          <Box
            maxW={{
              base: "90%",
              sm: "95%",
              xl: "85%",
              "2xl": "container.xl",
            }}
            mx="auto"
            px={{ base: "0px", md: "40px" }}
            py="40px"
          >
            <Grid templateColumns={{ base: "1fr", lg: "2fr 1.2fr" }} gap="40px">
              {/* LEFT SIDE — SUMMARY + DETAILS */}
              <GridItem>
                {/* Summary Card */}
                <Box
                  bg="rgba(255,255,255,0.05)"
                  border="1px solid rgba(255,255,255,0.1)"
                  backdropFilter="blur(8px)"
                  borderRadius="15px"
                  p="25px"
                >
                  <Heading fontSize="26px" mb="12px" color="var(--text-color)">
                    Plot Summary
                  </Heading>

                  <Text
                    color="var(--text-secondary)"
                    fontSize="15px"
                    lineHeight="26px"
                  >
                    {isExpanded
                      ? animeData.synopsis
                      : animeData.synopsis?.slice(0, 300) + "..."}
                    {animeData.synopsis?.length > 300 && (
                      <Text
                        as="span"
                        color="var(--link-color)"
                        ml="8px"
                        cursor="pointer"
                        onClick={() => setIsExpanded(!isExpanded)}
                      >
                        {isExpanded ? "Show Less" : "Read More"}
                      </Text>
                    )}
                  </Text>
                </Box>

                {/* Details Grid */}
                <Grid
                  mt="30px"
                  gap="20px"
                  templateColumns={{ base: "1fr", md: "1fr 1fr" }}
                >
                  {/* CARD TEMPLATE */}
                  <DetailCard
                    icon={<CalendarDays size={20} />}
                    label="Premiered"
                    value={animeInfoAired}
                  />

                  <DetailCard
                    icon={<Building2 size={20} />}
                    label="Studio"
                    value={animeData.studios}
                  />

                  <DetailCard
                    icon={<Layers size={20} />}
                    label="Type"
                    value={animeInfoSeason}
                  />

                  <DetailCard
                    icon={
                      animeData.status?.toLowerCase()?.includes("currently") ? (
                        <Loader size={20} />
                      ) : (
                        <CheckCircle2 size={20} />
                      )
                    }
                    label="Status"
                    value={animeInfoStatus}
                  />

                  <DetailCard
                    icon={<Star size={20} />}
                    label="Score"
                    value={animeData.score}
                  />

                  <Box>
                    <Flex align="center" gap="8px" mb="8px">
                      <TagIcon size={20} color="var(--text-color)" />
                      <Text
                        fontSize="16px"
                        color="var(--text-color)"
                        fontWeight="600"
                      >
                        Genres
                      </Text>
                    </Flex>

                    <Flex wrap="wrap" gap="8px">
                      {animeGenres?.map((g) => (
                        <TagRoot
                          key={g}
                          variant="subtle"
                          bg="var(--accent-color)"
                          color="white"
                          borderRadius="full"
                          px="10px"
                          py="5px"
                          fontSize="13px"
                        >
                          <TagLabel>{g}</TagLabel>
                        </TagRoot>
                      ))}
                    </Flex>
                  </Box>
                </Grid>
              </GridItem>

              {/* RIGHT SIDE — EPISODE LIST */}
              <GridItem id="episodes">
                <Box>
                  <Flex align="center" gap="12px" mb="20px">
                    <ListVideo size={30} color="var(--text-color)" />
                    <Heading fontSize="30px" color="var(--text-color)">
                      Episode List
                    </Heading>
                  </Flex>

                  <Box
                    bg="rgba(255,255,255,0.05)"
                    border="1px solid rgba(255,255,255,0.1)"
                    backdropFilter="blur(6px)"
                    borderRadius="12px"
                    p="20px"
                  >
                    <EpisodeList
                      items={episodes}
                      itemId={episodes.map((episode) => episode.episodeId)}
                    />
                  </Box>
                </Box>
              </GridItem>
            </Grid>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default View;
