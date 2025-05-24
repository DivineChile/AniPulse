import Navbar from "../../components/Navbar/Navbar";
import MovieHero from "../../components/Movie/MovieHero/MovieHero";
import Latest from "../../components/Movie/Latest/Latest";
import Recomend from "../../components/Movie/Recommendations/Recomend";
import Footer from "../../components/Footer/Footer";

const Movies = () => {
  document.title = `Movies - AniPulse`;

  return (
    <>
      <Navbar />
      <MovieHero />
      <Latest />
      <Recomend />
      <Footer />
    </>
  );
};

export default Movies;
