import {
  Link as ChakraLink,
  Image,
  Heading,
  Text,
  VStack,
  Flex,
  Spacer,
  Card,
  LinkBox,
  LinkOverlay,
  Badge,
  HStack,
  Box,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import Error from "../../ErrorPage/Error";

const TopAnime = ({ data, numbers, heading, loading, error, icon }) => {
  // Display up to 6 anime items
  const truncatedResults = data?.length > 6 ? data.slice(0, 6) : data;

  if (loading) {
    return (
      <VStack alignItems="start" gap="20px">
        <Flex gap="10px" alignItems="center" justifyContent="center">
          {icon}
          <Heading
            fontFamily="var(--font-family)"
            fontWeight="400"
            fontSize={{ base: "23.25px", md: "29.18px" }}
            lineHeight={{ base: "26.4px", md: "33px" }}
            letterSpacing="1.5px"
            color="var(--text-color)"
          >
            {heading}
          </Heading>
        </Flex>
        {/* Skeleton placeholders */}
        <VStack spacing="20px" w="100%">
          {[...Array(6)].map((_, index) => (
            <Box key={index} display="flex" gap="20px" w="100%">
              {numbers && (
                <Skeleton
                  w={{ base: "80px", sm: "85px", md: "110px" }}
                  h={{ base: "69px", md: "90px" }}
                  borderRadius="10px"
                />
              )}
              <Skeleton
                w={{ base: "54.94px", lg: "69px" }}
                h={{ base: "80px", lg: "100px" }}
                borderRadius="10px"
              />
              <VStack align="start" justify="center" w="100%">
                <SkeletonText noOfLines={1} w="100%" />
                <Flex w="100%" gap="20px" mt="5px">
                  <Skeleton w="50px" h="20px" />
                  <Skeleton w="50px" h="20px" />
                </Flex>
              </VStack>
            </Box>
          ))}
        </VStack>
      </VStack>
    );
  }

  if (error) {
    return <Error msg="Failed to load data" />;
  }

  return (
    <VStack alignItems={{ base: "center", lg: "start" }} gap="20px" w="100%">
      <Flex gap="10px" alignItems="center" justifyContent="center">
        {icon}
        <Heading
          fontFamily="var(--font-family)"
          fontWeight="400"
          fontSize={{ base: "23.25px", md: "29.18px" }}
          lineHeight={{ base: "26.4px", md: "33px" }}
          letterSpacing="1.5px"
          color="var(--text-color)"
        >
          {heading}
        </Heading>
      </Flex>
      <Box display="flex" flexDirection="column" gap="20px" w="100%">
        {truncatedResults?.map((item, index) => {
          const animeId = item.id;
          const poster = item.poster;
          const title = item.title;
          const type = item.tvInfo.showType;

          return (
            <LinkBox
              key={animeId}
              _hover={{
                transform: "scale(1.02)",
              }}
              transition={"all 0.2s ease-in-out"}
            >
              <Card.Root flexDirection="row" overflow="hidden">
                <Image
                  objectFit="cover"
                  src={poster}
                  bg="var(--primary-background-color)"
                  w={{ base: "60.94px", md: "75px", lg: "85px" }}
                  alt={animeId}
                />
                <Box>
                  <Card.Body w="100%">
                    <LinkOverlay asChild>
                      <ReactRouterLink to={`/anime/${animeId}`}>
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
                        >
                          {title?.length > 30
                            ? `${title.slice(0, 23)}...`
                            : title}
                        </Card.Title>
                      </ReactRouterLink>
                    </LinkOverlay>
                    <Flex alignItems="center" w="100%" gap={3}>
                      {item?.tvInfo.sub && (
                        <HStack>
                          {item?.tvInfo.sub && (
                            <Badge variant="surface" size={{ base: "sm" }}>
                              SUB {item?.tvInfo.sub}
                            </Badge>
                          )}
                          {item?.tvInfo.dub && (
                            <Badge variant="surface" size={{ base: "sm" }}>
                              DUB {item?.tvInfo.dub}
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
                        {type}
                      </Text>
                    </Flex>
                  </Card.Body>
                </Box>
              </Card.Root>
            </LinkBox>
          );
        })}
      </Box>
    </VStack>
  );
};

export default TopAnime;
