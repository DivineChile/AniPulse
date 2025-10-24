import { useEffect, useRef, useState } from "react";
import Artplayer from "artplayer";
import Hls from "hls.js";
import { useLocation, useParams } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Loading from "../../ErrorPage/Loading";
import Error from "../../ErrorPage/Error";
import "./style.css";
import { cacheFetch } from "../../../utils/cacheFetch";

// Extract stream qualities from master playlist
async function extractHLSQualities(masterUrl) {
  try {
    const masterPath = masterUrl.split("/").slice(0, -1).join("/");
    const response = await fetch(masterUrl);
    const text = await response.text();
    const lines = text.split("\n");
    const streams = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith("#EXT-X-STREAM-INF")) {
        const resolutionMatch = line.match(/RESOLUTION=(\d+)x(\d+)/);
        if (!resolutionMatch) continue;

        const height = parseInt(resolutionMatch[2]);
        const quality = `${height}p`;

        const nextLine = lines[i + 1]?.trim();
        if (nextLine && !nextLine.startsWith("#")) {
          const url = nextLine.startsWith("http")
            ? nextLine
            : `${masterPath}/${nextLine}`;
          streams.push({ quality, url, height });
        }
      }
    }

    streams.sort((a, b) => b.height - a.height);
    return streams.map(({ quality, url }) => ({ quality, url }));
  } catch (err) {
    console.error("Failed to extract HLS qualities:", err);
    return [];
  }
}

const MoviePlayer = () => {
  const containerRef = useRef(null);
  const artRef = useRef(null);

  const { watchId } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location?.search || "");
  const season = searchParams.get("season");
  const episode = searchParams.get("episode");
  const type = season ? "tv" : "movie";

  const proxy = "https://cors-anywhere-aifwkw.fly.dev/";
  const m3u8Proxy =
    "https://divinechile-deno-m3u8-p-11.deno.dev/m3u8-proxy?url=";
  const streamApi = "https://vidsrc-scraper-production.up.railway.app/extract";

  const [loading, setLoading] = useState(true);
  const [streamError, setStreamError] = useState(null);
  const [videoData, setVideoData] = useState(null);

  const fetchVideoData = async () => {
    try {
      const url =
        season && episode
          ? `${proxy}${streamApi}?type=${type}&tmdb_id=${watchId}&season=${season}&episode=${episode}`
          : `${proxy}${streamApi}?type=${type}&tmdb_id=${watchId}`;

      const cacheKey = `${watchId}-${season || "0"}-${episode || "0"}`;
      const data = await cacheFetch(cacheKey, url, 10 * 60 * 1000);
      setVideoData(data);
      console.log(data);
    } catch (error) {
      setStreamError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const selectBestStreamAndSubtitles = (providersResponse) => {
    const entries = Object.entries(providersResponse);
    const hlsEntry = entries.find(
      ([_, value]) => value.hls_url && !value.error
    );
    if (!hlsEntry) return null;

    const [_, hlsData] = hlsEntry;
    const subtitle =
      hlsData.subtitles?.[0] ||
      entries.find(([_, value]) => value.subtitles?.length > 0)?.[1]
        ?.subtitles?.[0];

    return {
      hls_url: hlsData.hls_url,
      subtitle: subtitle || null,
    };
  };

  useEffect(() => {
    setLoading(true);
    fetchVideoData();
  }, [watchId, season, episode]);

  useEffect(() => {
    if (!videoData) return;

    requestAnimationFrame(async () => {
      if (!containerRef.current) return;

      const selected = selectBestStreamAndSubtitles(videoData.results);
      if (!selected) return;

      const cleanUrl = selected.hls_url.includes("m3u8-proxy?url=")
        ? decodeURIComponent(selected.hls_url.split("url=")[1])
        : selected.hls_url;

      const proxyUrl = `${m3u8Proxy}${cleanUrl}`;
      const qualities = await extractHLSQualities(proxyUrl);
      console.log(qualities);
      const sortedQualities = qualities.map((q, i) => ({
        html: q.quality,
        url: q.url,
        default: i === 0,
      }));

      if (artRef.current) {
        artRef.current.destroy();
        artRef.current = null;
      }

      artRef.current = new Artplayer({
        container: containerRef.current,
        url: "https://divinechile-deno-m3u8-p-11.deno.dev/m3u8-proxy?url=https://cdn.niggaflix.xyz/tv/_vHAvARg-LZuSsTcCbDPpUqugVmicKlHJbQBA4MLpmg/index.m3u8",
        type: "hls",
        autoplay: true,
        autoSize: true,
        setting: true,
        screenshot: true,
        fullscreen: true,
        playbackRate: true,
        theme: "var(--primary-color)",
        subtitleOffset: true,
        quality: sortedQualities,
        customType: {
          hls: (video, url) => {
            const realUrl = url.includes("m3u8-proxy?url=")
              ? decodeURIComponent(url.split("url=")[1])
              : url;

            const streamUrl = `https://divinechile-deno-m3u8-p-11.deno.dev/m3u8-proxy?url=https://cdn.niggaflix.xyz/tv/_vHAvARg-LZuSsTcCbDPpUqugVmicKlHJbQBA4MLpmg/index.m3u8`;
            if (Hls.isSupported()) {
              const hls = new Hls();
              hls.loadSource(streamUrl);
              hls.attachMedia(video);
            } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
              video.src = streamUrl;
            }
          },
        },
      });

      if (selected.subtitle) {
        artRef.current.subtitle.switch(selected.subtitle);
      }
    });

    return () => {
      artRef.current?.destroy();
      artRef.current = null;
    };
  }, [videoData, watchId, season, episode]);

  if (loading) {
    return <Loading bg="var(--primary-background-color)" height="100%" />;
  }

  if (streamError) {
    return (
      <Error
        message={streamError}
        bg="var(--primary-background-color)"
        height="100%"
      />
    );
  }

  if (!videoData) {
    return (
      <Error
        message="No playable video source found."
        bg="var(--primary-background-color)"
        height="100%"
      />
    );
  }

  return (
    <Box ref={containerRef} className="artplayer-container" w="100%" h="100%" />
  );
};

export default MoviePlayer;
