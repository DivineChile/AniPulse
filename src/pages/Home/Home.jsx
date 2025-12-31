import { Box } from "@chakra-ui/react";

import Hero from "../../components/Anime/Hero/Hero";
import RecentUpdate from "../../components/Anime/RecentUpdate/RecentUpdate";
import Upcoming from "../../components/Upcoming/Upcoming";
import PopularList from "../../components/Anime/PopularList/PopularList";
import Footer from "../../components/Footer/Footer";
import Catalog from "../../components/Anime/Catalog";
import WeeklySchedule from "../../components/Anime/WeeklySchedule";
import GenresSection from "../../components/Anime/GenresSection/GenresSection";

const Home = () => {
  document.title = `Home - AniPulse`;

  return (
    <Box className="dark">
      <Box>
        {/* Hero */}
        <Hero />
        {/* Popular animes */}
        <PopularList />
        {/* Recent Updates */}
        <RecentUpdate />
        {/* Browse By Genres */}
        <GenresSection />
        {/* Upcoming Anime*/}
        {/* <Upcoming /> */}

        {/* <WeeklySchedule /> */}
        {/* <WeeklySchedule /> */}
        {/* Top Anime */}
        <Catalog />
        {/* Footer */}
        <Footer />
      </Box>
    </Box>
  );
};

export default Home;
