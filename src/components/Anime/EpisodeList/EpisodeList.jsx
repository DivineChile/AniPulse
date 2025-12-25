import { useState } from "react";
import { Box, SimpleGrid, Flex, Button, Text } from "@chakra-ui/react";
import { Tooltip } from "../../ui/tooltip";
import { Link as ReactRouterLink, useLocation } from "react-router-dom";
import Error from "../../ErrorPage/Error";
import { ArrowRight } from "lucide-react";

// Pagination utility
const chunkEpisodes = (arr, size = 30) => {
  const chunks = [];
  for (let i = 0; i < arr?.length; i += size)
    chunks.push(arr.slice(i, i + size));
  return chunks;
};

const location = window.location;
console.log(location.pathname);

// Normalize input into anime / tv / movie structure
const normalizeData = (items) => {
  // MOVIE (no episodes)
  if (location.pathname.includes("/movie")) {
    return {
      type: "movie",
      seasons: null,
    };
  }

  // TV SHOW (grouped by season)
  if (location.pathname.includes("/tv")) {
    const grouped = items.reduce((acc, ep) => {
      const s = ep.seasonNumber || 1;
      if (!acc[s]) acc[s] = [];
      acc[s].push(ep);
      return acc;
    }, {});

    return {
      type: "tv",
      seasons: grouped,
    };
  }

  // ANIME (flat list)
  if (Array.isArray(items)) {
    return {
      type: "anime",
      seasons: { 1: items },
    };
  }

  return null;
};

const EpisodeList = ({ items, itemId, streaming, activeEP }) => {
  const normalized = normalizeData(items);

  if (!normalized) {
    return <Error bg="none" msg="No episodes found." pos="relative" />;
  }

  // MOVIE MODE
  if (normalized.type === "movie") {
    return (
      <Button
        w="100%"
        variant="subtle"
        as={ReactRouterLink}
        to={`/watch/${itemId}`}
      >
        Watch Now <ArrowRight size={20} color="white" />
      </Button>
    );
  }

  // TV or ANIME MODE
  const seasons = Object.keys(normalized.seasons);
  const [activeSeason, setActiveSeason] = useState(seasons[0]);

  const episodes = normalized.seasons[activeSeason];
  const episodeChunks = chunkEpisodes(episodes, 30);
  const [activePage, setActivePage] = useState(0);

  const handleNext = () =>
    activePage < episodeChunks.length - 1 && setActivePage((prev) => prev + 1);

  const handlePrev = () => activePage > 0 && setActivePage((prev) => prev - 1);

  const renderEpisodeCard = (ep, index) => {
    const globalIndex = activePage * 30 + index;
    const isActive =
      streaming &&
      (ep.episodeId?.endsWith(`${activeEP}`) || ep.number === Number(activeEP));

    return (
      <Tooltip
        key={globalIndex}
        content={ep.title || `Episode ${globalIndex + 1}`}
        contentProps={{ css: { "--tooltip-bg": "var(--accent-color)" } }}
        positioning={{ placement: "top" }}
        showArrow
      >
        <Box
          as={ReactRouterLink}
          to={`/watch/${ep.watchId || itemId[globalIndex]}`}
          borderRadius="8px"
          p="6px"
          bg={isActive ? "var(--accent-color)" : "var(--card-background-color)"}
          border="1px solid rgba(255,255,255,0.1)"
          // border="1px solid var(--secondary-color)"
          textAlign="center"
          color={isActive ? "var(--text-color)" : "var(--text-color)"}
          fontWeight="500"
          fontSize={{ base: "11px", sm: "12px", md: "13px" }}
          transition="all 0.25s ease"
          _hover={{
            transform: "scale(1.05)",
            bg: "var(--link-hover-color)",
            color: "var(--primary-background-color)",
            borderColor: "var(--link-hover-color)",
          }}
        >
          <Text>{ep.number || globalIndex + 1}</Text>
        </Box>
      </Tooltip>
    );
  };

  return (
    <Box>
      {/* Season selection for TV shows */}
      {normalized.type === "tv" && (
        <Flex gap={2} mb={4} flexWrap="wrap">
          {seasons.map((s) => (
            <Button
              key={s}
              onClick={() => {
                setActiveSeason(s);
                setActivePage(0);
              }}
              size="sm"
              bg={
                activeSeason === s
                  ? "var(--accent-color)"
                  : "var(--primary-background-color)"
              }
              color={activeSeason === s ? "white" : "var(--text-color)"}
              border="1px solid var(--secondary-color)"
              _hover={{
                bg: "var(--accent-color)",
                color: "white",
                borderColor: "var(--accent-color)",
              }}
            >
              Season {s}
            </Button>
          ))}
        </Flex>
      )}

      {/* Episodes Grid */}
      <SimpleGrid columns={{ base: 4, sm: 5, md: 6 }} gap={3}>
        {episodeChunks[activePage]?.map(renderEpisodeCard)}
      </SimpleGrid>

      {/* Pagination */}
      {episodeChunks.length > 1 && (
        <Flex justify="center" align="center" mt={4} gap={2}>
          <Button onClick={handlePrev} disabled={activePage === 0} size="sm">
            Prev
          </Button>
          <Text fontSize="12px">
            Page {activePage + 1} of {episodeChunks.length}
          </Text>
          <Button
            onClick={handleNext}
            disabled={activePage === episodeChunks.length - 1}
            size="sm"
          >
            Next
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default EpisodeList;
