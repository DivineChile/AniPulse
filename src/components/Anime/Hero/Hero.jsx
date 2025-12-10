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
  const [animeInfo, setAnimeInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAnimeData = async () => {
    try {
      const homeData = await cacheFetch("api/", { cacheKey: "homeData" }, true);
      setAnimeInfo(homeData?.results?.spotlights || []);
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
      bg="#1a1a1a"
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
      h="calc(100vh - 80px)"
      bg="#191919"
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

      {loading && <HeroSkeleton />}
      {error && <HeroError />}

      {!loading && !error && (
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
              const tvInfo = anime.tvInfo;

              const badgeArray = Object.entries(tvInfo).flatMap(
                ([key, value]) => {
                  if (typeof value === "object" && value !== null) {
                    return Object.entries(value).map(([subKey, subValue]) => ({
                      key: `${key}.${subKey}`,
                      value: subValue,
                    }));
                  }
                  return { key, value };
                }
              );

              return (
                <SwiperSlide key={index}>
                  <Box
                    background={`url(${anime.poster})`}
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
                          textTransform="capitalize"
                          fontWeight="800"
                          fontSize={{
                            base: "45px",
                            sm: "45px",
                            md: "65px",
                            lg: "67px",
                            "2xl": "76.25px",
                          }}
                          fontFamily="var(--font-family)"
                          lineHeight={{
                            base: "52px",
                            md: "68px",
                            lg: "72px",
                            "2xl": "88px",
                          }}
                          letterSpacing="1.5px"
                          lineClamp={2}
                        >
                          {anime.title}
                        </Heading>

                        <Heading
                          as="h4"
                          textTransform="capitalize"
                          color="var(--text-color)"
                          fontSize={{
                            base: "18.97px",
                            md: "27px",
                            "2xl": "35.97px",
                          }}
                          fontStyle="italic"
                          fontFamily="var(--font-family)"
                          lineHeight={{
                            base: "28px",
                            md: "32px",
                            "2xl": "36px",
                          }}
                          fontWeight="400"
                          mt={{ base: "10px", "2xl": "15px" }}
                          lineClamp={1}
                        >
                          {anime.japanese_title}
                        </Heading>

                        <HStack my="10px" gap="10px" flexWrap="wrap">
                          {badgeArray.map((badge, i) => (
                            <Badge
                              key={i}
                              size="md"
                              colorPalette="teal"
                              variant="surface"
                              bg="rgba(0,0,0,0.5)"
                            >
                              {`${
                                badge.key.includes("sub")
                                  ? "SUB"
                                  : badge.key.includes("dub")
                                  ? "DUB"
                                  : ""
                              } ${badge.value}`}
                            </Badge>
                          ))}
                        </HStack>

                        <Text color="white" my="10px" maxW="95%">
                          {anime.description?.slice(0, 200)}...
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
                            anime.poster ? `url(${anime.poster})` : "#191919"
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
