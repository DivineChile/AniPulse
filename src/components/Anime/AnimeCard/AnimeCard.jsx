import {
  GridItem,
  Image,
  Link as ChakraLink,
  Card,
  HStack,
  Badge,
  LinkBox,
  LinkOverlay,
  AlertTitle,
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
    <GridItem w="100%">
      <LinkBox
        pos="relative"
        overflow="hidden"
        display="block"
        h={{
          base: "250px",
          sm: "350px",
          md: "370px",
          lg: "390px",
          "2xl": "408px",
        }}
        w="100%"
        _hover={{ transform: "scale(1.02)" }}
        transition="transform 0.3s"
      >
        <Card.Root
          w="100%"
          overflow="hidden"
          variant="elevated"
          h="100%"
          transition="opacity 0.3s"
        >
          <Image
            src={posterImg}
            w="100%"
            bg="var(--card-background-color)"
            h={{ base: "60%", sm: "75%", md: "70%" }}
            alt={title}
            objectFit="cover"
          />

          <Card.Body
            gap="2"
            p={{ base: 2, md: 4 }}
            // bg="var(--card-background-color)"
          >
            <HStack gap="2" flexWrap="wrap">
              {episodes.sub && (
                <Badge
                  variant="surface"
                  size={{ base: "sm", md: "md", lg: "lg" }}
                >
                  {`SUB ${episodes.sub}`}
                </Badge>
              )}

              {episodes.dub && (
                <Badge
                  variant="surface"
                  size={{ base: "sm", md: "md", lg: "lg" }}
                >
                  {`DUB ${episodes.dub}`}
                </Badge>
              )}
              <Badge
                hideBelow="md"
                variant="surface"
                size={{ base: "sm", md: "md", lg: "lg" }}
              >
                {type}
              </Badge>
            </HStack>
            <LinkOverlay asChild>
              <ReactRouterLink to={`/anime/${id}`}>
                <Card.Title
                  fontSize={{
                    base: "15px",
                    sm: "18px",
                    lg: "20px",
                    "2xl": "22px",
                  }}
                  lineHeight="25px"
                  letterSpacing="0.5px"
                  fontFamily="var(--font-family)"
                >
                  {title}
                </Card.Title>
              </ReactRouterLink>
            </LinkOverlay>
          </Card.Body>
        </Card.Root>
      </LinkBox>
    </GridItem>
  );
};

export default AnimeCard;
