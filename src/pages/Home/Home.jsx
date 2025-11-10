import { Box } from "@chakra-ui/react";

import Hero from "../../components/Anime/Hero/Hero";
import RecentUpdate from "../../components/Anime/RecentUpdate/RecentUpdate";
import Upcoming from "../../components/Upcoming/Upcoming";
import PopularList from "../../components/Anime/PopularList/PopularList";
import Footer from "../../components/Footer/Footer";
import Catalog from "../../components/Anime/Catalog";
import WeeklySchedule from "../../components/Anime/WeeklySchedule";

const Home = () => {
  document.title = `Home - AniPulse`;

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
