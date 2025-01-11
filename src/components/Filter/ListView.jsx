import {
  Grid,
  GridItem,
  Link as ChakraLink,
  Image,
  VStack,
  Heading,
  Text,
  Flex,
  Spacer,
  Box,
  Skeleton,
  SkeletonText,
  HStack,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

import "./style.css";

const ListView = ({ results }) => {
  return (
    <Grid
      gridTemplateColumns={{
        base: "100%",
        sm: "repeat(2, 1fr)",
        md: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)",
      }}
      gap={{ base: "20px 0", sm: "20px", md: "25px 25px" }}
    >
      {results && results?.length > 0
        ? results?.map((result, index) => {
            const resultId = result.id;
            const resultTitle = result.name;
            const resultImg = result.poster;
            const resultType = result.type;

            return (
              <GridItem key={index}>
                <ChakraLink
                  as={ReactRouterLink}
                  bg="#111111"
                  w="100%"
                  borderRadius="10px"
                  display="flex"
                  gap="20px"
                  textDecor="none!important"
                  to={`/anime/${resultId}`}
                  className="listItem"
                >
                  <Image
                    src={resultImg}
                    bg="#191919"
                    w={{ base: "54.94px", lg: "69px" }}
                    borderTopLeftRadius="10px"
                    borderBottomLeftRadius="10px"
                  />
                  <VStack
                    justifyContent="start"
                    alignItems="start"
                    w="80%"
                    py="10px"
                  >
                    <Heading
                      as="h3"
                      textDecor="none"
                      className="listItemHead"
                      fontSize={{ base: "11.81px", md: "14.77px" }}
                      color="var(--secondary-color)"
                      _hover={{
                        color: "var(--accent-color)",
                      }}
                      transition="all ease 0.25s"
                      lineHeight={{ base: "18px", md: "22.5px" }}
                      letterSpacing="0.5px"
                    >
                      {resultTitle?.length > 30
                        ? `${resultTitle.slice(0, 30)}...`
                        : resultTitle}
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
                          {result.episodes.sub ? "SUB" : "NIL"}
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
                          {result.episodes.dub ? "DUB" : "NIL"}
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
                          {resultType && resultType !== "" ? resultType : "NIL"}
                        </Text>
                      </Box>
                    </Flex>
                  </VStack>
                </ChakraLink>
              </GridItem>
            );
          })
        : [1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => {
            <GridItem key={index}>
              <Skeleton bg="#191919">
                <Skeleton
                  w={{ base: "54.94px", lg: "69px" }}
                  borderTopLeftRadius="10px"
                  borderBottomLeftRadius="10px"
                />

                <VStack py="10px">
                  <SkeletonText noOfLines={1} h={2} />
                  <Flex justifyContent="space-between" alignItems="center">
                    <HStack gap="10px">
                      <Skeleton w="80px" h="30px" />
                      <Skeleton w="40px" h="30px" />
                    </HStack>
                    <Skeleton w="20px" h="30px" />
                  </Flex>
                </VStack>
              </Skeleton>
            </GridItem>;
          })}
    </Grid>
  );
};

export default ListView;
