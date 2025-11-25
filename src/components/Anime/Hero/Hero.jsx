import {
  Badge,
  Box,
  Flex,
  HStack,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { Navigation, FreeMode } from "swiper/modules";
import { cacheFetch } from "../../../utils/cacheFetch";

//import components
import Loading from "../../ErrorPage/Loading";
import Error from "../../ErrorPage/Error";
import Navbar from "../../Navbar/Navbar";
import Prev from "../HeroSliderButtons/Prev";
import Next from "../HeroSliderButtons/Next";
import "./Hero.css";

const Hero = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animeInfo, setAnimeInfo] = useState([]);

  const apiBase = "https://anime-api-production-bc3d.up.railway.app/";
  const kenjitsu_api = "https://kenjitsu-api-production.up.railway.app/";
  const proxy = "https://cors-anywhere-aifwkw.fly.dev/";

  const fetchAnimeData = async () => {
    try {
      // Fetch top airing anime with cacheFetch
      const homeData = await cacheFetch(
        "homeData",
        `${proxy}${apiBase}api/`,
        10 * 60 * 1000 // cache for 10 minutes
      );

      // Use the data directly instead of fetching animeInfo by ID
      setAnimeInfo(homeData?.results.spotlights);
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
      setAnimeInfo([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimeData();
  }, []);

  return (
    <Box w="100%" h="100vh">
      <Navbar />

      <Loading
        bg="linear-gradient(135deg, #8E44AD 0%, #3498DB 100%)"
        isLoading={isLoading}
        fullscreen
      />
      {error ? (
        <Error msg={error} height="100%" bg="#191919" />
      ) : (
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
            style={{ height: "100%", position: "relative" }}
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

            {animeInfo?.map((anime, index) => {
              const tvInfo = anime.tvInfo;

              // Flatten episodeInfo into main array
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
                    backgroundBlendMode="overlay"
                    backgroundColor="rgba(0, 0, 0, 0.8)"
                    backgroundRepeat="no-repeat"
                    h="100%"
                    w="100%"
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
                    >
                      <VStack
                        width={{ base: "100%", lg: "550px" }}
                        alignItems="flex-start"
                      >
                        <Heading
                          color="var(--text-color)"
                          textTransform="capitalize"
                          fontWeight={{ base: "800", md: "800", lg: "800" }}
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
                            "2xl": "88px",
                          }}
                          letterSpacing="1.5px"
                        >
                          {anime.title?.length > 20
                            ? `${anime.title.slice(0, 22)}...`
                            : anime.title}
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
                        >
                          <Text as="span" textTransform="capitalize">
                            {anime.japanese_title.length > 30
                              ? `${anime.japanese_title.slice(0, 30)}...`
                              : anime.japanese_title}
                          </Text>
                        </Heading>
                        <HStack my="10px" gap="10px 10px" flexWrap="wrap">
                          {badgeArray.map((badge, i) => (
                            <Badge
                              size={{ base: "sm", md: "md", lg: "lg" }}
                              key={i}
                              colorPalette="teal"
                              variant="surface"
                              bg="var(--primary-background-color)"
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

                        <Text
                          as="p"
                          fontSize={{
                            base: "13.56px",
                            md: "14.38px",
                            "2xl": "15.38px",
                          }}
                          fontFamily="var(--body-font)"
                          lineHeight={{
                            base: "21px",
                            md: "22px",
                            "2xl": "24px",
                          }}
                          color="var(--text-color)"
                          my="10px"
                        >
                          {anime.description?.length > 200
                            ? `${anime.description.slice(0, 200)}...`
                            : anime.description}
                        </Text>
                        <Box width="100%" my={{ base: "15px", md: "10px" }}>
                          <Link
                            to={`anime/${anime.id}`}
                            className="play-now-btn"
                            style={{ textAlign: "center" }}
                          >
                            VIEW MORE
                          </Link>
                        </Box>
                      </VStack>

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
                        ></Box>
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
