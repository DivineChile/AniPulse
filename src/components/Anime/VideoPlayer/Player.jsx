import { useRef, useEffect, useState, useContext } from "react";
import Artplayer from "artplayer";
import Hls from "hls.js";
import { useLocation, useParams } from "react-router-dom";
import Loading from "../../ErrorPage/Loading";
import Error from "../../ErrorPage/Error";
import { Box } from "@chakra-ui/react";
import "./style.css";
import { PlayerContext } from "../../../contexts/PlayerContext";
import { cacheFetch } from "../../../utils/cacheFetch";

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

const CACHE_TTL = 2 * 60 * 1000; // 2 minutes

const getCachedData = (key) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;

    const { data, expiresAt } = JSON.parse(raw);

    if (Date.now() > expiresAt) {
      localStorage.removeItem(key);
      return null;
    }

    return data;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
};

const setCachedData = (key, data) => {
  const payload = {
    data,
    expiresAt: Date.now() + CACHE_TTL,
  };

  localStorage.setItem(key, JSON.stringify(payload));
};

const Player = ({ version = "sub" }) => {
  const location = useLocation();
  const { watchId } = useParams();
  const queryParams = location?.search || "";
  const containerRef = useRef(null);
  const artRef = useRef(null);
  const proxy = "https://cors-anywhere-aifwkw.fly.dev/";
  const streamProxy =
    "https://divinechile-deno-m3u8-p-11.deno.dev/m3u8-proxy?url=";
  const main_api = "https://anime-api-production-bc3d.up.railway.app";
  const kenjitsu_api = "https://kenjitsu-api-production.up.railway.app";

  const [loading, setLoading] = useState(true);
  const [streamError, setStreamError] = useState(null);
  const [videoData, setVideoData] = useState(null);
  const {
    selectedQuality,
    availableQualities,
    setSelectedQuality,
    setAvailableQualities,
  } = useContext(PlayerContext);

  const fetchVideoData = async (category) => {
    try {
      setStreamError(null);
      setLoading(true);

      const cacheKey = `videoData:${watchId}:version=${category}`;

      // 1️⃣ Check cache first
      const cached = getCachedData(cacheKey);
      if (cached) {
        console.log("Loaded video data from cache:", category);
        setVideoData(cached);
        return;
      }

      // 2️⃣ Fetch fresh data
      const res = await fetch(
        `${kenjitsu_api}/api/hianime/sources/${watchId}?version=${category}&server=hd-2`
      );

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }

      const json = await res.json();

      if (!json?.data) {
        throw new Error("No video data returned");
      }

      // 3️⃣ Cache it
      setCachedData(cacheKey, json.data);

      console.log("Fetched & cached video data:", category);
      setVideoData(json.data);
    } catch (err) {
      setStreamError(err.message || "An unexpected error occurred.");
      setVideoData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!watchId) return;

    fetchVideoData(version);
  }, [watchId, queryParams, version]);

  useEffect(() => {
    if (!videoData) return;

    // Destroy any existing player
    if (artRef.current) {
      artRef.current.destroy();
      artRef.current = null;
    }

    const stream = videoData.sources
      .map((source) => (source.isM3u8 ? source : null))
      .filter((source) => source)[0];

    const defaultSource = stream?.url;
    const subtitles = videoData?.subtitles?.map((track) => ({
      url: track.url,
      type: "vtt",
      label: track.lang,
      default: track.default === true,
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
        highlight: [
          {
            time: videoData?.intro?.start,
            text: "Intro Start",
          },
          {
            time: videoData?.intro?.end,
            text: "Intro End",
          },
          {
            time: videoData?.outro?.start,
            text: "Outro Start",
          },
          {
            time: videoData?.outro?.end,
            text: "Outro End",
          },
        ],
      };

      if (defaultSubtitle?.url && version === "sub") {
        artConfig.subtitle = defaultSubtitle;
      }

      artRef.current = new Artplayer(artConfig);

      artRef.current.on("quality", (quality) => {
        artRef.current.switchUrl(quality.url, true);
      });

      artRef.current.on("fullscreen", () => {
        const lockOrientation = async () => {
          try {
            if (screen.orientation && screen.orientation.lock) {
              await screen.orientation.lock("landscape");
            }
          } catch (err) {
            console.warn("Orientation lock failed:", err);
          }
        };

        lockOrientation();
      });

      artRef.current.on("fullscreenCancel", () => {
        if (screen.orientation && screen.orientation.unlock) {
          screen.orientation.unlock();
        }
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
    return (
      <Loading bg="var(--linear-gradient)" height="100%" isLoading={loading} />
    );
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
