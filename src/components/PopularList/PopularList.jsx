import {
  Box,
  Heading,
  Grid,
  GridItem,
  Image,
  Text,
  Link as ChakraLink,
  Flex,
  Icon,
  Skeleton,
  SkeletonText,
  HStack,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import Error from "../ErrorPage/Error";
import "./style.css";
import { useEffect, useState } from "react";

import { BsInfoCircle } from "react-icons/bs";
import Loading from "../ErrorPage/Loading";

const PopularList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);

  const api = "https://consumet-api-puce.vercel.app/";
  const backup_api = "https://aniwatch-api-production-68fd.up.railway.app/";
  const proxy = "https://fluoridated-recondite-coast.glitch.me/";

  const fetchPopularAnimes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${proxy}${backup_api}/api/v2/hianime/category/most-popular`
      );
      const data = await response.json();
      setResults(data.data.animes);
    } catch (err) {
      setError("Failed to load data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularAnimes();
  }, []);

  const truncatedResults = results.length > 4 ? results.slice(0, 4) : results;

  return (
    <Box bg="var(--primary-background-color)" pt="60px" pb="80px">
      <Box
        maxW={{
          base: "90%",
          sm: "95%",
          xl: "85%",
          "2xl": "container.xl",
        }}
        margin="auto"
      >
        <Box>
          <Heading
            textTransform="uppercase"
            color="var(--text-color)"
            fontSize={{ base: "27.59px", lg: "32px", "2xl": "37.97px" }}
            fontWeight="600"
            lineHeight={{ base: "33px", lg: "38px", "2xl": "44px" }}
            letterSpacing="1.5px"
            fontFamily="var(--font-family)"
            textAlign={{ base: "center", md: "start" }}
          >
            Popular Anime
          </Heading>
        </Box>

        <Box my="30px">
          <Grid
            display={{ base: "grid", md: "grid", xl: "flex" }}
            justifyContent="space-between"
            justifyItems="center"
            gridTemplateColumns={{
              base: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
              "2xl": "repeat(5, 1fr)",
            }}
            gap={{ base: "20px 20px", sm: "20px", md: "40px 25px" }}
            pos="relative"
          >
            {isLoading &&
              [...Array(4)].map((_, index) => (
                <GridItem key={index} w="100%">
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
              ))}
            {error && <Error msg={error} pos="absolute" />}
            {truncatedResults.map((item, index) => {
              const nameLength =
                item.name.length > 30
                  ? `${item.name.slice(0, 26)}...`
                  : item.name;
              return (
                <GridItem w={{ base: "100%" }} key={item.id}>
                  <Box
                    as={ReactRouterLink}
                    to={`/anime/${item.id}`}
                    pos="relative"
                    overflow="hidden!important"
                    className={`episode-container`}
                    h={{
                      base: "216px",
                      sm: "290.23px",
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
                      background="rgba(0, 0, 0, 0.7)!important"
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
                  <Box
                    display="flex"
                    flexDir="column"
                    alignItems={{ base: "flex-start" }}
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
                        hideBelow="sm"
                        cursor="pointer"
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
                        {item.type}
                      </Text>
                    </Flex>
                    <ChakraLink
                      as={ReactRouterLink}
                      _hover={{ textDecor: "none" }}
                      to={`/anime/${item.id}`}
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
                        letterSpacing="0.5px"
                        fontWeight="500"
                        textAlign={{ base: "start" }}
                        color="var(--text-color)"
                        transition="all ease 0.25s"
                        _hover={{ color: "var(--accent-color)" }}
                      >
                        {nameLength}
                      </Text>
                    </ChakraLink>
                  </Box>
                </GridItem>
              );
            })}
          </Grid>

          {isLoading ? (
            <></>
          ) : error ? (
            <></>
          ) : (
            <Box display="flex" justifyContent="flex-start" mt="20px">
              <ChakraLink
                as={ReactRouterLink}
                to="/popular"
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
                textAlign={{ base: "center" }}
                _hover={{
                  textDecor: "none",
                  color: "var(--background-color)",
                  background: "var(--accent-color)",
                  border: "none",
                }}
              >
                View More
              </ChakraLink>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default PopularList;
