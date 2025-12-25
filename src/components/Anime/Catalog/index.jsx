import { Box, Flex, Heading, Tabs } from "@chakra-ui/react";
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

  // -----------------------------
  // ✅ LOAD DEFAULT TAB FROM LOCAL STORAGE
  // -----------------------------
  const [activeTab, setActiveTab] = useState(() => {
    const saved = localStorage.getItem("episodeTabIndex");
    return saved ? Number(saved) : 0;
  });

  // -----------------------------
  // ✅ SAVE ACTIVE TAB WHEN CHANGED
  // -----------------------------
  const handleTabChange = (val) => {
    setActiveTab(val.value);
    localStorage.setItem("episodeTabIndex", val.value);
  };

  const fetchCatalogAnimes = async () => {
    setCatalogLoading(true);
    setCatalogError(null);

    try {
      const data = await cacheFetch(
        "api/hianime/home", // endpoint to fetch from backend
        { cacheKey: "homeData" } // options with cacheKey
      );
      //

      setTopRatedAnime(data?.topAiring || []);
      setRecentlyCompletedAnime(data?.recentlyCompleted || []);
      setNewAnime(data?.recentlyAdded || []);
    } catch (err) {
      setCatalogError("Failed to load data. Please try again.");
    } finally {
      setCatalogLoading(false);
    }
  };

  useEffect(() => {
    fetchCatalogAnimes();
  }, []);

  const TabsData = [
    {
      id: 0,
      title: "Top Airing",
      icon: <Crown size={20} color="var(--accent-color)" />,
      data: topRatedAnime,
      isRanked: true,
    },
    {
      id: 1,
      title: "Upcoming",
      icon: <CalendarClock size={20} color="var(--accent-color)" />,
      data: newAnime,
      isRanked: false,
    },
    {
      id: 2,
      title: "Recently Completed",
      icon: <CheckCircle2 size={20} color="var(--accent-color)" />,
      data: recentlyCompletedAnime,
      isRanked: false,
    },
  ];

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
        <Tabs.Root
          lazyMount
          unmountOnExit
          value={activeTab}
          onValueChange={handleTabChange}
          variant="enclosed"
          w="100%"
          bg="rgba(0, 0, 0, 1)"
          rounded="md"
          p={{ base: 3, md: 4 }}
        >
          <Tabs.List gap={3} flexWrap="wrap" w="full" p={2} mb={2}>
            {TabsData.map((data, i) => (
              <Tabs.Trigger key={i} value={i}>
                <Flex gap="10px" alignItems="center" justifyContent="center">
                  {data.icon}
                  <Heading
                    fontFamily="var(--font-family)"
                    fontWeight={{ base: "300", md: "400" }}
                    fontSize={{ base: "17.25px", lg: "19.18px" }}
                    lineHeight={{ base: "25.4px", md: "27px" }}
                    letterSpacing="1.5px"
                    color="var(--text-color)"
                  >
                    {data.title}
                  </Heading>
                </Flex>
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          <Tabs.ContentGroup
            borderTop="1px solid var(--text-secondary)"
            p={{ base: 1, md: 2 }}
          >
            {TabsData.map((data, i) => (
              <Tabs.Content
                key={i}
                value={i}
                inset="0"
                _open={{
                  animationName: "fade-in, scale-in",
                  animationDuration: "300ms",
                }}
                _closed={{
                  animationName: "fade-out, scale-out",
                  animationDuration: "120ms",
                }}
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  w={{ base: "100%", md: "100%", lg: "40%" }}
                >
                  <TopAnime
                    data={data.data}
                    heading={data.title}
                    icon={data.icon}
                    numbers={data.isRanked}
                    loading={catalogLoading}
                    error={catalogError}
                  />
                </Box>
              </Tabs.Content>
            ))}
          </Tabs.ContentGroup>
        </Tabs.Root>
      </Box>
    </Box>
  );
};

export default Catalog;
