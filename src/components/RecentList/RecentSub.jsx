import {
  Link as ChakraLink,
  GridItem,
  Box,
  Skeleton,
  SkeletonText,
  HStack,
  Grid,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import Error from "../ErrorPage/Error";

import AnimeCard from "../Anime/AnimeCard/AnimeCard";
import { cacheFetch } from "../../utils/cacheFetch";

const Recents = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subAnimeData, setSubAnimeData] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const proxy = "https://cors-anywhere-aifwkw.fly.dev/";
  const backupApi = "https://anime-api-production-bc3d.up.railway.app/";

  const fetchRecentReleaseAnime = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Retrieve cached homeData or fetch from API if not present
      const data = await cacheFetch(
        "homeData", // key used for home page data in localStorage
        `${proxy}${backupApi}api`, // fallback API endpoint
        10 * 60 * 1000 // cache duration (10 minutes)
      );

      // Assuming data.results.data contains recently updated anime
      setSubAnimeData(data.results.latestEpisode || []);
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
    : subAnimeData?.slice(0, Math.min(8, subAnimeData.length));

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
                <SkeletonText noOfLines={2} spacing={1} my="10px" />
              </GridItem>
            ))
          : displayedAnime?.map((item, i) => {
              return <AnimeCard key={i} anime={item} />;
            })}
      </Grid>
      <>
        {/* Show All / Show Less Button */}
        {subAnimeData?.length > 8 && (
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
