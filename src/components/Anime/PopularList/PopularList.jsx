import {
  Box,
  Heading,
  Grid,
  GridItem,
  Link as ChakraLink,
  Skeleton,
  SkeletonText,
  HStack,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import Error from "../../ErrorPage/Error";
import "./style.css";
import { useEffect, useState } from "react";

import { BsInfoCircle } from "react-icons/bs";
import Loading from "../../ErrorPage/Loading";
import { Flame, Info } from "lucide-react";
import { cacheFetch } from "../../../utils/cacheFetch";
import AnimeCard from "../AnimeCard/AnimeCard";

const PopularList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);

  const backup_api = "https://anime-api-production-bc3d.up.railway.app/";
  const proxy = "https://cors-anywhere-aifwkw.fly.dev/";

  const fetchPopularAnimes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await cacheFetch(
        "homeData", // key used for home page data in localStorage
        `${proxy}${backup_api}api`, // fallback API endpoint
        10 * 60 * 1000 // cache duration (10 minutes)
      );
      setResults(data.results.mostPopular || []);
    } catch (err) {
      setError("Failed to load data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularAnimes();
  }, []);

  const truncatedResults = results?.length > 4 ? results?.slice(0, 4) : results;

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
        <Box
          display="flex"
          gap="10px"
          alignItems="center"
          justifyContent={{ base: "center", md: "initial" }}
        >
          <Flame size={30} color="var(--primary-color)" />
          <Heading
            textTransform="capitalize"
            color="var(--text-color)"
            fontSize={{ base: "27.59px", lg: "32px", "2xl": "37.97px" }}
            fontWeight="500"
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
            {truncatedResults?.map((item, index) => {
              return <AnimeCard key={item.id} anime={item} />;
            })}
          </Grid>

          {/* {isLoading ? (
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
                textAlign="center"
                display="inline-block"
                border="1px solid var(--secondary-color)"
                borderRadius="5px"
                padding="5px 15px"
                transition="all ease 0.25s"
                width={{ base: "100%", md: "fit-content" }}
                _hover={{
                  textDecor: "none",
                  color: "var(--link-hover-color)",
                  background: "var(--accent-color)",
                  border: "none",
                  fontWeight: "bold",
                  padding: { base: "7px 15px", md: "7px 45px" },
                }}
              >
                View More
              </ChakraLink>
            </Box>
          )} */}
        </Box>
      </Box>
    </Box>
  );
};

export default PopularList;
