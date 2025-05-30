import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Loading from "../../ErrorPage/Loading";
import Error from "../../ErrorPage/Error";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { Navigation, FreeMode } from "swiper/modules";
import { Link } from "react-router-dom";
import { cacheFetch } from "../../../utils/cacheFetch";
import Prev from "../../Anime/HeroSliderButtons/Prev";
import Next from "../../Anime/HeroSliderButtons/Next";

const MovieHero = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genreLoading, setGenreLoading] = useState(true);
  const [genreError, setGenreError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const proxy = "https://fluoridated-recondite-coast.glitch.me/";

  const fetchPopularMovies = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await cacheFetch(
        "tmdb_popular",
        `https://api.themoviedb.org/3/movie/popular?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }`,
        10 * 60 * 1000,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
            "Content-Type": "application/json;charset=utf-8",
          },
        }
      );
      setMovies(data.results || []);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  //Fetch current genres from TMDB API
  const fetchGenres = async () => {
    setGenreLoading(true);
    setGenreError(null);
    try {
      const data = await cacheFetch(
        "tmdb_genres",
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }`,
        7 * 24 * 60 * 60 * 1000,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
            "Content-Type": "application/json;charset=utf-8",
          },
        }
      );
      setGenres(data.genres || []);
    } catch (err) {
      setError(err.message || "Something went wrong");
      setGenreError(err.message || "Something went wrong");
    } finally {
      setGenreLoading(false);
    }
  };

  const getGenreNames = (genreIds, allGenres) => {
    return genreIds
      .map((id) => {
        const found = allGenres.find((g) => g.id === id);
        return found ? found.name : null;
      })
      .filter(Boolean); // removes nulls if any id didn't match
  };

  useEffect(() => {
    fetchPopularMovies();
    fetchGenres();
  }, []);

  return (
    <Box
      w="100%"
      h={{
        base: "calc(100vh - 70px)",
        md: "calc(100vh - 73px)",
        lg: "calc(100vh - 84px)",
        xl: "calc(100vh - 85px)",
      }}
    >
      {loading ? (
        <Loading
          height="100%"
          bg="linear-gradient(135deg, #8E44AD 0%, #3498DB 100%)"
        />
      ) : error ? (
        <Error msg={error} height="100%" bg="#191919" />
      ) : (
        <Box
          w="100%"
          h={{
            base: "calc(100vh - 70px)",
            md: "calc(100vh - 73px)",
            lg: "calc(100vh - 84px)",
          }}
          pos="relative"
        >
          <Swiper
            modules={[Navigation, FreeMode]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop
            effect="fade"
            style={{ height: "100%", position: "relative" }}
          >
            <Box
              pos="absolute"
              left="20px"
              top="0"
              hideBelow="lg"
              zIndex="2"
              h="100%"
              display="flex"
              alignItems="center"
            >
              <Prev />
            </Box>
            <Box
              pos="absolute"
              right="20px"
              top="0"
              hideBelow="lg"
              zIndex="2"
              h="100%"
              display="flex"
              alignItems="center"
            >
              <Next />
            </Box>
            {movies.map((movie, index) => {
              //get genre names from genre ids
              const genreNames = getGenreNames(movie.genre_ids, genres);

              //get full date from release_date
              const date = new Date(movie.release_date);

              const options = {
                year: "numeric",
                month: "long",
                day: "numeric",
              };
              const formattedDate = date.toLocaleDateString("en-US", options);

              return (
                <SwiperSlide key={index}>
                  <Box
                    pos="absolute"
                    top="0"
                    left="0"
                    w="100%"
                    h="100%"
                    bgImage={{
                      base: movie.poster_path
                        ? `url(https://image.tmdb.org/t/p/original${movie.poster_path})`
                        : "#191919",
                      md: movie.backdrop_path
                        ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
                        : "#191919",
                    }}
                    bgSize="cover"
                    bgPos="center"
                  >
                    <Box
                      pos="absolute"
                      top="0"
                      left="0"
                      w="100%"
                      h="100%"
                      bgColor="rgba(0, 0, 0, 0.5)"
                      zIndex="2"
                    >
                      <Box
                        maxW={{
                          base: "90%",
                          sm: "95%",
                          xl: "85%",
                          "2xl": "container.xl",
                        }}
                        margin="auto"
                        h="100%"
                        display="flex"
                        flexDir="column"
                        justifyContent="space-around"
                      >
                        <Box display="flex" flexDir="column" textAlign="left">
                          <Heading
                            as="h1"
                            color="var(--text-color)"
                            fontFamily="var(--font-family)"
                            textTransform="uppercase"
                            lineHeight={{
                              base: "43px",
                              md: "70px",
                              lg: "70px",
                              xl: "80px",
                              "2xl": "97px",
                            }}
                            fontSize={{
                              base: "35px",
                              md: "60px",
                              xl: "70px",
                              "2xl": "87px",
                            }}
                            fontWeight="700"
                            letterSpacing="1.5px"
                          >
                            {movie.title}
                          </Heading>

                          <Flex gap="10px" flexWrap="wrap" mt="10px">
                            {genreNames?.map((genre, index) => {
                              return (
                                <Box
                                  as="p"
                                  key={index}
                                  color="var(--text-secondary)"
                                  fontFamily="var(--font-family)"
                                  fontSize={{
                                    base: "18px",
                                    md: "22px",
                                    lg: "24px",
                                    xl: "27.17px",
                                  }}
                                  fontWeight="400"
                                  lineHeight={{
                                    base: "24px",
                                    md: "30px",
                                    lg: "40px",
                                    xl: "50px",
                                  }}
                                  textTransform="capitalize"
                                >
                                  {genre},
                                </Box>
                              );
                            })}
                          </Flex>
                          <Box>
                            <Text
                              color="var(--text-color)"
                              fontSize={{
                                base: "18px",
                                md: "25px",
                                lg: "30px",
                                xl: "40px",
                              }}
                              fontFamily="var(--font-family)"
                              lineHeight={{
                                base: "20px",
                                md: "30px",
                                lg: "40px",
                                xl: "50px",
                              }}
                              mt="10px"
                            >
                              {" "}
                              {formattedDate}
                            </Text>
                          </Box>
                        </Box>

                        {/* Movie Summary */}
                        <Box
                          display="flex"
                          flexDir="column"
                          textAlign="right"
                          alignSelf="flex-end"
                          w={{
                            base: "100%",
                            md: "80%",
                            lg: "60%",
                            xl: "40%",
                          }}
                        >
                          <Box>
                            <Text
                              fontSize={{
                                base: "20px",
                                lg: "24px",
                                xl: "28.95px",
                              }}
                              color="var(--text-color)"
                              lineHeight={{
                                base: "30px",
                                lg: "37px",
                                xl: "45px",
                              }}
                            >
                              MOVIE SUMMARY
                            </Text>
                            <Text
                              as="p"
                              fontFamily="var(--body-font)"
                              color="var(--text-secondary)"
                              my={{ base: "5px", md: "10px" }}
                            >
                              {movie.overview.length > 200
                                ? movie.overview.slice(0, 200) + "...more"
                                : movie.overview}
                            </Text>
                          </Box>
                          <Box width="100%" my={{ base: "15px", md: "10px" }}>
                            <Link
                              to={`/movies/movie/${movie.id}`}
                              className="play-now-btn"
                              style={{ textAlign: "center" }}
                            >
                              VIEW MORE
                            </Link>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Box>
      )}
    </Box>
  );
};

export default MovieHero;
