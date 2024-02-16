import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";

const Player = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  // Update video URL based on the current location (pathname)
  const fetchNewVideoUrl = async (episodeName) => {
    setLoading(true);
    try {
      const responseVideo = await fetch(
        `https://api-amvstrm.nyt92.eu.org/api/v2/stream/${episodeName}`
      );
      const dataVideo = await responseVideo.json();
      const data = dataVideo;
      setCurrentUrl(data.stream.multi.main.url);
      setLoading(false);
    } catch {
      setErr(true);
      setLoading(false);
    }
  };

  const updateVideoUrl = () => {
    const episodeName = location.pathname.split("/").pop(); // Extract episode name from the URL
    fetchNewVideoUrl(episodeName);
  };

  // Call updateVideoUrl when the component mounts and when the location changes
  useEffect(() => {
    updateVideoUrl();
  }, [location.pathname]);

  return (
    <div className="player-wrapper">
      {currentUrl && (
        <ReactPlayer
          controls
          url={currentUrl}
          width="100%"
          height="100%"
          style={{ width: "100%", height: "100%", borderRadius: "10px" }}
          playing
        />
      )}
    </div>
  );
};

export default Player;
