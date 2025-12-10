import {
  Box,
  Heading,
  Text,
  Badge,
  Flex,
  Button,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { Autoplay, FreeMode } from "swiper/modules";
import { Play } from "lucide-react";
import { Link as ReactRouterLink } from "react-router-dom";
import Next from "../../Anime/HeroSliderButtons/Next";
import Prev from "../../Anime/HeroSliderButtons/Prev";

/**
 * MovieHeroSwiper
 *
 * Props:
 *  - movies: Array of movie objects with fields:
 *      id, score, posterImage, genres (array), name, type, quality, duration, synopsis
 *  - onPlay(movie) optional callback when Play clicked
 *  - onDetails(movie) optional callback when Details clicked
 */
export default function MovieHeroSwiper({ movies = [], onPlay, onDetails }) {
  const isMobile = useBreakpointValue({ base: true, md: false });

  if (!movies || movies.length === 0) {
    return null;
  }

  // Small helper to render genre chips
  const GenreBadge = ({ children }) => (
    <Badge
      variant="surface"
      // colorPalette="teal"
      mr={2}
      fontSize="sm"
      borderRadius="md"
      px={2}
      py={1}
    >
      {children}
    </Badge>
  );

  return (
    <Box as="section" position="relative" w="100%" h="100%">
      <Swiper
        modules={[Autoplay, FreeMode]}
        slidesPerView={1}
        navigation={!isMobile}
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        loop
        effect="fade"
        style={{ width: "100%", height: "100%" }}
      >
        <Box
          pos="absolute"
          left="20px"
          top="0"
          hideBelow="lg"
          zIndex="2"
          h="100%"
          display="flex"
          alignItems="center"
        >
          <Prev />
        </Box>
        <Box
          pos="absolute"
          right="20px"
          top="0"
          hideBelow="lg"
          zIndex="2"
          h="100%"
          display="flex"
          alignItems="center"
        >
          <Next />
        </Box>
        {movies.map((m) => {
          const title = m.name || "Untitled";
          const poster = m.posterImage || "";
          const genresArr = Array.isArray(m.genre) ? m.genre[0] : [];
          const genres = genresArr.split(", ");
          const score = m.score ?? "N/A";
          const type = m.type ?? "Unknown";
          const quality = m.quality ?? null;
          const duration = m.duration ?? null;
          const synopsis = m.synopsis ?? "";

          return (
            <SwiperSlide key={m.id}>
              <Box
                position="relative"
                w="100%"
                h="100%"
                bg={`url(${poster})`}
                bgSize="cover"
                bgPosition="center"
                bgRepeat="no-repeat"
                display="flex"
                alignItems="center"
                justifyContent="center"
                pos="relative"
              >
                <Box
                  w="100%"
                  h="100%"
                  pos="absolute"
                  bottom="0"
                  background="linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.99))"
                ></Box>
                <Box
                  maxW={{
                    base: "90%",
                    sm: "95%",
                    xl: "85%",
                    "2xl": "container.xl",
                  }}
                  m="auto"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  pos="relative"
                  zIndex="1"
                >
                  {/* Left column - textual content */}
                  <Box
                    flex="1"
                    color="white"
                    zIndex={2}
                    maxW={{ base: "100%", md: "60%" }}
                  >
                    <Heading
                      as="h1"
                      fontSize={{ base: "2xl", md: "4xl", lg: "5xl" }}
                      letterSpacing="wide"
                      lineHeight={{ base: "40px", md: "48px", lg: "56px" }}
                      mb={4}
                      textTransform="uppercase"
                      fontFamily="var(--font-family)"
                    >
                      {title.length > 40 ? `${title.slice(0, 40)}...` : title}
                    </Heading>

                    <Flex wrap="wrap" mb={4} align="center" gap={3}>
                      {/* Score */}
                      <Badge
                        colorPalette={
                          score >= 7
                            ? "green"
                            : score === "N/A"
                            ? "gray"
                            : "orange"
                        }
                        fontWeight="bold"
                        px={3}
                        py={1}
                        borderRadius="md"
                      >
                        ⭐ {score}
                      </Badge>

                      {/* Type */}
                      <Badge variant="outline" px={3} py={1} borderRadius="md">
                        {type}
                      </Badge>

                      {/* Quality & duration */}
                      {quality && (
                        <Badge px={3} py={1} borderRadius="md">
                          {quality}
                        </Badge>
                      )}
                      {duration && (
                        <Badge px={3} py={1} borderRadius="md">
                          {duration}
                        </Badge>
                      )}
                    </Flex>

                    {/* Genres */}
                    <Flex mb={4} wrap="wrap">
                      {genres.slice(0, 5).map((g) => (
                        <GenreBadge key={g}>{g}</GenreBadge>
                      ))}
                    </Flex>

                    <Text
                      fontSize={{ base: "sm", md: "md" }}
                      color="gray.200"
                      maxW={{ base: "100%", md: "80%" }}
                      mb={6}
                      noOfLines={6}
                    >
                      {synopsis || "Synopsis not available."}
                    </Text>

                    <Stack
                      direction={{ base: "column", sm: "row" }}
                      spacing={3}
                    >
                      <Button colorPalette="teal" size="lg" asChild>
                        <ReactRouterLink to={`/watch/${m.id}`}>
                          <Play /> Play
                        </ReactRouterLink>
                      </Button>

                      <Button
                        variant="outline"
                        colorPalette="whiteAlpha"
                        size="lg"
                        asChild
                      >
                        <ReactRouterLink to={`/movie/${m.id}`}>
                          Details
                        </ReactRouterLink>
                      </Button>
                    </Stack>
                  </Box>

                  {/* Right column - poster card */}
                  <Box
                    w={{ base: "0", md: "300px", lg: "330px" }}
                    display={{ base: "none", md: "block" }}
                    position="relative"
                  >
                    <Box
                      bg="rgba(255,255,255,0.05)"
                      borderRadius="lg"
                      overflow="hidden"
                      boxShadow="lg"
                      transform="translateY(-30px)"
                    >
                      <Box
                        as="img"
                        src={poster}
                        alt={`${title} poster`}
                        w="100%"
                        h="320px"
                        objectFit="cover"
                        loading="lazy"
                      />
                      <Flex
                        px={4}
                        py={3}
                        align="center"
                        justify="space-between"
                        bg="blackAlpha.600"
                      >
                        <Box>
                          <Text fontWeight="bold" color="white">
                            {title}
                          </Text>
                          <Text fontSize="sm" color="gray.300">
                            {type} • {duration ?? "—"}
                          </Text>
                        </Box>
                        <Badge
                          colorScheme="yellow"
                          px={3}
                          py={1}
                          borderRadius="md"
                          alignSelf="flex-start"
                        >
                          {score}
                        </Badge>
                      </Flex>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
}
