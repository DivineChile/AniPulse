import { useState, useEffect } from "react";
import axios from "axios";
import { Text } from "@chakra-ui/react";
import Loading from "../ErrorPage/Loading";

const VideoPlayer = ({ watchId }) => {
  const api = "https://consumet-api-puce.vercel.app/";
  const [streamwishLink, setStreamwishLink] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch server links from the API
  useEffect(() => {
    const fetchServers = async () => {
      try {
        const response = await axios.get(
          `${api}anime/gogoanime/servers/${watchId}`
        );
        const servers = response.data;
        console.log(servers);

        // Find the link with the name "Streamwish"
        const streamwishServer = servers.find(
          (server) => server.name === "Streamwish"
        );

        if (streamwishServer) {
          setStreamwishLink(streamwishServer.url); // Set the Streamwish link
        } else {
          console.warn("No server with the name 'Streamwish' found.");
        }
      } catch (error) {
        console.error("Error fetching servers:", error);
      } finally {
        setLoading(false); // Stop loading once the fetch is complete
      }
    };

    fetchServers();
  }, [watchId]);

  return (
    <>
      {loading ? (
        <Loading bg="none" height="100%" />
      ) : streamwishLink ? (
        <div style={{ width: "100%", height: "100%" }}>
          <iframe
            src={streamwishLink}
            style={{
              width: "100%",
              height: "100%",
            }}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <Text>No Streamwish link found.</Text>
      )}
    </>
  );
};

export default VideoPlayer;
