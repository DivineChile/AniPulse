import { Box, IconButton } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 100) {
      console.log("passed");
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <Box
      position="fixed"
      bottom={{ base: 4, md: 8 }}
      right={{ base: 4, md: 8 }}
      zIndex={1000}
      opacity={isVisible ? 1 : 0}
      transform={isVisible ? "translateY(0)" : "translateY(20px)"}
      transition="all 0.3s ease-in-out"
      pointerEvents={isVisible ? "auto" : "none"}
    >
      <IconButton
        aria-label="Back to top"
        onClick={scrollToTop}
        size={{ base: "md", md: "lg" }}
        variant="solid"
        // bg="cinemi.primary"
        bg="var(--primary-color)"
        color="white"
        rounded="full"
        boxShadow="0 8px 25px rgba(229, 9, 20, 0.4)"
        _hover={{
          bg: "cinemi.secondary",
          transform: "scale(1.1)",
          boxShadow: "0 12px 35px rgba(0, 212, 255, 0.5)",
        }}
        _active={{
          transform: "scale(0.95)",
        }}
        transition="all 0.2s ease"
      >
        <ChevronUp />
      </IconButton>
    </Box>
  );
}
