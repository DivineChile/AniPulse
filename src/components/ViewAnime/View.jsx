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

const View = () => {
  const { id } = useParams();

  // State management
  const [state, setState] = useState({
    isLoading: true,
    error: null,
    animeData: {},
    episodes: [],
    episodeCount: 0,
  });

  const [descriptionExpanded, setDescriptionExpanded] = useState(false);

  const api = "https://consumet-api-puce.vercel.app/";
  const backup_api = "https://aniwatch-api-gamma-wheat.vercel.app/";
  const proxy = "https://fluoridated-recondite-coast.glitch.me/";

  const fetchAnimeDetails = async () => {
    try {
      const [animeResponse, episodesResponse] = await Promise.all([
        axios.get(`${proxy}${backup_api}/api/v2/hianime/anime/${id}`),
        axios.get(`${proxy}${backup_api}/api/v2/hianime/anime/${id}/episodes`),
      ]);

      const animeData = animeResponse.data.data.anime;
      const episodes = episodesResponse.data.data.episodes;

      setState({
        isLoading: false,
        error: null,
        animeData,
        episodes,
        episodeCount: episodesResponse.data.data.totalEpisodes,
      });
      document.title = `${animeData.info.name} - AniPulse`;
    } catch (error) {
      setState({
        isLoading: false,
        error: "Failed to load anime data.",
        animeData: {},
        episodes: [],
        episodeCount: 0,
      });
    }
  };

  useEffect(() => {
    fetchAnimeDetails();
  }, [id]);

  const toggleDescription = () => {
    setDescriptionExpanded((prev) => !prev);
  };

  const { isLoading, error, animeData, episodes, episodeCount } = state;

  return (
    <Box>
      <Navbar />
      {isLoading && <Loading bg="#333333" height="100vh" />}
      {error && <Error height="100vh" bg="#191919" msg={error} />}

      {!isLoading && !error && (
        <Box background="#191919">
          <Box
            maxW={{
              base: "85%",
              sm: "95%",
              xl: "85%",
              "2xl": "container.xl",
            }}
            margin="auto"
            py="20px"
          >
            {/* Breadcrumb */}
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
                <BreadcrumbLink>Anime / {animeData?.info?.name}</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>

            {/* Anime Details */}
            <Grid gridTemplateColumns="repeat(7, 1fr)" gap="20px">
              {/* Anime Info */}
              <GridItem
                colSpan={{ base: 7, "2xl": 5 }}
                display="flex"
                flexDirection={{ base: "column", md: "row" }}
                gap="20px"
                alignItems="center"
              >
                <Box
                  w={{ base: "100%", md: "55%" }}
                  bg={
                    animeData?.info?.poster
                      ? `url(${animeData.info.poster})`
                      : "rgba(25, 27, 40, 0.7)"
                  }
                  bgSize="cover"
                  bgPos="center"
                  bgRepeat="no-repeat"
                  h={{ base: "217.64px", sm: "300px", md: "377.5px" }}
                  borderRadius="10px"
                ></Box>
                <Box w={{ base: "100%", md: "45%" }}>
                  <Heading
                    as="h2"
                    fontSize="35px"
                    fontWeight="500"
                    fontFamily="Noir Pro"
                    color="var(--text-color)"
                    letterSpacing="1.5px"
                    lineHeight="38.5px"
                  >
                    {animeData?.info?.name || "NIL"}
                  </Heading>
                  <Text
                    as="h3"
                    fontSize="24.02px"
                    fontWeight="300"
                    lineHeight="37.5px"
                    color="var(--secondary-color)"
                  >
                    Episodes: {episodeCount}
                  </Text>
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
                    >
                      {descriptionExpanded
                        ? animeData?.info?.description || "NIL"
                        : animeData?.info?.description?.slice(0, 250) + "..."}
                    </Text>
                    <ChakraLink
                      onClick={toggleDescription}
                      color="var(--link-color)"
                      mt="10px"
                      display="inline-block"
                      cursor="pointer"
                    >
                      {descriptionExpanded ? "Show Less" : "Show More"}
                    </ChakraLink>
                  </Box>
                </Box>
              </GridItem>

              {/* Episodes List */}
              <GridItem
                colSpan={{ base: 7, md: 4, lg: 3, "2xl": 5 }}
                id="episodes"
              >
                <Heading
                  color="var(--text-color)"
                  fontSize={{ base: "26.36px", md: "30px", lg: "37.5px" }}
                  fontWeight="700"
                  lineHeight={{ base: "30.8px", md: "35px", lg: "44px" }}
                  letterSpacing="1.5px"
                >
                  Episode List
                </Heading>
                <Box mt="20px">
                  {episodes.length !== 0 && (
                    <EpisodeList
                      items={episodes}
                      itemId={episodes.map((episode) => episode.episodeId)}
                      aniId={id}
                    />
                  )}
                </Box>
              </GridItem>
            </Grid>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default View;
