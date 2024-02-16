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
import { Link, useLocation, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Error from "../../components/ErrorPage/Error";
import playIcon from "../../assets/playIcon.svg";
import { ChevronDownIcon } from "@chakra-ui/icons";

import Player from "../../components/VideoPlayer/Player";
import "./style.css";

const Stream = () => {
  const { watchId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [episodeId, setEpisodeId] = useState([]);
  const [episodeData, setEpisodeData] = useState([]);

  const [videoData, setVideoData] = useState([]);
  const location = useLocation();

  const newAnimeId = watchId.split("-").slice(0, -2);
  const newAnimeIdVal = newAnimeId.join("-");

  useEffect(() => {
    const fetchEpisodes = async () => {
      setIsLoading(true);
      try {
        const responseEp = await fetch(
          `https://api-amvstrm.nyt92.eu.org/api/v1/episode/${newAnimeIdVal}`
        );
        const dataEp = await responseEp.json();
        setEpisodeData(dataEp.episodes.map((item) => item));
        setEpisodeId(dataEp.episodes.map((item) => item.id));

        setIsLoading(false);
      } catch (err) {
        setError(true);
        setIsLoading(false);
      }
    };

    const fetchVideos = async () => {
      setIsLoading(true);

      try {
        const responseVideo = await fetch(
          `https://api-amvstrm.nyt92.eu.org/api/v2/stream/${watchId}`
        );
        const dataVideo = await responseVideo.json();
        setVideoData(dataVideo);
        // setVideoUrl(videoData.stream.multi.main);
        document.title = `${dataVideo.info.title} Episode ${dataVideo.info.episode}`;
      } catch (error) {
        setError(true);
        setIsLoading(false);
      }
    };

    fetchEpisodes();
    fetchVideos();
  }, []);

  // console.log(videoData.stream.multi.main.url);

  return (
    <Box>
      <Navbar />
      {isLoading && (
        <Error
          // msg={"Still Working..."}
          loadingState={isLoading}
          height="100%"
          // error={error}
          pos="fixed"
          top={{ base: "70.89px", md: "74px", lg: "84px" }}
          left="0"
          width="100%"
        />
      )}

      {error && (
        <Error
          msg={"Still Working..."}
          loadingState={isLoading}
          height="100%"
          error={error}
          pos="fixed"
          top={{ base: "70.89px", md: "74px", lg: "84px" }}
          left="0"
          width="100%"
        />
      )}

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
              gap={{ base: "60px 0", md: "0 10px" }}
            >
              {/* Anime Video */}
              <GridItem
                colSpan={{ base: 6, md: 4 }}
                h={{
                  base: "250px",
                  sm: "300px",
                  md: "350px",
                  lg: "450px!important",
                  "2xl": "600px!important",
                }}
                pos="relative"
              >
                {/* {isLoading && (
                  <Error
                    // error={error}
                    loadingState={isLoading}
                    pos="absolute"
                    top="0"
                    left="0"
                    width="100%"
                    height="100%"
                    radius="10px"
                  />
                )}
                {error && (
                  <Error
                    error={error}
                    msg="Still Working..."
                    pos="absolute"
                    top="0"
                    left="0"
                    width="100%"
                    height="100%"
                    radius="10px"
                  />
                )} */}
                <Box
                  w="100%"
                  h="100%"
                  bg="var(--secondary-accent-color)"
                  borderRadius="10px"
                >
                  <Player playIcon={<Image src={playIcon} />} />
                </Box>
                {/* Overlay
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
                </Box> */}
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
                  overflowY="scroll"
                  alignItems="center"
                  justifyContent={{ base: "flex-start", md: "center" }}
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
                        // height="47px"
                        // display="flex"
                        // justifyContent="center"
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
                      display={{ base: "grid" }}
                      // gridTemplateColumns={{
                      //   base: "100%",
                      //   sm: "repeat(3, 1fr)",
                      //   md: "repeat(6, 1fr)",
                      // }}
                      flexDir={{ base: "row", md: "column" }}
                      justifyContent="start"
                      flexWrap="wrap"
                      gap={{ base: "15px", sm: "15px 25px", md: "15px 0" }}
                    >
                      {(() => {
                        const elements = [];

                        for (let i = 0; i < episodeData.length; i++) {
                          const item = episodeData[i];
                          const epArray = item.id.split("-");

                          const newItemID = `Episode ${epArray.pop()}`;

                          // setEpisodeId(item.id);

                          // Use item properties in JSX
                          elements.push(
                            <Link key={item[i]} to={`/watch/${item.id}`}>
                              <Text
                                as="span"
                                color="var(--text-color)"
                                _hover={{ color: "var(--link-hover-color)" }}
                                className={
                                  location.pathname == `watch/${item.id}`
                                    ? "active"
                                    : ""
                                }
                              >
                                {newItemID}
                              </Text>
                            </Link>
                          );
                        }

                        return elements;
                      })()}
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
