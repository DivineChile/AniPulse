import { Box } from "@chakra-ui/react";
import Hero from "../../components/Hero/Hero";
import RecentUpdate from "../../components/RecentUpdate/RecentUpdate";
import Upcoming from "../../components/Upcoming/Upcoming";
import PopularList from "../../components/PopularList/PopularList";

const Home = () => {
  document.title = "Home - AniPulse";

  return (
    <Box>
      <Box>
        {/* Hero */}
        <Hero />
        <RecentUpdate />
        <Upcoming />
        <PopularList />
      </Box>
    </Box>
  );
};

export default Home;
