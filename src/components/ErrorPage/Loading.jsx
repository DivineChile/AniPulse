import { Box } from "@chakra-ui/react";
import { BeatLoader } from "react-spinners";
import { useEffect, useState } from "react";

const Loading = ({ height, bg, pos, isLoading }) => {
  const [visible, setVisible] = useState(isLoading);

  useEffect(() => {
    if (isLoading) {
      // When loading starts → show immediately
      setVisible(true);
    } else {
      // When loading stops → delay unmount until fade-out finishes
      const timeout = setTimeout(() => {
        setVisible(false);
      }, 450); // same as transition duration

      return () => clearTimeout(timeout);
    }
  }, [isLoading]);

  // Completely remove from DOM when not visible
  if (!visible) return null;

  return (
    <Box
      height={height}
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg={bg}
      pos={{ base: "initial", md: pos }}
      left="0"
      opacity={isLoading ? 1 : 0}
      pointerEvents={isLoading ? "auto" : "none"}
      transition="opacity 0.45s ease"
    >
      <BeatLoader color="var(--accent-color)" size={20} speedMultiplier={1} />
    </Box>
  );
};

export default Loading;
