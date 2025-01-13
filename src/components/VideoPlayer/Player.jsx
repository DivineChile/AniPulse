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
  const fullPath = `${watchId}${location.search}`;
  const artRef = useRef(null);
  const proxy = "https://fluoridated-recondite-coast.glitch.me/";

  const [loading, setLoading] = useState(true);
  const [streamError, setStreamError] = useState(null);
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        setLoading(true);
        setStreamError(null);
        setVideoData(null);

        const response = await fetch(
          `${proxy}https://aniwatch-api-gamma-wheat.vercel.app/api/v2/hianime/episode/sources?animeEpisodeId=${watchId}${location.search}&category=sub`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch video data.");
        }

        const data = await response.json();

        if (!data.success || !data.data?.sources?.length) {
          throw new Error("No video sources available.");
        }

        setVideoData(data.data);
        console.log("sub video data loaded");
      } catch (err) {
        setStreamError(err.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    const fetchDubVideoData = async () => {
      try {
        setLoading(true);
        setStreamError(null);
        setVideoData(null);

        const response = await fetch(
          `${proxy}https://aniwatch-api-gamma-wheat.vercel.app/api/v2/hianime/episode/sources?animeEpisodeId=${watchId}${location.search}&category=dub`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch video data.");
        }

        const data = await response.json();

        if (!data.success || !data.data?.sources?.length) {
          throw new Error("No video sources available.");
        }

        setVideoData(data.data);
        console.log("dub video data has loaded");
      } catch (err) {
        setStreamError(err.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    if (sub === true) {
      fetchVideoData();
    } else if (dub === true) {
      fetchDubVideoData();
    } else {
      fetchVideoData();
    }
  }, [fullPath, dub, sub]);

  useEffect(() => {
    if (!videoData || artRef.current) return;

    const defaultSource = videoData.sources[0]?.url;
    const subtitles = videoData.tracks?.map((track) => ({
      url: track.file,
      type: "vtt",
      label: track.label,
      default: track.label === "English",
    }));

    const defaultSubtitle = subtitles.find(
      (subtitle) => subtitle.default === true
    );

    if (!defaultSource) {
      console.error("No valid video source found.");
      return;
    }

    // Initialize ArtPlayer
    artRef.current = new Artplayer({
      container: ".artplayer-container",
      customType: {
        hls: (videoElement, url) => {
          if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(videoElement);
          } else if (
            videoElement.canPlayType("application/vnd.apple.mpegurl")
          ) {
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
      autoMini: true,
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

    return () => {
      if (artRef.current) {
        artRef.current.destroy();
        artRef.current = null;
      }
    };
  }, [videoData]);

  if (loading) return <Loading bg="#191919" height="100%" />;
  if (streamError)
    return <Error message={streamError} bg="#191919" height="100%" />;

  return <Box className="artplayer-container" w="100%" h="100%"></Box>;
};

export default Player;
