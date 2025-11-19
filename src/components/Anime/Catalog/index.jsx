import { Box, Container, Grid, GridItem } from "@chakra-ui/react";
import TopAnime from "../TopAnime/TopAnime";
import { useEffect, useState } from "react";
import { CalendarClock, CheckCircle2, Crown } from "lucide-react";
import { cacheFetch } from "../../../utils/cacheFetch";

const Catalog = () => {
  const [catalogLoading, setCatalogLoading] = useState(false);
  const [catalogError, setCatalogError] = useState(null);
  const [topRatedAnime, setTopRatedAnime] = useState([]);
  const [newAnime, setNewAnime] = useState([]);
  const [recentlyCompletedAnime, setRecentlyCompletedAnime] = useState([]);

  const backup_api = "https://anime-api-production-bc3d.up.railway.app/";
  const proxy = "https://cors-anywhere-aifwkw.fly.dev/";

  const fetchCatalogAnimes = async () => {
    setCatalogLoading(true);
    setCatalogError(null);

    try {
      const data = await cacheFetch(
        "homeData", // key used for home page data in localStorage
        `${proxy}${backup_api}api`, // fallback API endpoint
        10 * 60 * 1000 // cache duration (10 minutes)
      );
      setTopRatedAnime(data.results.mostPopular || []);
      setRecentlyCompletedAnime(data.results.latestCompleted || []);
      setNewAnime(data.results.topUpcoming || []);
    } catch (err) {
      setCatalogError("Failed to load data. Please try again.");
    } finally {
      setCatalogLoading(false);
    }
  };

  useEffect(() => {
    fetchCatalogAnimes();
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
              icon={<Crown size={30} color="var(--primary-color)" />}
              numbers={true}
              loading={catalogLoading}
              error={catalogError}
            />
          </GridItem>
          <GridItem display="flex" justifyContent="center">
            <TopAnime
              data={newAnime}
              heading="Upcoming"
              icon={<CalendarClock size={30} color="var(--primary-color)" />}
              numbers={false}
              loading={catalogLoading}
              error={catalogError}
            />
          </GridItem>
          <GridItem display="flex" justifyContent="center">
            <TopAnime
              data={recentlyCompletedAnime}
              heading="Recently Completed"
              icon={<CheckCircle2 size={30} color="var(--primary-color)" />}
              numbers={false}
              loading={catalogLoading}
              error={catalogError}
            />
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};

export default Catalog;
