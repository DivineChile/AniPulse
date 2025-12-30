import { Box, Heading, Text, Flex } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { cacheFetch } from "../../../utils/cacheFetch";
import { CalendarClock } from "lucide-react";
import Error from "../../ErrorPage/Error";
import MovieCarousel from "../MovieCarousel/MovieCarousel";

const Latest = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecentReleases = async () => {
    setLoading(true);
    setError(null);
    try {
      // // Unique cache key per movie
      const cacheKey = `recent_releases`;

      // Fetch + cache for 10 minutes
      const data = await cacheFetch(`api/flixhq/home`, { cacheKey });

      setMovies(data.recentReleases.Movies);
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

  return (
    <Box bg="var(--primary-background-color)" pt="120px" pb="100px">
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

        <Box>
          {error && !loading ? (
            <Error
              msg={"Failed to fetch latest movie releases"}
              pos="relative"
            />
          ) : (
            <MovieCarousel
              movies={movies}
              isLoading={loading}
              uniqueId="latest-releases"
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Latest;
