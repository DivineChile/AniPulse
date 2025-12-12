import {
  Box,
  Text,
  Grid,
  GridItem,
  Heading,
  Image,
  HStack,
  Link as ChakraLink,
  Link,
  Skeleton,
  Flex,
  Button,
  TagRoot,
  TagLabel,
  ButtonGroup,
  Dialog,
  CloseButton,
  Portal,
  IconButton,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Link as ReactRouterLink } from "react-router-dom";

import Navbar from "../../Navbar/Navbar";
import Error from "../../ErrorPage/Error";
import { cacheFetch } from "../../../utils/cacheFetch";
import SeasonTabs from "./SeasonTabs";
import {
  ArrowRight,
  Building2Icon,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  Film,
  ListVideo,
  Loader,
  Star,
  TagIcon,
  Users,
} from "lucide-react";

const DetailCard = ({ icon, label, value, loading }) => (
  <Skeleton loading={loading}>
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
  </Skeleton>
);

const ViewMovie = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [providerEpisodes, setProviderEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [recommendedMedia, setRecommendedMedia] = useState([]);

  const { id } = useParams();
  const location = useLocation();
  const isTV = location.pathname.includes("/tv");

  const fetchMovieDetails = async () => {
    try {
      // Unique cache key per anime
      const cacheKey = `${isTV ? "tv" : "movie"}Info_${id}`;

      // Fetch + cache for 10 minutes
      const data = await cacheFetch(`api/flixhq/media/${id}`, { cacheKey });

      console.log(data);
      setMovieDetails(data?.data);
      setProviderEpisodes(data?.providerEpisodes);
      setTrailerUrl(data?.data?.trailer);
      setRecommendedMedia(data?.recommended);

      document.title = `${
        isTV ? `${data?.data?.name} (TV Series)` : data?.data?.name
      } - AniPulse`;
    } catch (err) {
      console.error("Failed to fetch movie details", err);
      setError(err);
      setMovieDetails(null);
    } finally {
      setLoading(false);
    }
  };

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = new Date(movieDetails?.releaseDate).toLocaleDateString(
    "en-US",
    options
  );

  useEffect(() => {
    fetchMovieDetails();
  }, [id, isTV]);

  const groupedBySeason = providerEpisodes.reduce((acc, episode) => {
    const season = episode.seasonNumber;

    if (!acc[season]) {
      acc[season] = [];
    }

    acc[season].push(episode);

    return acc;
  }, {});

  console.log(groupedBySeason);

  return (
    <Box>
      <Navbar />

      {error && (
        <Error
          height="100vh"
          bg="var(--primary-background-color)"
          msg="Still Loading..."
        />
      )}

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
            bg={loading ? "#191919" : `url(${movieDetails?.posterImage})`}
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
              to="/movies"
              variant="subtle"
              position="absolute"
              top={{ base: "40px", md: "100px" }}
              left="0"
              zIndex="2"
            >
              <ChevronLeft size={20} color="var(--text-secondary)" />
            </IconButton>
            {/* Poster */}
            <Skeleton loading={loading}>
              <Image
                src={movieDetails?.posterImage}
                alt={movieDetails?.name}
                w={{ base: "180px", md: "250px" }}
                h={{ base: "270px", md: "350px" }}
                borderRadius="12px"
                objectFit="cover"
                shadow="xl"
                mx={{ base: "auto", md: "0" }}
              />
            </Skeleton>

            {/* Title + Info */}
            <Box
              color="white"
              width={{ base: "300px", md: "450px", lg: "650px" }}
              textAlign={{ base: "center", md: "left" }}
              mx={{ base: "auto", md: "0" }}
            >
              <Skeleton loading={loading}>
                <Heading
                  fontSize={{ base: "28px", md: "48px" }}
                  lineHeight="1.15"
                  color="var(--text-color)"
                  mb="10px"
                >
                  {movieDetails?.name?.length > 30
                    ? `${movieDetails?.name?.slice(0, 27)}...`
                    : movieDetails?.name}
                </Heading>
              </Skeleton>
              <Flex
                justify={{ base: "center", md: "flex-start" }}
                gap="12px"
                wrap="wrap"
                fontSize={{ base: "14px", md: "15px" }}
                opacity={0.9}
              >
                {isTV && <Text>Seasons</Text>}
                <Skeleton loading={loading}>
                  <Text>{movieDetails?.type}</Text>
                </Skeleton>
                <Text color="var(--text-secondary)">•</Text>
                <Skeleton loading={loading}>
                  <Text>{formattedDate}</Text>
                </Skeleton>
                <Text color="var(--text-secondary)">•</Text>
                {isTV ? (
                  <Skeleton loading={loading}>
                    <Text>{movieDetails?.episodeCount} Episodes</Text>
                  </Skeleton>
                ) : (
                  <Skeleton loading={loading}>
                    <Text>{movieDetails?.duration}</Text>
                  </Skeleton>
                )}
              </Flex>

              <ButtonGroup
                mt="25px"
                direction={{ base: "column", md: "row" }}
                flexDir={{ base: "column", md: "row" }}
                w={{ base: "100%", md: "auto" }}
              >
                <Skeleton loading={loading} w={{ base: "100%", md: "150px" }}>
                  <Button
                    as={ReactRouterLink}
                    to={`/watch/${providerEpisodes[0]?.episodeId}`}
                    bg="var(--accent-color)"
                    _hover={{
                      bg: "var(--link-hover-color)",
                      color: "var(--accent-color)",
                    }}
                    w={{ base: "100%", md: "150px" }}
                    h="50px"
                    fontSize="16px"
                    borderRadius="8px"
                    color="var(--link-color)"
                  >
                    Watch Now
                  </Button>
                </Skeleton>
                <Skeleton loading={loading} w={{ base: "100%", md: "150px" }}>
                  <Button
                    bg="var(--accent-color)"
                    _hover={{
                      bg: "var(--link-hover-color)",
                      color: "var(--accent-color)",
                    }}
                    w={{ base: "100%", md: "150px" }}
                    h="50px"
                    fontSize="16px"
                    borderRadius="8px"
                    onClick={() => setTrailerOpen(true)}
                    color="var(--link-color)"
                  >
                    Play Trailer
                  </Button>
                </Skeleton>
              </ButtonGroup>

              <Dialog.Root
                open={trailerOpen}
                onOpenChange={() => setTrailerOpen(false)}
                unmountOnExit
                size="lg"
                placement={{ base: "center", md: "top" }}
              >
                <Portal>
                  <Dialog.Backdrop backdropFilter="blur(10px)" />
                  <Dialog.Positioner>
                    <Dialog.Content>
                      <Dialog.Header>
                        <Dialog.Title>
                          {movieDetails?.name} Trailer
                        </Dialog.Title>
                      </Dialog.Header>
                      <Dialog.Body>
                        <Box w="100%" h="300px" bg="black">
                          <iframe
                            width="100%"
                            height="100%"
                            src={trailerUrl}
                            title={`${movieDetails?.name} Trailer`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </Box>
                      </Dialog.Body>
                      <Dialog.Footer>
                        <Button onClick={() => setTrailerOpen(false)}>
                          Close
                        </Button>
                      </Dialog.Footer>
                      <Dialog.CloseTrigger asChild>
                        <CloseButton size="sm" />
                      </Dialog.CloseTrigger>
                    </Dialog.Content>
                  </Dialog.Positioner>
                </Portal>
              </Dialog.Root>
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
              <Skeleton loading={loading}>
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
                      ? movieDetails?.synopsis
                      : movieDetails?.synopsis?.slice(0, 300) + "..."}
                    {movieDetails?.synopsis?.length > 300 && (
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
              </Skeleton>

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
                  value={formattedDate}
                  loading={loading}
                />

                <DetailCard
                  icon={<Star size={20} />}
                  label="Score"
                  value={movieDetails?.score}
                  loading={loading}
                />

                <DetailCard
                  icon={<Film size={20} />}
                  label="Quality"
                  value={movieDetails?.quality}
                  loading={loading}
                />

                {isTV && (
                  <DetailCard
                    icon={
                      movieDetails?.status
                        ?.toLowerCase()
                        ?.includes("currently") ? (
                        <Loader size={20} />
                      ) : (
                        <CheckCircle2 size={20} />
                      )
                    }
                    label="Status"
                    value={movieDetails?.status}
                    loading={loading}
                  />
                )}

                <DetailCard
                  icon={<Users size={20} />}
                  label="Cast"
                  value={movieDetails?.casts?.map((e) => e).join(", ")}
                  loading={loading}
                />

                <Box>
                  <Skeleton loading={loading}>
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
                      {movieDetails?.genre?.map((g) => (
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
                  </Skeleton>
                </Box>

                <Box>
                  <Skeleton loading={loading}>
                    <Flex align="center" gap="8px" mb="8px">
                      <Building2Icon size={20} color="var(--text-color)" />
                      <Text
                        fontSize="16px"
                        color="var(--text-color)"
                        fontWeight="600"
                      >
                        Studios
                      </Text>
                    </Flex>

                    <Flex wrap="wrap" gap="8px">
                      {movieDetails?.production?.map((g) => (
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
                  </Skeleton>
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

                <Skeleton loading={loading}>
                  <Box
                    bg="rgba(255,255,255,0.05)"
                    border="1px solid rgba(255,255,255,0.1)"
                    backdropFilter="blur(6px)"
                    borderRadius="12px"
                    p="20px"
                  >
                    {isTV ? (
                      // <EpisodeList
                      //   items={episodes}
                      //   itemId={episodes.map((episode) => episode.episodeId)}
                      // />
                      <Box>Boy</Box>
                    ) : (
                      <Button
                        w="100%"
                        variant="subtle"
                        as={ReactRouterLink}
                        to={`/watch/${providerEpisodes[0]?.episodeId}`}
                      >
                        Watch Now <ArrowRight size={20} color="white" />
                      </Button>
                    )}
                  </Box>
                </Skeleton>
              </Box>
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default ViewMovie;
