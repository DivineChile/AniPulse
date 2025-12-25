import { Box, Heading, Grid, GridItem, Skeleton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Flame } from "lucide-react";
import Error from "../../ErrorPage/Error";
import { cacheFetch } from "../../../utils/cacheFetch";
import AnimeCard from "../AnimeCard/AnimeCard";

const PopularList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);

  const fetchPopularAnimes = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await cacheFetch("api/hianime/home", {
        cacheKey: "homeData",
      });
      setResults(data?.mostPopular || []);
    } catch (err) {
      setError("Failed to load data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularAnimes();
  }, []);

  const truncated = results.length > 4 ? results.slice(0, 5) : results;

  return (
    <Box bg="var(--primary-background-color)" pt="60px" pb="80px">
      <Box
        maxW={{
          base: "90%",
          sm: "95%",
          xl: "85%",
          "2xl": "container.xl",
        }}
        mx="auto"
      >
        {/* Header */}
        <Box
          display="flex"
          gap="10px"
          alignItems="center"
          justifyContent={{ base: "center", md: "flex-start" }}
        >
          <Flame size={30} color="var(--accent-color)" />

          <Heading
            color="var(--text-color)"
            textTransform="capitalize"
            fontSize={{ base: "27.6px", lg: "32px", "2xl": "38px" }}
            fontWeight="500"
            lineHeight={{ base: "33px", lg: "38px", "2xl": "44px" }}
            letterSpacing="1.5px"
            fontFamily="var(--font-family)"
            textAlign={{ base: "center", md: "start" }}
          >
            Popular Now
          </Heading>
        </Box>

        {/* Main Grid */}
        <Box my="30px">
          <Grid
            gridTemplateColumns={{
              base: "repeat(2, 1fr)",
              sm: "repeat(3, 1fr)",
              md: "repeat(4, 1fr)",
              lg: "repeat(5, 1fr)",
            }}
            gap="20px"
            position="relative"
          >
            {/* SKELETONS */}
            {isLoading &&
              [...Array(5)].map((_, i) => (
                <GridItem key={i}>
                  <Skeleton
                    h={{
                      base: "276px",
                      sm: "290px",
                      md: "285px",
                      lg: "290px",
                      "2xl": "284px",
                    }}
                    w="100%"
                    borderRadius="10px"
                  />
                </GridItem>
              ))}

            {/* ERROR */}
            {error && <Error msg={error} pos="absolute" />}

            {/* DATA */}
            {!isLoading &&
              !error &&
              truncated.map((item) => <AnimeCard key={item.id} anime={item} />)}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default PopularList;
