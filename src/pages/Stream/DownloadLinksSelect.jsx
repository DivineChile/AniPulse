import { useState, useEffect } from 'react';
import { Select, Box, Link, Text, Button, HStack } from '@chakra-ui/react';

const downloadLinksCache = new Map();

const DownloadLinksSelect = ({ sessionId, episodeSession, nextSessionEpisode }) => {
  const [downloadLinks, setDownloadLinks] = useState([]);
  const [selectedLink, setSelectedLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const animePahe_api = "https://paheapi-production.up.railway.app/";

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
      const response = await fetch(`${animePahe_api}download/${sessionId}/${key}`);
      const data = await response.json();

      if (data.success_count > 0) {
        downloadLinksCache.set(key, data.results);
        if (!isPrefetch) {
          setDownloadLinks(data.results);
        }
      } else {
        if (!isPrefetch) setErr("No download links available for this episode.");
      }
    } catch (error) {
      if (!isPrefetch) setErr("Failed to fetch download links. Please try again later.");
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

  const handleSelectChange = (event) => {
    setSelectedLink(event.target.value);
  };

  return (
    <Box display="flex" flexDir="column" gap="10px">
      <Box display="flex" gap="10px" flexDir={{ base: "column", sm: "row" }}>
        <Select
          id="download-links"
          onChange={handleSelectChange}
          value={selectedLink}
          isDisabled={loading || downloadLinks.length === 0}
          color="var(--text-color)"
          background="var(--primary-background-color)"
        >
          <option value="">
            {loading ? 'Loading Qualities...' : 'Select a Quality'}
          </option>
          {downloadLinks.map((link, index) => (
            <option
              key={index}
              value={link.direct_url}
              style={{ color: "var(--text-color)", background: "var(--primary-background-color)" }}
            >
              {link.quality}
            </option>
          ))}
        </Select>

        {selectedLink && (
          <Link
            className="downloadBtn"
            border="2px solid var(--accent-color)"
            background="var(--primary-background-color)"
            color="var(--text-color)"
            fontWeight="400"
            px="20px"
            href={selectedLink}
            target="_blank"
            rel="noopener noreferrer"
            _hover={{ background: "var(--accent-color)", color: "var(--primary-background-color)" }}
          >
            Download
          </Link>
        )}
      </Box>

      {err && (
        <HStack spacing={4}>
          <Text color="red.400" fontSize="sm" fontWeight="500">
            {err}
          </Text>
          <Button size="sm" colorScheme="red" variant="outline" onClick={() => fetchDownloadLinks(episodeSession)}>
            Retry
          </Button>
        </HStack>
      )}
    </Box>
  );
};

export default DownloadLinksSelect;
