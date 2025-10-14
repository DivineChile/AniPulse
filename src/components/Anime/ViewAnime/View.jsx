import {
  Box,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Grid,
  GridItem,
  Heading,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams, Link as ReactRouterLink } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import Error from "../../ErrorPage/Error";

import EpisodeList from "../EpisodeList/EpisodeList";
import Loading from "../../ErrorPage/Loading";

const View = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animeData, setAnimeData] = useState([]);

  const [animeGenres, setAnimeGenres] = useState([]);
  const [animeStudios, setAnimeStudios] = useState([]);
  const [animeTitle, setAnimeTitle] = useState("");

  const [episodes, setEpisodes] = useState([]);
  const [episodeCount, setEpisodeCount] = useState(0);

  const [animeInfo, setAnimeInfo] = useState([]);
  const [infoLoading, setInfoLoading] = useState(true);
  const [infoError, setInfoError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const api = "https://consumet-api-puce.vercel.app/";
  const backup_api = "https://anime-api-production-bc3d.up.railway.app/";
  const proxy = "https://cors-anywhere-aifwkw.fly.dev/";

  const fetchAnimeData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${proxy}${backup_api}/api/info?id=${id}`);
      const data = await response.json();

      // Set anime information
      setAnimeData(data.results.data);

      setAnimeTitle(data.results.data.title);

      setAnimeGenres(data.results.data.animeInfo.Genres);
      setAnimeStudios(data.results.data.animeInfo.Studios);

      // Set document title
      document.title = `${data.results.data.title} - AniPulse`;
    } catch (err) {
      setError("Failed to load anime data. Please try again.");
      console.error("Error fetching anime data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAnimeEpisodes = async () => {
    setInfoLoading(true);

    try {
      const response = await fetch(`${proxy}${backup_api}/api/episodes/${id}`);
      const data = await response.json();

      setEpisodes(data.results.episodes);
      setEpisodeCount(data.results.totalEpisodes);

      // console.log(response2);
    } catch (err) {
      setInfoError(err);
    } finally {
      setInfoLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimeData();
    fetchAnimeEpisodes();
  }, []);

  document.body.style.overflow = isLoading ? "hidden!important" : "initial";
  const animeInfoAired = animeData.animeInfo
    ? animeData.animeInfo.Aired?.split("-").join(" ")
    : "";
  const animeInfoSeason = animeData.animeInfo
    ? animeData.animeInfo.Premiered?.split("-").join(" ")
    : "";
  const animeInfoStatus = animeData.animeInfo
    ? animeData.animeInfo.Status?.split("-").join(" ")
    : "";

  return (
    <Box>
      <Navbar />
      {isLoading && <Loading bg="var(--linear-gradient)" height="100vh" />}

      {error && (
        <Error
          height="100vh"
          bg="var(--primary-background-color)"
          msg="Still Loading..."
        />
      )}

      {!isLoading && !error && (
        <Box
          bg={
            animeData.poster
              ? `url(${animeData.poster})`
              : "var(--primary-background-color)"
          }
          bgRepeat="no-repeat"
          bgSize="cover"
          bgPos="center"
          bgAttachment="fixed"
          bgBlendMode="overlay"
          bgColor="rgba(0,0,0,1)"
          className="fade-background"
        >
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
            <Breadcrumb mb="20px">
              <BreadcrumbItem
                fontSize={{ base: "15.13px", lg: "18.75px" }}
                lineHeight={{ base: "24px", lg: "30px" }}
                letterSpacing="0.5px"
                color="var(--text-color)"
                _hover={{ color: "var(--link-hover-color)" }}
              >
                <BreadcrumbLink as={ReactRouterLink} to="/" textDecor="none">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem
                isCurrentPage
                fontSize={{ base: "15.13px", lg: "18.75px" }}
                lineHeight={{ base: "24px", lg: "30px" }}
                letterSpacing="0.5px"
                color="var(--link-color)"
                _hover={{ color: "var(--link-hover-color)" }}
              >
                <BreadcrumbLink>Anime / {animeData?.title}</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>

            {/* Anime Details */}
            <Box my="20px">
              {/*  */}
              <Grid gridTemplateColumns="repeat(7, 1fr)" gap="20px">
                <GridItem
                  colSpan={{ base: 7, "2xl": 5 }}
                  display="flex"
                  flexDir={{ base: "column", md: "row" }}
                  gap={{ base: "20px 0", md: "0 20px" }}
                  alignItems={{ base: "start", md: "center", "2xl": "start" }}
                  mb="20px"
                  justifyContent={{ base: "initial", md: "space-between" }}
                >
                  {/* Anime Image */}
                  <Box
                    w={{ base: "100%", md: "30%", lg: "40%" }}
                    bg={
                      animeData.poster
                        ? `url(${animeData.poster})`
                        : "rgba(25, 27, 40, 0.7)"
                    }
                    bgSize="cover"
                    bgPos="center"
                    bgRepeat="no-repeat"
                    h={{ base: "217.64px", sm: "300px", md: "377.5px" }}
                    transition="background ease 0.25s"
                    borderRadius="10px"
                  ></Box>
                  {/* Anime Desc */}
                  <Box
                    w={{ base: "100%", md: "70%", lg: "60%" }}
                    mb={{ base: "20px", md: "0" }}
                  >
                    {/* Anime Name */}
                    <Heading
                      as="h2"
                      fontSize={{ base: "35px", md: "45px" }}
                      fontWeight={{ base: "500", md: "700" }}
                      fontFamily="var(--font-family)"
                      color="var(--text-color)"
                      letterSpacing="1.5px"
                      lineHeight={{ base: "38.5px", md: "48.5px" }}
                      transition="background ease 0.25s"
                    >
                      {animeData.title
                        ? animeData.title !== ""
                          ? animeData.title
                          : "NIL"
                        : "NIL"}
                    </Heading>
                    <Text
                      as="h3"
                      fontSize="24.02px"
                      fontWeight="300"
                      lineHeight="37.5px"
                      color="var(--text-secondary)"
                      transition="background ease 0.25s"
                    >
                      Episodes: {episodeCount}
                    </Text>
                    {/* Anime Summary */}
                    <Box mt="20px">
                      <Text
                        as="h4"
                        mb="8px"
                        color="var(--text-color)"
                        fontSize="24.02px"
                        fontWeight="300"
                        fontFamily="var(--font-family)"
                        lineHeight="27.5px"
                        letterSpacing="1.5px"
                      >
                        Plot Summary
                      </Text>
                      <Text
                        as="p"
                        color="var(--text-color)"
                        fontSize="15.38px"
                        fontWeight="300"
                        fontFamily="var(--body-font)"
                        lineHeight="24px"
                        letterSpacing="0.5px"
                        transition="background ease 0.25s"
                      >
                        {animeData?.animeInfo.Overview
                          ? isExpanded
                            ? animeData.animeInfo.Overview
                            : animeData.animeInfo.Overview.length > 250
                            ? `${animeData.animeInfo.Overview.slice(0, 250)}...`
                            : animeData.animeInfo.Overview
                          : "NIL"}
                        {animeData.animeInfo.Overview &&
                          animeData.animeInfo.Overview.length > 250 && (
                            <Text
                              as="span"
                              color="var(--link-color)"
                              _hover={{ color: "var(--link-hover-color)" }}
                              cursor="pointer"
                              fontWeight="500"
                              ml="5px"
                              onClick={() => setIsExpanded((prev) => !prev)}
                            >
                              {isExpanded ? "Show Less" : "Show More"}
                            </Text>
                          )}
                      </Text>
                    </Box>
                    <Box w="100%" h="47px">
                      <ChakraLink
                        href="#episodes"
                        w="100%"
                        h="47px!important"
                        color="var(--link-color)"
                        border="1px solid var(--secondary-color)"
                        borderRadius="10px"
                        transition="all ease 0.25s"
                        _hover={{
                          color: "var(--link-hover-color)",
                          textDecoration: "none",
                          background: "var(--accent-color)",
                          transform: "scale(1.05)",
                          border: "none",
                        }}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        mt="20px"
                        fontSize="19.77px"
                        fontWeight="500"
                        lineHeight="33px"
                        letterSpacing="0.5px"
                        textTransform="uppercase"
                      >
                        Watch Now
                      </ChakraLink>
                    </Box>
                  </Box>
                </GridItem>
                {/* Anime Details */}
                <GridItem colSpan={{ base: 7, md: 3, lg: 3, "2xl": 2 }}>
                  <Box display="flex" flexDir="column" gap="9px 0">
                    <Text
                      as="h3"
                      color="var(--text-color)"
                      fontSize="24.61px"
                      fontWeight="600"
                      lineHeight="27.5px"
                      letterSpacing="1.5px"
                      mb="10px"
                    >
                      Anime Details
                    </Text>
                    {/* Countdown timer */}
                    <Box display="flex" gap="0 10px">
                      <Text
                        as="p"
                        color="var(--text-color)"
                        fontSize="15px"
                        fontFamily="var(--font-family)"
                        fontWeight="300"
                        lineHeight="24px"
                        transition="background ease 0.25s"
                      >
                        Premiered:{"  "}
                      </Text>
                      <Text
                        color="var(--text-color)"
                        as="span"
                        fontSize="15px"
                        fontWeight="300"
                        fontFamily="var(--body-font)"
                        lineHeight="24px"
                      >
                        {animeData.animeInfo.Aired
                          ? animeInfoAired
                          : "Loading..."}
                      </Text>
                    </Box>
                    {/* Anime Author */}
                    <Box display="flex" gap="0 10px">
                      <Text
                        as="p"
                        color="var(--text-color)"
                        fontSize="15px"
                        fontFamily="var(--font-family)"
                        fontWeight="300"
                        lineHeight="24px"
                      >
                        Studio:{"  "}
                      </Text>
                      <Text
                        color="var(--secondary-color)"
                        as="span"
                        fontSize="15px"
                        fontFamily="var(--body-font)"
                        fontWeight="300"
                        lineHeight="24px"
                        transition="background ease 0.25s"
                      >
                        {animeData.animeInfo.Studios || "Unknown"}
                      </Text>
                    </Box>
                    {/* Anime Season */}
                    <Box display="flex" gap="0 10px">
                      <Text
                        as="p"
                        color="var(--text-color)"
                        fontSize="15px"
                        fontWeight="300"
                        fontFamily="var(--font-family)"
                        lineHeight="24px"
                      >
                        Season:{"  "}
                      </Text>
                      <Text
                        color="var(--secondary-color)"
                        as="span"
                        fontSize="15px"
                        fontWeight="300"
                        lineHeight="24px"
                        fontFamily="var(--body-font)"
                        transition="background ease 0.25s"
                      >
                        {animeData.animeInfo.Premiered
                          ? animeInfoSeason
                          : "Loading..."}
                      </Text>
                    </Box>
                    {/* Release Year */}
                    <Box display="flex" gap="0 10px">
                      <Text
                        as="p"
                        color="var(--text-color)"
                        fontSize="15px"
                        fontWeight="300"
                        fontFamily="var(--font-family)"
                        lineHeight="24px"
                      >
                        Year:{"  "}
                      </Text>
                      <Text
                        color="var(--text-color)"
                        as="span"
                        fontSize="15px"
                        fontWeight="300"
                        transition="background ease 0.25s"
                        lineHeight="24px"
                      >
                        {animeData.animeInfo.Premiered
                          ? animeData.animeInfo.Premiered.split("-")[1]
                          : "Loading..."}
                      </Text>
                    </Box>
                    {/* Status */}
                    <Box display="flex" gap="0 10px">
                      <Text
                        as="p"
                        color="var(--text-color)"
                        fontSize="15px"
                        fontWeight="300"
                        fontFamily="var(--font-family)"
                        lineHeight="24px"
                      >
                        Status:{"  "}
                      </Text>
                      <Text
                        color="var(--secondary-color)"
                        as="span"
                        fontSize="15px"
                        fontWeight="300"
                        fontFamily="var(--body-font)"
                        lineHeight="24px"
                        transition="background ease 0.25s"
                      >
                        {animeData.animeInfo.Status
                          ? animeInfoStatus
                          : "Loading..."}
                      </Text>
                    </Box>
                    {/* Genres */}
                    <Box display="flex" gap="0 10px">
                      <Text
                        as="p"
                        color="var(--text-color)"
                        fontSize="15px"
                        fontWeight="300"
                        fontFamily="var(--font-family)"
                        lineHeight="24px"
                      >
                        Genres:{"  "}
                      </Text>
                      {/* Genre */}
                      <Box display="flex" gap="2px" flexWrap="wrap">
                        {animeGenres?.map((genre, index) => {
                          return (
                            <Text
                              color="var(--text-color)"
                              as="span"
                              fontSize="15px"
                              fontWeight="300"
                              lineHeight="24px"
                              fontFamily="var(--body-font)"
                              transition="background ease 0.25s"
                              key={index}
                            >
                              {`${genre}${animeGenres.length > 1 ? "," : ""}`}
                            </Text>
                          );
                        })}
                      </Box>
                    </Box>
                    {/* Views */}
                    <Box display="flex" gap="0 10px">
                      <Text
                        as="p"
                        color="var(--text-color)"
                        fontSize="15px"
                        fontWeight="300"
                        fontFamily="var(--font-family)"
                        lineHeight="24px"
                        transition="background ease 0.25s"
                      >
                        Score:{"  "}
                      </Text>
                      <Text
                        color="var(--text-color)"
                        as="span"
                        fontSize="15px"
                        fontWeight="300"
                        fontFamily="var(--body-font)"
                        lineHeight="24px"
                      >
                        {animeData.animeInfo["MAL Score"]
                          ? animeData.animeInfo["MAL Score"]
                          : "Loading..."}
                      </Text>
                    </Box>
                  </Box>
                </GridItem>
                {/* Episodes List */}
                <GridItem
                  colSpan={{ base: 7, md: 4, lg: 4, "2xl": 5 }}
                  mt={{ base: "20px", md: 0 }}
                  id="episodes"
                >
                  <Box>
                    <Heading
                      color="var(--text-color)"
                      fontSize={{ base: "26.36px", md: "30px", lg: "37.5px" }}
                      fontWeight="600"
                      fontFamily="var(--font-family)"
                      lineHeight={{ base: "30.8px", md: "35px", lg: "44px" }}
                      letterSpacing="1.5px"
                    >
                      Episode List
                    </Heading>
                    <Box mt="20px" pos="relative">
                      {episodes.length !== 0 && (
                        <EpisodeList
                          items={episodes}
                          itemId={episodes.map((episode) => episode.id)}
                          aniId={id}
                        />
                      )}
                    </Box>
                  </Box>
                </GridItem>
              </Grid>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default View;
