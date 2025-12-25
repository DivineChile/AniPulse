import {
  Box,
  Grid,
  GridItem,
  Skeleton,
  Heading,
  Text,
  Tabs,
  SimpleGrid,
  Flex,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { cacheFetch } from "../../../utils/cacheFetch";
import MovieCard from "../MovieCard";
import { CalendarClock } from "lucide-react";

const Latest = () => {
  const [movies, setMovies] = useState([]);
  const [tv, setTv] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecentReleases = async () => {
    setLoading(true);
    try {
      // // Unique cache key per movie
      const cacheKey = `recent_releases`;

      // Fetch + cache for 10 minutes
      const data = await cacheFetch(`api/flixhq/home`, { cacheKey });

      console.log(data);

      setMovies(data.recentReleases.Movies.slice(0, 10));
      setTv(data.recentReleases.Tv.slice(0, 10));
      setLoading(false);
    } catch (err) {
      setError(err.message || "Something went wrong");
      console.error("Error fetching pages:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentReleases();
  }, []);

  const getCurrentDate = () => {
    const today = new Date();

    const dayOfWeek = today.getDay();

    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const fullDayName = daysOfWeek[dayOfWeek];

    const fullDate = today.toDateString().split(" ");
    fullDate.shift();
    const newFullDate = fullDate.join(" ");

    return { dayOfWeek, fullDayName, newFullDate };
  };

  const { dayOfWeek, fullDayName, newFullDate } = getCurrentDate();

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
    <Box bg="var(--primary-background-color)" pt="100px" pb="100px">
      <Box
        maxW={{
          base: "90%",
          sm: "95%",
          xl: "85%",
          "2xl": "container.xl",
        }}
        margin="auto"
        pos="relative"
      >
        {/* Recent Release Head */}
        <Box
          display="flex"
          flexDir={{ base: "column", md: "row" }}
          gap={{ base: "7px 0", md: "0 20px" }}
          alignItems="center"
          justifyContent={{ base: "center", md: "space-between" }}
          my="20px"
          pos="relative"
        >
          <Flex alignItems="center" justifyContent="center" gap="10px">
            <CalendarClock size={30} color="var(--accent-color)" />
            <Heading
              as="h2"
              fontSize={{ base: "27.59px", lg: "32px", "2xl": "37.97px" }}
              fontWeight="600"
              lineHeight={{ base: "33px", lg: "38px", "2xl": "44px" }}
              letterSpacing="1.5px"
              color="var(--text-color)"
              m="0"
              textTransform="capitalize"
              fontFamily="var(--font-family)"
            >
              Latest Releases
            </Heading>
          </Flex>
          <Text
            as="p"
            fontSize={{ base: "16px", "2xl": "20px" }}
            lineHeight={{ base: "17.6px", "2xl": "22px" }}
            letterSpacing="1.5px"
            color="var(--text-secondary)"
            m="0"
            textTransform="capitalize"
          >
            {`${fullDayName} ${newFullDate}`}
          </Text>
        </Box>

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
            colorPalette="purple"
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
                <ReleaseGrid items={movies} />
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
                <ReleaseGrid items={tv} />
              </Tabs.Content>
            </Tabs.ContentGroup>
          </Tabs.Root>
        )}
      </Box>
    </Box>
  );
};

export default Latest;
