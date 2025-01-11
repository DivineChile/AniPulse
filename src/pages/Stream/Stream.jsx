import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Error from "../../components/ErrorPage/Error";
import { ChevronDownIcon } from "@chakra-ui/icons";

import "./style.css";
import Loading from "../../components/ErrorPage/Loading";
import Player from "../../components/VideoPlayer/Player";

const Stream = () => {
  const navigate = useNavigate();
  const { watchId } = useParams();
  const [epLoading, setEpLoading] = useState(true);
  const [epError, setEpError] = useState(null);
  const [animeData, setAnimeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [episodeNumber, setEpisodeNumber] = useState("");
  const [animeRating, setAnimeRating] = useState("");
  const [animeTitle, setAnimeTitle] = useState("");

  const api = "https://consumet-api-puce.vercel.app/";
  const backup_api = "https://aniwatch-api-gamma-wheat.vercel.app/";
  const proxy = "https://fluoridated-recondite-coast.glitch.me/";
  const location = useLocation();
  const fullPath = `${watchId}${location.search}`;

  useEffect(() => {
    const fetchEpisodes = async () => {
      setEpLoading(true);
      setEpError(null);
      try {
        const response = await fetch(
          `${proxy}${backup_api}/api/v2/hianime/anime/${watchId}/episodes`
        );
        const data = await response.json();
        setEpisodes(data.data.episodes || []);
        setEpisodeNumber(data.data.episodes.map((item) => item.number));
      } catch {
        setEpError("Failed to load data. Please try again.");
      } finally {
        setEpLoading(false);
      }
    };

    const fetchAnimeData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${proxy}${backup_api}/api/v2/hianime/anime/${watchId}`
        );
        const data = await response.json();
        setAnimeData(data.data.anime);
        setAnimeTitle(animeData.info.name);
        setAnimeRating(animeData.moreInfo.malscore);
        console.log(animeData);
      } catch (error) {
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
    fetchAnimeData();
  }, [watchId]);

  useEffect(() => {
    document.title = `${animeTitle} - AniPulse`;
  }, [fullPath, animeTitle, watchId]);
  console.log(episodeNumber);

  return (
    <Box>
      <Navbar />
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
              color="var(--accent-color)"
              _hover={{ color: "var(--link-hover-color)" }}
            >
              <BreadcrumbLink>{`Stream / ${animeTitle} Episode 1`}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          {/* Anime Stream */}
          <Box>
            <Box className="player-wrapper" width="100%" height="100%">
              <Grid
                gridTemplateColumns="repeat(6, 1fr)"
                gap={{ base: "30px 0", xl: "30px 30px" }}
              >
                {/* Anime Video */}

                <GridItem
                  colSpan={{ base: 6, xl: 4 }}
                  h={{
                    base: "250px",
                    sm: "350px",
                    md: "400px",
                    xl: "450px!important",
                    "2xl": "600px!important",
                  }}
                  boxShadow="0 0 10px 0 rgba(0,0,0,0.3)"
                  bg="var(--primary-background-color)"
                  borderRadius="10px"
                  pos="relative"
                >
                  <Player />
                </GridItem>

                <GridItem
                  colSpan={{ base: 6, xl: 2 }}
                  h={{
                    base: "250px",
                    sm: "300px",
                    md: "350px",
                    lg: "450px",
                    "2xl": "600px",
                  }}
                  overflowY="scroll"
                  boxShadow="0 0 10px 0 rgba(0,0,0,0.3)"
                  bg="var(--primary-background-color)"
                  borderRadius="10px"
                  width={{ base: "220px", md: "50%", lg: "100%" }}
                  transition="all ease 0.25s"
                >
                  <Box
                    width="100%"
                    bg="transparent"
                    display="flex"
                    alignItems="center"
                    justifyContent="start"
                  >
                    {/* Season box */}
                    <Box width="100%">
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        gap="0 10px"
                        cursor="pointer"
                        pos="relative"
                        height="60px"
                        ps="20px"
                      >
                        <Text
                          color="var(--text-color)"
                          fontSize="17.58px"
                          lineHeight="24px"
                        >
                          Season
                        </Text>
                        <ChevronDownIcon
                          h="18px"
                          w="18px"
                          color="var(--text-color)"
                        />
                      </Box>

                      <Box
                        display={{ base: "flex" }}
                        flexDir={{ base: "column" }}
                        pos="relative"
                        alignItems="flex-start"
                      >
                        {/* Show Loading State */}
                        {epLoading && <Loading bg="none" />}

                        {/* Show Error State */}
                        {!epLoading && epError && (
                          <Error
                            bg=""
                            msg="Error loading episodes, please try again."
                          />
                        )}

                        {/* Show Episodes or Fallback Error */}
                        {!epLoading && !epError && (
                          <>
                            {episodes && episodes.length > 0 ? (
                              episodes.map(
                                ({
                                  number: epNo,
                                  episodeId: epId,
                                  title: epTitle,
                                }) => (
                                  <Link
                                    key={epId}
                                    to={`/watch/${epId}`}
                                    style={{ textDecoration: "none" }}
                                    className={
                                      `${location.pathname}${location.search}` ===
                                      `/watch/${epId}`
                                        ? "episode active"
                                        : "episode"
                                    }
                                  >
                                    {`Episode ${epNo} - ${epTitle}`}
                                  </Link>
                                )
                              )
                            ) : (
                              <Error bg="none" msg="No episodes available." />
                            )}
                          </>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </GridItem>
                {/* Anime Dets / Servers / Downlaod */}
                <GridItem
                  colSpan="6"
                  boxShadow="0 0 10px 0 rgba(0,0,0,0.3)"
                  bg="var(--primary-background-color)"
                  borderRadius="10px"
                  transition="all ease 0.25s"
                  p="20px"
                  w="100%"
                  display={{ base: "grid", xl: "flex" }}
                  gridTemplateColumns="repeat(12, 1fr)"
                  justifyContent={{ base: "initial", xl: "space-between" }}
                  gap={{ base: "20px 0", md: "20px 20px", lg: "20px 40px" }}
                >
                  {/* Anime Details */}
                  <GridItem
                    colSpan={{ base: "12", lg: "6", xl: "3" }}
                    width={{ base: "initial", xl: "30%" }}
                    textAlign={{ base: "center", md: "start" }}
                  >
                    <Text
                      color="var(--text-color)"
                      fontSize="15.38px"
                      lineHeight="24px"
                      letterSpacing="0.5px"
                    >
                      You&apos;re watching{" "}
                      <Text as="span" color="var(--accent-color)">
                        Episode 1.
                      </Text>
                    </Text>
                    <Text
                      fontSize="15.38px"
                      lineHeight="24px"
                      letterSpacing="0.5px"
                      color="var(--text-color)"
                    >
                      If current servers dosen&apos;t work, please try other
                      servers.
                    </Text>
                  </GridItem>
                  {/* Anime Servers (DUB & SUB) */}
                  <GridItem
                    borderLeft={{ base: "none", md: "1px solid #616161" }}
                    padding="0 20px"
                    display="flex"
                    flexDir="column"
                    gap="15px 0"
                    colSpan={{ base: "12", lg: "6", xl: "5" }}
                    width={{ base: "initial", xl: "50%" }}
                  >
                    {/* Sub */}
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent={{ base: "center", md: "start" }}
                      flexDir={{ base: "column", md: "row" }}
                      gap={{ base: "10px 0", md: "0 10px" }}
                    >
                      <Text
                        color="var(--accent-color)"
                        letterSpacing="0.5px"
                        lineHeight="24px"
                      >
                        SUB
                      </Text>
                      <Flex
                        gap={{ base: "10px", md: "10px" }}
                        flexWrap="wrap"
                        justifyContent={{ base: "center", md: "start" }}
                      >
                        <Link
                          className={
                            location.pathname == `/watch/${watchId}`
                              ? "server active"
                              : "server"
                          }
                          // onClick={handleSub}
                        >
                          Server 1
                        </Link>
                        <Link className="server">Server 1</Link>
                        <Link className="server">Server 1</Link>
                        <Link className="server">Server 1</Link>
                      </Flex>
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent={{ base: "center", md: "start" }}
                      flexDir={{ base: "column", md: "row" }}
                      gap={{ base: "10px 0", md: "0 10px" }}
                    >
                      <Text
                        color="var(--text-color)"
                        letterSpacing="0.5px"
                        lineHeight="24px"
                      >
                        DUB
                      </Text>
                      <Flex
                        gap={{ base: "10px", md: "10px" }}
                        flexWrap="wrap"
                        justifyContent={{ base: "center", md: "start" }}
                      >
                        <Link
                          className={
                            location.pathname == `/watch/${watchId}`
                              ? "server active"
                              : "server"
                          }
                          // onClick={handleDub}
                        >
                          Server 1
                        </Link>
                        <Link className="server">Server 1</Link>
                        <Link className="server">Server 1</Link>
                        <Link className="server">Server 1</Link>
                      </Flex>
                    </Box>
                  </GridItem>

                  {/* Anime Download */}
                  <GridItem
                    display="flex"
                    flexDir={{ base: "column", sm: "row", lg: "column" }}
                    gap={{ base: "10px 0", sm: "0 10px", lg: "10px 0" }}
                    alignItems={{ base: "center", lg: "start" }}
                    justifyContent={{ base: "center", md: "start" }}
                    colSpan={{ base: "12", lg: "12", xl: "3" }}
                    mt={{ base: "20px", md: "0" }}
                    width={{ base: "initial" }}
                  >
                    {/* <a
                      className="downloadBtn"
                      href={`${downloadUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        pointerEvents: downloadLoading
                          ? "none"
                          : downloadError
                          ? "none"
                          : "visible",
                        border: downloadLoading
                          ? "2px solid var(--text-color)"
                          : downloadError
                          ? "2px solid var(--text-color)"
                          : "2px solid var(--secondary-color)",
                        display: downloadLoading
                          ? "none"
                          : downloadError
                          ? "none"
                          : "flex",
                      }}
                    >
                      {downloadLoading
                        ? "Loading..."
                        : downloadError
                        ? "Error Loading..."
                        : "Download Now"}
                    </a> */}
                    <Text
                      fontSize={{ base: "15.58px", "2xl": "24.41px" }}
                      lineHeight={{ base: "28.8px", "2xl": "37.5px" }}
                      letterSpacing="0.5px"
                      color="var(--text-color)"
                      textTransform="uppercase"
                    >
                      {" "}
                      Rating: 7.8 /10
                    </Text>
                  </GridItem>
                </GridItem>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Stream;
