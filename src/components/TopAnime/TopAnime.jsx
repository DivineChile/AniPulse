import {
  Link as ChakraLink,
  Image,
  Heading,
  Text,
  VStack,
  Flex,
  Spacer,
  Box,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import Error from "../ErrorPage/Error";

const TopAnime = ({ data, numbers, heading, loading, error }) => {
  // Display up to 6 anime items
  const truncatedResults = data?.length > 6 ? data.slice(0, 6) : data;

  if (loading) {
    return (
      <VStack alignItems="start" gap="20px">
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
    <VStack alignItems={{base: "center", lg: "start"}} gap="20px" w="100%">
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
      <Box display="flex" flexDirection="column" gap="20px" w="100%">
        {truncatedResults?.map((item, index) => {
          const animeId = item.id;
          const poster = item.poster;
          const title = item.name;
          const type = item.type;

          return (
            <Box key={animeId || index} w="100%">
              <ChakraLink
                as={ReactRouterLink}
                bg="#111111"
                w="100%"
                borderRadius="10px"
                display="flex"
                gap="20px"
                textDecor="none!important"
                to={`/anime/${animeId}`}
                className="listItem"
              >
                <Box display="flex">
                  {numbers && (
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      w={{ base: "80px", sm: "85px", md: "110px" }}
                    >
                      <Heading
                        fontFamily="var(--font-family)"
                        fontWeight="400"
                        lineHeight={{ base: "69px", md: "90px" }}
                        fontSize={{ base: "46px", md: "60px" }}
                        letterSpacing="1.5px"
                        className="topNumber"
                        id={`top${index + 1}`}
                      >
                        {index + 1}
                      </Heading>
                    </Box>
                  )}
                  <Image
                    src={poster}
                    bg="#191919"
                    w={{ base: "54.94px", lg: "69px" }}
                    borderRadius="10px"
                  />
                </Box>
                <VStack
                  justifyContent="center"
                  alignItems="start"
                  w="80%"
                  py="10px"
                >
                  <Heading
                    as="h3"
                    textDecor="none"
                    className="listItemHead"
                    fontSize={{ base: "12.81px", sm: "13px", md: "14.77px" }}
                    color="var(--text-color)"
                    fontWeight="400"
                    _hover={{
                      color: "var(--accent-color)",
                    }}
                    transition="all ease 0.25s"
                    lineHeight={{ base: "18px", md: "22.5px" }}
                    letterSpacing="0.5px"
                  >
                    {title?.length > 30 ? `${title.slice(0, 30)}...` : title}
                  </Heading>
                  <Flex
                    justifyContent="space-between"
                    mt="5px"
                    mb="10px"
                    w="100%"
                  >
                    <Box display="flex" alignItems="center" gap="10px">
                      <Text
                        as="span"
                        color="var(--text-color)"
                        cursor="pointer"
                        p="3px 10px"
                        transition="all ease 0.25s"
                        _hover={{
                          color: "var(--background-color)",
                          bgColor: "var(--accent-color)",
                          border: "1px solid var(--accent-color)",
                          textDecor: "none",
                        }}
                        borderRadius="6px"
                        border="1px solid var(--text-color)"
                        fontSize={{ base: "11.06" }}
                        lineHeight="18px"
                        letterSpacing="0.5px"
                        textTransform="uppercase"
                      >
                        {item.episodes?.sub
                          ? `SUB ${item.episodes.sub}`
                          : "SUB N/A"}
                      </Text>
                      <Text
                        as="span"
                        color="var(--text-color)"
                        cursor="pointer"
                        p="3px 10px"
                        transition="all ease 0.25s"
                        _hover={{
                          color: "var(--background-color)",
                          bgColor: "var(--accent-color)",
                          border: "1px solid var(--accent-color)",
                        }}
                        borderRadius="6px"
                        border="1px solid var(--text-color)"
                        fontSize={{ base: "11.06" }}
                        lineHeight="18px"
                        letterSpacing="0.5px"
                        textTransform="uppercase"
                      >
                        {item.episodes?.dub
                          ? `DUB ${item.episodes.dub}`
                          : "DUB N/A"}
                      </Text>
                    </Box>
                    <Spacer />
                    <Box display="flex" alignItems="baseline">
                      <Text
                        as="span"
                        color="var(--text-color)"
                        cursor="pointer"
                        p="3px 10px"
                        transition="all ease 0.25s"
                        _hover={{
                          color: "var(--accent-color)",
                        }}
                        fontSize={{ base: "14.63px" }}
                        lineHeight="24px"
                        letterSpacing="0.5px"
                        textTransform="uppercase"
                      >
                        {type && type !== "" ? type : "NIL"}
                      </Text>
                    </Box>
                  </Flex>
                </VStack>
              </ChakraLink>
            </Box>
          );
        })}
      </Box>
    </VStack>
  );
};

export default TopAnime;
