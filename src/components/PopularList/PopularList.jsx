import {
  Box,
  Heading,
  Grid,
  GridItem,
  Image,
  Text,
  Link as ChakraLink,
  Flex,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import Error from "../ErrorPage/Error";
import "./style.css";
import { useEffect, useState } from "react";

const PopularList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchPopularAnimes = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://api-amvstrm.nyt92.eu.org/api/v2/popular?limit=4`
        );

        if (res.ok) {
          const data = await res.json();
          setResults(data.results);
          setIsLoading(false);
          setError(false);
        } else {
          setError(true);
          setIsLoading(false);
        }
      } catch {
        setError(true);
        setIsLoading(false);
      }
    };

    fetchPopularAnimes();
  }, []);

  return (
    <Box
      // px={{ base: "20px", lg: "20px", xl: "100px" }}
      bg="var(--primary-background-color)"
      pt="60px"
      pb="80px"
    >
      <Box
        maxW={{
          base: "95%",
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
            {isLoading && (
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
            )}
            {error && (
              <Error
                msg="Still Working..."
                height="100%"
                width="100%"
                error={error}
                pos="absolute"
                top="0"
                left="0"
                bg="#191919"
                spinnerH={{ base: "50px", md: "60px", lg: "70px" }}
                spinnerW={{ base: "50px", md: "80px", lg: "70px" }}
              />
            )}
            {results.map((item) => {
              const id = item.id;
              const title = item.title.english;
              const bg = item.coverImage.extraLarge;
              const format = item.format;
              const seasonYear = item.seasonYear;
              const season = item.season;

              return (
                <GridItem w={{ base: "100%" }} key={id}>
                  <Box
                    as={ReactRouterLink}
                    to={`/anime/${id}`}
                    pos="relative"
                    overflow="hidden!important"
                    className={`episode-container ${
                      isHovered ? "hovered" : ""
                    }`}
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
                      src={bg}
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
                          to={`/anime/${id}`}
                          color="var(--link-color)"
                          _hover={{
                            color: "var(--accent-color)",
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
                          border: "none",
                        }}
                        borderRadius="8px"
                        border="2px solid var(--text-color)"
                        fontSize={{ base: "14.63px" }}
                        lineHeight="24px"
                        letterSpacing="0.5px"
                        textTransform="uppercase"
                      >
                        {season}
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
                          border: "none",
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
                        {format}
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
                width={{ base: "100%", md: "initial" }}
                textAlign={{ base: "center", md: "start" }}
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
