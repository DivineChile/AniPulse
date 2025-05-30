import { useState, useEffect } from "react";
import { cacheFetch } from "../../../../utils/cacheFetch";

import {
  Skeleton,
  Tabs,
  Tab,
  TabList,
  Button,
  Text,
  Box,
  TabPanels,
  TabPanel,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  SimpleGrid,
  useBreakpointValue,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

const SeasonTabs = ({ tvId }) => {
  const [episodesData, setEpisodesData] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSeasons, setExpandedSeasons] = useState({});
  const [showMore, setShowMore] = useState(false);
  const isTV = location.pathname.includes("/tv");
  const BEARER_TOKEN = import.meta.env.VITE_TMDB_BEARER_TOKEN;

  const isMobile = useBreakpointValue({ base: true, lg: false }); // 👈 Move it here
  const headers = {
    Authorization: `Bearer ${BEARER_TOKEN}`,
    "Content-Type": "application/json;charset=utf-8",
  };

  const fetchEpisodes = async (seasonNumber) => {
    if (!isTV || !tvId) return;
    if (episodesData[seasonNumber]) return;

    const url = `https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNumber}?api_key=${
      import.meta.env.VITE_TMDB_API_KEY
    }?language=en-US`;
    try {
      const data = await cacheFetch(
        `tv_season_${tvId}_${seasonNumber}`,
        url,
        60 * 60 * 1000, // 1 hour cache
        { headers }
      );
      setEpisodesData((prev) => ({ ...prev, [seasonNumber]: data.episodes }));
    } catch (err) {
      console.error(`Failed to fetch episodes for season${seasonNumber}`, err);
    }
  };

  useEffect(() => {
    const fetchSeasons = async () => {
      if (!isTV || !tvId) return;

      const url = `https://api.themoviedb.org/3/tv/${tvId}?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }?language=en-US`;
      try {
        const data = await cacheFetch(
          `tv_seasons_${tvId}`,
          url,
          60 * 60 * 1000, // 1 hour cache
          { headers }
        );
        setSeasons(data.seasons);
        setLoading(false);

        if (data.seasons.length > 0) {
          fetchEpisodes(data.seasons[0].season_number);
        }
      } catch (err) {
        console.error("Failed to fetch seasons", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchSeasons();
  }, [tvId]);

  if (loading) {
    return (
      <Box mt={8}>
        <Skeleton height="40px" mb={4} />
        <Skeleton height="200px" />
      </Box>
    );
  }
  if (error) {
    return (
      <Box mt={8} color="red.500">
        <Text>Error loading seasons: {error.message}</Text>
      </Box>
    );
  }

  return (
    <Tabs
      variant="unstyled"
      colorScheme="purple"
      isLazy
      onChange={(index) => {
        const seasonNum = seasons[index]?.season_number;
        fetchEpisodes(seasonNum);
      }}
      w="100%"
    >
      <TabList
        mb={4}
        overflowX={{ base: "unset", lg: "auto" }}
        display={{ base: "flex", lg: "flex" }}
        flexWrap="wrap"
        gap={4}
        sx={{
          "::-webkit-scrollbar": { display: "none" },
        }}
      >
        {seasons.map((season) => (
          <Tab
            key={season.id}
            color="whiteAlpha.800"
            _selected={{
              color: "yellow.400",
              bg: "var(--primary-background-color)",
            }}
            textAlign="center"
            border="1px solid var(--text-secondary)"
            py={3}
            px={6}
          >
            S{season.season_number}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {seasons.map((season) => {
          const episodes = episodesData[season.season_number];
          const showAll = expandedSeasons[season.season_number];
          const hasMoreThanFive = episodes?.length > 5;
          const displayedEpisodes = showAll ? episodes : episodes?.slice(0, 5);
          return (
            <TabPanel
              key={season.id}
              bg={"var(--primary-background-color)"}
              p={4}
              borderRadius="md"
            >
              {episodesData[season.season_number] ? (
                <>
                  {isMobile ? (
                    // ✅ Mobile: grid of episode numbers
                    <SimpleGrid columns={[4, 5]} spacing={{ base: 4, md: 3 }}>
                      {loading && (
                        <Text color="var(--accent-color)">Loading...</Text>
                      )}
                      {episodesData[season.season_number].map((episode) => (
                        <ChakraLink
                          as={ReactRouterLink}
                          to={`/watch/${tvId}&season=${season.season_number}&episode=${episode.episode_number}`}
                          key={episode.id}
                          color="var(--text-color)"
                          bg="var(--card-background-color)"
                          size="sm"
                          borderRadius="none"
                          px={{ base: 2, md: 3 }}
                          py={{ base: 5, md: 3 }}
                          onClick={() =>
                            console.log(
                              `Watch Episode ${episode.episode_number} of Season ${season.season_number}`
                            )
                          }
                          fontFamily={"var(--body-font)"}
                          _hover={{
                            bg: "var(--link-hover-color)",
                          }}
                        >
                          E{episode.episode_number}
                        </ChakraLink>
                      ))}
                    </SimpleGrid>
                  ) : (
                    // ✅ Tablet/Desktop: Accordion view
                    <>
                      <Accordion allowToggle>
                        {displayedEpisodes.map((episode) => (
                          <AccordionItem
                            key={episode.id}
                            border="1px solid"
                            borderColor="gray.600"
                            borderRadius="md"
                            bg={
                              episode.still_path
                                ? `url(https://image.tmdb.org/t/p/original${episode.still_path})`
                                : "var(card-background-color)"
                            }
                            bgColor={
                              episode.still_path
                                ? "rgba(0,0,0,0.8)"
                                : "var(card-background-color)"
                            }
                            bgBlendMode={"overlay"}
                            bgSize="cover"
                            bgPosition="center"
                            bgRepeat="no-repeat"
                            mb={2}
                          >
                            <h2>
                              <AccordionButton
                                _expanded={{ color: "var(--accent-color)" }}
                                _hover={{ bg: "gray.700" }}
                                color="var(--text-color)"
                              >
                                <Box
                                  flex="1"
                                  textAlign="left"
                                  fontFamily="var(--body-font)"
                                >
                                  Episode {episode.episode_number}:{" "}
                                  {episode.name}
                                </Box>
                                <AccordionIcon />
                              </AccordionButton>
                            </h2>
                            <AccordionPanel
                              pb={4}
                              bg={
                                episode.still_path
                                  ? `url(https://image.tmdb.org/t/p/original${episode.still_path})`
                                  : "var(card-background-color)"
                              }
                              bgBlendMode={"overlay"}
                              bgColor={
                                episode.still_path
                                  ? "rgba(0,0,0,0.8)"
                                  : "var(card-background-color)"
                              }
                              bgSize="cover"
                              bgPosition="center"
                              bgRepeat="no-repeat"
                              color="whiteAlpha.800"
                              borderTop="1px solid"
                              borderColor="gray.600"
                            >
                              <Text mb={2} fontFamily="var(--body-font)">
                                <strong
                                  style={{ fontFamily: "var(--body-font)" }}
                                >
                                  Air Date:
                                </strong>{" "}
                                {episode.air_date || "Unknown"}
                              </Text>
                              <Text mb={2} fontFamily="var(--body-font)">
                                <strong
                                  style={{ fontFamily: "var(--body-font)" }}
                                >
                                  Overview:
                                </strong>{" "}
                                {episode.overview
                                  ? showMore
                                    ? episode.overview
                                    : episode.overview.length > 200
                                    ? `${episode.overview.slice(0, 100)}...`
                                    : episode.overview
                                  : "No overview available."}
                                {episode.overview &&
                                  episode.overview.length > 250 && (
                                    <Text
                                      as="span"
                                      color="var(--accent-color)"
                                      cursor="pointer"
                                      fontWeight="500"
                                      ml="5px"
                                      onClick={() =>
                                        setShowMore((prev) => !prev)
                                      }
                                      fontFamily={"var(--body-font)"}
                                    >
                                      {showMore ? "Show Less" : "Show More"}
                                    </Text>
                                  )}
                              </Text>
                              {episode.runtime && (
                                <Text mb={2} fontFamily="var(--body-font)">
                                  <strong
                                    style={{ fontFamily: "var(--body-font)" }}
                                  >
                                    Runtime:
                                  </strong>{" "}
                                  {episode.runtime} mins
                                </Text>
                              )}
                              <ChakraLink
                                as={ReactRouterLink}
                                to={`/watch/${tvId}&season=${season.season_number}&episode=${episode.episode_number}`}
                                mt={4}
                                background="var(--link-color)"
                                p={1.5}
                                _hover={{
                                  background: "var(--link-hover-color)",
                                  textDecor: "none",
                                }}
                                fontSize="14px"
                                onClick={() =>
                                  console.log(
                                    `Watch Episode ${episode.episode_number} of Season ${season.season_number}`
                                  )
                                }
                                fontFamily="var(--body-font)"
                              >
                                Watch Episode
                              </ChakraLink>
                            </AccordionPanel>
                          </AccordionItem>
                        ))}
                      </Accordion>

                      {hasMoreThanFive && (
                        <Box mt={4} textAlign="center">
                          <Button
                            colorScheme="yellow"
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setExpandedSeasons((prev) => ({
                                ...prev,
                                [season.season_number]:
                                  !prev[season.season_number],
                              }))
                            }
                            fontFamily={"var(--body-font)"}
                          >
                            {showAll ? "Show Less" : "Show All Episodes"}
                          </Button>
                        </Box>
                      )}
                    </>
                  )}
                </>
              ) : isMobile ? (
                <SimpleGrid columns={[4, 5]} spacing={3}>
                  {episodesData[season.season_number]?.map((episode, index) => (
                    <Skeleton key={index} height="30px"></Skeleton>
                  ))}
                </SimpleGrid>
              ) : (
                <SimpleGrid>
                  {displayedEpisodes?.map((_, index) => (
                    <Skeleton key={index} h="30px" w="100%"></Skeleton>
                  ))}
                </SimpleGrid>
              )}
            </TabPanel>
          );
        })}
      </TabPanels>
    </Tabs>
  );
};

export default SeasonTabs;
