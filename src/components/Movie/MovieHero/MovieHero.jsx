import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Loading from "../../ErrorPage/Loading";
import Error from "../../ErrorPage/Error";
import { Link } from "react-router-dom";
import MovieHeroSwiper from "../MovieHeroSwiper/MovieHeroSwiper";

const MovieHero = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const proxy = "https://cors-anywhere-aifwkw.fly.dev/";
  const kenjitsu_api = "https://kenjitsu-api-production.up.railway.app/";
  // const newMovieAPI = "https://jumpfreedom.com/3/movie/popular";

  const fetchPopularMovies = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetch(`${proxy}${kenjitsu_api}api/flixhq/home`);
      const parsedData = await data.json();
      console.log(parsedData);
      setMovies(parsedData.featured || []);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  const handlePlay = (movie) => {
    // open player, route, or open modal
    console.log("Play", movie);
  };

  const handleDetails = (movie) => {
    // navigate to details page
    console.log("Details", movie);
  };

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
      <Loading
        // height="100%"
        bg="linear-gradient(135deg, #8E44AD 0%, #3498DB 100%)"
        fullscreen
        isLoading={loading}
      />
      {error ? (
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
          top="71px"
        >
          <MovieHeroSwiper
            movies={movies}
            onDetails={handleDetails}
            onPlay={handlePlay}
          />
        </Box>
      )}
    </Box>
  );
};

export default MovieHero;
