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
  Spinner,
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animeData, setAnimeData] = useState([]);
  const [animeEpisodes, setAnimeEpisodes] = useState([]);
  const [animeGenres, setAnimeGenres] = useState([]);
  const [animeStudios, setAnimeStudios] = useState([]);
  const [animeTitle, setAnimeTitle] = useState("");
  const [animeEpImg, setAnimeEpImg] = useState("");
  const [animeEpId, setAnimeEpId] = useState("");
  const [subOrDub, setSubOrDub] = useState("");

  const api = "https://consumet-api-puce.vercel.app/";

  const fetchAnimeData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${api}meta/anilist/info/${id}`);
      setAnimeData(response.data);
      setAnimeTitle(response.data.title.english);
      setAnimeEpisodes(response.data.episodes);
      setAnimeEpId(response.data.episodes.map((item) => item.id));
      setAnimeEpImg(response.data.episodes.map((item) => item.image));
      setAnimeGenres(response.data.genres);
      setSubOrDub(response.data.subOrDub);
      setAnimeStudios(response.data.studios);
      document.title = `${animeTitle} - AniPulse`;
      console.log(response.data);
    } catch (err) {
      setError("Failed to load data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimeData();
  }, []);

  document.body.style.overflow = isLoading ? "hidden!important" : "initial";

  return (
    <Box>
      <Navbar />
      {isLoading && <Loading bg="#333333" height="100vh" />}

      {error && <Error height="100vh" msg="Still Loading..." />}

      {!isLoading && !error && (
        <Box background="var(--primary-background-color)">
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
                      color="var(--text-color)"
                      letterSpacing="1.5px"
                      lineHeight="38.5px"
                      transition="background ease 0.25s"
                    >
                      {animeData.title.romaji}
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
                      {`${animeEpisodes.length}/${animeData.totalEpisodes}`}
                    </Text>
                    {/* Anime Summary */}
                    <Box mt="20px">
                      <Text
                        as="h4"
                        mb="8px"
                        color="var(--text-color)"
                        fontSize="24.02px"
                        fontWeight="600"
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
                        {animeData.description.length > 200
                          ? `${animeData.description.slice(0, 250)}...`
                          : "Loading..."}
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
                          : "Loading..."}
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
                    <Box mt="20px">
                      {isLoading && <Spinner color="var(--accent-color)" />}
                      {error && (
                        <Box display="flex" flexDir="column" gap="15px">
                          <Text color="var(--text-color)">
                            Error Loading Episodes
                          </Text>
                          <Button
                            // onClick={generateSubEp}
                            height="30px"
                            w="fit-content"
                            bg="transparent"
                            border="1px solid var(--accent-color)"
                            color="var(--accent-color)"
                            _hover={{
                              color: "#000",
                              bg: "var(--accent-color)",
                            }}
                          >
                            Retry
                          </Button>
                        </Box>
                      )}
                      <EpisodeList
                        items={animeEpisodes}
                        itemId={animeEpId}
                        coverImg={animeEpImg}
                        subOrDub={subOrDub}
                      />
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
