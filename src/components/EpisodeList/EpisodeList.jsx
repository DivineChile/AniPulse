import { Link as ChakraLink } from "@chakra-ui/react";
import { useState } from "react";

import { Link as ReactRouterLink } from "react-router-dom";

const EpisodeList = ({ items, itemId, coverImg }) => {
  const [showAll, setShowAll] = useState(false);

  const episodes = [];

  const endIndex = showAll
    ? items.length > 5
      ? items.length
      : 5
    : items.length > 5
    ? 5
    : items.length;

  for (let i = 0; i < endIndex; i++) {
    const epArray = itemId[i].split("-");
    const lastItems = epArray.splice(-2);
    const coverItem = coverImg[i];

    let newItemID = "";
    if (lastItems[0]?.length > 1) {
      newItemID = `Episode ${lastItems.pop()}`;
    } else {
      newItemID = `Episode ${lastItems[0]}.5`;
    }

    episodes.push(
      <ChakraLink
        as={ReactRouterLink}
        to={`/watch/${encodeURIComponent(coverItem)}/${itemId[i]}`}
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
        key={i + 1}
      >
        {newItemID}
      </ChakraLink>
    );
  }

  //check if there are more than 15 items and "Show More" link is not clicked
  const showMoreLink = items.length > 5;

  // Define the onClick handler for the "Show More" link
  const handleShowMoreClick = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };

  const buttonText = showAll ? "Show Less" : "Show More";

  if (showMoreLink) {
    episodes.push(
      <ChakraLink
        as={ReactRouterLink}
        onClick={handleShowMoreClick}
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
        key="showMore"
        textAlign="center"
      >
        {buttonText}
      </ChakraLink>
    );
  }
  return episodes;
};

export default EpisodeList;
