import { useRef, useEffect, useState, useContext } from "react";
import Artplayer from "artplayer";
import Hls from "hls.js";
import { useLocation, useParams } from "react-router-dom";
import Loading from "../ErrorPage/Loading";
import Error from "../ErrorPage/Error";
import { Box } from "@chakra-ui/react";
import "./style.css";
import { PlayerContext } from "../../contexts/PlayerContext";

// Function to extract Stream Qualities from file
const extractHLSQualities = async (m3u8Url) => {
  try {
    const response = await fetch(m3u8Url);
    const playlist = await response.text();
    const lines = playlist.split("\n");
    const qualities = [];

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes("#EXT-X-STREAM-INF")) {
        const resolutionMatch = lines[i].match(/RESOLUTION=(\d+)x(\d+)/);
        let label = "Unknown";
        const url = lines[i + 1].trim();

        if (resolutionMatch) {
          const height = resolutionMatch[2];
          label = `${height}p`;
        }

        qualities.push({
          html: label,
          url: url.startsWith("http") ? url : m3u8Url.replace(/[^\/]+$/, "") + url,
        });
      }
    }

    return qualities;
  } catch (error) {
    console.error("Failed to extract qualities:", error);
    return [];
  }
};

const Player = ({ dub, sub }) => {
  const location = useLocation();
  const { watchId } = useParams();
  const queryParams = location?.search || "";

  const artRef = useRef(null);
  const containerRef = useRef(null); // ✅ NEW REF for the container

  const proxy = "https://fluoridated-recondite-coast.glitch.me/";
  const streamProxy = "https://gogoanime-and-hianime-proxy.vercel.app/m3u8-proxy?url=";

  const [loading, setLoading] = useState(true);
  const [streamError, setStreamError] = useState(null);
  const [videoData, setVideoData] = useState(null);

  const { selectedQuality, availableQualities, setSelectedQuality, setAvailableQualities } =
    useContext(PlayerContext);

  const fetchVideoData = async (category = "sub") => {
    try {
      setLoading(true);
      setStreamError(null);
      setVideoData(null);

      const response = await fetch(
        `${proxy}https://aniwatch-api-production-68fd.up.railway.app/api/v2/hianime/episode/sources?animeEpisodeId=${watchId}${queryParams}&server=hd-2&category=${category}`
      );

      if (!response.ok) throw new Error("Failed to fetch video data.");

      const data = await response.json();

      if (!data.success || !data.data?.sources?.length) {
        throw new Error("No video sources available.");
      }

      setVideoData(data.data);
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
    if (!videoData || !containerRef.current) return;

    if (artRef.current) {
      artRef.current.destroy();
      artRef.current = null;
    }

    const defaultSource = videoData?.sources?.[0]?.url;
    const subtitles = videoData?.tracks?.map((track) => ({
      url: track.file,
      type: "vtt",
      label: track.label,
      default: track.label === "English",
    }));

    const defaultSubtitle = subtitles?.find((subtitle) => subtitle.default) || subtitles?.[0];
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

      artRef.current = new Artplayer({
        container: containerRef.current, // ✅ ref instead of class selector
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
        subtitle: defaultSubtitle || {},
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
      });

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

  if (loading) return <Loading bg="var(--primary-background-color)" height="100%" />;
  if (streamError) return <Error message={streamError} bg="var(--primary-background-color)" height="100%" />;

  return <Box ref={containerRef} className="artplayer-container" w="100%" h="100%"></Box>;
};

export default Player;
