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
import { Link as ReactRouterLink, useLocation } from "react-router-dom";

const AnimeCard = ({ anime, page }) => {
  const { id, poster, tvInfo } = anime;

  const title =
    page === "filter"
      ? anime.name.length > 30
        ? `${anime.name.slice(0, 25)}...`
        : anime.name
      : anime.title.length > 30
      ? `${anime.title.slice(0, 25)}...`
      : anime.title;
  const posterImg = page === "filter" ? anime.posterImage : poster;
  const episodes = page === "filter" ? anime.episodes : anime.tvInfo;
  const type = page === "filter" ? anime.type : tvInfo.showType;

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
          src={posterImg}
          alt={title}
          bg="var(--card-background-color)"
          transition="0.5s"
          objectFit="cover"
        />
      </AspectRatio>

      <Box p="3">
        <Flex justifyContent="space-between" alignItems="center" mb="1">
          <Flex gap="5px">
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
          <Badge colorScheme="purple" hideBelow="sm" borderRadius="md" px="2">
            {type}
          </Badge>
        </Flex>

        <LinkOverlay asChild>
          <ReactRouterLink to={`/anime/${id}`}>
            <Text lineClamp="1" fontWeight="semibold" fontSize="md">
              {title}
            </Text>
          </ReactRouterLink>
        </LinkOverlay>

        <Flex
          mt="2"
          justifyContent="space-between"
          fontSize="sm"
          color="gray.400"
        >
          {tvInfo.eps && <Text>Eps: {tvInfo.eps}</Text>}
          {tvInfo.duration && <Text>{tvInfo.duration}</Text>}
        </Flex>
      </Box>
    </LinkBox>
  );
};

export default AnimeCard;
