import { Link as ChakraLink } from "@chakra-ui/react";
import { useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";

const EpisodeList = ({ items, itemId, coverImg, subOrDub }) => {
  const [showAll, setShowAll] = useState(false);

  // Determine the number of episodes to display
  const maxDisplayCount = 5;
  const displayedEpisodes = showAll ? items : items?.slice(0, maxDisplayCount);

  // // Extracted function to format episode IDs
  // const formatEpisodeId = (id) => {
  //   const parts = id?.split("-");
  //   const lastItems = parts?.slice(-2);
  //   return lastItems[0]?.length > 1
  //     ? `Episode ${lastItems.pop()}`
  //     : `Episode ${lastItems[0]}.5`;
  // };

  return (
    <>
      {displayedEpisodes.map((_, index) => (
        <ChakraLink
          as={ReactRouterLink}
          to={`/watch/${encodeURIComponent(coverImg[index])}/${itemId[index]}`}
          _hover={{
            textDecor: "none",
            color: "var(--accent-color)",
            borderBottomColor: "var(--accent-color)",
          }}
          color="var(--text-color)"
          borderBottom="1px solid var(--text-color)"
          w="100%"
          display="block"
          py="5px"
          fontSize={{
            base: "15.63px",
            md: "17px",
            lg: "19.38px",
          }}
          fontWeight="300"
          lineHeight={{
            base: "17.6px",
            md: "19px",
            lg: "22px",
          }}
          letterSpacing="1.5px"
          transition="all ease 0.25s"
          mb="10px"
          key={index}
        >
          {`Episode ${index + 1} (${subOrDub})`}
        </ChakraLink>
      ))}

      {/* Show More / Show Less Link */}
      {items?.length > maxDisplayCount && (
        <ChakraLink
          as="button"
          onClick={() => setShowAll((prev) => !prev)}
          _hover={{
            textDecor: "none",
            color: "var(--accent-color)",
            borderBottomColor: "var(--accent-color)",
          }}
          color="var(--text-color)"
          borderBottom="1px solid var(--text-color)"
          w="100%"
          display="block"
          py="5px"
          fontSize={{
            base: "15.63px",
            md: "17px",
            lg: "19.38px",
          }}
          fontWeight="300"
          lineHeight={{
            base: "17.6px",
            md: "19px",
            lg: "22px",
          }}
          letterSpacing="1.5px"
          transition="all ease 0.25s"
          mb="10px"
          textAlign="center"
        >
          {showAll ? "Show Less" : "Show More"}
        </ChakraLink>
      )}
    </>
  );
};

export default EpisodeList;
