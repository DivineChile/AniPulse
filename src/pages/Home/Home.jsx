import { Box } from "@chakra-ui/react";
import Hero from "../../components/Hero/Hero";
import RecentUpdate from "../../components/RecentUpdate/RecentUpdate";
import Upcoming from "../../components/Upcoming/Upcoming";
import PopularList from "../../components/PopularList/PopularList";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  document.title = "Home - AniPulse";

  return (
    <Box>
      <Box>
        {/* Hero */}
        <Hero />

        {/* Recent Updates */}
        <RecentUpdate />

        {/* Upcoming Anime*/}
        <Upcoming />

        {/* Popular animes */}
        <PopularList />

        {/* Footer */}
        <Footer />
      </Box>
    </Box>
  );
};

export default Home;
