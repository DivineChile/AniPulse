import {
  LinkBox,
  Card,
  Image,
  LinkOverlay,
  Box,
  Flex,
  HStack,
  Badge,
  Text,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

const SmallCard = ({ result, page }) => {
  const resultId = result.id;
  const resultImg = result.posterImage;
  const resultTitle = result.name;
  const resultType = result.type;
  const episodes = result.episodes;

  return (
    <LinkBox
      key={resultId}
      _hover={{
        transform: "scale(1.01)",
      }}
      transition={"all 0.2s ease-in-out"}
    >
      <Card.Root flexDirection="row" overflow="hidden">
        <Image
          objectFit="cover"
          src={resultImg}
          bg="var(--card-background-color)"
          w={{ base: "60.94px", md: "75px", lg: "85px" }}
          alt={resultId}
        />
        <Box>
          <Card.Body w="100%">
            <LinkOverlay asChild>
              <ReactRouterLink to={`/anime/${resultId}`}>
                <Card.Title
                  mb="2"
                  fontSize={{
                    base: "12.81px",
                    sm: "13px",
                    md: "14.77px",
                    lg: "16.63px",
                  }}
                  lineHeight={{ base: "18px", md: "22.5px" }}
                  letterSpacing="0.5px"
                  fontFamily="var(--font-family)"
                  lineClamp={1}
                >
                  {resultTitle}
                </Card.Title>
              </ReactRouterLink>
            </LinkOverlay>
            <Flex alignItems="center" w="100%" gap={3}>
              {episodes.sub && (
                <HStack>
                  {episodes.sub && (
                    <Badge variant="surface" size={{ base: "sm" }}>
                      SUB {episodes.sub}
                    </Badge>
                  )}
                  {episodes.dub && (
                    <Badge variant="surface" size={{ base: "sm" }}>
                      DUB {episodes.dub}
                    </Badge>
                  )}
                </HStack>
              )}
              <Text
                fontSize={{
                  base: "12.81px",
                  sm: "13px",
                }}
                lineHeight={{ base: "18px", md: "22.5px" }}
              >
                {resultType}
              </Text>
            </Flex>
          </Card.Body>
        </Box>
      </Card.Root>
    </LinkBox>
  );
};

export default SmallCard;
