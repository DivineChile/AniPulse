import { useRef, useEffect, useState } from "react";
import Artplayer from "artplayer";
import Hls from "hls.js";
import { useLocation, useParams } from "react-router-dom";
import Loading from "../ErrorPage/Loading";
import Error from "../ErrorPage/Error";
import { Box } from "@chakra-ui/react";

import "./style.css";

const Player = ({ dub, sub }) => {
  const location = useLocation();
  const { watchId } = useParams();
  const queryParams = location?.search || ""; // Safely handle location.search
  const artRef = useRef(null);
  const proxy = "https://fluoridated-recondite-coast.glitch.me/"; // Keep proxy URL as is

  const [loading, setLoading] = useState(true);
  const [streamError, setStreamError] = useState(null);
  const [videoData, setVideoData] = useState(null);

  // Unified fetch function for video data
  const fetchVideoData = async (category = "sub") => {
    try {
      setLoading(true);
      setStreamError(null);
      setVideoData(null);

      const response = await fetch(
        `${proxy}https://aniwatch-api-gamma-wheat.vercel.app/api/v2/hianime/episode/sources?animeEpisodeId=${watchId}${queryParams}&server=hd-2&category=${category}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch video data.");
      }

      const data = await response.json();

      if (!data.success || !data.data?.sources?.length) {
        throw new Error("No video sources available.");
      }

      setVideoData(data.data);
      console.log(`${category} video data loaded`);
    } catch (err) {
      if (err.name === "TypeError") {
        setStreamError("Network error. Please check your connection.");
      } else {
        setStreamError(err.message || "An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch video data based on dub/sub props
  useEffect(() => {
    if (sub) {
      fetchVideoData("sub");
    } else if (dub) {
      fetchVideoData("dub");
    } else {
      fetchVideoData("sub");
    }
  }, [watchId, queryParams, dub, sub]); // Cleaned up dependencies

  // Initialize Artplayer when videoData is available
  useEffect(() => {
    if (!videoData || artRef.current) return;

    const defaultSource = videoData?.sources?.[0]?.url;
    const subtitles = videoData?.tracks?.map((track) => ({
      url: track.file,
      type: "vtt",
      label: track.label,
      default: track.label === "English",
    }));

    const defaultSubtitle = subtitles?.find((subtitle) => subtitle.default) || subtitles?.[0];

    if (!defaultSource) {
      console.error("No valid video source found.");
      return;
    }

    let hlsInstance = null; // Track HLS instance for cleanup

    // Initialize ArtPlayer
    artRef.current = new Artplayer({
      container: ".artplayer-container",
      customType: {
        hls: (videoElement, url) => {
          if (Hls.isSupported()) {
            hlsInstance = new Hls();
            hlsInstance.loadSource(`https://hianime-proxy-zeta.vercel.app/m3u8-proxy?url=${url}`);
            hlsInstance.attachMedia(videoElement);
          } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
            videoElement.src = url;
          } else {
            console.error("HLS is not supported in this browser.");
          }
        },
      },
      type: videoData.sources[0]?.type || "hls",
      url: defaultSource,
      subtitle: defaultSubtitle || {},
      subtitleOffset: true,
      autoSize: true,
      autoplay: true,
      autoMini: false,
      theme: "var(--accent-color)",
      screenshot: true,
      setting: true,
      playbackRate: true,
      fullscreen: true,
      quality: videoData.sources.map((source) => ({
        html: "Quality",
        url: source.url,
        default: source === defaultSource,
      })),
    });

    // Handle quality switching
    artRef.current.on("quality", (quality) => {
      artRef.current.switchUrl(quality.url);
    });

    // Cleanup on unmount
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

  // Render loading or error components
  if (loading) return <Loading bg="var(--primary-background-color)" height="100%" />;
  if (streamError) return <Error message={streamError} bg="var(--primary-background-color)" height="100%" />;

  // Render the player container
  return <Box className="artplayer-container" w="100%" h="100%"></Box>;
};

export default Player;
