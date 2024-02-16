import {
  Link as ChakraLink,
  GridItem,
  Box,
  Image,
  Text,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { useState, useEffect } from "react";
import "./style.css";

const Recents = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subAnimeData, setSubAimeData] = useState(null);
  const [subAnimeTitle, setSubAnimeTitle] = useState([]);
  const [subAnimeImg, setSubAnimeImg] = useState([]);
  const [subAnimeEp, setSubAnimeEp] = useState(undefined);
  const [subAnimeEpId, setSubAnimeEpId] = useState([]);

  const [showAll, setShowAll] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const recentAnime = [];

  useEffect(() => {
    // Fecth Subbed Anime
    const fetchRecentReleaseAnime = async () => {
      try {
        //Subbed Api
        const responseSub = await fetch(
          "https://api-amvstrm.nyt92.eu.org/api/v1/recentepisode/sub"
        );

        if (!responseSub.ok) {
          setError("Please Check Connection");
          setIsLoading(false);
        }
        const subData = await responseSub.json();
        setSubAimeData(subData.results.map((item) => item));
        setSubAnimeEpId(subAnimeData.map((item) => item.episode_id));
        setSubAnimeImg(subAnimeData.map((item) => item.image_url));
        setSubAnimeTitle(subAnimeData.map((item) => item.title));
        setSubAnimeEp(subAnimeData.map((item) => item.episode));
        setIsLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setIsLoading(false);
      }
    };
    // Fetch Dubbed Anime
    fetchRecentReleaseAnime();
  }, [subAnimeData]);

  const endIndex = showAll ? subAnimeData.length : 10;
  console.log(subAnimeData);

  for (let i = 0; i < endIndex; i++) {
    const epLength =
      subAnimeTitle[i]?.length > 30
        ? `${subAnimeTitle[i].slice(0, 30)}...`
        : subAnimeTitle[i];

    subAnimeData === null
      ? recentAnime.push(<Text color="--text-color">Loading...</Text>)
      : recentAnime.push(
          <GridItem w={{ base: "100%" }} key={subAnimeEpId[i]}>
            <Box
              as={ReactRouterLink}
              pos="relative"
              overflow="hidden!important"
              className={`episode-container ${isHovered ? "hovered" : ""}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              h={{
                base: "400.23px",
                sm: "380.23px",
                md: "350px",
                lg: "380px",
                "2xl": "408.19px",
              }}
              display="flex"
              borderRadius="10px"
              transition="opacity 0.5s"
            >
              {/* Anime Img */}
              <Image
                src={subAnimeImg[i]}
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
                  background="rgba(25, 27, 40, 0.7)!important"
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
                    to={`/watch/${subAnimeEpId[i]}`}
                    color="var(--text-color)"
                    _hover={{
                      color: "var(--secondary-accent-color)",
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
              alignItems={{ base: "flex-start", md: "center" }}
              mt="10px"
            >
              <Text
                as="p"
                color="var(--text-color)"
                fontSize={{ base: "15.91px", md: "17.97px" }}
                lineHeight="24px"
                letterSpacing="0.5px"
              >
                {subAnimeEp === undefined
                  ? "Loading..."
                  : `Episode ${subAnimeEp[i]}`}
              </Text>
              <ChakraLink
                as={ReactRouterLink}
                _hover={{ textDecor: "none" }}
                to={`/watch/${subAnimeEpId[i]}`}
              >
                {/* Anime Name */}
                <Text
                  as="p"
                  fontSize={{
                    base: "17px",
                    sm: "19px",
                    md: "21px",
                    lg: "22.88px",
                  }}
                  lineHeight="26px"
                  mt="5px"
                  letterSpacing="0.5px"
                  fontWeight="500"
                  textAlign={{ base: "start", md: "center" }}
                  color="var(--text-color)"
                  transition="all ease 0.25s"
                  _hover={{ color: "var(--secondary-accent-color)" }}
                >
                  {epLength}
                </Text>
              </ChakraLink>
            </Box>
          </GridItem>
        );
  }

  const showAllLink = subAnimeData?.length > 10;

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
        fontSize={{ base: "15px", md: "20px", lg: "22.96px" }}
        border="3px solid var(--secondary-accent-color)"
        borderRadius="5px"
        padding="5px 15px"
        transition="all ease 0.25s"
        width={{ base: "100%", md: "initial" }}
        _hover={{
          textDecor: "none",
          color: "var(--text-color)",
          background: "var(--secondary-accent-color)",
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

export default Recents;
