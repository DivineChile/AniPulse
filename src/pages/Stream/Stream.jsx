import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Grid,
  GridItem,
  Image,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import playIcon from "../../assets/playIcon.svg";
import { ChevronDownIcon } from "@chakra-ui/icons";

const Stream = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [episodeId, setEpisodeId] = useState([]);
  const [episodeData, setEpisodeData] = useState([]);

  const [videoData, setVideoData] = useState([]);

  const [currentEp, setCurrentEp] = useState({});

  useEffect(() => {
    const fetchEpisodes = async () => {
      setIsLoading(true);
      try {
        const responseEp = await fetch(
          `https://api-amvstrm.nyt92.eu.org/api/v2/episode/${id}`
        );
        const dataEp = await responseEp.json();
        setEpisodeData(dataEp.episodes.map((item) => item));
        setEpisodeId(dataEp.episodes.map((item) => item.id));

        // console.log(episodeId);
        setIsLoading(false);
      } catch (err) {
        setError(true);
        setIsLoading(false);
      }
      console.group(episodeId);

      // for (let i = 0; i < episodeId.length; i++) {
      //   setCurrentEp(episodeId[i]);
      //   console.log(episodeData);
      // }
    };

    const fetchVideos = async () => {
      setIsLoading(true);

      try {
        const responseVideo = await fetch(
          `https://api-amvstrm.nyt92.eu.org/api/v1/stream/${currentEp}`
        );
        const dataVideo = await responseVideo.json();
        setVideoData(dataVideo.sources.map((item) => item.url));

        setIsLoading(false);
      } catch (error) {
        setError(true);
        setIsLoading(false);
      }
    };

    fetchEpisodes();
    fetchVideos();
  }, []);

  // useEffect(() => {

  // }, []);

  console.log(episodeId);

  return (
    <Box>
      <Navbar />

      <Box background="var(--primary-background-color)">
        <Box px={{ base: "20px", lg: "80px", xl: "100px" }} py="20px">
          {/* BreadCrumb Links */}
          <Breadcrumb mb="20px">
            <BreadcrumbItem
              fontSize={{ base: "15.13px", lg: "18.75px" }}
              lineHeight={{ base: "24px", lg: "30px" }}
              letterSpacing="0.5px"
              color="var(--text-color)"
              _hover={{ color: "var(--link-hover-color)" }}
            >
              <BreadcrumbLink as={Link} to="/">
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
              <BreadcrumbLink>Stream</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          {/* Anime Stream */}
          <Box>
            <Grid
              gridTemplateColumns="repeat(6, 1fr)"
              gap={{ base: "20px 0", md: "0 10px" }}
            >
              {/* Anime Video */}
              <GridItem
                colSpan={{ base: 6, md: 4 }}
                h={{
                  base: "250px",
                  sm: "300px",
                  md: "350px",
                  lg: "450px",
                  "2xl": "600px",
                }}
                pos="relative"
              >
                <Box
                  w="100%"
                  h="100%"
                  bg="var(--secondary-accent-color)"
                  borderRadius="10px"
                ></Box>
                {/* Overlay */}
                <Box
                  bg="rgba(25, 27, 40, 0.7)"
                  pos="absolute"
                  top="0"
                  left="0"
                  w="100%"
                  h="100%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Box
                    border="1px solid var(--text-color)"
                    borderRadius="50%"
                    w={{ base: "80px", lg: "100px" }}
                    h={{ base: "80px", lg: "100px" }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    cursor="pointer"
                    transition="transform ease 0.25s"
                    _hover={{ transform: "scale(1.1)" }}
                  >
                    <Image
                      src={playIcon}
                      h={{ base: "40px", lg: "50px" }}
                      w={{ base: "35px", lg: "44px" }}
                    />
                  </Box>
                </Box>
              </GridItem>
              {/* Anime Episodes */}
              <GridItem
                colSpan={{ base: 6, md: 2 }}
                h={{
                  base: "250px",
                  sm: "300px",
                  md: "350px",
                  lg: "450px",
                  "2xl": "600px",
                }}
              >
                <Box
                  w="100%"
                  h="100%"
                  bg="var(--secondary-accent-color)"
                  borderRadius="10px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  overflowY="scroll"
                >
                  {/* Season box */}
                  <Box p="40px 20px">
                    <Box
                      display="flex"
                      alignItems="center"
                      gap="0 10px"
                      cursor="pointer"
                    >
                      <Text
                        color="var(--text-color)"
                        fontSize="17.58px"
                        lineHeight="24px"
                      >
                        Season 1
                      </Text>
                      <ChevronDownIcon
                        h="18px"
                        w="18px"
                        color="var(--text-color)"
                      />
                    </Box>
                    <Box
                      p="20px 10px"
                      display="flex"
                      flexDir="column"
                      gap="15px 0"
                    >
                      {isLoading ? (
                        <Text color="var(--text-color)">Loading...</Text>
                      ) : error ? (
                        <Text color="var(--text-color)">{error}</Text>
                      ) : (
                        (() => {
                          const elements = [];

                          for (let i = 0; i < episodeData.length; i++) {
                            const item = episodeData[i];
                            // setEpisodeId(item.id);

                            // Use item properties in JSX
                            elements.push(
                              <Link key={item.number} to={`/stream/${item.id}`}>
                                <Text
                                  color="var(--text-color)"
                                  _hover={{ color: "var(--link-hover-color)" }}
                                >{`Episode ${item.number}`}</Text>
                              </Link>
                            );
                          }

                          console.log(elements);
                          return elements;
                        })()
                      )}
                    </Box>
                  </Box>
                </Box>
              </GridItem>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Stream;
