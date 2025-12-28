import {
  Box,
  Text,
  Grid,
  Heading,
  Flex,
  Button,
  Image,
  IconButton,
  Badge,
  HStack,
  VStack,
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
  Play,
  Plus,
  Share,
  ChevronLeft,
  Star,
  Calendar,
  Film,
  Tv,
  CheckCircle,
  Loader,
} from "lucide-react";
import { cacheFetch } from "../../../utils/cacheFetch";

const View = () => {
  const { id } = useParams();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animeData, setAnimeData] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const fetchAnimeData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const cacheKey = `animeInfo_${id}`;
      const data = await cacheFetch(`api/hianime/anime/${id}`, { cacheKey });
      const anime = data.data;

      setAnimeData(anime);
      setEpisodes(data.providerEpisodes || []);
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

  // Render stars based on rating
  const renderStars = (score) => {
    if (!score) return null;
    const rating = parseFloat(score);
    const fullStars = Math.floor(rating / 2);
    const hasHalfStar = rating % 2 >= 1;

    return (
      <HStack gap="4px">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            color={
              i < fullStars
                ? "var(--secondary-color)"
                : i === fullStars && hasHalfStar
                ? "var(--secondary-color)"
                : "rgba(255, 255, 255, 0.2)"
            }
          />
        ))}
      </HStack>
    );
  };

  if (isLoading) {
    return (
      <Box>
        <Navbar />
        <Loading
          bg="var(--linear-gradient)"
          isLoading={isLoading}
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

      {/* ================= HERO SECTION ================= */}
      <Box
        position="relative"
        top={{ base: "70px", md: "73px", lg: "84px" }}
        height={{
          base: "100%",
          md: "calc(100dvh - 73px)",
          lg: "calc(100dvh - 84px)",
        }}
        overflow="hidden"
        mb="50px"
      >
        {/* BACKGROUND IMAGE */}
        <Box
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          backgroundImage={`url(${animeData.posterImage})`}
          backgroundSize="cover"
          backgroundPosition="center"
          filter="blur(8px)"
          transform="scale(1.1)"
        />

        {/* GRADIENT OVERLAYS */}
        <Box
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          background="linear-gradient(to bottom, rgba(12, 12, 12, 0.3) 0%, rgba(12, 12, 12, 0.7) 50%, var(--primary-background-color) 100%)"
        />

        {/* CONTENT */}
        <Box
          position="relative"
          zIndex="2"
          maxW={{
            base: "90%",
            sm: "95%",
            xl: "85%",
            "2xl": "container.xl",
          }}
          mx="auto"
          h="100%"
          pt={{ base: "100px", md: "120px" }}
          pb={{ base: "40px", md: "60px" }}
          display="flex"
          alignItems="flex-end"
          justifyContent={{ base: "center", md: "flex-start" }}
        >
          {/* BACK BUTTON */}
          <IconButton
            as={ReactRouterLink}
            to="/"
            position="absolute"
            top={{ base: "20px", md: "30px" }}
            left={{ base: "10px", md: "0" }}
            bg="rgba(28, 28, 28, 0.9)"
            backdropFilter="blur(10px)"
            border="1px solid rgba(255, 255, 255, 0.1)"
            color="var(--text-color)"
            borderRadius="50%"
            w="44px"
            h="44px"
            _hover={{
              bg: "var(--primary-color)",
              transform: "scale(1.05)",
            }}
            transition="all 0.3s ease"
          >
            <ChevronLeft size={18} />
          </IconButton>

          <Flex
            direction={{ base: "column", md: "row" }}
            gap={{ base: "24px", md: "40px" }}
            alignItems={{ base: "center", md: "flex-end" }}
          >
            {/* POSTER IMAGE */}
            <Box position="relative">
              <Image
                src={animeData.posterImage}
                alt={animeData.name}
                w={{ base: "200px", md: "280px" }}
                h={{ base: "300px", md: "400px" }}
                objectFit="cover"
                borderRadius="12px"
                boxShadow="0 20px 25px -5px rgba(0, 0, 0, 0.7)"
                border="2px solid rgba(255, 255, 255, 0.1)"
                shadow="md"
              />

              {/* STATUS BADGE ON POSTER */}
              {animeData.status && (
                <Badge
                  position="absolute"
                  top="12px"
                  right="12px"
                  bg={
                    animeData.status.toLowerCase().includes("currently")
                      ? "var(--secondary-color)"
                      : "var(--accent-color)"
                  }
                  color="var(--text-color)"
                  fontSize="11px"
                  fontWeight="700"
                  px="10px"
                  py="6px"
                  borderRadius="6px"
                  textTransform="uppercase"
                  boxShadow="0 2px 8px rgba(0, 0, 0, 0.4)"
                >
                  {animeData.status.toLowerCase().includes("currently")
                    ? "ONGOING"
                    : "COMPLETED"}
                </Badge>
              )}
            </Box>

            {/* INFO SECTION */}
            <VStack
              align={{ base: "center", md: "flex-start" }}
              flex="1"
              spacing="16px"
              textAlign={{ base: "center", md: "left" }}
            >
              {/* TITLE */}
              <Heading
                as="h1"
                fontSize={{ base: "32px", md: "48px", lg: "56px" }}
                fontWeight="700"
                color="var(--text-color)"
                lineHeight="1.1"
                textShadow="0 2px 8px rgba(0, 0, 0, 0.8)"
                lineclamp={2}
              >
                {animeData.name}
              </Heading>

              {/* ROMAJI TITLE */}
              {animeData.romaji && (
                <Heading
                  as="h2"
                  fontSize={{ base: "16px", md: "20px" }}
                  fontWeight="400"
                  fontStyle="italic"
                  color="var(--text-secondary)"
                  lineclamp={1}
                >
                  {animeData.romaji}
                </Heading>
              )}

              {/* RATING & SCORE */}
              {animeData.score && (
                <Flex alignItems="center" gap="12px">
                  {renderStars(animeData.score)}
                  <Text
                    fontSize="18px"
                    fontWeight="600"
                    color="var(--text-color)"
                  >
                    {(parseFloat(animeData.score) / 2).toFixed(1)}/5
                  </Text>
                  <Text fontSize="14px" color="var(--text-secondary)">
                    ({animeData.score}/10)
                  </Text>
                </Flex>
              )}

              {/* METADATA */}
              <Flex
                gap="12px"
                flexWrap="wrap"
                fontSize="15px"
                color="var(--text-secondary)"
                fontWeight="500"
                justifyContent={{ base: "center", md: "flex-start" }}
              >
                {animeData.type && <Text>{animeData.type}</Text>}
                {animeData.type && animeData.releaseDate && <Text>•</Text>}
                {animeData.releaseDate && <Text>{animeData.releaseDate}</Text>}
                {(animeData.type || animeData.releaseDate) &&
                  animeData.totalEpisodes && <Text>•</Text>}
                {animeData.totalEpisodes && (
                  <Text>{animeData.totalEpisodes} Episodes</Text>
                )}
              </Flex>

              {/* GENRES */}
              {animeData.genres && animeData.genres.length > 0 && (
                <HStack
                  gap="8px"
                  flexWrap="wrap"
                  justifyContent={{ base: "center", md: "flex-start" }}
                >
                  {animeData.genres.slice(0, 5).map((genre) => (
                    <Badge
                      key={genre}
                      bg="rgba(99, 102, 241, 0.15)"
                      border="1px solid var(--accent-color)"
                      color="var(--accent-color)"
                      fontSize="12px"
                      fontWeight="500"
                      px="12px"
                      py="6px"
                      borderRadius="6px"
                    >
                      {genre}
                    </Badge>
                  ))}
                </HStack>
              )}

              {/* ACTION BUTTONS */}
              <HStack
                gap="12px"
                mt="8px"
                flexWrap="wrap"
                justifyContent={{ base: "center", md: "flex-start" }}
              >
                {/* WATCH NOW BUTTON */}
                <Button
                  as={ReactRouterLink}
                  to={
                    episodes.length > 0
                      ? `/watch/${episodes[0].episodeId}`
                      : "#"
                  }
                  bg="var(--primary-color)"
                  color="var(--text-color)"
                  fontSize="16px"
                  fontWeight="600"
                  px="32px"
                  h="52px"
                  borderRadius="8px"
                  _hover={{
                    filter: "brightness(110%)",
                    transform: "scale(1.02)",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.6)",
                  }}
                  transition="all 0.2s ease"
                  isDisabled={episodes.length === 0}
                >
                  <Play size={20} /> Watch Now
                </Button>

                {/* ADD TO LIST BUTTON */}
                <Button
                  bg="rgba(28, 28, 28, 0.9)"
                  border="2px solid rgba(255, 255, 255, 0.2)"
                  color="var(--text-color)"
                  fontSize="16px"
                  fontWeight="600"
                  px="28px"
                  h="52px"
                  borderRadius="8px"
                  _hover={{
                    borderColor: "var(--text-color)",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.5)",
                  }}
                  transition="all 0.2s ease"
                >
                  <Plus size={20} /> My List
                </Button>

                {/* SHARE BUTTON */}
                <IconButton
                  aria-label="Share"
                  bg="rgba(28, 28, 28, 0.9)"
                  border="2px solid rgba(255, 255, 255, 0.2)"
                  color="var(--text-color)"
                  h="52px"
                  w="52px"
                  hideBelow="md"
                  borderRadius="8px"
                  _hover={{
                    borderColor: "var(--text-color)",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.5)",
                  }}
                  transition="all 0.2s ease"
                >
                  <Share size={20} />
                </IconButton>
              </HStack>
            </VStack>
          </Flex>
        </Box>
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
        py={{ base: "40px", md: "60px" }}
      >
        <Grid
          templateColumns={{ base: "1fr", lg: "1fr 400px" }}
          gap={{ base: "40px", lg: "40px" }}
        >
          {/* LEFT COLUMN - SYNOPSIS & DETAILS */}
          <VStack gap={{ base: "24px", md: "30px" }} align="stretch">
            {/* SYNOPSIS SECTION */}
            <Box
              bg="var(--card-background-color)"
              border="1px solid rgba(255, 255, 255, 0.05)"
              borderRadius="12px"
              p={{ base: "20px", md: "32px" }}
            >
              <Heading
                as="h3"
                fontSize={{ base: "22px", md: "26px" }}
                fontWeight="700"
                color="var(--text-color)"
                mb="16px"
              >
                Synopsis
              </Heading>

              <Text
                fontSize="15px"
                lineHeight="1.8"
                color="var(--text-secondary)"
              >
                {isExpanded
                  ? animeData.synopsis
                  : `${animeData.synopsis?.slice(0, 400)}...`}
              </Text>

              {animeData.synopsis?.length > 400 && (
                <Button
                  variant="ghost"
                  color="var(--link-color)"
                  fontSize="14px"
                  fontWeight="600"
                  mt="12px"
                  onClick={() => setIsExpanded(!isExpanded)}
                  _hover={{
                    color: "var(--link-hover-color)",
                    bg: "transparent",
                  }}
                >
                  {isExpanded ? "Show Less" : "Read More"}
                </Button>
              )}
            </Box>

            {/* DETAILS GRID */}
            <Box>
              <Heading
                as="h3"
                fontSize={{ base: "22px", md: "26px" }}
                fontWeight="700"
                color="var(--text-color)"
                mb="20px"
              >
                Details
              </Heading>

              <Grid
                templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                gap="16px"
              >
                {/* TYPE */}
                <DetailCard
                  icon={<Film size={20} color="var(--accent-color)" />}
                  label="Type"
                  value={animeData.type || "Unknown"}
                />

                {/* EPISODES */}
                <DetailCard
                  icon={<Tv size={20} color="var(--accent-color)" />}
                  label="Episodes"
                  value={animeData.totalEpisodes || "Unknown"}
                />

                {/* STATUS */}
                <DetailCard
                  icon={
                    animeData.status?.toLowerCase()?.includes("currently") ? (
                      <Loader size={20} color="var(--secondary-color)" />
                    ) : (
                      <CheckCircle size={20} color="var(--secondary-color)" />
                    )
                  }
                  label="Status"
                  value={animeData.status || "Unknown"}
                />

                {/* PREMIERED */}
                <DetailCard
                  icon={<Calendar size={20} color="var(--accent-color)" />}
                  label="Premiered"
                  value={animeData.releaseDate || "Unknown"}
                />

                {/* STUDIOS */}
                {animeData.studios && (
                  <DetailCard
                    icon={<Film size={20} color="var(--accent-color)" />}
                    label="Studio"
                    value={animeData.studios}
                  />
                )}

                {/* SCORE */}
                <DetailCard
                  icon={<Star size={20} color="var(--secondary-color)" />}
                  label="Score"
                  value={animeData.score ? `${animeData.score}/10` : "N/A"}
                />
              </Grid>
            </Box>

            {/* ALL GENRES SECTION */}
            {animeData.genres && animeData.genres.length > 0 && (
              <Box
                bg="var(--card-background-color)"
                border="1px solid rgba(255, 255, 255, 0.05)"
                borderRadius="12px"
                p={{ base: "20px", md: "24px" }}
              >
                <Heading
                  as="h4"
                  fontSize="18px"
                  fontWeight="600"
                  color="var(--text-color)"
                  mb="16px"
                >
                  Genres
                </Heading>

                <Flex gap="10px" flexWrap="wrap">
                  {animeData.genres.map((genre) => (
                    <Badge
                      key={genre}
                      as={ReactRouterLink}
                      to={`/anime/genre/${genre.toLowerCase()}`}
                      bg="rgba(99, 102, 241, 0.15)"
                      border="1px solid var(--accent-color)"
                      color="var(--accent-color)"
                      fontSize="13px"
                      fontWeight="500"
                      px="14px"
                      py="8px"
                      borderRadius="6px"
                      cursor="pointer"
                      _hover={{
                        bg: "var(--accent-color)",
                        color: "var(--text-color)",
                        transform: "scale(1.05)",
                      }}
                      transition="all 0.2s ease"
                    >
                      {genre}
                    </Badge>
                  ))}
                </Flex>
              </Box>
            )}
          </VStack>

          {/* RIGHT COLUMN - EPISODES */}
          <Box>
            <Box
              position="sticky"
              top="90px"
              bg="var(--card-background-color)"
              border="1px solid rgba(255, 255, 255, 0.05)"
              borderRadius="12px"
              p={{ base: "20px", md: "24px" }}
              maxH="calc(100vh - 120px)"
              overflow="hidden"
              display="flex"
              flexDirection="column"
            >
              {/* HEADER */}
              <Flex alignItems="center" gap="12px" mb="20px">
                <Tv size={24} color="var(--primary-color)" />
                <Heading
                  as="h3"
                  fontSize={{ base: "20px", md: "24px" }}
                  fontWeight="700"
                  color="var(--text-color)"
                >
                  Episodes
                </Heading>
                {episodes.length > 0 && (
                  <Badge
                    bg="var(--primary-color)"
                    color="var(--text-color)"
                    fontSize="12px"
                    fontWeight="700"
                    px="10px"
                    py="4px"
                    borderRadius="6px"
                  >
                    {episodes.length}
                  </Badge>
                )}
              </Flex>

              <Box
                mb="20px"
                w="100%"
                borderBottom="1px solid rgba(255, 255, 255, 0.1)"
              />

              {/* EPISODE LIST */}
              <Box
                // overflowY="auto"
                pr="8px"
                // css={{
                //   "&::-webkit-scrollbar": {
                //     width: "3px",
                //   },
                //   "&::-webkit-scrollbar-track": {
                //     background: "rgba(255, 255, 255, 0.05)",
                //     borderRadius: "4px",
                //   },
                //   "&::-webkit-scrollbar-thumb": {
                //     background: "rgba(255, 255, 255, 0.2)",
                //     borderRadius: "4px",
                //   },
                //   "&::-webkit-scrollbar-thumb:hover": {
                //     background: "rgba(255, 255, 255, 0.3)",
                //   },
                // }}
              >
                {episodes.length > 0 ? (
                  <EpisodeList
                    items={episodes}
                    itemId={episodes.map((ep) => ep.episodeId)}
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
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};

// DETAIL CARD COMPONENT
const DetailCard = ({ icon, label, value }) => (
  <Box
    bg="rgba(255, 255, 255, 0.03)"
    border="1px solid rgba(255, 255, 255, 0.08)"
    borderRadius="10px"
    p="18px"
  >
    <Flex alignItems="center" gap="10px" mb="8px">
      {icon}
      <Text fontSize="14px" fontWeight="600" color="var(--text-color)">
        {label}
      </Text>
    </Flex>

    <Text fontSize="15px" fontWeight="500" color="var(--text-secondary)">
      {value}
    </Text>
  </Box>
);

export default View;
