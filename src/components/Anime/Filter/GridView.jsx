import {
  Grid,
  GridItem,
  Box,
  Text,
  Flex,
  Image,
  Skeleton,
  HStack,
  SkeletonText,
  Icon,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MovieCard from "../../Movie/MovieCard";
import "../../../index.css";

const GridView = ({ results = [], isLoading = false, error = null }) => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  const displayedResults = showAll
    ? results
    : results?.slice(0, Math.min(8, results?.length));

  const handleClick = (item) => {
    const contentType = item.title ? "movie" : "tv";
    navigate(`/view/${contentType}/${item.id}`);
  };

  // 🔄 Loading State
  if (isLoading) {
    return (
      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={4}
      >
        {[...Array(8)].map((_, index) => (
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
    );
  }

  // ❌ Error State
  if (error) {
    return (
      <Box color="var(--text-color)" mt="4">
        <Text fontSize="lg">Failed to fetch results</Text>
      </Box>
    );
  }

  // 🚫 Empty State
  if (!results || results.length === 0) {
    return (
      <Box color="var(--text-color)" mt="4">
        <Text fontSize="lg">No results found.</Text>
      </Box>
    );
  }

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
        {results &&
          results?.length > 0 &&
          displayedResults.map((item, index) => {
            const isAnime = !item.media_type;
            const mediaType = item.media_type === "movie" ? "movie" : "tv";
            const resultId = item.id;
            const resultTitle = item.title || item.name;
            const resultImg =
              item.poster ||
              `https://image.tmdb.org/t/p/w500${item.poster_path}`;
            const resultType = isAnime ? item.tvInfo.showType : item.media_type;
            const route = isAnime
              ? `/anime/${resultId}`
              : mediaType === "movie"
              ? `/movies/movie/${resultId}`
              : `/movies/tv/${resultId}`;

            // Anime Card
            if (isAnime) {
              return (
                <GridItem w="100%" key={index}>
                  <Skeleton isLoaded={results} borderRadius="10px">
                    <Box
                      as={ReactRouterLink}
                      to={route}
                      pos="relative"
                      className="episode-container"
                      h={{
                        base: "216px",
                        sm: "290.23px",
                        md: "350px",
                        lg: "360px",
                        "2xl": "408.19px",
                      }}
                      display="flex"
                      borderRadius="10px"
                      overflow="hidden"
                      transition="opacity 0.5s"
                    >
                      {/* Thumbnail */}
                      <Image
                        src={resultImg}
                        w="100%"
                        h="100%"
                        bg="var(--card-background-color)"
                        borderRadius="10px"
                        className="thumbnail"
                        transition="transform 0.7s ease-in-out"
                      />

                      {/* Overlay */}
                      <Box
                        className="overlay"
                        pos="absolute"
                        top="0"
                        left="0"
                        w="100%"
                        h="0"
                        opacity="0"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        textAlign="center"
                        background="rgba(0, 0, 0, 0.85)!important"
                        borderRadius="10px"
                        transition="height 0.5s ease, opacity 0.5s ease"
                      >
                        <ChakraLink
                          as={ReactRouterLink}
                          to={route}
                          display="flex"
                          alignItems="center"
                          gap="5px"
                          className="viewAnimeBtn"
                          color="var(--link-hover-color)"
                          fontSize="22.88px"
                          lineHeight="36px"
                          letterSpacing="0.5px"
                          fontWeight="500"
                          _hover={{
                            color: "var(--link-hover-color)",
                            transition: "all ease 0.25s",
                          }}
                        >
                          <Icon
                            as={BsInfoCircle}
                            className="viewIcon"
                            color="var(--link-hover-color)"
                            _hover={{ color: "var(--link-hover-color)" }}
                            transition="all ease 0.25s"
                          />
                          View Anime
                        </ChakraLink>
                      </Box>
                    </Box>
                  </Skeleton>

                  {/* Meta Info */}
                  <Box
                    mt="10px"
                    display="flex"
                    flexDir="column"
                    alignItems="flex-start"
                  >
                    <Flex gap="10px" mt="5px" mb="10px">
                      <TextTag label={`SUB ${item.tvInfo?.sub || "N/A"}`} />
                      <TextTag label={`DUB ${item.tvInfo?.dub || "N/A"}`} />
                      <TextTag label={resultType} hideBelow="sm" />
                    </Flex>

                    <ChakraLink
                      as={ReactRouterLink}
                      to={route}
                      _hover={{ textDecor: "none" }}
                    >
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
                        textAlign="start"
                        color="var(--text-color)"
                        transition="all ease 0.25s"
                        _hover={{
                          color: "var(--link-hover-color)",
                          fontWeight: "bold",
                        }}
                      >
                        {resultTitle?.length > 30
                          ? `${resultTitle.slice(0, 20)}...`
                          : resultTitle}
                      </Text>
                    </ChakraLink>
                  </Box>
                </GridItem>
              );
            }

            // Movie/TV Card
            return <MovieCard movie={item} key={index} />;
          })}
      </Grid>

      {/* Show All / Show Less Button */}
      {results?.length > 8 && (
        <ChakraLink
          as="button"
          onClick={() => setShowAll((prev) => !prev)}
          m="20px auto 0"
          pos="relative"
          color="var(--text-color)"
          fontSize={{ base: "15px", md: "17px", lg: "19px", "2xl": "22.96px" }}
          border="1px solid var(--secondary-color)"
          borderRadius="5px"
          padding="5px 15px"
          width={{ base: "100%", md: "fit-content" }}
          transition="all ease 0.25s"
          _hover={{
            textDecor: "none",
            color: "var(--background-color)",
            background: "var(--accent-color)",
            border: "none",
          }}
        >
          {showAll ? "Show Less" : "Show All"}
        </ChakraLink>
      )}
    </Box>
  );
};

// Helper component for tags (SUB, DUB, Type)
const TextTag = ({ label, hideBelow }) => {
  if (!label) return null;
  return (
    <Text
      as="span"
      hideBelow={hideBelow}
      color="var(--text-color)"
      cursor="pointer"
      p={{ base: "0px 6px", lg: "3px 10px" }}
      borderRadius="8px"
      border={{
        base: "1px solid var(--text-color)",
        md: "2px solid var(--text-color)",
      }}
      fontSize={{ base: "12.63px", md: "14.63px" }}
      lineHeight="24px"
      letterSpacing="0.5px"
      textTransform="uppercase"
      transition="all ease 0.25s"
      _hover={{
        color: "var(--background-color)",
        bgColor: "var(--accent-color)",
        borderColor: "var(--accent-color)",
      }}
    >
      {label}
    </Text>
  );
};

export default GridView;
