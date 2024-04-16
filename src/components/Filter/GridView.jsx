import {
  Grid,
  GridItem,
  Link as ChakraLink,
  Box,
  Text,
  Flex,
  Image,
  Skeleton,
  HStack,
  SkeletonText,
  Icon,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

import { BsInfoCircle } from "react-icons/bs";

const GridView = ({ results }) => {
  return (
    <Grid
      gridTemplateColumns={{
        base: "100%",
        sm: "repeat(2, 1fr)",
        md: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)",
        xl: "repeat(4, 1fr)",
      }}
      gap={{ base: "20px 0", sm: "20px", md: "40px 25px" }}
    >
      {results && results?.length > 0
        ? results.map((item, index) => {
            const resultId = item.id;
            const resultTitle = item.title.userPreferred;
            const resultImg = item.image;
            const resultRelease = item.releaseDate;
            const resultStatus = item.status;
            const resultType = item.type;

            return (
              <GridItem w={{ base: "100%" }} key={index}>
                <Skeleton isLoaded={results} fitContent borderRadius="10px">
                  <Box
                    as={ReactRouterLink}
                    to={`/anime/${resultId}`}
                    pos="relative"
                    overflow="hidden!important"
                    className={`episode-container`}
                    h={{
                      base: "400.23px",
                      sm: "380.23px",
                      md: "350px",
                      lg: "360px",
                      "2xl": "408.19px",
                    }}
                    display="flex"
                    borderRadius="10px"
                    transition="opacity 0.5s"
                  >
                    {/* Anime Img */}
                    <Image
                      src={resultImg}
                      w="100%"
                      bg="#191919"
                      borderRadius="10px"
                      transition="transform 0.7s ease-in-out"
                      h="100%"
                      className="thumbnail"
                    />

                    {/* Overlay */}
                    <Box
                      className="overlay"
                      pos="absolute"
                      top="0"
                      left="0"
                      textAlign="center"
                      background="rgba(0, 0, 0, 0.7)!important"
                      transition="height 0.7s ease, opacity 0.7s ease"
                      h="0"
                      w="100%"
                      borderRadius="10px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      opacity="0"
                    >
                      <ChakraLink
                        as={ReactRouterLink}
                        to={`/anime/${resultId}`}
                        color="var(--link-color)"
                        _hover={{
                          color: "var(--accent-color)",
                          transition: "all ease 0.25s",
                        }}
                        fontSize="22.88px"
                        lineHeight="36px"
                        letterSpacing="0.5px"
                        fontWeight="500"
                        display="flex"
                        alignItems="center"
                        className="viewAnimeBtn"
                        gap="5px"
                      >
                        <Icon
                          as={BsInfoCircle}
                          color="var(--secondary-color)"
                          transition="all ease 0.25s"
                          className="viewIcon"
                          _hover={{
                            color: "var(--accent-color)",
                          }}
                        />
                        View Anime
                      </ChakraLink>
                    </Box>
                  </Box>
                </Skeleton>
                <Box
                  display="flex"
                  flexDir="column"
                  alignItems={{ base: "flex-start" }}
                  mt="10px"
                >
                  <Flex gap="10px" mt="5px" mb="10px">
                    <Text
                      as="span"
                      color="var(--text-color)"
                      cursor="pointer"
                      p="3px 10px"
                      transition="all ease 0.25s"
                      _hover={{
                        color: "var(--background-color)",
                        bgColor: "var(--accent-color)",
                        border: "2px solid var(--accent-color)",
                      }}
                      borderRadius="8px"
                      border="2px solid var(--text-color)"
                      fontSize={{ base: "14.63px" }}
                      lineHeight="24px"
                      letterSpacing="0.5px"
                      textTransform="uppercase"
                    >
                      {resultStatus}
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
                        border: "2px solid var(--accent-color)",
                      }}
                      borderRadius="8px"
                      border="2px solid var(--text-color)"
                      fontSize={{ base: "14.63px" }}
                      lineHeight="24px"
                      letterSpacing="0.5px"
                      textTransform="uppercase"
                    >
                      {resultRelease}
                    </Text>
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
                      {resultType}
                    </Text>
                  </Flex>
                  <ChakraLink
                    as={ReactRouterLink}
                    _hover={{ textDecor: "none" }}
                    to={`/anime/${resultId}`}
                  >
                    {/* Anime Name */}
                    <Text
                      as="p"
                      fontSize={{
                        base: "17px",
                        sm: "19px",
                        lg: "20px",
                        "2xl": "22.88px",
                      }}
                      lineHeight="26px"
                      // mt="5px"
                      letterSpacing="0.5px"
                      fontWeight="500"
                      textAlign={{ base: "start" }}
                      color="var(--link-color)"
                      transition="all ease 0.25s"
                      _hover={{ color: "var(--accent-color)" }}
                    >
                      {resultTitle?.length > 30
                        ? `${resultTitle.slice(0, 30)}...`
                        : resultTitle}
                    </Text>
                  </ChakraLink>
                </Box>
              </GridItem>
            );
          })
        : [1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
            <GridItem key={index}>
              <Skeleton
                borderRadius="10px"
                h={{
                  base: "400.23px",
                  sm: "380.23px",
                  md: "350px",
                  lg: "360px",
                  "2xl": "408.19px",
                }}
                w="100%"
              />
              <HStack mt="10px">
                <Skeleton h="20px" w="50px" />
                <Skeleton h="20px" w="50px" />
              </HStack>
              <SkeletonText noOfLines={2} h={2} spacing={2} my="10px" />
            </GridItem>
          ))}
    </Grid>
  );
};

export default GridView;
