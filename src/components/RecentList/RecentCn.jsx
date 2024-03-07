import {
  Link as ChakraLink,
  GridItem,
  Box,
  Image,
  Text,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { useState, useEffect } from "react";
import Error from "../ErrorPage/Error";
import "./style.css";

const RecentCn = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cnAnimeData, setCnAimeData] = useState(null);
  const [cnAnimeTitle, setCnAnimeTitle] = useState([]);
  const [cnAnimeImg, setCnAnimeImg] = useState([]);
  const [cnAnimeEp, setCnAnimeEp] = useState(undefined);
  const [cnAnimeEpId, setCnAnimeEpId] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const recentAnime = [];

  useEffect(() => {
    // Fecth Subbed Anime
    const fetchRecentReleaseAnime = async () => {
      try {
        //Subbed Api
        const responseCn = await fetch(
          "https://api-amvstrm.nyt92.eu.org/api/v1/recentepisode/cn"
        );

        if (responseCn.ok) {
          const cnData = await responseCn.json();
          setCnAimeData(cnData.results.map((item) => item));
          setCnAnimeEpId(cnAnimeData.map((item) => item.episode_id));
          setCnAnimeImg(cnAnimeData.map((item) => item.image_url));
          setCnAnimeTitle(cnAnimeData.map((item) => item.title));
          setCnAnimeEp(cnAnimeData.map((item) => item.episode));
          setIsLoading(false);
          setError(false);
        } else {
          setIsLoading(false);
          setError(true);
        }
      } catch (error) {
        setError(true);
        setIsLoading(false);
      }
    };
    // Fetch Dubbed Anime
    fetchRecentReleaseAnime();
  }, [cnAnimeData]);

  const endIndex = showAll ? cnAnimeData.length : 8;

  isLoading &&
    recentAnime.push(
      <Error
        // msg="Still Loading"
        loadingState={isLoading}
        height="100%"
        width="100%"
        // error={err}
        pos="absolute"
        top="0"
        left="0"
        bg="#191919"
        spinnerH={{ base: "50px", md: "60px", lg: "70px" }}
        spinnerW={{ base: "50px", md: "80px", lg: "70px" }}
      />
    );

  error &&
    recentAnime.push(
      <Error
        msg=""
        height="100%"
        width="100%"
        error={error}
        pos="absolute"
        top="0"
        left="0"
        bg="var(--primary-background-color)"
        spinnerH={{ base: "50px", md: "80px", lg: "100px" }}
        spinnerW={{ base: "50px", md: "80px", lg: "100px" }}
      />
    );

  for (let i = 0; i < endIndex; i++) {
    const epLength =
      cnAnimeTitle[i]?.length > 30
        ? `${cnAnimeTitle[i].slice(0, 30)}...`
        : cnAnimeTitle[i];

    cnAnimeData === null
      ? recentAnime.push(<></>)
      : recentAnime.push(
          <GridItem w={{ base: "100%" }} key={cnAnimeEpId[i]}>
            <Box
              as={ReactRouterLink}
              pos="relative"
              to={`/watch/${encodeURIComponent(cnAnimeImg[i])}/${
                cnAnimeEpId[i]
              }`}
              overflow="hidden!important"
              className={`episode-container ${isHovered ? "hovered" : ""}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              h={{
                base: "400.23px",
                sm: "380.23px",
                md: "350px",
                lg: "360px",
                "2xl": "408.19px",
              }}
              display="flex"
              borderRadius="10px"
              transition="opacity 0.5s"
            >
              {/* Anime Img */}
              <Image
                src={cnAnimeImg[i]}
                w="100%"
                bg="#191919"
                borderRadius="10px"
                transition="transform 0.7s ease-in-out"
                h="100%"
                className="thumbnail"
              />

              {/* Overlay */}
              {isHovered && (
                <Box
                  className="overlay"
                  pos="absolute"
                  top="100%"
                  left="0"
                  textAlign="center"
                  background="rgba(0, 0, 0, 0.7)!important"
                  transition="transform 0.7s, opacity 0.7s"
                  h="100%"
                  w="100%"
                  borderRadius="10px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <ChakraLink
                    as={ReactRouterLink}
                    to={`/watch/${encodeURIComponent(cnAnimeImg[i])}/${
                      cnAnimeEpId[i]
                    }`}
                    color="var(--link-color)"
                    _hover={{
                      color: "var(--link-color)",
                      transition: "all ease 0.25s",
                    }}
                    fontSize="22.88px"
                    lineHeight="36px"
                    letterSpacing="0.5px"
                    fontWeight="500"
                  >
                    Play Now
                  </ChakraLink>
                </Box>
              )}
            </Box>
            <Box
              display="flex"
              flexDir="column"
              alignItems={{ base: "flex-start" }}
              mt="10px"
            >
              <Text
                as="p"
                color="var(--text-color)"
                fontSize={{ base: "15.91px", md: "17.97px" }}
                lineHeight="24px"
                letterSpacing="0.5px"
              >
                {cnAnimeEp === undefined
                  ? "Loading..."
                  : `Episode ${cnAnimeEp[i]}`}
              </Text>
              <ChakraLink
                as={ReactRouterLink}
                _hover={{ textDecor: "none" }}
                to={`/watch/${encodeURIComponent(cnAnimeImg[i])}/${
                  cnAnimeEpId[i]
                }`}
              >
                {/* Anime Name */}
                <Text
                  as="p"
                  fontSize={{
                    base: "17px",
                    sm: "19px",
                    lg: "20px",
                    "2xl": "22.88px",
                  }}
                  lineHeight="26px"
                  // mt="5px"
                  letterSpacing="0.5px"
                  fontWeight="500"
                  textAlign={{ base: "start" }}
                  color="var(--link-color)"
                  transition="all ease 0.25s"
                  _hover={{ color: "var(--link-hover-color)" }}
                >
                  {epLength}
                </Text>
              </ChakraLink>
            </Box>
          </GridItem>
        );
  }

  const showAllLink = cnAnimeData?.length > 10;

  const handleShowAllClick = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };

  const buttonText = showAll ? "Show Less" : "Show All";

  if (showAllLink) {
    recentAnime.push(
      <ChakraLink
        as="button"
        onClick={handleShowAllClick}
        key="showMore"
        color="var(--text-color)"
        fontSize={{ base: "15px", md: "17px", lg: "19px", "2xl": "22.96px" }}
        border="1px solid var(--secondary-color)"
        borderRadius="5px"
        padding="5px 15px"
        transition="all ease 0.25s"
        width={{ base: "100%", md: "initial" }}
        _hover={{
          textDecor: "none",
          color: "var(--background-color)",
          background: "var(--accent-color)",
          border: "none",
        }}
        pos={{ base: "initial", md: "absolute" }}
        right="0"
        bottom="-100px"
      >
        {buttonText}
      </ChakraLink>
    );
  }

  return recentAnime;
};

export default RecentCn;
