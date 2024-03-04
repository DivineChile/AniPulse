import { Box } from "@chakra-ui/react";
import Hero from "../../components/Hero/Hero";
import RecentUpdate from "../../components/RecentUpdate/RecentUpdate";
import Upcoming from "../../components/Upcoming/Upcoming";

const Home = () => {
  document.title = "Home - AniPulse";

  return (
    <Box>
      <Box>
        {/* Hero */}
        <Hero />
        <RecentUpdate />
        <Upcoming />
      </Box>
    </Box>
  );
};

export default Home;
