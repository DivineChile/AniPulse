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
import MovieCard from "../../Movie/MovieCard";

import { BsInfoCircle } from "react-icons/bs";
import { useState } from "react";
import "../../../index.css";

const GridView = ({ results }) => {
  const [showAll, setShowAll] = useState(false);
  const displayedAnimeResults = showAll
    ? results
    : results.slice(0, Math.min(8, results.length));
  return (
    <Box>
      <Grid
        gridTemplateColumns={{
          base: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={{ base: "20px 20px", sm: "20px", md: "40px 25px" }}
      >
        {results && results?.length > 0
          ? displayedAnimeResults.map((item, index) => {
              const media_type = item.media_type === "movie" ? "movie" : "tv";
              const media_type_exist = item.media_type ? true : false;
              const resultId = item.id;
              const resultTitle = item.title || item.name;
              const resultImg =
                item.poster ||
                `https://image.tmdb.org/t/p/w500${item.poster_path}`;
              const resultType = item.type || item.media_type;

              return !media_type_exist ? (
                <GridItem w={{ base: "100%" }} key={index}>
                  <Skeleton isLoaded={results} fitContent borderRadius="10px">
                    <Box
                      as={ReactRouterLink}
                      to={
                        !media_type_exist
                          ? `/anime/${resultId}`
                          : media_type === "movie"
                          ? `/movies/movie/${resultId}`
                          : `/movies/tv/${resultId}`
                      }
                      pos="relative"
                      overflow="hidden!important"
                      className={`episode-container`}
                      h={{
                        base: "216px",
                        sm: "290.23px",
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
                          to={
                            !media_type_exist
                              ? `/anime/${resultId}`
                              : media_type === "movie"
                              ? `/movies/movie/${resultId}`
                              : `/movies/tv/${resultId}`
                          }
                          color="var(--text-color)"
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
                            color="var(--text-color)"
                            transition="all ease 0.25s"
                            className="viewIcon"
                            _hover={{
                              color: "var(--accent-color)",
                            }}
                          />
                          {!media_type_exist ? `View Anime` : `View`}
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
                        p={{ base: "0px 6px", lg: "3px 10px" }}
                        transition="all ease 0.25s"
                        _hover={{
                          color: "var(--background-color)",
                          bgColor: "var(--accent-color)",
                          borderColor: "var(--accent-color)",
                        }}
                        borderRadius="8px"
                        border={{
                          base: "1px solid var(--text-color)",
                          md: "2px solid var(--text-color)",
                        }}
                        fontSize={{ base: "12.63px", md: "14.63px" }}
                        lineHeight="24px"
                        letterSpacing="0.5px"
                        textTransform="uppercase"
                      >
                        {!media_type_exist ? `SUB ${item.episodes.sub}` : ""}
                      </Text>
                      <Text
                        as="span"
                        color="var(--text-color)"
                        cursor="pointer"
                        p={{ base: "0px 6px", lg: "3px 10px" }}
                        transition="all ease 0.25s"
                        _hover={{
                          color: "var(--background-color)",
                          bgColor: "var(--accent-color)",
                          borderColor: "var(--accent-color)",
                        }}
                        borderRadius="8px"
                        border={{
                          base: "1px solid var(--text-color)",
                          md: "2px solid var(--text-color)",
                        }}
                        fontSize={{ base: "12.63px", md: "14.63px" }}
                        lineHeight="24px"
                        letterSpacing="0.5px"
                        textTransform="uppercase"
                      >
                        {!media_type_exist ? `DUB ${item.episodes.sub}` : ""}
                      </Text>
                      <Text
                        as="span"
                        color="var(--text-color)"
                        cursor="pointer"
                        hideBelow="sm"
                        p={{ base: "0px 6px", lg: "3px 10px" }}
                        transition="all ease 0.25s"
                        _hover={{
                          color: "var(--accent-color)",
                        }}
                        fontSize={{ base: "12.63px", md: "14.63px" }}
                        lineHeight="24px"
                        letterSpacing="0.5px"
                        textTransform="uppercase"
                      >
                        {resultType ? resultType : ""}
                      </Text>
                    </Flex>
                    <ChakraLink
                      as={ReactRouterLink}
                      _hover={{ textDecor: "none" }}
                      to={
                        !media_type_exist
                          ? `/anime/${resultId}`
                          : media_type === "movie"
                          ? `/movies/movie/${resultId}`
                          : `/movies/tv/${resultId}`
                      }
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
                        letterSpacing="0.5px"
                        fontWeight="500"
                        textAlign={{ base: "start" }}
                        color="var(--text-color)"
                        transition="all ease 0.25s"
                        _hover={{ color: "var(--accent-color)" }}
                      >
                        {resultTitle?.length > 30
                          ? `${resultTitle.slice(0, 20)}...`
                          : resultTitle}
                      </Text>
                    </ChakraLink>
                  </Box>
                </GridItem>
              ) : (
                <MovieCard movie={item} />
              );
            })
          : [1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
              <GridItem key={index}>
                <Skeleton
                  borderRadius="10px"
                  h={{
                    base: "216px",
                    sm: "290.23px",
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
      <>
        {/* Show All / Show Less Button */}
        {results.length > 8 && (
          <ChakraLink
            as="button"
            onClick={() => setShowAll((prev) => !prev)}
            color="var(--text-color)"
            fontSize={{
              base: "15px",
              md: "17px",
              lg: "19px",
              "2xl": "22.96px",
            }}
            border="1px solid var(--secondary-color)"
            borderRadius="5px"
            padding="5px 15px"
            transition="all ease 0.25s"
            width={{ base: "100%", md: "fit-content" }}
            _hover={{
              textDecor: "none",
              color: "var(--background-color)",
              background: "var(--accent-color)",
              border: "none",
            }}
            pos="relative"
            m="20px auto 0"
          >
            {showAll ? "Show Less" : "Show All"}
          </ChakraLink>
        )}
      </>
    </Box>
  );
};

export default GridView;
