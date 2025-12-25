import {
  Box,
  Image,
  Text,
  AspectRatio,
  Flex,
  Badge,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

const MovieCard = ({ item }) => {
  const is_TV = item.type.toLowerCase() === "tv" ? true : false;

  return (
    <LinkBox
      borderRadius="lg"
      overflow="hidden"
      bg="var(--card-background-color)"
      _hover={{
        transform: "scale(1.03)",
        transition: "0.2s",
        boxShadow: "0 0px 20px rgba(114, 29, 29, 0.32)",
      }}
      cursor="pointer"
      shadow="md"
    >
      <AspectRatio ratio={1}>
        <Image
          src={item.posterImage}
          alt={item.name}
          bg="var(--card-background-color)"
          transition="0.5s"
          objectFit="cover"
        />
      </AspectRatio>

      <Box p="3">
        <Flex justifyContent="space-between" alignItems="center" mb="1">
          <Badge colorPalette="purple" borderRadius="md" px="2">
            {item.quality}
          </Badge>

          <Badge colorPalette="gray" variant="outline" borderRadius="md" px="2">
            {item.type}
          </Badge>
        </Flex>

        <LinkOverlay asChild>
          <ReactRouterLink to={`/${is_TV ? "tv" : "movie"}/${item.id}`}>
            <Text
              lineClamp="2"
              fontWeight="semibold"
              fontSize="md"
              color="var(--text-color)"
            >
              {item.name}
            </Text>
          </ReactRouterLink>
        </LinkOverlay>

        <Flex
          mt="2"
          justifyContent="space-between"
          fontSize="sm"
          color="var(--text-secondary)"
        >
          <Text>{is_TV ? `Seasons: ${item.seasons}` : item.releaseDate}</Text>
          <Text>{is_TV ? `Eps: ${item.totalEpisodes}` : item.duration}</Text>
        </Flex>
      </Box>
    </LinkBox>
  );
};

export default MovieCard;
0;
