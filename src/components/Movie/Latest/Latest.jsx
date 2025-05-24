import {
  Box,
  Grid,
  GridItem,
  Skeleton,
  SkeletonText,
  HStack,
  Heading,
  Text,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { Navigation, FreeMode } from "swiper/modules";
import { cacheFetch } from "../../../utils/cacheFetch";
import { useItemsPerGroup } from "../../../utils/hooks/useItemsPerGroup";
import MovieCard from "../MovieCard";

const Latest = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const today = new Date();
  today.setDate(today.getDate() - 1);

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const full = `${year}-${month}-${day}`;

  const API_URL = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=${year}&primary_release_date.lte=${full}&sort_by=popularity.desc`;
  const BEARER_TOKEN = import.meta.env.VITE_TMDB_BEARER_TOKEN;

  const fetchAllPages = async () => {
    setLoading(true);
    try {
      const headers = {
        Authorization: `Bearer ${BEARER_TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };

      // First page to get total_pages
      const firstPage = await cacheFetch(
        "latest_movies_page_1",
        `${API_URL}?page=1`,
        10 * 60 * 1000,
        { headers }
      );

      const totalPages = Math.min(firstPage.total_pages, 5); // Limit to 5 pages to avoid overload
      let allResults = [...firstPage.results];

      const fetchPromises = [];
      for (let i = 2; i <= totalPages; i++) {
        fetchPromises.push(
          cacheFetch(
            `latest_movies_page_${i}`,
            `${API_URL}?page=${i}`,
            10 * 60 * 1000,
            { headers }
          )
        );
      }

      const otherPages = await Promise.all(fetchPromises);
      otherPages.forEach((pageData) => {
        allResults = allResults.concat(pageData.results);
      });

      setMovies(allResults);
    } catch (err) {
      console.error("Error fetching pages:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPages();
  }, []);

  const chunkArray = (arr, size) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );
  };

  const itemsPerGroup = useItemsPerGroup();
  const groupedMovies = chunkArray(movies, itemsPerGroup);

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
          <Heading
            as="h2"
            fontSize={{ base: "27.59px", lg: "32px", "2xl": "37.97px" }}
            fontWeight="600"
            lineHeight={{ base: "33px", lg: "38px", "2xl": "44px" }}
            letterSpacing="1.5px"
            color="var(--text-color)"
            m="0"
            textTransform="uppercase"
            fontFamily="var(--font-family)"
          >
            Latest
          </Heading>
          <Text
            as="p"
            fontSize={{ base: "16px", "2xl": "20px" }}
            lineHeight={{ base: "17.6px", "2xl": "22px" }}
            letterSpacing="1.5px"
            color="var(--text-color)"
            m="0"
            textTransform="uppercase"
          >
            {`${fullDayName} ${newFullDate}`}
          </Text>
        </Box>
        {/* Latest Movies Released */}
        <Box>
          {loading ? (
            <Grid
              gridTemplateColumns={{
                base: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              }}
              gap={{ base: "20px 20px", sm: "20px", md: "40px 25px" }}
            >
              {Array.from({ length: 8 }, (_, index) => (
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
                  <SkeletonText noOfLines={2} spacing={2} my="10px" />
                </GridItem>
              ))}
            </Grid>
          ) : (
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              modules={[Navigation, FreeMode]}
              freeMode={true}
              autoplay={{
                delay: 5000, // Delay between slides in ms (e.g. 3000 = 3s)
                disableOnInteraction: false,
              }}
              speed={1000} // Transition speed in ms (e.g. 800 = 0.8s)
              loop={true}
            >
              {groupedMovies.map((group, index) => {
                return (
                  <SwiperSlide key={index}>
                    <Grid
                      gridTemplateColumns={{
                        base: "repeat(2, 1fr)",
                        md: "repeat(3, 1fr)",
                        lg: "repeat(4, 1fr)",
                      }}
                      gap={{ base: "20px 20px", sm: "20px", md: "40px 25px" }}
                    >
                      {group.map((movie) => (
                        <MovieCard movie={movie} />
                      ))}
                    </Grid>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Latest;
