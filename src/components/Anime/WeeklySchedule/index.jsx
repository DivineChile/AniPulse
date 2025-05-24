import { useState, useEffect } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
  Text,
  Box,
  Link as ChakraLink,
  Spinner,
  Heading,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

const WeeklySchedule = () => {
  const [dates, setDates] = useState([]);
  const [scheduledAnimes, setScheduledAnimes] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);

  const backup_api = "https://aniwatch-api-gamma-wheat.vercel.app/";
  const proxy = "https://fluoridated-recondite-coast.glitch.me/";

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const weekDates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - today.getDay() + i); // Adjusted (Removed +1)
      return {
        day: date.toLocaleString("en-US", { weekday: "short" }),
        date: date.toISOString().split("T")[0],
        displayDate: date.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
        }),
      };
    });

    setDates(weekDates);

    const todayIndex = weekDates.findIndex(
      (d) => d.date === today.toISOString().split("T")[0]
    );

    if (todayIndex !== -1) {
      setSelectedTab(todayIndex);
      fetchAnimeSchedule(weekDates[todayIndex].date);
    }
  }, []);

  // Fetch scheduled anime data when the selected date changes
  const fetchAnimeSchedule = async (date) => {
    if (!date || scheduledAnimes[date]) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${proxy}${backup_api}/api/v2/hianime/schedule?date=${date}`
      );
      const data = await response.json();
      if (data.success) {
        setScheduledAnimes((prev) => ({
          ...prev,
          [date]: data.data.scheduledAnimes || [],
        }));
      } else {
        throw new Error("Failed to fetch anime data.");
      }
    } catch (err) {
      setError("Failed to load anime data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box bg="var(--primary-background-color)" pb="80px">
      <Box
        maxW={{ base: "85%", sm: "95%", xl: "85%", "2xl": "container.xl" }}
        margin="auto"
      >
        <Heading
          fontSize="38px"
          fontWeight="700"
          color="var(--text-color)"
          textTransform="uppercase"
          mb="20px"
        >
          Weekly Schedule
        </Heading>
        <Tabs
          isLazy
          index={selectedTab}
          onChange={(index) => {
            setSelectedTab(index);
            fetchAnimeSchedule(dates[index]?.date);
          }}
        >
          <TabList display="flex" justifyContent="space-evenly" bg="#000">
            {dates.map((date, index) => (
              <Tab
                key={index}
                py="20px"
                _selected={{ color: "var(--accent-color)" }}
              >
                <VStack>
                  <Text fontSize="17px" color="var(--text-color)">
                    {date.displayDate}
                  </Text>
                  <Text fontSize="28px" fontWeight="bold">
                    {date.day}
                  </Text>
                </VStack>
              </Tab>
            ))}
          </TabList>
          <TabPanels bg="grey">
            <Box
              display="flex"
              justifyContent="space-between"
              py="20px"
              px="20px"
            >
              <Heading
                fontSize="20px"
                fontWeight="700"
                lineHeight="22px"
                letterSpacing="1.5px"
                color="var(--text-color)"
                fontFamily="var(--font-family)"
              >
                Anime Details
              </Heading>

              <Heading
                fontSize="20px"
                fontWeight="700"
                lineHeight="22px"
                letterSpacing="1.5px"
                color="var(--text-color)"
                fontFamily="var(--font-family)"
              >
                Episode
              </Heading>
            </Box>
            {dates.map((date, index) => (
              <TabPanel key={index} p={4}>
                {loading && selectedTab === index && <Spinner />}
                {error && selectedTab === index && (
                  <Text color="red.500">{error}</Text>
                )}
                {(scheduledAnimes[date.date] || []).map((anime) => (
                  <Box
                    key={anime.id}
                    p={4}
                    borderBottom="1px solid #242424"
                    w="100%"
                  >
                    <Text fontSize="sm" color="gray.500">
                      {anime.airingTime || "Unknown Time"}
                    </Text>
                    <ChakraLink
                      as={ReactRouterLink}
                      to={`/anime/${anime.id}`}
                      fontSize="lg"
                      fontWeight="bold"
                      color="blue.500"
                    >
                      {anime.name}
                    </ChakraLink>
                    <Text fontSize="sm" color="gray.600">
                      Episode {anime.episode}
                    </Text>
                  </Box>
                ))}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default WeeklySchedule;
