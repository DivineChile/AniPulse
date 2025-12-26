import { Box, Flex, Heading, Skeleton, Text } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Navigation, FreeMode } from "swiper/modules";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import AnimeCard from "../AnimeCard/AnimeCard";
import { useEffect, useState } from "react";
import { cacheFetch } from "../../../utils/cacheFetch";
import Error from "../../ErrorPage/Error";
import AnimeCarousel from "../AnimeCarousel/AnimeCarousel";

const RecentUpdate = () => {
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

  /** Early Error */
  if (error && !isLoading) {
    return <Error msg={error} pos="relative" />;
  }

  return (
    // Recent Release
    <Box bg="var(--primary-background-color)" pt="40px" pb="120px">
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
            <Clock size={30} color="var(--accent-color)" />
            <Heading
              as="h2"
              fontSize={{ base: "27.59px", lg: "32px", "2xl": "37.97px" }}
              fontWeight="500"
              lineHeight={{ base: "33px", lg: "38px", "2xl": "44px" }}
              letterSpacing="1.5px"
              color="var(--text-color)"
              m="0"
              textTransform="capitalize"
              fontFamily="var(--font-family)"
            >
              New Releases
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
            {`${fullDayName}, ${newFullDate}`}
          </Text>
        </Box>
        {/* Recent Animes Released */}
        <Box>
          {/* CAROUSEL */}
          <AnimeCarousel
            animeList={displayedAnime}
            isLoading={isLoading}
            uniqueId="new-releases"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default RecentUpdate;
