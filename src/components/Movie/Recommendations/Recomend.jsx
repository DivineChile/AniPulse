import { Box, Heading, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { cacheFetch } from "../../../utils/cacheFetch";
import { TrendingUp } from "lucide-react";
import MovieCarousel from "../MovieCarousel/MovieCarousel";
import Error from "../../ErrorPage/Error";

const Recomend = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTopRated = async () => {
    setLoading(true);
    try {
      // // Unique cache key per movie
      const cacheKey = `recent_releases`;

      // Fetch + cache for 10 minutes
      const data = await cacheFetch(`api/flixhq/home`, { cacheKey });

      console.log(data);

      setTrendingMovies(data?.trending?.Movies || []);
    } catch (err) {
      setError(err.message || "Something went wrong");
      console.error("Error fetching pages:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopRated();
  }, []);

  return (
    <Box bg="var(--primary-background-color)" pt="20px" pb="80px">
      <Box
        maxW={{
          base: "90%",
          sm: "95%",
          xl: "85%",
          "2xl": "container.xl",
        }}
        margin="auto"
      >
        <Flex alignItems="center" justifyContent="start" gap="10px">
          <TrendingUp size={30} color="var(--accent-color)" />
          <Heading
            textTransform="capitalize"
            color="var(--text-color)"
            fontSize={{ base: "27.59px", lg: "32px", "2xl": "37.97px" }}
            fontWeight="600"
            lineHeight={{ base: "33px", lg: "38px", "2xl": "44px" }}
            letterSpacing="1.5px"
            fontFamily="var(--font-family)"
            textAlign={{ base: "center", md: "start" }}
          >
            Trending Now
          </Heading>
        </Flex>

        <Box mt="30px">
          {error && !loading ? (
            <Error msg={"Failed to fetch trending movies"} pos="relative" />
          ) : (
            <MovieCarousel
              movies={trendingMovies}
              isLoading={loading}
              uniqueId="trending-movies"
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Recomend;
