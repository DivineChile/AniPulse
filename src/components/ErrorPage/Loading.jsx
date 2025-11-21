import { Box } from "@chakra-ui/react";
import { BeatLoader } from "react-spinners";
import { useEffect, useState } from "react";

const Loading = ({
  height = "100%",
  bg = "#000",
  pos = "absolute",
  isLoading,
  zIndex = 9999,
  fullscreen = false, // NEW — controls scroll lock + fullscreen overlay
}) => {
  const [visible, setVisible] = useState(isLoading);

  // Handle fade out + unmount
  useEffect(() => {
    if (isLoading) {
      setVisible(true);

      // If fullscreen, lock scroll
      if (fullscreen) {
        document.body.style.overflow = "hidden";
      }
    } else {
      const timeout = setTimeout(() => setVisible(false), 450);

      // Restore scrolling
      document.body.style.overflow = "";
      return () => clearTimeout(timeout);
    }
  }, [isLoading, fullscreen]);

  if (!visible) return null;

  return (
    <Box
      pos={fullscreen ? "fixed" : pos}
      top="0"
      left="0"
      height={fullscreen ? "100vh" : height}
      width={fullscreen ? "100vw" : "100%"}
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg={bg}
      opacity={isLoading ? 1 : 0}
      pointerEvents={isLoading ? "auto" : "none"}
      transition="opacity 0.45s ease"
      zIndex={zIndex}
    >
      <BeatLoader color="var(--accent-color)" size={20} />
    </Box>
  );
};

export default Loading;
