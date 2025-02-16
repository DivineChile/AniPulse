import {
  Link as ChakraLink,
  GridItem,
  Box,
  Image,
  Text,
  Icon,
  Skeleton,
  SkeletonText,
  HStack,
  Flex,
  Grid,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { BsInfoCircle } from "react-icons/bs";
import Error from "../ErrorPage/Error";

const Recents = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subAnimeData, setSubAnimeData] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const proxy = "https://fluoridated-recondite-coast.glitch.me/";
  const backupApi = "https://aniwatch-api-gamma-wheat.vercel.app/";

  const fetchRecentReleaseAnime = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${proxy}${backupApi}/api/v2/hianime/category/recently-updated`
      );
      const data = await response.json();
      setSubAnimeData(data.data.animes);
    } catch (err) {
      setError("Failed to load data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentReleaseAnime();
  }, []);

  const displayedAnime = showAll
    ? subAnimeData
    : subAnimeData.slice(0, Math.min(8, subAnimeData.length));

  if (error) {
    return <Error msg={error} pos="absolute" />;
  }

  return (
    <Box>
      <Grid
        gridTemplateColumns={{
          base: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={{ base: "20px 20px", sm: "20px", md: "40px 25px" }}
        position="relative"
      >
        {isLoading
          ? [...Array(8)].map((_, index) => (
              <GridItem key={index}>
                <Skeleton
                  h={{
                    base: "216px",
                    sm: "290.23px",
                    md: "350px",
                    lg: "360px",
                    "2xl": "408.19px",
                  }}
                  w="100%"
                  borderRadius="10px"
                />
                <HStack mt="10px">
                  <Skeleton h="20px" w="50px" />
                  <Skeleton h="20px" w="50px" />
                </HStack>
                <SkeletonText noOfLines={2} spacing={2} my="10px" />
              </GridItem>
            ))
          : displayedAnime.map((item) => {
              const epLength =
                item.name.length > 30
                  ? `${item.name.slice(0, 30)}...`
                  : item.name;
              return (
                <GridItem key={item.id} w="100%">
                  <Box
                    as={ReactRouterLink}
                    to={`/anime/${item.id}`}
                    pos="relative"
                    overflow="hidden"
                    display="block"
                    className="episode-container"
                    h={{
                      base: "216px",
                      sm: "290.23px",
                      md: "350px",
                      lg: "360px",
                      "2xl": "408.19px",
                    }}
                    borderRadius="10px"
                    transition="opacity 0.5s"
                  >
                    {/* Anime Image */}
                    <Image
                      src={item.poster}
                      w="100%"
                      bg="#191919"
                      borderRadius="10px"
                      transition="transform 0.7s ease-in-out"
                      h="100%"
                      className="thumbnail"
                    />

                    {/* Overlay */}
                    <Box
                      className="overlay"
                      pos="absolute"
                      top="0"
                      left="0"
                      textAlign="center"
                      background="rgba(0, 0, 0, 0.7)"
                      transition="height 0.7s ease, opacity 0.7s ease"
                      h="0"
                      w="100%"
                      borderRadius="10px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      opacity="0"
                    >
                      <ChakraLink
                        as={ReactRouterLink}
                        to={`/anime/${item.id}`}
                        color="var(--text-color)"
                        _hover={{
                          color: "var(--accent-color)",
                          transition: "all ease 0.25s",
                        }}
                        fontSize={{base: "15px", sm: "18.88px"}}
                        lineHeight="36px"
                        letterSpacing="0.5px"
                        fontWeight="500"
                        className="playNowBtn"
                        display="flex"
                        alignItems="center"
                        gap="8px"
                      >
                        <Icon
                          as={BsInfoCircle}
                          color="var(--text-color)"
                          transition="all ease 0.25s"
                          className="playIcon"
                          h={{base:"20px", "2xl": "40px"}}
                          w={{base:"20px", "2xl": "40px"}}
                        />
                        View Anime
                      </ChakraLink>
                    </Box>
                  </Box>

                  {/* Anime Info */}
                  <Box
                    display="flex"
                    flexDir="column"
                    alignItems="flex-start"
                    mt="10px"
                  >
                    <Flex gap="10px" mt="5px" mb="10px">
                      <Text
                        as="span"
                        color="var(--text-color)"
                        cursor="pointer"
                        p={{base: "0px 6px", lg: "3px 10px"}}
                        transition="all ease 0.25s"
                        _hover={{
                          color: "var(--background-color)",
                          bgColor: "var(--accent-color)",
                          borderColor: "var(--accent-color)"
                        }}
                        borderRadius="8px"
                        border={{base: "1px solid var(--text-color)", md: "2px solid var(--text-color)"}}
                        fontSize={{ base: "12.63px", md: "14.63px" }}
                        lineHeight="24px"
                        letterSpacing="0.5px"
                        textTransform="uppercase"
                      >
                        SUB {item.episodes.sub ? item.episodes.sub : "N/A"}
                      </Text>
                      <Text
                        as="span"
                        color="var(--text-color)"
                        cursor="pointer"
                        p={{base: "0px 6px", lg: "3px 10px"}}
                        transition="all ease 0.25s"
                        _hover={{
                          color: "var(--background-color)",
                          bgColor: "var(--accent-color)",
                          borderColor: "var(--accent-color)"
                        }}
                        borderRadius="8px"
                        border={{base: "1px solid var(--text-color)", md: "2px solid var(--text-color)"}}
                        fontSize={{ base: "12.63px", md: "14.63px" }}
                        lineHeight="24px"
                        letterSpacing="0.5px"
                        textTransform="uppercase"
                      >
                        DUB {item.episodes.dub ? item.episodes.dub : "N/A"}
                      </Text>
                      <Text
                        as="span"
                        color="var(--text-color)"
                        cursor="pointer"
                        hideBelow="sm"
                        p={{base: "0px 6px", lg: "3px 10px"}}
                        transition="all ease 0.25s"
                        _hover={{
                          color: "var(--accent-color)",
                        }}
                        fontSize={{ base: "12.63px", md: "14.63px" }}
                        lineHeight="24px"
                        letterSpacing="0.5px"
                        textTransform="uppercase"
                      >
                        {item.type && item.type}
                      </Text>
                    </Flex>
                    <ChakraLink
                      as={ReactRouterLink}
                      to={`/anime/${item.id}`}
                      _hover={{ textDecor: "none" }}
                    >
                      <Text
                        as="p"
                        fontSize={{
                          base: "17px",
                          sm: "19px",
                          lg: "20px",
                          "2xl": "22.88px",
                        }}
                        lineHeight="26px"
                        letterSpacing="0.5px"
                        fontWeight="500"
                        textAlign="start"
                        color="var(--text-color)"
                        transition="all ease 0.25s"
                        _hover={{ color: "var(--accent-color)" }}
                      >
                        {epLength}
                      </Text>
                    </ChakraLink>
                  </Box>
                </GridItem>
              );
            })}
      </Grid>
      <>
        {/* Show All / Show Less Button */}
        {subAnimeData.length > 8 && (
          <ChakraLink
            as="button"
            onClick={() => setShowAll((prev) => !prev)}
            color="var(--text-color)"
            fontSize={{
              base: "15px",
              md: "17px",
              lg: "19px",
              "2xl": "22.96px",
            }}
            border="1px solid var(--secondary-color)"
            borderRadius="5px"
            padding="5px 15px"
            transition="all ease 0.25s"
            width={{ base: "100%", md: "fit-content" }}
            _hover={{
              textDecor: "none",
              color: "var(--background-color)",
              background: "var(--accent-color)",
              border: "none",
            }}
            pos="relative"
            m="20px auto 0"
          >
            {showAll ? "Show Less" : "Show All"}
          </ChakraLink>
        )}
      </>
    </Box>
  );
};

export default Recents;
