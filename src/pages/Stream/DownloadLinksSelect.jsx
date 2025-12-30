"use client";

import { useState, useEffect } from "react";
import {
  Select,
  Portal,
  createListCollection,
  Box,
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
  const [proxiedLinks, setProxiedLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const BACKEND_BASE = "https://download-proxy.fly.dev"; // Update with your backend URL

  const fetchDownloadLinks = async (key, isPrefetch = false) => {
    try {
      if (downloadLinksCache.has(key)) {
        if (!isPrefetch) setDownloadLinks(downloadLinksCache.get(key));
        return;
      }

      if (!isPrefetch) setLoading(true);

      const res = await fetch(
        `https://pahe-api.fly.dev/download/${sessionId}/${key}`
      );

      if (!res.ok) {
        throw new Error("Download links fetch failed");
      }

      const data = await res.json();

      if (data.results?.length) {
        downloadLinksCache.set(key, data.results);
        if (!isPrefetch) setDownloadLinks(data.results);
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

  // Fetch raw download links first
  useEffect(() => {
    if (sessionId && episodeSession) {
      fetchDownloadLinks(episodeSession);
    }

    if (sessionId && nextSessionEpisode) {
      fetchDownloadLinks(nextSessionEpisode, true);
    }
  }, [sessionId, episodeSession, nextSessionEpisode]);

  // Once raw downloadLinks are loaded, encode on backend
  useEffect(() => {
    const encodeLinks = async () => {
      if (!downloadLinks || downloadLinks.length === 0) return;

      try {
        setLoading(true);
        setErr("");

        const encodeRes = await fetch(`${BACKEND_BASE}/encode`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            links: downloadLinks.map(({ quality, direct_url }) => ({
              quality,
              url: direct_url,
            })),
          }),
        });

        if (!encodeRes.ok) {
          throw new Error("Failed to encode links");
        }

        const { links } = await encodeRes.json();

        // Build proxied download URLs from tokens
        const withProxy = links.map(({ quality, token }) => ({
          quality,
          downloadUrl: `${BACKEND_BASE}/download/${token}`,
        }));
        setProxiedLinks(withProxy);
      } catch (error) {
        console.error(error);
        setErr("Failed to generate download tokens.");
      } finally {
        setLoading(false);
      }
    };

    encodeLinks();
  }, [downloadLinks]);

  const handleDownload = (url) => {
    // Triggers a normal browser download via the backend proxy
    window.open(url, "_blank");
  };

  const links = createListCollection({
    items: proxiedLinks,
    itemToString: (item) => item.quality,
    itemToValue: (item) => item.downloadUrl,
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
          disabled={loading || proxiedLinks.length === 0}
          onValueChange={(details) => handleDownload(details.value)}
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
                  <Select.Item key={item.downloadUrl} item={item}>
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
