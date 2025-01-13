import {
  Link as ChakraLink,
  Image,
  Heading,
  Text,
  VStack,
  Flex,
  Spacer,
  Box,
} from "@chakra-ui/react";

import { Link as ReactRouterLink } from "react-router-dom";
import Loading from "../ErrorPage/Loading";
import Error from "../ErrorPage/Error";
const TopAnime = ({ data, numbers, heading, loading, error }) => {
  const truncatedResults = data.length > 6 ? data.slice(0, 6) : data;
  return (
    <VStack
      alignItems={{ base: "center", md: "start" }}
      gap={{ base: "20px 0", sm: "20px" }}
    >
      <Box>
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
      </Box>
      <Box display="flex" flexDir="column" gap={{ base: "20px 0", sm: "20px" }}>
        {loading && <Loading />}
        {error && <Error msg="Failed to load data" />}
        {data &&
          truncatedResults.map((item, index) => {
            const animeId = item.id;
            const poster = item.poster;
            const title = item.name;
            const type = item.type;
            return (
              <Box key={index}>
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
                    {numbers === true ? (
                      <Box
                        // h="full"
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
                        >
                          {index + 1}
                        </Heading>
                      </Box>
                    ) : (
                      <></>
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
                    // py="10px"
                  >
                    <Heading
                      as="h3"
                      textDecor="none"
                      className="listItemHead"
                      fontSize={{ base: "11.81px", md: "14.77px" }}
                      color="var(--text-color)"
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
                          {item.episodes.sub
                            ? `SUB ${item.episodes.sub}`
                            : "NIL"}
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
                          {item.episodes.dub
                            ? `DUB ${item.episodes.dub}`
                            : "NIL"}
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
