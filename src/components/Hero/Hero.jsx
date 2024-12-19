import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import "./Hero.css";
import { useEffect, useState } from "react";
import Loading from "../ErrorPage/Loading";
import Error from "../ErrorPage/Error";

import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { Navigation, FreeMode } from "swiper/modules";
import Prev from "../HeroSliderButtons/Prev";
import Next from "../HeroSliderButtons/Next";

import { ANIME } from "@consumet/extensions";

const Hero = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animeData, setAnimeData] = useState([]);
  const [animeInfo, setAnimeInfo] = useState({});
  const [animeMappings, setAnimeMappings] = useState([]);
  const [animeEps, setAnimeEps] = useState([]);
  const [animeId, setAnimeId] = useState("");
  const api = "https://consumet-api-puce.vercel.app/";
  const anime = new ANIME.AnimePahe();
  const animepahe = new ANIME.Anify();

  const fetchAnimeInfo = () => {
    animepahe.fetchAnimeInfo("171018").then((data) => {
      setAnimeInfo(data);
      setAnimeId(data.id);
      setAnimeMappings(
        data.mappings.map((mapId) => {
          const id = mapId.id;
          const provider = mapId.providerId;
          return { provider, id };
        })
      );
      setAnimeEps(
        data.episodes.map((ep, i) => {
          const epId = ep.id;
          const epNum = ep.number;
          return { epId, epNum };
        })
      );
    });

    // animepahe
    //   .search("blue-lock-vs-u-20-japan")
    //   .then((data) => console.log(data));

    // animepahe.fetchAnimeInfo("163146").then((data) => console.log(data));
    // animepahe
    //   .fetchEpisodeSources("blue-lock-vs-u-20-japan-episode-1", 1, "163146")
    //   .then((data) => console.log(data));

    // animepahe
    //   .fetchEpisodeSources(animeEps[0].epId, animeEps[0].epNum, animeId)
    //   .then((data) => console.log(data));
  };

  //function to fetch recomended anime
  const fetchRecomendedAnime = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${api}meta/anilist/trending`);
      const data = response.data;
      setAnimeData(data.results);
      console.log(animeData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError("Failed to load");
    }
  };

  useEffect(() => {
    fetchRecomendedAnime();
    fetchAnimeInfo();
  }, []);

  return (
    <Box w="100%" h="100vh">
      <Box>
        <Navbar />
      </Box>

      {isLoading ? (
        <Loading height="100%" bg="#191919" />
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
            {/* Buttons for Moving Content */}
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
            {animeData.map((anime, index) => (
              <SwiperSlide key={index}>
                <Box
                  background={`url(${anime.cover})`}
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
                      base: "85%",
                      sm: "95%",
                      xl: "85%",
                      "2xl": "container.xl",
                    }}
                    margin="auto"
                    h="100%"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    {/* Anime Details */}
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
                        fontFamily="Noir Pro"
                        lineHeight={{ base: "48px", md: "68px", "2xl": "88px" }}
                        letterSpacing="1.5px"
                      >
                        {anime.title.english?.length > 20
                          ? `${anime.title.english.slice(0, 15)}...`
                          : anime.title.english}
                      </Heading>
                      <Heading
                        as="h4"
                        textTransform="uppercase"
                        color="var(--text-color)"
                        fontSize={{
                          base: "20.97px",
                          md: "29px",
                          "2xl": "37.97px",
                        }}
                        fontFamily="Noir Pro"
                        lineHeight={{ base: "33px", md: "35px", "2xl": "40px" }}
                        fontWeight="400"
                        mt={{ base: "10px", "2xl": "15px" }}
                      >
                        Status: {anime.status}
                      </Heading>
                      <HStack my="10px" gap="10px 10px" flexWrap="wrap">
                        {anime.genres.map((genre, i) => (
                          <Text
                            key={i}
                            as="span"
                            color={
                              i == 0
                                ? "var(--background-color)"
                                : "var(--text-color)"
                            }
                            cursor="pointer"
                            p="3px 10px"
                            bg={i == 0 ? "var(--accent-color)" : "#191919"}
                            _hover={{
                              color: "var(--background-color)",
                              bgColor: "var(--accent-color)",
                              border: "none",
                            }}
                            borderRadius="8px"
                            border={
                              i == 0
                                ? "none"
                                : "2px solid var(--secondary-color)"
                            }
                            fontSize={{ base: "14.63px", md: "16.63px" }}
                            lineHeight="24px"
                          >
                            {genre}
                          </Text>
                        ))}
                      </HStack>
                      <Heading
                        as="h4"
                        textTransform="uppercase"
                        color="var(--text-color)"
                        fontSize={{
                          base: "19.38px",
                          md: "24px",
                          "2xl": "28.95px",
                        }}
                        fontFamily="Noir Pro"
                        lineHeight={{ base: "30px", md: "35px", "2xl": "40px" }}
                        fontWeight="400"
                      >
                        Release year: {anime.releaseDate}
                      </Heading>
                      <Text
                        as="p"
                        fontSize={{
                          base: "13.56px",
                          md: "14.38px",
                          "2xl": "15.38px",
                        }}
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
                        <Link to={`anime/${anime.id}`} className="play-now-btn">
                          VIEW MORE
                        </Link>
                      </Box>
                    </VStack>

                    <Box hideBelow="xl">
                      <Box
                        background={
                          anime.image ? `url(${anime.image})` : "#191919"
                        }
                        w={{ lg: "550px", "2xl": "670px" }}
                        h={{ lg: "450px", "2xl": "600px" }}
                        backgroundSize="cover"
                        borderRadius="20px"
                        backgroundPosition="center"
                        _hover={{ transform: "scale(1.02)", cursor: "pointer" }}
                        transition="transform 0.25s ease"
                      ></Box>
                    </Box>
                  </Flex>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      )}
    </Box>
  );
};

export default Hero;
