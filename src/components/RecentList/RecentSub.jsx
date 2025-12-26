import {
  Link as ChakraLink,
  GridItem,
  Box,
  Grid,
  Skeleton,
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

  const loadRecentAnime = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await cacheFetch("api/hianime/home", {
        cacheKey: "homeData",
      });

      setSubAnimeData(data?.recentlyUpdated || []);
    } catch (err) {
      setError("Unable to load recent releases. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRecentAnime();
  }, []);

  const displayedAnime = showAll ? subAnimeData : subAnimeData.slice(0, 10);

  /** Skeleton Loader Block */
  const skeletons = [...Array(10)].map((_, index) => (
    <GridItem key={index}>
      <Skeleton
        h={{
          base: "270px",
          sm: "290px",
          md: "285px",
          lg: "290px",
        }}
        w="100%"
        borderRadius="10px"
      />
    </GridItem>
  ));

  /** Early Error */
  if (error && !isLoading) {
    return <Error msg={error} pos="relative" />;
  }

  return (
    <Box>
      <Grid
        gridTemplateColumns={{
          base: "repeat(2, 1fr)",
          sm: "repeat(3, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap="20px"
      >
        {isLoading
          ? skeletons
          : displayedAnime.map((item, i) => <AnimeCard key={i} anime={item} />)}
      </Grid>

      {/* Show All / Show Less Button */}
      {/* {!isLoading && subAnimeData.length > 10 && (
        <ChakraLink
          as="button"
          onClick={() => setShowAll((prev) => !prev)}
          color="var(--text-color)"
          fontSize={{
            base: "15px",
            md: "17px",
            lg: "19px",
          }}
          textAlign="center"
          display="inline-block"
          border="1px solid var(--secondary-color)"
          borderRadius="5px"
          padding="6px 20px"
          transition="all ease 0.35s"
          width={{ base: "100%", md: "fit-content" }}
          _hover={{
            textDecor: "none",
            background: "var(--link-hover-color)",
            color: "var(--text-color)",
            border: "none",
            transform: "scale(1.1)",
          }}
          m="20px auto 0"
        >
          {showAll ? "Show Less" : "Show All"}
        </ChakraLink>
      )} */}
    </Box>
  );
};

export default Recents;
