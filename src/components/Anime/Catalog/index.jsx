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

  const backup_api = "https://anime-api-production-bc3d.up.railway.app/";
  const proxy = "https://cors-anywhere-aifwkw.fly.dev/";

  const fetchTopRatedAnime = async () => {
    setTopLoading(true);
    setTopError(null);

    try {
      const response = await fetch(`${proxy}${backup_api}/api/most-popular`);
      const data = await response.json();
      setTopRatedAnime(data.results.data);
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
      const response = await fetch(`${proxy}${backup_api}/api/top-upcoming`);
      const data = await response.json();
      setNewAnime(data.results.data);
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
      const response = await fetch(`${proxy}${backup_api}/api/completed`);
      const data = await response.json();
      setRecentlyCompletedAnime(data.results.data);
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
          base: "90%",
          sm: "95%",
          xl: "85%",
          "2xl": "container.xl",
        }}
        margin="auto"
      >
        <Grid
          gridTemplateColumns={{
            base: "100%",
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
              heading="Upcoming"
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
