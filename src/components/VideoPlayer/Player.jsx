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
  const queryParams = location?.search || "";
  const artRef = useRef(null);

  const proxy = "https://fluoridated-recondite-coast.glitch.me/";
  const streamProxy = "https://gogoanime-and-hianime-proxy.vercel.app/m3u8-proxy?url=";

  const [loading, setLoading] = useState(true);
  const [streamError, setStreamError] = useState(null);
  const [videoData, setVideoData] = useState(null);
  const [qualities, setQualities] = useState([]);

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

      if (!data.success || !data.data?.sources?.length)
        throw new Error("No video sources available.");

      setVideoData(data.data);
    } catch (err) {
      setStreamError(
        err.name === "TypeError"
          ? "Network error. Please check your connection."
          : err.message || "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  const extractHLSQualities = async (masterUrl) => {
    try {
      const proxiedUrl = `${streamProxy}${encodeURIComponent(masterUrl)}`;
      const res = await fetch(proxiedUrl);
      const text = await res.text();

      const variantLines = text.split("#EXT-X-STREAM-INF").slice(1);
      const variants = variantLines.map((entry) => {
        const resolutionMatch = entry.match(/RESOLUTION=\d+x(\d+)/);
        const quality = resolutionMatch ? `${resolutionMatch[1]}p` : "Auto";
        const urlMatch = entry.split("\n")[1]?.trim();
        return {
          html: quality,
          url: urlMatch?.startsWith("http") ? urlMatch : masterUrl.replace(/\/[^/]*$/, `/${urlMatch}`),
        };
      });

      return variants;
    } catch (err) {
      console.error("Error extracting qualities:", err);
      return [];
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
    const initPlayer = async () => {
      if (!videoData || artRef.current) return;

      const defaultSource = videoData.sources?.[0]?.url;
      if (!defaultSource) {
        setStreamError("No valid video source found.");
        return;
      }

      const subtitleList = videoData?.tracks?.map((track) => ({
        url: track.file,
        type: "vtt",
        label: track.label,
        default: track.label === "English",
      }));

      const subtitle = subtitleList?.find((s) => s.default) || subtitleList?.[0];

      const availableQualities = await extractHLSQualities(defaultSource);
      setQualities(availableQualities);

      let hlsInstance = null;

      artRef.current = new Artplayer({
        container: ".artplayer-container",
        customType: {
          hls: (videoElement, url) => {
            const cleanUrl = url.includes("m3u8-proxy") ? decodeURIComponent(url.split("url=")[1]) : url;
            const proxied = `${streamProxy}${encodeURIComponent(cleanUrl)}`;
            if (Hls.isSupported()) {
              hlsInstance = new Hls();
              hlsInstance.loadSource(proxied);
              hlsInstance.attachMedia(videoElement);
            } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
              videoElement.src = proxied;
            } else {
              console.error("HLS is not supported in this browser.");
            }
          },
        },
        type: "hls",
        url: defaultSource,
        subtitle,
        subtitleOffset: true,
        autoSize: true,
        autoplay: true,
        autoMini: false,
        theme: "var(--accent-color)",
        screenshot: true,
        setting: true,
        playbackRate: true,
        fullscreen: true,
        quality: availableQualities.map((q, idx) => ({
          ...q,
          default: idx === 0,
        })),
      });

      artRef.current.on("quality", (quality) => {
        artRef.current.switchUrl(quality.url, "hls");
      });

      return () => {
        if (hlsInstance) hlsInstance.destroy();
        if (artRef.current) {
          artRef.current.destroy();
          artRef.current = null;
        }
      };
    };

    initPlayer();
  }, [videoData]);

  if (loading) return <Loading bg="var(--primary-background-color)" height="100%" />;
  if (streamError) return <Error message={streamError} bg="var(--primary-background-color)" height="100%" />;

  return <Box className="artplayer-container" w="100%" h="100%"></Box>;
};

export default Player;
