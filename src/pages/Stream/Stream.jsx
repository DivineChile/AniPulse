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
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Error from "../../components/ErrorPage/Error";
import { ChevronDownIcon } from "@chakra-ui/icons";

import "./style.css";
import Hls from "hls.js";
import Artplayer from "artplayer";

const Stream = () => {
  const navigate = useNavigate();
  const { coverImg, watchId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [epLoading, setEpLoading] = useState(true);
  const [error, setError] = useState(null);
  const [epError, setEpError] = useState(null);
  const [episodeId, setEpisodeId] = useState([]);
  const [episodeData, setEpisodeData] = useState([]);
  const [newAnimeNum, setNewAnimeNum] = useState("");
  const [currentEpNum, setCurrentEpNum] = useState("");
  const [onPlay, setOnPlay] = useState(false);
  const [videoData, setVideoData] = useState([]);
  const [animeTitle, setAnimeTitle] = useState("");

  const location = useLocation();
  const artRef = useRef();
  let newAnimeId = null;
  let newAnimeIdVal = "";
  let currentEp = null;
  const num = watchId.split("-").splice(-2);
  if (isNaN(parseInt(num[0]))) {
    currentEp = num[1];
    newAnimeId = watchId.split("-").slice(0, -2);
    newAnimeIdVal = newAnimeId.join("-");
  } else {
    currentEp = `${num[0]}.${num[1]}`;
    newAnimeId = watchId.split("-").slice(0, -3);
    newAnimeIdVal = newAnimeId.join("-");
  }

  // Logic to extract season Number
  const containsStNdRdTh = newAnimeId.some((item) =>
    /^\d{1,2}(st|nd|rd|th)$/.test(item)
  );
  const containsNoTh = newAnimeId.some((item) => /^\d{1,2}$/.test(item));

  let extractedNumbersStNdRdTh = [];
  let extractedNumbersNoTh = [];

  if (containsStNdRdTh) {
    extractedNumbersStNdRdTh = newAnimeId
      .filter((item) => /^\d{1,2}(st|nd|rd|th)$/.test(item))
      .map((item) => parseInt(item, 10));
  }

  if (containsNoTh) {
    extractedNumbersNoTh = newAnimeId
      .filter((item) => /^\d{1,2}$/.test(item))
      .map((item) => parseInt(item, 10));
  }

  // Fetch Anime Episodes
  const fetchEpisodes = async (animeId) => {
    setEpLoading(true);
    try {
      const responseEp = await fetch(
        `https://api-amvstrm.nyt92.eu.org/api/v1/episode/${animeId}`
      );
      const dataEp = await responseEp.json();
      setEpisodeData(dataEp.episodes.map((item) => item));
      setEpisodeId(dataEp.episodes.map((item) => item.id));

      setEpLoading(false);
    } catch {
      setEpError(true);
      setEpLoading(false);
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
      // setVideoPlyr(dataVideo.nspl.main);
      setCurrentEpNum(dataVideo.info.episode);
      setAnimeTitle(
        `${dataVideo.info.title} Episode ${dataVideo.info.episode}`
      );
      document.title = `${dataVideo.info.title} Episode ${dataVideo.info.episode} - AniPulse`;
      setLoading(false);
      setError(false);
    } catch (error) {
      setError(true);
      setIsLoading(false);
    }
  };

  const handleSub = () => {
    newAnimeIdVal.split("-").pop();
    const newAnimeIdSub = newAnimeId.join("-");
    setNewAnimeNum(newAnimeIdSub);
    fetchEpisodes(newAnimeIdSub);
  };

  const handleDub = () => {
    const newAnimeIdDub = `${newAnimeIdVal}-dub`;
    setNewAnimeNum(newAnimeIdDub);
    fetchEpisodes(newAnimeIdDub);
  };

  useEffect(() => {
    fetchEpisodes(newAnimeIdVal);
    fetchVideos();
  }, [newAnimeIdVal]);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  // Update video URL based on the current location (pathname)
  const fetchNewVideoUrl = async (episodeName) => {
    setLoading(true);
    try {
      const responseVideo = await fetch(
        `https://api-amvstrm.nyt92.eu.org/api/v2/stream/${episodeName}`
      );
      const dataVideo = await responseVideo.json();
      const data = dataVideo;
      setCurrentUrl(data.stream.multi.main.url);
      // setVideoPlyr(data.nspl.main);
      setAnimeTitle(
        `${dataVideo.info.title} Episode ${dataVideo.info.episode}`
      );
      document.title = `${dataVideo.info.title} Episode ${dataVideo.info.episode} - AniPulse`;
      setLoading(false);
    } catch {
      setErr(true);
      setLoading(false);
    }
  };

  const updateVideoUrl = () => {
    const episodeName = location.pathname.split("/").pop(); // Extract episode name from the URL
    fetchNewVideoUrl(episodeName);
  };

  // Call updateVideoUrl when the component mounts and when the location changes
  useEffect(() => {
    updateVideoUrl();
  }, [location.pathname]);

  // console.log(videoData.stream.multi.main.url);
  const [downloadLoading, setDownloadLoading] = useState(true);
  const [downloadError, setDownloadError] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState("");
  useEffect(() => {
    const downloadEpisode = async () => {
      try {
        const downloadRes = await fetch(
          `https://api-amvstrm.nyt92.eu.org/api/v1/download/${watchId}`
        );
        const downloadData = await downloadRes.json();
        setDownloadUrl(downloadData.download);
        setDownloadLoading(false);
        setDownloadError(false);
      } catch {
        setDownloadError(true);
        setDownloadLoading(false);
      }
    };

    downloadEpisode();
  });

  //Player loader
  useEffect(() => {
    function playM3u8(video, url, art) {
      if (Hls.isSupported()) {
        if (art.hls) art.hls.destroy();
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
        art.hls = hls;
        art.on("destroy", () => hls.destroy());
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = url;
      } else {
        art.notice.show = "Unsupported playback format: m3u8";
      }
    }

    const art = new Artplayer({
      container: artRef.current,
      url: currentUrl,
      type: "m3u8",
      customType: {
        m3u8: playM3u8,
      },
      moreVideoAttr: {
        crossOrigin: "anonymous",
      },
      playsInline: true,
      theme: "var(--accent-color)",
      volume: 0.5,
      isLive: false,
      muted: false,
      autoplay: false,
      pip: true,
      autoMini: true,
      screenshot: true,
      setting: true,
      loop: true,
      flip: true,
      playbackRate: true,
      aspectRatio: true,
      fullscreen: true,
      fullscreenWeb: true,
      subtitleOffset: true,
      miniProgressBar: true,
      mutex: true,
      backdrop: true,
      autoPlayback: true,
      airplay: true,
      poster: coverImg,
    });

    // art.on("ready", () => {
    //   console.info(art.hls);
    // });

    return () => {
      if (art && art.destroy) {
        art.destroy(false);
      }
    };
  }, [currentUrl, coverImg]);

  return (
    <Box>
      <Navbar />
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
              <BreadcrumbLink>{`Stream / ${animeTitle}`}</BreadcrumbLink>
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
                    base: onPlay ? "100%" : "250px",
                    sm: onPlay ? "100%" : "350px",
                    md: onPlay ? "100%" : "400px",
                    xl: "450px!important",
                    "2xl": "600px!important",
                  }}
                  boxShadow="0 0 10px 0 rgba(0,0,0,0.3)"
                  borderRadius="10px"
                  pos="relative"
                >
                  <div
                    ref={artRef}
                    style={{ width: "100%", height: "100%" }}
                  ></div>
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
                      {extractedNumbersStNdRdTh[0] == undefined ? (
                        <></>
                      ) : (
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
                            Season {`${extractedNumbersStNdRdTh[0]}`}
                          </Text>
                          <ChevronDownIcon
                            h="18px"
                            w="18px"
                            color="var(--text-color)"
                          />
                        </Box>
                      )}
                      {extractedNumbersNoTh[0] == undefined ? (
                        <></>
                      ) : (
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
                            Season {`${extractedNumbersNoTh[0]}`}
                          </Text>
                          <ChevronDownIcon
                            h="18px"
                            w="18px"
                            color="var(--text-color)"
                          />
                        </Box>
                      )}

                      <Box
                        display={{ base: "flex" }}
                        flexDir={{ base: "column" }}
                        pos="relative"
                      >
                        {epLoading && (
                          <Error
                            loadingState={epLoading}
                            width="100%"
                            height="100%"
                            pos="relative"
                            top="0"
                            left="0"
                            bg="transparent"
                            spinnerH={{ base: "50px" }}
                            spinnerW={{ base: "50px" }}
                          />
                        )}
                        {epError && (
                          <Error
                            error={epError}
                            msg="Still Working..."
                            width="100%"
                            height="100%"
                            pos="absolute"
                            top={{ base: "10px", sm: "80px" }}
                            left="0"
                            bg="#191919"
                            spinnerH={{ base: "50px" }}
                            spinnerW={{ base: "50px" }}
                          />
                        )}

                        {(() => {
                          const elements = [];

                          for (let i = 0; i < episodeData.length; i++) {
                            const item = episodeData[i];

                            const epArray = item.id.split("-");
                            const lastItems = epArray.splice(-2);

                            let newItemID = "";

                            if (lastItems[0]?.length > 1) {
                              newItemID = `Episode ${lastItems.pop()}`;
                            } else {
                              newItemID = `Episode ${lastItems[0]}.5`;
                            }

                            // Use item properties in JSX
                            elements.push(
                              <Link
                                key={item[i]}
                                to={`/watch/${encodeURIComponent(coverImg)}/${
                                  item.id
                                }`}
                                // onClick={() => handleEpisodeClick(item.id)}
                                className={
                                  location.pathname ==
                                  `/watch/${encodeURIComponent(coverImg)}/${
                                    item.id
                                  }`
                                    ? "episode active"
                                    : "episode"
                                }
                              >
                                {newItemID}
                              </Link>
                            );
                          }

                          return elements;
                        })()}
                      </Box>
                    </Box>
                  </Box>
                </GridItem>
                {/* Anime Dets / Servers / Downlaod */}
                <GridItem
                  colSpan="6"
                  boxShadow="0 0 10px 0 rgba(0,0,0,0.3)"
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
                        Episode {currentEp}.
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
                            location.pathname ==
                            `/watch/${encodeURIComponent(coverImg)}/${watchId}`
                              ? "server active"
                              : "server"
                          }
                          onClick={handleSub}
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
                            location.pathname ==
                            `/watch/${encodeURIComponent(coverImg)}/${watchId}`
                              ? "server active"
                              : "server"
                          }
                          onClick={handleDub}
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
                    <a
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
                    </a>
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
