import { useState, useEffect } from "react";
import {
  Tabs,
  VStack,
  Text,
  Box,
  Link as ChakraLink,
  Spinner,
  Heading,
  HStack,
  Flex,
  Image,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

const WeeklySchedule = () => {
  const [dates, setDates] = useState([]);
  const [scheduledAnimes, setScheduledAnimes] = useState({});
  const [loadingMap, setLoadingMap] = useState({});
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);

  const API = "https://anime-api-production-bc3d.up.railway.app";
  const proxy = "https://cors-anywhere-aifwkw.fly.dev/";

  /* -----------------------------------------------------
     ✅ Generate next 7 days from today (correct date)
  ------------------------------------------------------ */
  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const weekDates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      return {
        day: date.toLocaleString("en-US", { weekday: "short" }),
        date: date.toLocaleDateString("en-CA"),
        displayDate: date.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
        }),
      };
    });

    setDates(weekDates);
    setSelectedTab(0);

    fetchAnimeSchedule(weekDates[0].date);
  }, []);

  /* -----------------------------------------------------
     ✅ Fetch ONLY the schedule for a given day
  ------------------------------------------------------ */
  const fetchAnimeSchedule = async (date) => {
    if (!date || scheduledAnimes[date]) return;

    setLoadingMap((prev) => ({ ...prev, [date]: true }));
    setError(null);

    try {
      const res = await fetch(`${proxy}${API}/api/schedule?date=${date}`);
      const data = await res.json();

      if (!data.success) throw new Error("Bad API response");

      setScheduledAnimes((prev) => ({
        ...prev,
        [date]: data.results || [],
      }));
    } catch (err) {
      setError("Failed to load anime data.");
    } finally {
      setLoadingMap((prev) => ({ ...prev, [date]: false }));
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
          textTransform="capitalize"
          mb="20px"
        >
          Weekly Schedule
        </Heading>

        <Tabs.Root
          isLazy
          value={selectedTab}
          onValueChange={(index) => {
            setSelectedTab(index.value);
            const selectedDate = dates[index.value]?.date;
            fetchAnimeSchedule(selectedDate);
          }}
          variant="plain"
        >
          <Tabs.List
            display="flex"
            justifyContent="space-evenly"
            bg="#000"
            py={8}
          >
            {dates.map((date, index) => (
              <Tabs.Trigger
                key={index}
                value={index}
                py="20px"
                _selected={{ color: "var(--primary-color)" }}
              >
                <VStack>
                  <Text fontSize="17px" color="var(--text-color)">
                    {date.displayDate}
                  </Text>
                  <Text fontSize="28px" fontWeight="bold">
                    {date.day}
                  </Text>
                </VStack>
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          <Box bg={"var(--card-background-color)"}>
            <Box
              display="flex"
              justifyContent="space-between"
              py="20px"
              px="20px"
            >
              <Heading
                fontSize="20px"
                fontWeight="700"
                color="var(--text-color)"
              >
                Anime Details
              </Heading>
              <Heading
                fontSize="20px"
                fontWeight="700"
                color="var(--text-color)"
              >
                Episode
              </Heading>
            </Box>

            {dates.map((date, index) => (
              <Tabs.Content key={index} value={index} p={4}>
                {loadingMap[date.date] && <Spinner />}

                {!loadingMap[date.date] &&
                  (scheduledAnimes[date.date] || []).map((anime) => (
                    <ChakraLink
                      as={ReactRouterLink}
                      to={`/anime/${anime.id}`}
                      key={anime.id}
                      _hover={{ textDecor: "none" }}
                      w="100%"
                      borderBottom="1px solid var(--text-color)"
                    >
                      <HStack p={4} justifyContent="space-between" w="100%">
                        <Flex alignItems="center" gap="50px">
                          <Text
                            fontSize={{ base: "sm", md: "md" }}
                            color="var(--text-color)"
                          >
                            {anime.time || "Unknown Time"}
                          </Text>

                          <Flex alignItems="center">
                            <Heading
                              as="h3"
                              fontSize={{
                                base: "15.81px",
                                sm: "15px",
                                md: "18.77px",
                                lg: "20.63px",
                              }}
                              color="var(--text-color)"
                              fontWeight="400"
                              lineHeight={{ base: "22px", md: "36.5px" }}
                              letterSpacing="0.5px"
                            >
                              {anime.title?.length > 30
                                ? `${anime.title.slice(0, 40)}...`
                                : anime.title}
                            </Heading>
                          </Flex>
                        </Flex>

                        <Flex alignItems="center">
                          <Text
                            fontSize={{ base: "sm", md: "md" }}
                            color="var(--text-secondary)"
                          >
                            Episode {anime.episode_no}
                          </Text>
                        </Flex>
                      </HStack>
                    </ChakraLink>
                  ))}

                {!loadingMap[date.date] &&
                  (!scheduledAnimes[date.date] ||
                    scheduledAnimes[date.date].length === 0) && (
                    <Text color="var(--primary-color)" textAlign="center">
                      No anime scheduled for this day.
                    </Text>
                  )}
              </Tabs.Content>
            ))}
          </Box>
        </Tabs.Root>
      </Box>
    </Box>
  );
};

export default WeeklySchedule;
