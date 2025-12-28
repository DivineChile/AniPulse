"use client";

import { useState, useEffect } from "react";
import {
  Select,
  Portal,
  createListCollection,
  Box,
  Link,
  Text,
  Button,
  HStack,
} from "@chakra-ui/react";

const downloadLinksCache = new Map();

const DownloadLinksSelect = ({
  sessionId,
  episodeSession,
  nextSessionEpisode,
}) => {
  const [downloadLinks, setDownloadLinks] = useState([]);
  const [selectedLink, setSelectedLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const animePahe_api = "https://pahe-api.fly.dev/";
  const proxy = "https://cors-anywhere-aifwkw.fly.dev/";

  const fetchDownloadLinks = async (key, isPrefetch = false) => {
    try {
      if (downloadLinksCache.has(key)) {
        if (!isPrefetch) {
          console.log(`[⚡] Using cached links for ${key}`);
          setDownloadLinks(downloadLinksCache.get(key));
          setLoading(false);
        }
        return;
      }

      if (!isPrefetch) setLoading(true);
      const response = await fetch(
        `${animePahe_api}download/${sessionId}/${key}`
      );
      const data = await response.json();

      if (data.results.length > 0) {
        downloadLinksCache.set(key, data.results);
        if (!isPrefetch) {
          setDownloadLinks(data.results);
        }
      } else {
        if (!isPrefetch)
          setErr("No download links available for this episode.");
      }
    } catch (error) {
      if (!isPrefetch)
        setErr("Failed to fetch download links. Please try again later.");
    } finally {
      if (!isPrefetch) setLoading(false);
    }
  };

  useEffect(() => {
    if (sessionId && episodeSession) {
      fetchDownloadLinks(episodeSession);
    }

    if (sessionId && nextSessionEpisode) {
      // Prefetch in background
      fetchDownloadLinks(nextSessionEpisode, true);
    }
  }, [sessionId, episodeSession, nextSessionEpisode]);

  const handleChange = (value) => {
    window.open(value, "_blank"); // open in new tab
  };

  const links = createListCollection({
    items: downloadLinks,
    itemToString: (item) => item.quality, // text shown in the select
    itemToValue: (item) => item.direct_url, // actual selected value
  });

  return (
    <Box
      display="flex"
      flexDir="column"
      width={{ base: "100%", lg: "350px" }}
      gap="10px"
      pt={{ base: 0, md: 2 }}
    >
      <Box display="flex" gap="10px" flexDir={{ base: "column", sm: "row" }}>
        <Select.Root
          collection={links}
          size="md"
          variant="subtle"
          width="100%"
          disabled={loading || downloadLinks.length === 0}
          onValueChange={(details) => handleChange(details.value)}
        >
          <Select.HiddenSelect />

          <Select.Control>
            <Select.Trigger>
              <Select.ValueText
                placeholder={loading ? "Loading links..." : "Download"}
              />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>

          <Portal>
            <Select.Positioner>
              <Select.Content>
                {links.items.map((item) => (
                  <Select.Item key={item.direct_url} item={item}>
                    {item.quality}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>
      </Box>

      {err && (
        <HStack spacing={4}>
          <Text color="red.400" fontSize="sm" fontWeight="500">
            {err}
          </Text>
          <Button
            size="sm"
            colorScheme="red"
            variant="outline"
            onClick={() => fetchDownloadLinks(episodeSession)}
          >
            Retry
          </Button>
        </HStack>
      )}
    </Box>
  );
};

export default DownloadLinksSelect;
