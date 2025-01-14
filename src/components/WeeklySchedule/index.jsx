import React, { useState, useEffect } from "react";
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
  const [selectedDate, setSelectedDate] = useState(""); // Tracks the selected date
  const [activeTabIndex, setActiveTabIndex] = useState(0); // Tracks the active tab index
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [scheduledAnimes, setScheduledAnimes] = useState([]);

  const backup_api = "https://aniwatch-api-gamma-wheat.vercel.app/";
  const proxy = "https://fluoridated-recondite-coast.glitch.me/";

  // Calculate the week dates and set the default tab to today's date
  useEffect(() => {
    const startOfWeek = new Date();
    startOfWeek.setHours(0, 0, 0, 0);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Adjust to the previous Sunday (or Monday if necessary)

    const weekDates = [];
    let todayIndex = 0;
    const todayDate = new Date().toISOString().split("T")[0]; // Get today's date in yyyy-mm-dd format

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);

      const formattedDate = date.toISOString().split("T")[0]; // yyyy-mm-dd
      weekDates.push({
        day: date.toLocaleString("en-US", { weekday: "short" }),
        date: formattedDate,
        displayDate: date.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
        }),
      });

      if (formattedDate === todayDate) {
        todayIndex = i; // Today's date will be the active tab
      }
    }

    setDates(weekDates);
    setSelectedDate(weekDates[todayIndex]?.date);
    setActiveTabIndex(todayIndex); // Set today's tab as the default
  }, []);

  // Fetch scheduled anime data when the selected date changes
  useEffect(() => {
    if (!selectedDate) return;

    const fetchScheduledAnimes = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${proxy}${backup_api}/api/v2/hianime/schedule?date=${selectedDate}`
        );
        const data = await response.json();

        // Log the response to debug the data
        console.log("API Response:", data);

        if (data.success) {
          setScheduledAnimes(data.data.scheduledAnimes || []);
        } else {
          throw new Error("Failed to fetch anime data.");
        }
      } catch (err) {
        setError("Failed to load anime data. Please try again.");
        console.error("Error fetching anime data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchScheduledAnimes();
  }, [selectedDate]);

  // Group animes by airing date
  const groupAnimeByDate = (animeList) => {
    const grouped = {};
    animeList.forEach((anime) => {
      const airingDate = new Date(anime.airingTimestamp)
        .toISOString()
        .split("T")[0]; // yyyy-mm-dd
      if (!grouped[airingDate]) grouped[airingDate] = [];
      grouped[airingDate].push(anime);
    });
    return grouped;
  };

  const animeByDate = groupAnimeByDate(scheduledAnimes);

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
        <Box mb="20px">
          <Heading
            fontSize="37.97px"
            lineHeight="44px"
            letterSpacing="1.5px"
            fontWeight="700"
            color="var(--text-color)"
            textTransform="uppercase"
            fontFamily="var(--font-family)"
          >
            Weekly Schedule
          </Heading>
        </Box>

        <Tabs
          isLazy
          index={activeTabIndex}
          onChange={(index) => {
            setActiveTabIndex(index);
            setSelectedDate(dates[index]?.date);
          }}
        >
          <TabList
            display="flex"
            justifyContent="space-evenly"
            bg="#000"
            borderTopLeftRadius="10px"
            borderTopRightRadius="10px"
          >
            {dates.map((date, index) => (
              <Tab
                key={index}
                py="20px"
                _selected={{ color: "var(--accent-color)" }}
                _hover={{ color: "var(--accent-color)" }}
              >
                <VStack>
                  <Text
                    fontSize="16.88px"
                    fontWeight="400"
                    lineHeight="20px"
                    letterSpacing="0.5px"
                    color="var(--text-color)"
                  >
                    {date.displayDate}
                  </Text>
                  <Text
                    fontSize="27.77px"
                    fontWeight="400"
                    lineHeight="33px"
                    letterSpacing="1.5px"
                    textTransform="uppercase"
                  >
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
              <TabPanel key={index}>
                <VStack align="start" spacing={4}>
                  {loading && <Spinner />}
                  {error && <Text color="red.500">{error}</Text>}
                  {!loading && !error && animeByDate[date.date]?.length ? (
                    animeByDate[date.date].map((anime) => (
                      <Box
                        key={anime.id}
                        p={4}
                        borderBottom="1px solid #242424"
                        borderRadius="md"
                        w="100%"
                      >
                        <Text fontSize="sm" color="gray.500">
                          {anime.time}
                        </Text>
                        <ChakraLink
                          as={ReactRouterLink}
                          to={`/anime/${anime.id}`}
                          fontSize="lg"
                          fontWeight="bold"
                          color="blue.500"
                          _hover={{ textDecoration: "underline" }}
                        >
                          {anime.name}
                        </ChakraLink>
                        <Text fontSize="sm" color="gray.600">
                          Episode {anime.episode}
                        </Text>
                      </Box>
                    ))
                  ) : (
                    <Text>No anime scheduled for this day.</Text>
                  )}
                </VStack>
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default WeeklySchedule;
