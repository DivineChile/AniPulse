import {
  Link as ChakraLink,
  GridItem,
  Box,
  Image,
  Text,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

const Recents = ({ item, itemTitle, itemImg, itemId }) => {
  const recentAnime = [];

  for (let i = 0; i < item.length; i++) {
    recentAnime.push(
      <GridItem w={{ base: "100%", md: "306px" }} key={item[i]}>
        <Box as={ReactRouterLink} pos="relative" overflow="hidden!important">
          {/* Anime Img */}
          <Image
            // src={}
            // bg={"#191919"}
            src={itemImg[i]}
            w="100%"
            borderRadius="10px"
            transition="all ease 0.45s"
            h={{ base: "488.23px", md: "408.19px" }}
            _hover={{ transform: "scale(1.2)" }}
            // border="1px solid red"
          />

          {/* Overlay */}
          <Box
            pos="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            background="rgba(0,0,0,0.5)"
            opacity="0"
            display="flex"
            alignItems="center"
            justifyContent="center"
            transition="opacity 0.2s"
            // border="1px solid blue"
            _hover={{ opacity: "1" }}
          >
            <ChakraLink
              as={ReactRouterLink}
              to={`/watch/${itemId[i]}`}
              color="var(--text-color)"
              _hover={{
                color: "var(--secondary-accent-color)",
                transition: "all ease 0.25s",
              }}
              fontSize="22.88px"
              lineHeight="36px"
              letterSpacing="0.5px"
              fontWeight="500"
            >
              Play Now
            </ChakraLink>
          </Box>
        </Box>
        <ChakraLink
          as={ReactRouterLink}
          _hover={{ textDecor: "none" }}
          to={`/view/${itemId[i]}`}
        >
          {/* Anime Name */}
          <Text
            as="p"
            fontSize="22.88px"
            lineHeight="36px"
            letterSpacing="0.5px"
            fontWeight="500"
            color="var(--text-color)"
            textAlign="start"
            transition="all ease 0.25s"
            _hover={{ color: "var(--secondary-accent-color)" }}
          >
            {itemTitle[i]}
          </Text>
        </ChakraLink>
      </GridItem>
    );
  }
  return recentAnime;
};

export default Recents;
