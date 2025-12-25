import {
  GridItem,
  Image,
  Link as ChakraLink,
  Badge,
  LinkBox,
  LinkOverlay,
  Box,
  Text,
  Flex,
  AspectRatio,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

const AnimeCard = ({ anime, page }) => {
  const { id, posterImage, episodes, name, type, totalEpisodes } = anime;

  return (
    <LinkBox
      borderRadius="lg"
      overflow="hidden"
      bg="var(--card-background-color)"
      cursor="pointer"
      shadow="lg"
      transition="all 0.25s ease"
      _hover={{
        transform: "scale(1.03)",
        boxShadow: "0 0px 20px rgba(114, 29, 29, 0.32)",
      }}
    >
      <AspectRatio ratio={1}>
        <Image
          src={posterImage}
          alt={name}
          bg="#000000ff"
          transition="0.5s"
          objectFit="cover"
        />
      </AspectRatio>

      <Box p="3" bg="var(--card-background-color)">
        <Flex gap={2} alignItems="center" mb="1">
          <Badge
            // px="2"
            variant="solid"
            colorPalette="blackAlpha"
            size={{ base: "xs", md: "sm" }}
          >
            SUB: {episodes.sub}
          </Badge>

          {episodes.dub && (
            <Badge
              // px="2"
              variant="outline"
              colorPalette="blackAlpha"
              size={{ base: "xs", md: "sm" }}
            >
              DUB: {episodes.dub}
            </Badge>
          )}
        </Flex>

        <LinkOverlay asChild>
          <ReactRouterLink to={`/anime/${id}`}>
            <Text
              lineClamp="1"
              fontWeight="semibold"
              fontSize="md"
              color="var(--text-color)"
            >
              {name}
            </Text>
          </ReactRouterLink>
        </LinkOverlay>

        <Flex
          mt="2"
          justifyContent="space-between"
          fontSize="sm"
          color="var(--text-secondary)"
        >
          {totalEpisodes && <Text>Eps: {totalEpisodes}</Text>}
          {type && <Text>{type}</Text>}
        </Flex>
      </Box>
    </LinkBox>
  );
};

export default AnimeCard;
