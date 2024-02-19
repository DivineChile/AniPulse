import { Box } from "@chakra-ui/react";
import Hero from "../../components/Hero/Hero";
import RecentUpdate from "../../components/RecentUpdate/RecentUpdate";

const Home = () => {
  document.title = "Home - AniPulse";

  return (
    <Box>
      <Box>
        {/* Hero */}
        <Hero />
        <RecentUpdate />
      </Box>
    </Box>
  );
};

export default Home;
