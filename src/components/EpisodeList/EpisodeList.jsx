import { Link as ChakraLink } from "@chakra-ui/react";

import { useParams, Link as ReactRouterLink } from "react-router-dom";

const EpisodeList = ({ items, itemImg, id, itemId, itemNum }) => {
  const episodes = [];

  for (let i = 0; i < items.length; i++) {
    episodes.push(
      <ChakraLink
        as={ReactRouterLink}
        to={`/watch/${encodeURIComponent(itemImg[i])}/${id}/${itemId[i]}`}
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
        key={i}
      >
        {`Episode ${itemNum[i]}`}
      </ChakraLink>
    );
  }
  return episodes;
};

export default EpisodeList;
