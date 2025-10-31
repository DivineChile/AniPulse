import { useEffect, useRef, useState } from "react";
import Artplayer from "artplayer";
import Hls from "hls.js";
import { useLocation, useParams } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Loading from "../../ErrorPage/Loading";
import Error from "../../ErrorPage/Error";
import "./style.css";
import { cacheFetch } from "../../../utils/cacheFetch";

// ✅ Extract stream qualities from master playlist
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

  const streamApi = "http://localhost:3000/api/scrape";
  const m3u8Proxy =
    "https://divinechile-deno-m3u8-p-11.deno.dev/m3u8-proxy?url=";

  const [loading, setLoading] = useState(true);
  const [streamError, setStreamError] = useState(null);
  const [videoData, setVideoData] = useState(null);

  // ✅ Fetch stream data
  const fetchVideoData = async () => {
    try {
      const url =
        season && episode
          ? `${streamApi}/${type}/${watchId}?season=${season}&episode=${episode}`
          : `${streamApi}/${type}/${watchId}`;

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

  // ✅ Extract HLS + subtitles
  const prepareStreamData = async (data) => {
    if (!data?.preferredSource) return null;
    const preferred = data.sources.map((s) => s.preferred);
    const preferredSource = preferred.filter(
      (s) =>
        s.includes("queenselti") ||
        s.includes("kkphimplayer6") ||
        s.includes("phim1280")
    )[0];
    const hlsUrl = preferredSource;
    const qualities = await extractHLSQualities(hlsUrl);

    const subtitle =
      data.subtitles?.find((sub) =>
        sub.label.toLowerCase().includes("english")
      ) || data.subtitles?.[0];

    return {
      qualities,
      hlsUrl,
      subtitle,
    };
  };

  // ✅ Initialize ArtPlayer
  const initArtPlayer = async (data) => {
    const { qualities, hlsUrl, subtitle } = await prepareStreamData(data);
    if (!hlsUrl) {
      setStreamError("No playable source found");
      return;
    }

    console.log(qualities, subtitle);

    const defaultSrc = qualities?.[0]?.url || hlsUrl;

    const art = new Artplayer({
      container: containerRef.current,
      url: defaultSrc.startsWith("http") ? defaultSrc : m3u8Proxy + defaultSrc,
      title: data.title || "Now Playing",
      autoplay: true,
      setting: true,
      fullscreen: true,
      miniProgressBar: true,
      theme: "var(--primary-color)",
      autoSize: true,
      autoMini: true,
      lang: "en",
      subtitle: subtitle
        ? {
            url: subtitle.file,
            encoding: "utf-8",
            type: "vtt",
            style: { fontSize: "20px", color: "#fff" },
          }
        : null,
      customType: {
        m3u8: function (video, url) {
          if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(video);
            art.hls = hls;
          } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = url;
          } else {
            art.notice.show = "Unsupported format or browser";
          }
        },
      },
    });

    // ✅ Add quality switch
    if (qualities?.length > 1) {
      art.setting.add({
        name: "Quality",
        html: qualities
          .map((q, i) => `<option value="${i}">${q.quality}</option>`)
          .join(""),
        onChange(option) {
          const selected = qualities[option.index];
          if (selected?.url) art.switchQuality(selected.url, selected.quality);
        },
      });
    }

    artRef.current = art;
  };

  useEffect(() => {
    setLoading(true);
    fetchVideoData();
  }, [watchId, season, episode]);

  useEffect(() => {
    if (!videoData) return;

    (async () => {
      if (artRef.current) {
        artRef.current.destroy();
        artRef.current = null;
      }
      await initArtPlayer(videoData);
    })();

    return () => {
      artRef.current?.destroy();
      artRef.current = null;
    };
  }, [videoData]);

  if (loading) {
    return <Loading bg="var(--linear-gradient)" height="100%" />;
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
