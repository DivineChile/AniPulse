import { useState, useEffect } from "react";
import { Box, SimpleGrid, Tabs } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import Error from "../../ErrorPage/Error";

// Utility to divide episodes into groups of 30
const chunkEpisodes = (arr, size = 30) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

const EpisodeList = ({ items, itemId }) => {
  if (!items || items.length === 0) {
    return <Error bg="none" msg="No Episodes found." pos="absolute" />;
  }

  const hasTabs = items.length > 30;
  const episodeChunks = hasTabs ? chunkEpisodes(items, 30) : [items];

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

  const renderEpisodes = (episodes, chunkIndex = 0) => (
    <SimpleGrid columns={{ base: 3, md: 4, lg: 6 }} gap={2} mt={3}>
      {episodes.map((ep, index) => {
        const globalIndex = chunkIndex * 30 + index;

        return (
          <Box
            key={globalIndex}
            as={ReactRouterLink}
            to={`/watch/${itemId[globalIndex]}`}
            border="1px solid var(--text-color)"
            borderRadius="6px"
            p="6px"
            fontSize="15px"
            textAlign="center"
            color="var(--text-color)"
            _hover={{
              bg: "var(--hover-bg)",
              textDecor: "none",
              color: "var(--link-hover-color)",
              borderColor: "var(--link-hover-color)",
            }}
            transition="0.2s ease"
          >
            EP {globalIndex + 1}
          </Box>
        );
      })}
    </SimpleGrid>
  );

  return (
    <>
      {!hasTabs && renderEpisodes(items)}

      {hasTabs && (
        <Tabs.Root
          variant="subtle"
          // fitted
          lazyMount
          unmountOnExit
          value={activeTab}
          onValueChange={handleTabChange}
        >
          <Tabs.List gap={3} flexWrap="wrap">
            {episodeChunks.map((chunk, index) => (
              <Tabs.Trigger
                key={index}
                value={index}
                cursor="pointer"
                color="var(--link-color)"
                bg={
                  activeTab == index
                    ? "var(--accent-color)"
                    : "var(--primary-background-color)"
                }
                w="120px"
                m="0 auto"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {index * 30 + 1} – {(index + 1) * 30}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          <Box pos="relative" minH="250px" width="full">
            {episodeChunks.map((chunk, index) => (
              <Tabs.Content
                key={index}
                value={index}
                position="absolute"
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
                {renderEpisodes(chunk, index)}
              </Tabs.Content>
            ))}
          </Box>
        </Tabs.Root>
      )}
    </>
  );
};

export default EpisodeList;
