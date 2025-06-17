import { useRef, useEffect, useState, useContext } from "react";
import Artplayer from "artplayer";
import Hls from "hls.js";
import { useLocation, useParams } from "react-router-dom";
import Loading from "../../ErrorPage/Loading";
import Error from "../../ErrorPage/Error";
import { Box } from "@chakra-ui/react";
import "./style.css";
import { PlayerContext } from "../../../contexts/PlayerContext";

// Function to extract stream qualities
const extractHLSQualities = async (m3u8Url) => {
  try {
    // Fetch the M3U8 playlist file
    const response = await fetch(m3u8Url);
    const playlist = await response.text();
    const lines = playlist.split("\n");
    const qualities = [];

    // Iterate through each line in the M3U8 file
    for (let i = 0; i < lines.length; i++) {
      // Look for #EXT-X-STREAM-INF lines that contain stream quality info
      if (lines[i].includes("#EXT-X-STREAM-INF")) {
        const resolutionMatch = lines[i].match(/RESOLUTION=(\d+)x(\d+)/);
        let label = "Unknown"; // Default label if resolution is not found
        const url = lines[i + 1]?.trim(); // The stream URL is on the next line

        // Extract resolution info (height, e.g., 1080p, 720p)
        if (resolutionMatch) {
          const height = resolutionMatch[2];
          label = `${height}p`;
        }

        // Add the quality info (label and URL) to the qualities array
        qualities.push({
          html: label,
          url: url.startsWith("http")
            ? url
            : m3u8Url.replace(/[^\/]+$/, "") + url,
        });
      }
    }

    // Return the list of extracted qualities
    return qualities;
  } catch (error) {
    // Handle any errors that occur during fetch or parsing
    console.error("Failed to extract qualities:", error);
    return [];
  }
};

const Player = ({ dub, sub }) => {
  const location = useLocation();
  const { watchId } = useParams();
  const queryParams = location?.search || "";
  const containerRef = useRef(null);
  const artRef = useRef(null);
  const proxy = "https://fluoridated-recondite-coast.glitch.me/";
  const streamProxy =
    "https://gogoanime-and-hianime-proxy.vercel.app/m3u8-proxy?url=";

  const [loading, setLoading] = useState(true);
  const [streamError, setStreamError] = useState(null);
  const [videoData, setVideoData] = useState(null);
  const {
    selectedQuality,
    availableQualities,
    setSelectedQuality,
    setAvailableQualities,
  } = useContext(PlayerContext);

  const fetchVideoData = async (category = "sub") => {
    try {
      setLoading(true);
      setStreamError(null);
      setVideoData(null);

      const response = await fetch(
        `${proxy}https://anime-api-ri6f4g.fly.dev/api/stream?id=${watchId}${queryParams}&server=hd-2&type=${category}`
      );

      if (!response.ok) throw new Error("Failed to fetch video data.");

      const data = await response.json();
      if (!data.success || !data.results?.streamingLink?.link?.file.length) {
        console.error("No sources available");
      }

      setVideoData(data.results);
    } catch (err) {
      setStreamError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sub) {
      fetchVideoData("sub");
    } else if (dub) {
      fetchVideoData("dub");
    } else {
      fetchVideoData("sub");
    }
  }, [watchId, queryParams, dub, sub]);

  useEffect(() => {
    if (!videoData) return;

    // Destroy any existing player
    if (artRef.current) {
      artRef.current.destroy();
      artRef.current = null;
    }

    const stream = videoData.streamingLink;
    const defaultSource = stream?.link.file;
    const subtitles = stream?.tracks?.map((track) => ({
      url: track.file,
      type: "vtt",
      label: track.label,
      default: track.label === "English",
    }));

    const validSubtitles = subtitles?.filter((sub) =>
      sub?.url?.endsWith(".vtt")
    );
    const defaultSubtitle =
      validSubtitles?.find((sub) => sub.default) || validSubtitles?.[0];

    let hlsInstance = null;

    const setupPlayer = async () => {
      const cleanUrl = defaultSource.includes("m3u8-proxy")
        ? decodeURIComponent(defaultSource.split("url=")[1])
        : defaultSource;

      const finalUrl = `${streamProxy}${encodeURIComponent(cleanUrl)}`;
      const extractedQualities = await extractHLSQualities(finalUrl);

      const qualities = extractedQualities.length
        ? extractedQualities.map((q, index) => ({
            ...q,
            default: index === 0,
          }))
        : [
            {
              html: "Auto",
              url: defaultSource,
              default: true,
            },
          ];

      setSelectedQuality(qualities.find((q) => q.default));
      setAvailableQualities(qualities);

      const artConfig = {
        container: containerRef.current,
        customType: {
          hls: (video, url) => {
            const actualUrl = url.includes("m3u8-proxy")
              ? decodeURIComponent(url.split("url=")[1])
              : url;

            const streamUrl = `${streamProxy}${encodeURIComponent(actualUrl)}`;

            if (Hls.isSupported()) {
              hlsInstance = new Hls();
              hlsInstance.loadSource(streamUrl);
              hlsInstance.attachMedia(video);
            } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
              video.src = streamUrl;
            }
          },
        },
        type: "hls",
        url: defaultSource,
        subtitleOffset: true,
        autoSize: true,
        autoplay: true,
        autoMini: false,
        theme: "var(--primary-color)",
        screenshot: true,
        setting: true,
        playbackRate: true,
        fullscreen: true,
        quality: qualities,
      };

      if (!dub) {
        if (defaultSubtitle?.url) {
          artConfig.subtitle = defaultSubtitle;
        }
      } else {
        artConfig.subtitle = {};
      }

      artRef.current = new Artplayer(artConfig);

      artRef.current.on("quality", (quality) => {
        artRef.current.switchUrl(quality.url, true);
      });
    };

    setupPlayer();

    return () => {
      if (hlsInstance) {
        hlsInstance.destroy();
        hlsInstance = null;
      }
      if (artRef.current) {
        artRef.current.destroy();
        artRef.current = null;
      }
    };
  }, [videoData]);

  if (loading)
    return <Loading bg="var(--primary-background-color)" height="100%" />;
  if (streamError)
    return (
      <Error
        message={streamError}
        bg="var(--primary-background-color)"
        height="100%"
      />
    );
  return (
    <Box ref={containerRef} className="artplayer-container" w="100%" h="100%" />
  );
};

export default Player;
