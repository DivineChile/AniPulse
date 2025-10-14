import { Link as ChakraLink, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import Error from "../../ErrorPage/Error";

const EpisodeList = ({ items, itemId }) => {
  const [showAll, setShowAll] = useState(false);

  // Determine the number of episodes to display
  const maxDisplayCount = 5;
  const displayedEpisodes = showAll ? items : items?.slice(0, maxDisplayCount);

  return (
    <>
      {items.length === 0 && (
        <Error bg="none" msg="No Episodes found." pos="absolute" />
      )}
      {displayedEpisodes.map((_, index) => (
        <ChakraLink
          as={ReactRouterLink}
          to={`/watch/${itemId[index]}`}
          _hover={{
            textDecor: "none",
            color: "var(--link-hover-color)",
            borderBottomColor: "var(--link-hover-color)",
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
          fontFamily="var(--body-font)"
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
          {`Episode ${index + 1}`}
          <Text
            as="span"
            display={{ base: "none", lg: "initial" }}
            fontFamily="var(--body-font)"
          >
            {" "}
            - {_.title}
          </Text>
        </ChakraLink>
      ))}

      {/* Show More / Show Less Link */}
      {items?.length > maxDisplayCount && (
        <ChakraLink
          as="button"
          onClick={() => setShowAll((prev) => !prev)}
          _hover={{
            textDecor: "none",
            color: "var(--link-hover-color)",
            borderBottomColor: "var(--link-hover-color)",
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
