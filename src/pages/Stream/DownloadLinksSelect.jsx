import { useState, useEffect } from 'react';
import { Select, Box, Button, Link } from '@chakra-ui/react';
import { set } from 'lodash';

const DownloadLinksSelect = ({ sessionId, episodeSession }) => {
  const [downloadLinks, setDownloadLinks] = useState([]);
  const [selectedLink, setSelectedLink] = useState('');
  const [err, setErr] = useState("");
 const animePahe_api = "https://paheapi-production.up.railway.app/"

  // Function to fetch the download links for the selected episode session
  const fetchDownloadLinks = async () => {
    try {
      const response = await fetch(`${animePahe_api}/download/${sessionId}/${episodeSession}`);
      const data = await response.json();

      if (data.success_count > 0) {
        setDownloadLinks(data.results); // Set the list of download links
      } else {
        setErr("No download links available for this episode.");
      }
    } catch (error) {
      setErr("Failed to fetch download links. Please try again later.");
    }
  };

  // Effect to fetch download links when the component mounts
  useEffect(() => {
    if (sessionId && episodeSession) {
      fetchDownloadLinks();
    }
  }, [sessionId, episodeSession]);

  // Handle the change event when a new quality is selected
  const handleSelectChange = (event) => {
    const selectedUrl = event.target.value;
    setSelectedLink(selectedUrl);
  };

  return (
    <Box display="flex" gap="10px" flexDir={{ base: "column", sm: "row" }}>
        <Select id="download-links" onChange={handleSelectChange} value={selectedLink} color="var(--text-color)" background="var(--primary-background-color)">
          <option value="">{ downloadLinks ? "Select a Quality" : "Loading..."}</option>
          {downloadLinks.map((link, index) => (
            <option key={index} value={link.direct_url} style={{color: "var(--text-color)", background: "var(--primary-background-color)"}}>
              {link.quality}
            </option>
          ))}
        </Select>
  
        {/* Display the selected download link */}
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
                _hover={{background: "var(--accent-color)", color: "var(--primary-background-color)"}}
                >
                Download
            </Link>
        )}
    </Box>
  );
};

export default DownloadLinksSelect;
