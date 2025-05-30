import {
  Box,
  Heading,
  Grid,
  GridItem,
  Skeleton,
  SkeletonText,
  HStack,
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
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${
    import.meta.env.VITE_TMDB_API_KEY
  }`;
  const BEARER_TOKEN = import.meta.env.VITE_TMDB_BEARER_TOKEN;

  const headers = {
    Authorization: `Bearer ${BEARER_TOKEN}`,
    "Content-Type": "application/json;charset=utf-8",
  };

  const fetchTopRated = async () => {
    try {
      const data = await cacheFetch(`top_rated_movies`, url, 10 * 60 * 1000, {
        headers,
      });

      setTopRated(data.results);
    } catch (error) {
      console.error("Error fetching Top Rated movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopRated();
  }, []);

  const truncatedResults =
    topRated.length > 8 ? topRated.slice(0, 8) : topRated;

  // 🔥 Chunk array into groups of 4
  const chunkedSlides = [];
  for (let i = 0; i < truncatedResults.length; i += 4) {
    chunkedSlides.push(truncatedResults.slice(i, i + 4));
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
        margin="auto"
      >
        <Heading
          textTransform="uppercase"
          color="var(--text-color)"
          fontSize={{ base: "27.59px", lg: "32px", "2xl": "37.97px" }}
          fontWeight="600"
          lineHeight={{ base: "33px", lg: "38px", "2xl": "44px" }}
          letterSpacing="1.5px"
          fontFamily="var(--font-family)"
          textAlign={{ base: "center", md: "start" }}
        >
          Top Rated
        </Heading>

        <Box mt="30px">
          {loading ? (
            <Grid
              gridTemplateColumns={{
                base: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              }}
              gap={{ base: "20px 20px", sm: "20px", md: "40px 25px" }}
            >
              {Array.from({ length: 4 }, (_, index) => (
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
              {chunkedSlides.map((chunk, index) => (
                <SwiperSlide key={index}>
                  <Grid
                    gridTemplateColumns={{
                      base: "repeat(2, 1fr)",
                      md: "repeat(3, 1fr)",
                      lg: "repeat(4, 1fr)",
                    }}
                    gap={{ base: "20px 20px", sm: "20px", md: "40px 25px" }}
                  >
                    {chunk.map((movie) => (
                      <MovieCard key={movie.id} movie={movie} />
                    ))}
                  </Grid>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Recomend;
