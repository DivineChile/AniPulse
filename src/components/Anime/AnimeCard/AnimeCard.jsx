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
      bg="#111111ff"
      _hover={{ transform: "scale(1.03)", transition: "0.2s" }}
      cursor="pointer"
      shadow="md"
    >
      <AspectRatio ratio={1}>
        <Image
          src={posterImage}
          alt={name}
          bg="var(--card-background-color)"
          transition="0.5s"
          objectFit="cover"
        />
      </AspectRatio>

      <Box p="3">
        <Flex justifyContent="space-between" alignItems="center" mb="1">
          <Badge
            variant="subtle"
            borderRadius={{ base: "sm", sm: "sm" }}
            size={{ base: "xs", sm: "sm", md: "sm" }}
            px="2"
          >
            SUB: {episodes.sub}
          </Badge>

          {episodes.dub && (
            <Badge
              variant="subtle"
              borderRadius={{ base: "sm", sm: "sm" }}
              size={{ base: "xs", sm: "sm", md: "sm" }}
              px="2"
            >
              DUB: {episodes.dub}
            </Badge>
          )}
        </Flex>

        <LinkOverlay asChild>
          <ReactRouterLink to={`/anime/${id}`}>
            <Text lineClamp="1" fontWeight="semibold" fontSize="md">
              {name}
            </Text>
          </ReactRouterLink>
        </LinkOverlay>

        <Flex
          mt="2"
          justifyContent="space-between"
          fontSize="sm"
          color="gray.400"
        >
          {totalEpisodes && <Text>Eps: {totalEpisodes}</Text>}
          {type && <Text>{type}</Text>}
        </Flex>
      </Box>
    </LinkBox>
  );
};

export default AnimeCard;
