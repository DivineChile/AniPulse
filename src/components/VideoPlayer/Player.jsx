import { useRef, useEffect, useState } from "react";
import Artplayer from "artplayer";
import Hls from "hls.js";
import { ANIME } from "@consumet/extensions";
import { useParams } from "react-router-dom";
import Loading from "../ErrorPage/Loading";
import Error from "../ErrorPage/Error";
import { Box } from "@chakra-ui/react";

import "./style.css";

const Player = ({ episode }) => {
  const { watchId, gogoId } = useParams();
  const artRef = useRef(null);
  const proxy = "https://fluoridated-recondite-coast.glitch.me/";
  const anime = new ANIME.Anify();

  const [loading, setLoading] = useState(true);
  const [streamError, setStreamError] = useState(null);
  const [proxiedSources, setProxiedSources] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        setStreamError(null);

        // Fetch video sources
        const response = await anime.fetchEpisodeSources(
          gogoId,
          episode,
          watchId
        );

        if (response?.sources?.length) {
          // Add proxy to source URLs and set state
          const sources = response.sources.map((source) => ({
            ...source,
            url: `${proxy}${source.url}`,
          }));
          setProxiedSources(sources);
        } else {
          throw new Error("No video sources found.");
        }
      } catch (err) {
        setStreamError(err.message || "Failed to load episode data.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [episode, gogoId, watchId]);

  useEffect(() => {
    if (!proxiedSources.length || artRef.current) return;

    const defaultSource =
      proxiedSources.find((s) => s.quality === "default") || proxiedSources[0];

    if (!defaultSource) {
      console.error("No valid video source found.");
      return;
    }

    // Initialize ArtPlayer
    artRef.current = new Artplayer({
      container: ".artplayer-container",
      customType: {
        m3u8: (videoElement, url) => {
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
      type: "m3u8",
      url: defaultSource.url,
      quality: proxiedSources.map((source) => ({
        html: source.quality === "default" ? "Quality" : source.quality,
        url: source.url,
        default: source.quality === "default",
      })),
      autoSize: true,
      autoMini: true,
      theme: "var(--accent-color)",
      screenshot: true,
      setting: true,
      playbackRate: true,
      fullscreen: true,
      subtitleOffset: true,
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
  }, [proxiedSources]);

  if (loading) return <Loading bg="#191919" height="100%" />;
  if (streamError)
    return <Error message={streamError} bg="#191919" height="100%" />;

  return <Box className="artplayer-container" w="100%" h="100%"></Box>;
};

export default Player;
