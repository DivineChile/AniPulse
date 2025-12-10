import {
  Box,
  Heading,
  Grid,
  GridItem,
  Skeleton,
  SkeletonText,
  HStack,
  SimpleGrid,
  Text,
  Tabs,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { cacheFetch } from "../../../utils/cacheFetch";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { Navigation, FreeMode } from "swiper/modules";
import MovieCard from "../MovieCard";

const Recomend = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTV, setTrendingTV] = useState([]);
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

      setTrendingMovies(data.trending.Movies.slice(0, 10));
      setTrendingTV(data.trending.Tv.slice(0, 10));
      setLoading(false);
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

  function ReleaseGrid({ items }) {
    return (
      <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 5 }} gap="20px">
        {items?.map((item) => (
          <MovieCard key={item.id} item={item} />
        ))}
      </SimpleGrid>
    );
  }

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

        <Box mt="30px">
          {loading && (
            <Grid
              gridTemplateColumns={{
                base: "repeat(2, 1fr)",
                sm: "repeat(3, 1fr)",
                md: "repeat(4, 1fr)",
                lg: "repeat(5, 1fr)",
              }}
              gap="20px"
            >
              {Array.from({ length: 10 }, (_, index) => (
                <GridItem key={index}>
                  <Skeleton
                    h={{
                      base: "276px",
                      sm: "290.23px",
                      md: "285px",
                      lg: "290px",
                      "2xl": "284px",
                    }}
                    w="100%"
                    borderRadius="10px"
                  />
                </GridItem>
              ))}
            </Grid>
          )}

          {error && (
            <Text
              as="p"
              fontSize={{ base: "16px", "2xl": "20px" }}
              lineHeight={{ base: "17.6px", "2xl": "22px" }}
              letterSpacing="1.5px"
              color="var(--text-color)"
              m="0"
              textTransform="capitalize"
            >
              {error}
            </Text>
          )}

          {!loading && !error && (
            <Tabs.Root
              variant="enclosed"
              colorPalette="teal"
              defaultValue="movies"
              lazyMount
              unmountOnExit
              fitted
              w="100%"
            >
              <Tabs.List overflowX="auto" w="100%">
                <Tabs.Trigger fontWeight="semibold" value="movies">
                  Movies
                </Tabs.Trigger>
                <Tabs.Trigger fontWeight="semibold" value="tv">
                  TV Shows
                </Tabs.Trigger>
              </Tabs.List>

              <Tabs.ContentGroup mt="4">
                <Tabs.Content
                  px="0"
                  value="movies"
                  _open={{
                    animationName: "fade-in, scale-in",
                    animationDuration: "300ms",
                  }}
                  _closed={{
                    animationName: "fade-out, scale-out",
                    animationDuration: "120ms",
                  }}
                >
                  <ReleaseGrid items={trendingMovies} />
                </Tabs.Content>

                <Tabs.Content
                  px="0"
                  value="tv"
                  _open={{
                    animationName: "fade-in, scale-in",
                    animationDuration: "300ms",
                  }}
                  _closed={{
                    animationName: "fade-out, scale-out",
                    animationDuration: "120ms",
                  }}
                >
                  <ReleaseGrid items={trendingTV} />
                </Tabs.Content>
              </Tabs.ContentGroup>
            </Tabs.Root>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Recomend;
