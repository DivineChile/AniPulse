import { Box, Flex, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import Navbar from "../../Navbar/Navbar";
import { Link } from "react-router-dom";
import "./Hero.css";
import { useEffect, useState } from "react";
import Loading from "../../ErrorPage/Loading";
import Error from "../../ErrorPage/Error";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { Navigation, FreeMode } from "swiper/modules";
import Prev from "../HeroSliderButtons/Prev";
import Next from "../HeroSliderButtons/Next";

const Hero = () => {
  const [state, setState] = useState({
    isLoading: true,
    error: null,
    animeInfo: [],
  });

  const apiBase = "https://anime-api-production-bc3d.up.railway.app/";

  const fetchAnimeData = async () => {
    try {
      // Fetch top airing anime IDs
      const topAiringResponse = await fetch(
        `https://fluoridated-recondite-coast.glitch.me/${apiBase}api/top-ten`
      );
      const topAiringData = await topAiringResponse.json();

      const animeIds = topAiringData.results.today.map((anime) => anime.id);

      // Fetch all anime details in parallel
      const animeDetailsPromises = animeIds.map((id) =>
        fetch(
          `https://fluoridated-recondite-coast.glitch.me/${apiBase}api/info?id=${id}`
        ).then((res) => {
          if (!res.ok)
            throw new Error(`Failed to fetch details for anime ID ${id}`);
          return res.json();
        })
      );
      const animeDetails = await Promise.all(animeDetailsPromises);

      // Extract anime info and update state
      const animeInfo = animeDetails.map((detail) => detail.results.data);

      setState({ isLoading: false, error: null, animeInfo });
    } catch (err) {
      setState({ isLoading: false, error: err.message, animeInfo: [] });
    }
  };

  useEffect(() => {
    fetchAnimeData();
  }, []);

  const { isLoading, error, animeInfo } = state;

  return (
    <Box w="100%" h="100vh">
      <Navbar />

      {isLoading ? (
        <Loading
          height="100%"
          bg="linear-gradient(135deg, #8E44AD 0%, #3498DB 100%)"
        />
      ) : error ? (
        <Error msg={error} height="100%" bg="#191919" />
      ) : (
        <Box
          w="100%"
          h={{
            base: "calc(100vh - 70px)",
            md: "calc(100vh - 73px)",
            lg: "calc(100vh - 84px)",
          }}
          pos="relative"
        >
          <Swiper
            modules={[Navigation, FreeMode]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop
            effect="fade"
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

            {animeInfo.map((anime, index) => {
              const animeInfo = anime.animeInfo;

              return (
                <SwiperSlide key={index}>
                  <Box
                    background={`url(${anime.poster})`}
                    backgroundPosition="center"
                    backgroundSize="cover"
                    backgroundBlendMode="overlay"
                    backgroundColor="rgba(0,0,0,0.55)"
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
                          textTransform="uppercase"
                          fontWeight="600"
                          fontSize={{
                            base: "40px",
                            sm: "50px",
                            md: "65px",
                            lg: "67px",
                            "2xl": "76.25px",
                          }}
                          fontFamily="var(--font-family)"
                          lineHeight={{
                            base: "48px",
                            md: "68px",
                            "2xl": "88px",
                          }}
                          letterSpacing="1.5px"
                        >
                          {anime.title?.length > 20
                            ? `${anime.title.slice(0, 25)}...`
                            : anime.title}
                        </Heading>
                        <Heading
                          as="h4"
                          textTransform="capitalize"
                          color="var(--text-color)"
                          fontSize={{
                            base: "20.97px",
                            md: "29px",
                            "2xl": "37.97px",
                          }}
                          fontFamily="var(--font-family)"
                          lineHeight={{
                            base: "33px",
                            md: "35px",
                            "2xl": "40px",
                          }}
                          fontWeight="400"
                          mt={{ base: "10px", "2xl": "15px" }}
                        >
                          Status:{" "}
                          <Text as="span" textTransform="capitalize">
                            {animeInfo.Status || "Unknown"}
                          </Text>
                        </Heading>
                        <HStack my="10px" gap="10px 10px" flexWrap="wrap">
                          {animeInfo.Genres.map((genre, i) => (
                            <Text
                              key={i}
                              as="span"
                              color={
                                i === 0
                                  ? "var(--background-color)"
                                  : "var(--text-color)"
                              }
                              cursor="pointer"
                              p="3px 10px"
                              bg={i === 0 ? "var(--accent-color)" : "#191919"}
                              _hover={{
                                color: "var(--background-color)",
                                bgColor: "var(--accent-color)",
                                border: "none",
                              }}
                              borderRadius="8px"
                              border={
                                i === 0
                                  ? "none"
                                  : "2px solid var(--secondary-color)"
                              }
                              fontSize={{ base: "14.63px", md: "16.63px" }}
                              fontFamily="var(--font-family)"
                              lineHeight="24px"
                            >
                              {genre}
                            </Text>
                          ))}
                        </HStack>
                        <Heading
                          as="h4"
                          textTransform="capitalize"
                          color="var(--text-color)"
                          fontSize={{
                            base: "19.38px",
                            md: "24px",
                            "2xl": "28.95px",
                          }}
                          fontFamily="var(--font-family)"
                          lineHeight={{
                            base: "30px",
                            md: "35px",
                            "2xl": "40px",
                          }}
                          fontWeight="400"
                        >
                          Release year: {animeInfo.Premiered}
                        </Heading>
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
                          {animeInfo.Overview?.length > 200
                            ? `${animeInfo.Overview.slice(0, 200)}...`
                            : animeInfo.Overview}
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
