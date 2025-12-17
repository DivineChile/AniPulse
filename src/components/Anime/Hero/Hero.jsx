import {
  Box,
  Flex,
  VStack,
  Heading,
  Text,
  HStack,
  Badge,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { Navigation, FreeMode } from "swiper/modules";
import { cacheFetch } from "../../../utils/cacheFetch";

//components
import Navbar from "../../Navbar/Navbar";
import Prev from "../HeroSliderButtons/Prev";
import Next from "../HeroSliderButtons/Next";
import "./Hero.css";

const Hero = () => {
  const [animeInfo, setAnimeInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAnimeData = async () => {
    setLoading(true);
    setError(null);
    try {
      const homeData = await cacheFetch("api/hianime/home", {
        cacheKey: "homeData",
      });
      const spotlights = homeData?.data ?? [];
      console.log(homeData);
      setAnimeInfo([...spotlights]);
    } catch (err) {
      setError(err.message || "Something went wrong");
      setAnimeInfo([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimeData();
  }, []);

  // -------------------------
  //  SKELETON UI COMPONENT
  // -------------------------
  const HeroSkeleton = () => (
    <Box
      w="100%"
      h={{
        base: "calc(100vh - 70px)",
        md: "calc(100vh - 73px)",
        lg: "calc(100vh - 84px)",
      }}
      top={{ base: "70px", md: "73px", lg: "84px" }}
      pos="relative"
      bg="black"
      overflow="hidden"
    >
      <Flex
        maxW={{
          base: "90%",
          sm: "95%",
          xl: "85%",
          "2xl": "container.xl",
        }}
        margin="auto"
        h="100%"
        alignItems="center"
        justifyContent="space-between"
        pos="relative"
        zIndex="2"
      >
        <VStack
          width={{ base: "100%", lg: "550px" }}
          align="flex-start"
          gap="20px"
        >
          <Skeleton height="55px" width="80%" borderRadius="md" />
          <Skeleton height="25px" width="60%" borderRadius="md" />

          <HStack gap="10px" flexWrap="wrap">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} height="28px" width="70px" borderRadius="md" />
            ))}
          </HStack>

          <SkeletonText noOfLines={5} spacing="4" width="100%" />

          <Skeleton height="45px" width="150px" borderRadius="md" />
        </VStack>

        <Box hideBelow="xl">
          <Skeleton
            w={{ lg: "550px", "2xl": "670px" }}
            h={{ lg: "450px", "2xl": "600px" }}
            borderRadius="20px"
          />
        </Box>
      </Flex>
    </Box>
  );

  // -------------------------
  //  ERROR UI
  // -------------------------
  const HeroError = () => (
    <Box
      w="100%"
      h={{
        base: "calc(100vh - 70px)",
        md: "calc(100vh - 73px)",
        lg: "calc(100vh - 84px)",
      }}
      top={{ base: "70px", md: "73px", lg: "84px" }}
      bg="#191919"
      pos="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Text color="red.300" fontSize="xl">
        {error}
      </Text>
    </Box>
  );

  // -------------------------
  //       MAIN RETURN
  // -------------------------
  return (
    <Box w="100%" h="100vh">
      <Navbar />

      {loading && (!animeInfo || !animeInfo.length) && <HeroSkeleton />}
      {error && <HeroError />}

      {!loading && !error && animeInfo && (
        <Box
          w="100%"
          h={{
            base: "calc(100vh - 70px)",
            md: "calc(100vh - 73px)",
            lg: "calc(100vh - 84px)",
          }}
          top={{ base: "70px", md: "73px", lg: "84px" }}
          pos="relative"
        >
          <Swiper
            modules={[Navigation, FreeMode]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop
            effect="slide"
            style={{ height: "100%" }}
          >
            {/* BUTTONS */}
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

            {/* SLIDES */}
            {animeInfo.map((anime, index) => {
              const tvInfo = anime.episodes;
              return (
                <SwiperSlide key={index}>
                  <Box
                    background={`url(${anime.posterImage})`}
                    backgroundPosition="center"
                    backgroundSize="cover"
                    backgroundRepeat="no-repeat"
                    h="100%"
                    w="100%"
                    pos="relative"
                  >
                    <Box
                      w="100%"
                      h="100%"
                      pos="absolute"
                      bottom="0"
                      background="linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.99))"
                    />

                    <Flex
                      maxW={{
                        base: "90%",
                        sm: "95%",
                        xl: "85%",
                        "2xl": "container.xl",
                      }}
                      margin="auto"
                      h="100%"
                      alignItems="center"
                      justifyContent="space-between"
                      pos="relative"
                      zIndex="1"
                    >
                      {/* LEFT */}
                      <VStack
                        width={{ base: "100%", lg: "550px" }}
                        align="flex-start"
                      >
                        <Heading
                          color="var(--text-color)"
                          textTransform="uppercase"
                          fontSize={{ base: "2xl", md: "4xl", lg: "5xl" }}
                          letterSpacing="wide"
                          lineHeight={{ base: "40px", md: "48px", lg: "56px" }}
                          fontFamily="var(--font-family)"
                          lineClamp={2}
                        >
                          {anime.name}
                        </Heading>

                        <Heading
                          as="h4"
                          textTransform="capitalize"
                          color="gray.300"
                          fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                          letterSpacing="wide"
                          lineHeight={{ base: "30px", md: "36px", lg: "48px" }}
                          fontStyle="italic"
                          fontWeight="400"
                          fontFamily="var(--font-family)"
                          mt={{ base: "10px", "2xl": "15px" }}
                          lineClamp={1}
                        >
                          {anime.romaji}
                        </Heading>

                        <HStack my="10px" gap="10px" flexWrap="wrap">
                          {anime.spotlight && (
                            <Badge
                              variant="subtle"
                              size={{ base: "sm", md: "md" }}
                            >
                              {anime.spotlight}
                            </Badge>
                          )}
                          {anime.releaseDate && (
                            <Badge
                              size={{ base: "sm", md: "md" }}
                              variant="surface"
                            >
                              {anime.releaseDate}
                            </Badge>
                          )}
                          {tvInfo.sub && (
                            <Badge
                              size={{ base: "sm", md: "md" }}
                              variant="surface"
                            >
                              SUB {tvInfo.sub}
                            </Badge>
                          )}
                          {tvInfo.dub && (
                            <Badge
                              size={{ base: "sm", md: "md" }}
                              variant="surface"
                            >
                              DUB {tvInfo.dub}
                            </Badge>
                          )}

                          {anime.quality && (
                            <Badge
                              size={{ base: "sm", md: "md" }}
                              variant="surface"
                            >
                              {anime.quality}
                            </Badge>
                          )}
                          {anime.type && (
                            <Badge
                              size={{ base: "sm", md: "md" }}
                              variant="surface"
                            >
                              {anime.type}
                            </Badge>
                          )}
                        </HStack>

                        <Text
                          color="white"
                          my="10px"
                          maxW="95%"
                          lineClamp={3}
                          fontSize={{ base: "sm", md: "md" }}
                        >
                          {anime.synopsis}
                        </Text>

                        <Box width="100%" my="15px">
                          <Link
                            to={`anime/${anime.id}`}
                            className="play-now-btn"
                          >
                            VIEW MORE
                          </Link>
                        </Box>
                      </VStack>

                      {/* RIGHT IMAGE */}
                      <Box hideBelow="xl">
                        <Box
                          background={
                            anime.posterImage
                              ? `url(${anime.posterImage})`
                              : "#191919"
                          }
                          w={{ lg: "550px", "2xl": "670px" }}
                          h={{ lg: "450px", "2xl": "600px" }}
                          backgroundSize="cover"
                          borderRadius="20px"
                          backgroundPosition="center"
                          _hover={{
                            transform: "scale(1.02)",
                            cursor: "pointer",
                          }}
                          transition="transform 0.25s ease"
                        />
                      </Box>
                    </Flex>
                  </Box>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Box>
      )}
    </Box>
  );
};

export default Hero;
