import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import Navbar from "../../components/Navbar/Navbar";
import { MOVIES } from "@consumet/extensions";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const flixhq = new MOVIES.FlixHQ();
  const proxy = "https://fluoridated-recondite-coast.glitch.me/";

  const fetchPopularMovies = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("https://api.themoviedb.org/3/movie/popular", {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
          "Content-Type": "application/json;charset=utf-8",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log(data);
      setMovies(data.results || []);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Example: Search for movies
  const searchMovies = async (query) => {
    flixhq.setProxy(proxy);
    try {
      const results = await flixhq.search(query);
      console.log(results);
    } catch (error) {
      console.error("Error fetching from FlixHQ:", error);
    }
  };

  useEffect(() => {
    fetchPopularMovies();
    searchMovies("A working man");
  }, []);

  if (loading) {
    return <p className="text-center mt-8 text-lg">⏳ Loading movies...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-8">❌ Error: {error}</p>;
  }
  return (
    <>
      <Navbar />

      {/* <Box>
        {movies.map((movie) => (
          <div key={movie.id} className="bg-white shadow-md rounded p-2">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto rounded"
            />
            <h3 className="text-center text-sm font-semibold mt-2">
              {movie.title}
            </h3>
          </div>
        ))}
      </Box> */}
    </>
  );
};

export default Movies;
