import { useEffect, useRef } from "react";
import Hls from "hls.js";
import artplayerPluginHlsQuality from "artplayer-plugin-hls-quality";
import Artplayer from "artplayer";

const Player = ({ option, getInstance, ...rest }) => {
  function playM3u8(video, url, art) {
    if (Hls.isSupported()) {
      if (art.hls) art.hls.destroy();
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);
      art.hls = hls;
      art.on("destroy", () => hls.destroy());
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = url;
    } else {
      art.notice.show = "Unsupported playback format: m3u8";
    }
  }

  const artRef = useRef();
  useEffect(() => {
    const art = new Artplayer({
      ...option,
      container: artRef.current,
      type: "m3u8",
      customType: {
        m3u8: playM3u8,
      },
      playsInline: true,
      theme: "var(--accent-color)",
      volume: 0.5,
      isLive: false,
      muted: false,
      autoplay: false,
      pip: true,
      //   autoSize: true,
      autoMini: true,
      screenshot: true,
      setting: true,
      loop: true,
      flip: true,
      playbackRate: true,
      aspectRatio: true,
      fullscreen: true,
      fullscreenWeb: true,
      subtitleOffset: true,
      miniProgressBar: true,
      mutex: true,
      backdrop: true,
      autoPlayback: true,
      airplay: true,
      plugins: [
        artplayerPluginHlsQuality({
          // Show quality in control
          control: true,

          // Show quality in setting
          setting: true,

          // Get the resolution text from level
          getResolution: (level) => level.height + "P",

          // I18n
          title: "Quality",
          auto: "Auto",
        }),
      ],
      moreVideoAttr: {
        crossOrigin: "anonymous",
      },
    });

    if (getInstance && typeof getInstance === "function") {
      getInstance(art);
    }

    art.on("ready", () => {
      console.info(art.hls);
    });

    art.on("error", (error, reconnectTime) => {
      console.info(error, reconnectTime);
    });

    return () => {
      if (art && art.destroy) {
        art.destroy(false);
      }
    };
  }, []);

  return <div ref={artRef} {...rest}></div>;
};

export default Player;
