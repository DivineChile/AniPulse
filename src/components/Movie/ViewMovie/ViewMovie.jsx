import {
  Box,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Grid,
  GridItem,
  Heading,
  Image,
  HStack,
  Link as ChakraLink,
  Link,
  Skeleton,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link as ReactRouterLink } from "react-router-dom";

import Navbar from "../../Navbar/Navbar";
import Loading from "../../ErrorPage/Loading";
import Error from "../../ErrorPage/Error";
import { cacheFetch } from "../../../utils/cacheFetch";
import SeasonTabs from "./SeasonTabs";

const ViewMovie = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [movieTrailers, setMovieTrailers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const { id } = useParams();
  const isTV = location.pathname.includes("/tv");
  const endpoint = isTV
    ? `/tv/${id}?append_to_response=videos&language=en-US`
    : `/movie/${id}?append_to_response=videos&language=en-US`;
  const url = `https://api.themoviedb.org/3${endpoint}`;
  const BEARER_TOKEN = import.meta.env.VITE_TMDB_BEARER_TOKEN;

  const headers = {
    Authorization: `Bearer ${BEARER_TOKEN}`,
    "Content-Type": "application/json;charset=utf-8",
  };

  const fetchMovieDetails = async () => {
    try {
      const data = await cacheFetch(
        `movie_details_${id}`,
        url,
        60 * 60 * 1000, // 1 hour cache
        { headers }
      );
      setMovieDetails(data);
      const trailerPriority = [
        "official trailer",
        "final trailer",
        "trailer",
        "official",
      ];

      const trailers = data.videos.results
        .filter(
          (vid) =>
            vid.type === "Trailer" &&
            vid.site === "YouTube" &&
            trailerPriority.some((priority) =>
              vid.name.toLowerCase().includes(priority)
            )
        )
        .sort((a, b) => {
          const aPriority = trailerPriority.findIndex((priority) =>
            a.name.toLowerCase().includes(priority)
          );
          const bPriority = trailerPriority.findIndex((priority) =>
            b.name.toLowerCase().includes(priority)
          );
          return aPriority - bPriority;
        });

      setMovieTrailers(trailers);

      document.title = `${
        isTV ? `${data.name} (TV Series)` : data.title
      } - AniPulse`;
    } catch (err) {
      console.error("Failed to fetch movie details", err);
      setError(err);
      setMovieDetails(null);
    } finally {
      setLoading(false);
    }
  };

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = isTV
    ? new Date(movieDetails?.first_air_date).toLocaleDateString(
        "en-US",
        options
      )
    : movieDetails?.release_date
    ? new Date(movieDetails.release_date).toLocaleDateString("en-US", options)
    : "Loading...";

  useEffect(() => {
    fetchMovieDetails();
  }, [id, isTV]);

  return (
    <>
      <Navbar />
      {loading ? (
        <Loading
          bg="var(--linear-gradient)"
          height={{ base: "calc(100dvh - 70px)", md: "calc(100dvh - 73px)" }}
        />
      ) : null}

      {error && !loading && (
        <Error
          height={{ base: "calc(100dvh - 70px)", md: "calc(100dvh - 73px)" }}
          bg="var(--primary-background-color)"
          msg="Still Loading..."
        />
      )}

      {!loading && !error && (
        <Box
          bg={
            movieDetails.backdrop_path
              ? `url(https://image.tmdb.org/t/p/original${movieDetails.backdrop_path})`
              : "var(--primary-background-color)"
          }
          bgRepeat="no-repeat"
          bgSize="cover"
          bgPos="center"
          bgAttachment="fixed"
          bgBlendMode="overlay"
          bgColor="rgba(0,0,0,1)"
          className="fade-background"
        >
          <Box
            maxW={{
              base: "90%",
              sm: "95%",
              xl: "85%",
              "2xl": "container.xl",
            }}
            margin="auto"
            py="20px"
          >
            {/* BreadCrumb Links */}
            <Breadcrumb mb="20px">
              <BreadcrumbItem
                fontSize={{ base: "15.13px", lg: "18.75px" }}
                lineHeight={{ base: "24px", lg: "30px" }}
                letterSpacing="0.5px"
                color="var(--text-color)"
                _hover={{ color: "var(--link-hover-color)" }}
              >
                <BreadcrumbLink
                  as={ReactRouterLink}
                  to="/movies"
                  textDecor="none"
                >
                  Movies
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem
                isCurrentPage
                fontSize={{ base: "15.13px", lg: "18.75px" }}
                lineHeight={{ base: "24px", lg: "30px" }}
                letterSpacing="0.5px"
                color="var(--accent-color)"
                _hover={{ color: "var(--link-hover-color)" }}
              >
                <BreadcrumbLink>
                  {isTV ? "TV" : "Movie"} /{" "}
                  {isTV ? movieDetails?.name : movieDetails?.title}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>

            {/* Movie / Series details */}

            <Box my="20px">
              {/*  */}
              <Grid gridTemplateColumns="repeat(7, 1fr)" gap="20px">
                <GridItem
                  colSpan={{ base: 7, "2xl": 5 }}
                  display="flex"
                  flexDir={{ base: "column", md: "row" }}
                  gap={{ base: "20px 0", md: "0 20px" }}
                  alignItems={{ base: "start", md: "center", "2xl": "start" }}
                  mb="20px"
                  justifyContent={{ base: "initial", md: "space-evenly" }}
                  h={{ base: "fit-content" }}
                >
                  {/* Movie / Series Image */}
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                    alt={movieDetails.title}
                    bg="rgba(25, 27, 40, 0.7)"
                    w={{
                      base: "70%",
                      sm: "fit-content",
                      md: "30%",
                      lg: "auto",
                    }}
                    transition="background ease 0.25s"
                    borderRadius="10px"
                    display="flex"
                    alignSelf={{ base: "center", md: "initial" }}
                    boxShadow={"0 0 10px rgba(114, 114, 114, 0.3)"}
                    objectFit={{ base: "contain", md: "cover" }}
                    h={{ base: "40%", sm: "300px", md: "377.5px" }}
                  />

                  <Box
                    w={{ base: "100%", md: "70%", lg: "60%" }}
                    mb={{ base: "20px", md: "0" }}
                  >
                    {/* Movie / Series Name */}
                    <Heading
                      as="h2"
                      fontSize="35px"
                      fontWeight="500"
                      fontFamily="var(--font-family)"
                      color="var(--text-color)"
                      letterSpacing="1.5px"
                      lineHeight="38.5px"
                      transition="background ease 0.25s"
                    >
                      {isTV
                        ? `${movieDetails.name} (TV Series)`
                        : movieDetails.title
                        ? movieDetails.title !== ""
                          ? movieDetails.title
                          : "NIL"
                        : "NIL"}
                    </Heading>
                    <Text
                      as="h3"
                      fontSize="24.02px"
                      fontWeight="300"
                      lineHeight="37.5px"
                      color="var(--text-secondary)"
                      transition="background ease 0.25s"
                    >
                      {movieDetails.tagline}
                    </Text>
                    {/* Movie / Series Summary */}
                    <Box mt="20px">
                      <Text
                        as="h4"
                        mb="8px"
                        color="var(--text-color)"
                        fontSize="24.02px"
                        fontWeight="300"
                        fontFamily="var(--font-family)"
                        lineHeight="27.5px"
                        letterSpacing="1.5px"
                      >
                        Plot Summary
                      </Text>
                      <Text
                        as="p"
                        color="var(--text-color)"
                        fontSize="15.38px"
                        fontWeight="300"
                        fontFamily="var(--body-font)"
                        lineHeight="24px"
                        letterSpacing="0.5px"
                        transition="background ease 0.25s"
                      >
                        {movieDetails.overview
                          ? isExpanded
                            ? movieDetails.overview
                            : movieDetails.overview.length > 250
                            ? `${movieDetails.overview.slice(0, 250)}...`
                            : movieDetails.overview
                          : "NIL"}
                        {movieDetails.overview &&
                          movieDetails.overview.length > 250 && (
                            <Text
                              as="span"
                              color="var(--accent-color)"
                              cursor="pointer"
                              fontWeight="500"
                              ml="5px"
                              onClick={() => setIsExpanded((prev) => !prev)}
                            >
                              {isExpanded ? "Show Less" : "Show More"}
                            </Text>
                          )}
                      </Text>
                    </Box>
                  </Box>
                </GridItem>
                {/* Anime Details */}
                <GridItem colSpan={{ base: 7, md: 3, lg: 3, "2xl": 2 }}>
                  <Box display="flex" flexDir="column" gap="9px 0">
                    <Text
                      as="h3"
                      color="var(--text-color)"
                      fontSize="24.61px"
                      fontWeight="400"
                      lineHeight="27.5px"
                      letterSpacing="1.5px"
                      mb="10px"
                    >
                      {isTV ? "TV" : "Movie"} Details
                    </Text>
                    {/* Countdown timer */}
                    <Box display="flex" gap="0 10px">
                      <Text
                        as="p"
                        color="var(--text-color)"
                        fontSize="15px"
                        fontFamily="var(--font-family)"
                        fontWeight="300"
                        lineHeight="24px"
                        transition="background ease 0.25s"
                      >
                        Language:{"  "}
                      </Text>
                      <Text
                        color="var(--text-color)"
                        as="span"
                        fontSize="15px"
                        fontWeight="300"
                        fontFamily="var(--body-font)"
                        lineHeight="24px"
                      >
                        {movieDetails.original_language
                          ? movieDetails.original_language.toUpperCase()
                          : "Loading..."}
                      </Text>
                    </Box>
                    {/* Movie / Series Producers */}
                    <Box display="flex" gap="0 10px">
                      <Text
                        as="p"
                        color="var(--text-color)"
                        fontSize="15px"
                        fontFamily="var(--font-family)"
                        fontWeight="300"
                        lineHeight="24px"
                      >
                        Produced By:{"  "}
                      </Text>
                      <HStack flexWrap="wrap" gap="5px">
                        {movieDetails.production_companies?.map((company) => (
                          <Text
                            color="var(--accent-color)"
                            as="span"
                            fontSize="15px"
                            fontWeight="300"
                            fontFamily="var(--body-font)"
                            lineHeight="24px"
                            transition="background ease 0.25s"
                            textTransform="capitalize"
                            key={company.id}
                          >
                            {company.name + ","}
                          </Text>
                        ))}
                      </HStack>
                    </Box>
                    {/* Movie / Series Runtime */}
                    <Box display="flex" gap="0 10px">
                      <Text
                        as="p"
                        color="var(--text-color)"
                        fontSize="15px"
                        fontWeight="300"
                        fontFamily="var(--font-family)"
                        lineHeight="24px"
                      >
                        Runtime:{"  "}
                      </Text>
                      <Text
                        color="var(--accent-color)"
                        as="span"
                        fontSize="15px"
                        fontWeight="300"
                        lineHeight="24px"
                        fontFamily="var(--body-font)"
                        transition="background ease 0.25s"
                      >
                        {isTV
                          ? movieDetails?.episode_run_time[0]
                          : movieDetails?.runtime}
                        {" mins"}
                      </Text>
                    </Box>
                    {/* Release Year */}
                    <Box display="flex" gap="0 10px">
                      <Text
                        as="p"
                        color="var(--text-color)"
                        fontSize="15px"
                        fontWeight="300"
                        fontFamily="var(--font-family)"
                        lineHeight="24px"
                      >
                        Released On:{"  "}
                      </Text>
                      <Text
                        color="var(--text-color)"
                        as="span"
                        fontSize="15px"
                        fontWeight="300"
                        transition="background ease 0.25s"
                        lineHeight="24px"
                        fontFamily="var(--body-font)"
                      >
                        {formattedDate ? formattedDate : "Loading..."}
                      </Text>
                    </Box>
                    {/* Genres */}
                    <Box display="flex" gap="0 10px">
                      <Text
                        as="p"
                        color="var(--text-color)"
                        fontSize="15px"
                        fontWeight="300"
                        fontFamily="var(--font-family)"
                        lineHeight="24px"
                      >
                        Genres:{"  "}
                      </Text>
                      {/* Genre */}
                      <Box display="flex" gap="4px" flexWrap="wrap">
                        {movieDetails.genres?.map((genre) => {
                          return (
                            <Text
                              color="var(--accent-color)"
                              as="span"
                              fontSize="15px"
                              fontWeight="300"
                              fontFamily="var(--body-font)"
                              lineHeight="24px"
                              transition="background ease 0.25s"
                              textTransform="capitalize"
                              key={genre.id}
                            >
                              {genre.name + ","}
                            </Text>
                          );
                        })}
                      </Box>
                    </Box>
                    {/* Views */}
                    <Box display="flex" gap="0 10px">
                      <Text
                        as="p"
                        color="var(--text-color)"
                        fontSize="15px"
                        fontWeight="300"
                        fontFamily="var(--font-family)"
                        lineHeight="24px"
                        transition="background ease 0.25s"
                      >
                        Score:{"  "}
                      </Text>

                      <Text
                        color="var(--text-color)"
                        as="span"
                        fontSize="15px"
                        fontWeight="300"
                        transition="background ease 0.25s"
                        lineHeight="24px"
                        fontFamily="var(--body-font)"
                      >
                        {movieDetails.vote_average
                          ? `${movieDetails.vote_average} by ${movieDetails.vote_count} views`
                          : "Loading..."}
                      </Text>
                    </Box>
                    {/* External Links */}
                    <Box display="flex" gap="0 10px">
                      <Text
                        as="p"
                        color="var(--text-color)"
                        fontSize="15px"
                        fontWeight="300"
                        fontFamily="var(--font-family)"
                        lineHeight="24px"
                      >
                        External Links:{"  "}
                      </Text>
                      <Link
                        color="var(--accent-color)"
                        href={
                          movieDetails.homepage
                            ? movieDetails.homepage
                            : "/movies"
                        }
                        target="_blank"
                        fontSize="15px"
                        fontWeight="300"
                        fontFamily="var(--body-font)"
                        lineHeight="24px"
                        transition="background ease 0.25s"
                      >
                        Link
                      </Link>
                    </Box>
                  </Box>
                </GridItem>
                {/* Episodes List */}
                <GridItem
                  colSpan={{ base: 7, md: 4, lg: 4, "2xl": 5 }}
                  mt={{ base: "20px", md: 0 }}
                  id="episodes"
                >
                  <Box>
                    <Heading
                      color="var(--text-color)"
                      fontSize={{ base: "26.36px", md: "30px", lg: "37.5px" }}
                      fontWeight="400"
                      fontFamily="var(--font-family)"
                      lineHeight={{ base: "30.8px", md: "35px", lg: "44px" }}
                      letterSpacing="1.5px"
                    >
                      Media Info
                    </Heading>

                    <Box mt="20px" w="100%">
                      {!movieTrailers || movieTrailers.length === 0 ? (
                        <Skeleton
                          h={{
                            base: "300px",
                            sm: "250px",
                            md: "250px",
                            lg: "270px",
                          }}
                          w={{ base: "100%", sm: "100%", md: "100%" }}
                          borderRadius="10px"
                        />
                      ) : (
                        <Box
                          as="iframe"
                          h={{
                            base: "300px",
                            sm: "250px",
                            md: "250px",
                            lg: "270px",
                          }}
                          w={{ base: "100%", sm: "100%", md: "100%" }}
                          title={movieTrailers[0].name || "Movie Trailer"}
                          borderRadius="10px"
                          src={`https://www.youtube.com/embed/${movieTrailers[0].key}`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      )}
                    </Box>
                  </Box>
                </GridItem>

                <GridItem
                  colSpan={{ base: 7, md: 3, lg: 3, "2xl": 5 }}
                  mt={{ base: "20px", md: 0 }}
                >
                  <Heading
                    color="var(--text-color)"
                    fontSize={{ base: "26.36px", md: "30px", lg: "37.5px" }}
                    fontWeight="400"
                    fontFamily="var(--font-family)"
                    lineHeight={{ base: "30.8px", md: "35px", lg: "44px" }}
                    letterSpacing="1.5px"
                    mb="20px"
                  >
                    Seasons
                  </Heading>
                  <Box w={{ base: "100%", sm: "100%", md: "100%" }}>
                    {isTV ? (
                      <SeasonTabs tvId={id} />
                    ) : (
                      <Box w="100%" h="47px">
                        <ChakraLink
                          href="#episodes"
                          w="100%"
                          h="47px!important"
                          color="var(--link-color)"
                          border="1px solid var(--secondary-color)"
                          borderRadius="10px"
                          transition="all ease 0.25s"
                          _hover={{
                            color: "var(--background-color)",
                            textDecoration: "none",
                            background: "var(--accent-color)",
                            border: "none",
                          }}
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          mt="20px"
                          fontSize="19.77px"
                          fontWeight="500"
                          lineHeight="33px"
                          letterSpacing="0.5px"
                          textTransform="uppercase"
                        >
                          Watch Now
                        </ChakraLink>
                      </Box>
                    )}
                  </Box>
                </GridItem>
              </Grid>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default ViewMovie;
