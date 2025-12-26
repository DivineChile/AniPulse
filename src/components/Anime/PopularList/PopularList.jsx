import { Box, Heading, Grid, GridItem, Skeleton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Navigation, FreeMode } from "swiper/modules";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import Error from "../../ErrorPage/Error";
import { cacheFetch } from "../../../utils/cacheFetch";
import AnimeCard from "../AnimeCard/AnimeCard";
import AnimeCarousel from "../AnimeCarousel/AnimeCarousel";

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
      setResults(data?.trending || []);
    } catch (err) {
      setError("Failed to load data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularAnimes();
  }, []);

  const truncated = results.length > 4 ? results.slice(0, 10) : results;

  /** Early Error */
  if (error && !isLoading) {
    return <Error msg={error} pos="relative" />;
  }

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
          <Box as="span" fontSize="20px" animation="flicker 1.5s infinite">
            🔥
          </Box>

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
            Trending Now
          </Heading>
        </Box>

        {/* Main carousel */}
        <Box my="30px">
          <AnimeCarousel
            animeList={truncated}
            uniqueId="trending"
            isLoading={isLoading}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default PopularList;
