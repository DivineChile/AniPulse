import { Box, Container, Grid, GridItem } from "@chakra-ui/react";
import TopAnime from "../TopAnime/TopAnime";
import { useEffect, useState } from "react";

const Catalog = () => {
  const [topLoading, setTopLoading] = useState(false);
  const [topError, setTopError] = useState(null);
  const [topRatedAnime, setTopRatedAnime] = useState([]);
  const [newLoading, setNewLoading] = useState(false);
  const [newError, setNewError] = useState(null);
  const [newAnime, setNewAnime] = useState([]);
  const [recentLoading, setRecentLoading] = useState(false);
  const [recentError, setRecentError] = useState(null);
  const [recentlyCompletedAnime, setRecentlyCompletedAnime] = useState([]);

  const backup_api = "https://aniwatch-api-gamma-wheat.vercel.app/";
  const proxy = "https://fluoridated-recondite-coast.glitch.me/";

  const fetchTopRatedAnime = async () => {
    setTopLoading(true);
    setTopError(null);

    try {
      const response = await fetch(
        `${proxy}${backup_api}/api/v2/hianime/category/most-popular`
      );
      const data = await response.json();
      setTopRatedAnime(data.data.animes);
      console.log(topRatedAnime);
    } catch (err) {
      setTopError("Failed to load data. Please try again.");
    } finally {
      setTopLoading(false);
    }
  };

  const fetchNewAnime = async () => {
    setNewLoading(true);
    setNewError(null);

    try {
      const response = await fetch(
        `${proxy}${backup_api}/api/v2/hianime/category/recently-added`
      );
      const data = await response.json();
      setNewAnime(data.data.animes);
    } catch (err) {
      setNewError("Failed to load data. Please try again.");
    } finally {
      setNewLoading(false);
    }
  };

  const fetchRecentlyCompletedAnime = async () => {
    setRecentLoading(true);
    setRecentError(null);

    try {
      const response = await fetch(
        `${proxy}${backup_api}/api/v2/hianime/category/completed`
      );
      const data = await response.json();
      setRecentlyCompletedAnime(data.data.animes);
    } catch (err) {
      setRecentError("Failed to load data. Please try again.");
    } finally {
      setRecentLoading(false);
    }
  };

  useEffect(() => {
    fetchTopRatedAnime();
    fetchNewAnime();
    fetchRecentlyCompletedAnime();
  }, []);

  return (
    <Box bg="var(--primary-background-color)" pb="80px">
      <Box
        maxW={{
          base: "85%",
          sm: "95%",
          xl: "85%",
          "2xl": "container.xl",
        }}
        margin="auto"
      >
        <Grid
          gridTemplateColumns={{
            base: "100%",
            sm: "repeat(2, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={{ base: "20px 0", sm: "20px", md: "25px 25px" }}
        >
          <GridItem display="flex" justifyContent="center">
            <TopAnime
              data={topRatedAnime}
              heading="Top Rated Anime"
              numbers={true}
              loading={topLoading}
              error={topError}
            />
          </GridItem>
          <GridItem display="flex" justifyContent="center">
            <TopAnime
              data={newAnime}
              heading="New"
              numbers={false}
              loading={newLoading}
              error={newError}
            />
          </GridItem>
          <GridItem display="flex" justifyContent="center">
            <TopAnime
              data={recentlyCompletedAnime}
              heading="Recently Completed"
              numbers={false}
              loading={recentLoading}
              error={recentError}
            />
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};

export default Catalog;
