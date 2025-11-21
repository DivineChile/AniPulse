import { useState } from "react";
import { Box, SimpleGrid, Flex, Button, Text } from "@chakra-ui/react";
import { Tooltip } from "../../ui/tooltip";
import { Link as ReactRouterLink } from "react-router-dom";
import Error from "../../ErrorPage/Error";

// Utility to divide episodes into groups (pagination)
const chunkEpisodes = (arr, size = 30) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

const EpisodeList = ({ items, itemId }) => {
  if (!items || items.length === 0) {
    return <Error bg="none" msg="No Episodes found." pos="relative" />;
  }

  const episodeChunks = chunkEpisodes(items, 30); // max 30 per "page"
  const [activePage, setActivePage] = useState(0);

  const handleNextPage = () => {
    if (activePage < episodeChunks.length - 1)
      setActivePage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (activePage > 0) setActivePage((prev) => prev - 1);
  };

  const renderEpisodeCard = (ep, index) => {
    const globalIndex = activePage * 30 + index;
    return (
      <Tooltip
        content={ep.title || `Episode ${globalIndex + 1}`}
        contentProps={{ css: { "--tooltip-bg": "var(--link-color)" } }}
        positioning={{ placement: "top" }}
        showArrow
      >
        <Box
          key={globalIndex}
          as={ReactRouterLink}
          to={`/watch/${itemId[globalIndex]}`}
          borderRadius="8px"
          p="6px"
          bg="var(--primary-background-color)"
          border="1px solid var(--secondary-color)"
          textAlign="center"
          color="var(--text-color)"
          fontWeight="500"
          fontSize={{ base: "11px", sm: "12px", md: "13px" }}
          transition="all 0.25s ease"
          _hover={{
            transform: "scale(1.05)",
            bg: "var(--accent-color)",
            color: "white",
            borderColor: "var(--accent-color)",
          }}
        >
          <Text fontSize={{ base: "12px", md: "14px" }} mb="4px">
            EP {globalIndex + 1}
          </Text>
        </Box>
      </Tooltip>
    );
  };

  return (
    <Box>
      {/* Episodes Grid */}
      <SimpleGrid columns={{ base: 4, sm: 5, md: 6 }} gap={2}>
        {episodeChunks[activePage].map(renderEpisodeCard)}
      </SimpleGrid>
      {/* Pagination Controls */}
      {episodeChunks.length > 1 && (
        <Flex justify="center" align="center" mt={4} gap={2}>
          <Button
            onClick={handlePrevPage}
            disabled={activePage === 0}
            bg="var(--primary-background-color)"
            color="var(--text-color)"
            _hover={{ bg: "var(--link-hover-color)" }}
            size="sm"
          >
            Prev
          </Button>
          <Text fontSize="12px" color="var(--text-color)">
            Page {activePage + 1} of {episodeChunks.length}
          </Text>
          <Button
            onClick={handleNextPage}
            disabled={activePage === episodeChunks.length - 1}
            bg="var(--primary-background-color)"
            color="var(--text-color)"
            _hover={{ bg: "var(--link-hover-color)" }}
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
