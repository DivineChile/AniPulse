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
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import Error from "../ErrorPage/Error";
import "./style.css";
import { useEffect, useState } from "react";

import { BsInfoCircle } from "react-icons/bs";
import axios from "axios";
import Loading from "../ErrorPage/Loading";

const PopularList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);

  const api = "https://consumet-api-puce.vercel.app/";

  const fetchPopularAnimes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${api}meta/anilist/popular?perPage=${4}`
      );
      setResults(response.data.results);
      console.log(results);
    } catch (err) {
      setError("Failed to load data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularAnimes();
  }, []);

  return (
    <Box bg="var(--primary-background-color)" pt="60px" pb="80px">
      <Box
        maxW={{
          base: "85%",
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
            fontSize={{
              base: "29.77px",
              md: "32px",
              lg: "35px",
              "2xl": "39.53",
            }}
            lineHeight={{ base: "33px", md: "36px", lg: "39px", "2xl": "44px" }}
            letterSpacing="1.5px"
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
              base: "100%",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
              "2xl": "repeat(5, 1fr)",
            }}
            gap={{ base: "20px 0", sm: "20px", md: "40px 25px" }}
            pos="relative"
          >
            {isLoading && <Loading pos="absolute" />}
            {error && <Error msg={error} pos="absolute" />}
            {results?.map((item) => {
              const id = item.id;
              const title = item.title.english;
              const bg = item.image;
              const seasonYear = item.releaseDate;
              const type = item.type;

              return (
                <GridItem w={{ base: "100%" }} key={id}>
                  <Box
                    as={ReactRouterLink}
                    to={`/anime/${id}`}
                    pos="relative"
                    overflow="hidden!important"
                    className={`episode-container`}
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
                      src={bg}
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
                        to={`/anime/${id}`}
                        color="var(--secondary-color)"
                        _hover={{
                          color: "var(--accent-color)",
                          transition: "all ease 0.25s",
                        }}
                        fontSize="22.88px"
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
                          color="var(--secondary-color)"
                          transition="all ease 0.25s"
                          className="playIcon"
                          h="40px"
                          w="40px"
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
                        p="3px 10px"
                        transition="all ease 0.25s"
                        _hover={{
                          color: "var(--background-color)",
                          bgColor: "var(--accent-color)",
                          border: "2px solid var(--accent-color)",
                        }}
                        borderRadius="8px"
                        border="2px solid var(--text-color)"
                        fontSize={{ base: "14.63px" }}
                        lineHeight="24px"
                        letterSpacing="0.5px"
                        textTransform="uppercase"
                      >
                        {type}
                      </Text>
                      <Text
                        as="span"
                        color="var(--text-color)"
                        cursor="pointer"
                        p="3px 10px"
                        transition="all ease 0.25s"
                        _hover={{
                          color: "var(--background-color)",
                          bgColor: "var(--accent-color)",
                          border: "2px solid var(--accent-color)",
                        }}
                        borderRadius="8px"
                        border="2px solid var(--text-color)"
                        fontSize={{ base: "14.63px" }}
                        lineHeight="24px"
                        letterSpacing="0.5px"
                        textTransform="uppercase"
                      >
                        {seasonYear}
                      </Text>
                      <Text
                        as="span"
                        color="var(--text-color)"
                        cursor="pointer"
                        p="3px 10px"
                        transition="all ease 0.25s"
                        _hover={{
                          color: "var(--accent-color)",
                        }}
                        fontSize={{ base: "14.63px" }}
                        lineHeight="24px"
                        letterSpacing="0.5px"
                        textTransform="uppercase"
                      >
                        {}
                      </Text>
                    </Flex>
                    <ChakraLink
                      as={ReactRouterLink}
                      _hover={{ textDecor: "none" }}
                      to={`/anime/${id}`}
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
                        _hover={{ color: "var(--accent-color)" }}
                      >
                        {title}
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
            <Box display="flex" justifyContent="flex-end" mt="20px">
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
                width={{ base: "100%" }}
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
