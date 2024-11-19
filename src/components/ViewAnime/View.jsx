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
  Button,
  Tabs,
  TabList,
  Tab,
  TabIndicator,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams, Link as ReactRouterLink } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Error from "../ErrorPage/Error";

import EpisodeList from "../EpisodeList/EpisodeList";
import axios from "axios";
import Loading from "../ErrorPage/Loading";
import CountDown from "../CountDown";

const View = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animeData, setAnimeData] = useState([]);
  const [animeEpisodes, setAnimeEpisodes] = useState([]);
  const [nextEp, setNextEp] = useState(0);
  const [airingTime, setAiringTime] = useState(0);
  const [timeUntilAiring, setTimeUntilAiring] = useState(0);
  const [animeGenres, setAnimeGenres] = useState([]);
  const [animeStudios, setAnimeStudios] = useState([]);
  const [animeTitle, setAnimeTitle] = useState("");
  const [animeEpId, setAnimeEpId] = useState("");
  const [subOrDub, setSubOrDub] = useState("");
  const [gogoId, setGogoId] = useState("");
  const [gogoIdDub, setGogoIdDub] = useState("");

  const [epLoading, setEpLoading] = useState(true);
  const [epError, setEpError] = useState(null);
  const [dubEpisodes, setDubEpisodes] = useState([]);
  const [dubEpisodeId, setDubEpisodeId] = useState("");

  const api = "https://consumet-api-puce.vercel.app/";

  const fetchAnimeData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${api}meta/anilist/info/${id}`);
      const data = response.data;

      // Set anime information
      setAnimeData(data);
      setAnimeTitle(data.title.romaji);
      setAnimeEpisodes(data.episodes);
      setAnimeGenres(data.genres);
      setSubOrDub(data.subOrDub);
      setAnimeStudios(data.studios);

      // Handle episodes data
      setAnimeEpId(data.episodes.map((item) => item.id));

      // Handle next airing episode details
      if (data.nextAiringEpisode) {
        setNextEp(data.nextAiringEpisode.episode);
        setAiringTime(data.nextAiringEpisode.airingTime);
        setTimeUntilAiring(data.nextAiringEpisode.timeUntilAiring);
      }

      // Find and set GogoAnime ID
      const gogoItem = data.mappings.find(
        (item) => item.providerId === "gogoanime"
      );
      if (gogoItem) {
        setGogoId(gogoItem.id);
      } else {
        console.error("No mapping found with providerId 'gogoanime'");
      }

      // Set document title
      document.title = `${data.title.romaji} - AniPulse`;
    } catch (err) {
      setError("Failed to load anime data. Please try again.");
      console.error("Error fetching anime data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimeData();
  }, []);

  // Fetch dubbed episodes when gogoId changes
  useEffect(() => {
    if (gogoId) {
      const GogoIdDub = `${gogoId.split("/").pop()}-dub`;
      setGogoIdDub(GogoIdDub);

      const fetchDubbedEpisodes = async () => {
        setEpLoading(true);
        setEpError(null);
        try {
          const response = await axios.get(
            `${api}anime/gogoanime/info/${GogoIdDub}`
          );
          setDubEpisodes(response.data.episodes);
          setDubEpisodeId(response.data.episodes.map((item) => item.id));
          console.log("Dubbed Episodes:", response.data);
        } catch (err) {
          setEpError("Failed to load dubbed episode data. Please try again.");
          console.error("Error fetching dubbed episodes:", err);
        } finally {
          setEpLoading(false);
        }
      };

      fetchDubbedEpisodes();
    }
  }, [gogoId]);

  document.body.style.overflow = isLoading ? "hidden!important" : "initial";

  return (
    <Box>
      <Navbar />
      {isLoading && <Loading bg="#333333" height="100vh" />}

      {error && <Error height="100vh" bg="#191919" msg="Still Loading..." />}

      {!isLoading && !error && (
        <Box background="#191919">
          <Box
            maxW={{
              base: "95%",
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
                color="var(--accent-color)"
                _hover={{ color: "var(--link-hover-color)" }}
              >
                <BreadcrumbLink>
                  Anime / {animeData?.title.romaji}
                </BreadcrumbLink>
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
                >
                  {/* Anime Image */}
                  <Box
                    w={{ base: "100%", md: "55%" }}
                    bg={
                      animeData.image
                        ? `url(${animeData.image})`
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
                    w={{ base: "100%", md: "45%" }}
                    mb={{ base: "20px", md: "0" }}
                  >
                    {/* Anime Name */}
                    <Heading
                      as="h2"
                      fontSize="35px"
                      fontWeight="500"
                      fontFamily="Noir Pro"
                      color="var(--text-color)"
                      letterSpacing="1.5px"
                      lineHeight="38.5px"
                      transition="background ease 0.25s"
                    >
                      {animeData.title.romaji
                        ? animeData.title.romaji !== ""
                          ? animeData.title.romaji
                          : "NIL"
                        : "NIL"}
                    </Heading>
                    <Text
                      as="h3"
                      fontSize="24.02px"
                      fontWeight="300"
                      lineHeight="37.5px"
                      color="var(--secondary-color)"
                      transition="background ease 0.25s"
                    >
                      Episodes :{" "}
                      {`${
                        animeData.currentEpisode
                          ? animeData.currentEpisode
                          : "NIL"
                      }/${
                        animeData.totalEpisodes
                          ? animeData.totalEpisodes
                          : "NIL"
                      }`}
                    </Text>
                    {/* Anime Summary */}
                    <Box mt="20px">
                      <Text
                        as="h4"
                        mb="8px"
                        color="var(--text-color)"
                        fontSize="24.02px"
                        fontWeight="600"
                        fontFamily="Noir Pro"
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
                        lineHeight="24px"
                        letterSpacing="0.5px"
                        transition="background ease 0.25s"
                      >
                        {animeData.description
                          ? animeData.description !== ""
                            ? animeData.description.length > 200
                              ? `${animeData.description.slice(0, 250)}...`
                              : `${animeData.description}`
                            : "NIL"
                          : "NIL"}
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
                          color: "var(--background-color)",
                          textDecoration: "none",
                          background: "var(--accent-color)",
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
                <GridItem colSpan={{ base: 7, md: 3, lg: 4, "2xl": 2 }}>
                  <Box display="flex" flexDir="column" gap="9px 0">
                    <Text
                      as="h3"
                      color="var(--text-color)"
                      fontSize="24.61px"
                      fontWeight="400"
                      lineHeight="27.5px"
                      letterSpacing="1.5px"
                      mb="10px"
                    >
                      Anime Details
                    </Text>
                    {/* Anime Author */}
                    <Box display="flex" gap="0 10px">
                      <Text
                        as="p"
                        color="var(--text-color)"
                        fontSize="15px"
                        fontWeight="300"
                        lineHeight="24px"
                      >
                        Studio:{"  "}
                      </Text>
                      <Text
                        color="var(--accent-color)"
                        as="span"
                        fontSize="15px"
                        fontWeight="300"
                        lineHeight="24px"
                        transition="background ease 0.25s"
                      >
                        {animeStudios.length === 0
                          ? "NIL"
                          : animeStudios.length > 0
                          ? animeStudios.map((studio, index) => {
                              return (
                                <Text
                                  color="var(--accent-color)"
                                  as="span"
                                  fontSize="15px"
                                  fontWeight="300"
                                  lineHeight="24px"
                                  transition="background ease 0.25s"
                                  key={index}
                                >
                                  {`${studio}${
                                    animeStudios.length > 1 ? "," : ""
                                  }`}
                                </Text>
                              );
                            })
                          : "NIL"}
                      </Text>
                    </Box>
                    {/* Anime Season */}
                    <Box display="flex" gap="0 10px">
                      <Text
                        as="p"
                        color="var(--text-color)"
                        fontSize="15px"
                        fontWeight="300"
                        lineHeight="24px"
                      >
                        Season:{"  "}
                      </Text>
                      <Text
                        color="var(--accent-color)"
                        as="span"
                        fontSize="15px"
                        fontWeight="300"
                        lineHeight="24px"
                        transition="background ease 0.25s"
                      >
                        {animeData.season ? animeData.season : "Loading..."}
                      </Text>
                    </Box>
                    {/* Release Year */}
                    <Box display="flex" gap="0 10px">
                      <Text
                        as="p"
                        color="var(--text-color)"
                        fontSize="15px"
                        fontWeight="300"
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
                        {animeData.releaseDate
                          ? animeData.releaseDate
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
                        lineHeight="24px"
                      >
                        Status:{"  "}
                      </Text>
                      <Text
                        color="var(--accent-color)"
                        as="span"
                        fontSize="15px"
                        fontWeight="300"
                        lineHeight="24px"
                        transition="background ease 0.25s"
                      >
                        {animeData.status ? animeData.status : "Loading..."}
                      </Text>
                    </Box>
                    {/* Genres */}
                    <Box display="flex" gap="0 10px">
                      <Text
                        as="p"
                        color="var(--text-color)"
                        fontSize="15px"
                        fontWeight="300"
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
                        lineHeight="24px"
                      >
                        {animeData.rating ? animeData.rating : "Loading..."}
                      </Text>
                    </Box>
                    {/* Countdown timer */}
                    <Box display="flex" gap="0 10px">
                      <Text
                        as="p"
                        color="var(--text-color)"
                        fontSize="15px"
                        fontWeight="300"
                        lineHeight="24px"
                        transition="background ease 0.25s"
                      >
                        Next Episode At:{"  "}
                      </Text>
                      <Text
                        color="var(--text-color)"
                        as="span"
                        fontSize="15px"
                        fontWeight="300"
                        lineHeight="24px"
                      >
                        {animeData.status.toLowerCase() === "completed" ? (
                          "Finished"
                        ) : animeData.nextAiringEpisode ? (
                          <CountDown
                            initialTime={airingTime - timeUntilAiring}
                          />
                        ) : (
                          "Loading..."
                        )}
                      </Text>
                    </Box>
                  </Box>
                </GridItem>
                {/* Episodes List */}
                <GridItem
                  colSpan={{ base: 7, md: 4, lg: 3, "2xl": 5 }}
                  mt={{ base: "20px", md: 0 }}
                  id="episodes"
                >
                  <Box>
                    <Heading
                      color="var(--text-color)"
                      fontSize={{ base: "26.36px", md: "30px", lg: "37.5px" }}
                      fontWeight="700"
                      lineHeight={{ base: "30.8px", md: "35px", lg: "44px" }}
                      letterSpacing="1.5px"
                    >
                      Episode List
                    </Heading>
                    <Box mt="20px" pos="relative">
                      <Tabs isLazy variant="unstyled">
                        <TabList w="100%">
                          <Tab
                            w="50%"
                            color="var(--text-color)"
                            _hover={{ color: "var(--accent-color)" }}
                            _selected={{ color: "var(--accent-color)" }}
                          >
                            Sub
                          </Tab>
                          <Tab
                            w="50%"
                            color="var(--text-color)"
                            _hover={{ color: "var(--accent-color)" }}
                            _selected={{ color: "var(--accent-color)" }}
                          >
                            Dub
                          </Tab>
                        </TabList>
                        <TabIndicator
                          color="var(--accent-color)"
                          bg="var(--accent-color)"
                          height="2px"
                          borderRadius="2px"
                          width="100%"
                        />
                        <TabPanels>
                          <TabPanel>
                            {animeEpisodes.length !== 0 ? (
                              <EpisodeList
                                items={animeEpisodes}
                                itemId={animeEpId}
                                aniId={id}
                                subOrDub={subOrDub}
                              />
                            ) : (
                              <Box display="flex" flexDir="column">
                                <Error bg="none" msg="Error loading Episodes" />
                              </Box>
                            )}
                          </TabPanel>
                          <TabPanel>
                            {animeEpisodes.length !== 0 ? (
                              <EpisodeList
                                items={dubEpisodes}
                                itemId={dubEpisodeId}
                                aniId={id}
                                subOrDub="dub"
                              />
                            ) : (
                              <Box display="flex" flexDir="column">
                                <Error bg="none" msg="Error loading Episodes" />
                              </Box>
                            )}
                          </TabPanel>
                        </TabPanels>
                      </Tabs>
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
