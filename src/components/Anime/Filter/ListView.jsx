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
import { useState } from "react";
import StarRating from "../../Movie/StarRating";
import "./style.css";

const ListView = ({
  results = [],
  loading = false,
  error = false,
  errorMessage = "Something went wrong.",
}) => {
  const [showAll, setShowAll] = useState(false);
  const displayedMovieResults = showAll
    ? results
    : results?.slice(0, Math.min(8, results?.length));

  const renderSkeleton = () =>
    Array.from({ length: 8 }).map((_, index) => (
      <GridItem key={index}>
        <Skeleton bg="#191919" borderRadius="10px" height="120px">
          <Skeleton
            w={{ base: "54.94px", lg: "69px" }}
            borderTopLeftRadius="10px"
            borderBottomLeftRadius="10px"
          />
          <VStack py="10px" align="start" spacing="4">
            <SkeletonText noOfLines={1} skeletonHeight="10px" />
            <Flex justifyContent="space-between" alignItems="center" w="100%">
              <HStack gap="10px">
                <Skeleton w="80px" h="30px" />
                <Skeleton w="40px" h="30px" />
              </HStack>
              <Skeleton w="20px" h="30px" />
            </Flex>
          </VStack>
        </Skeleton>
      </GridItem>
    ));

  const renderResultItem = (result, index) => {
    const media_type = result.media_type === "movie" ? "movie" : "tv";
    const media_type_exist = !!result.media_type;
    const resultId = result.id;
    const resultTitle = result.title || result.name;
    const resultImg =
      result.poster || `https://image.tmdb.org/t/p/w500${result.poster_path}`;
    const resultType = media_type_exist
      ? result.tvInfo?.showType
      : result.media_type;

    const date = new Date(
      media_type === "tv" ? result.first_air_date : result.release_date
    );
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return (
      <GridItem key={index}>
        <ChakraLink
          as={ReactRouterLink}
          to={
            !media_type_exist
              ? `/anime/${resultId}`
              : media_type === "movie"
              ? `/movies/movie/${resultId}`
              : `/movies/tv/${resultId}`
          }
          className="listItem"
          bg={
            media_type_exist && result.backdrop_path
              ? `url(https://image.tmdb.org/t/p/original${result.backdrop_path})`
              : "var(--card-background-color)"
          }
          bgRepeat="no-repeat"
          bgSize="cover"
          bgPosition="center"
          bgBlendMode="overlay"
          bgColor={
            media_type_exist
              ? "rgba(0,0,0,0.8)"
              : "var(--card-background-color)"
          }
          w="100%"
          borderRadius="10px"
          display="flex"
          gap="20px"
          textDecor="none!important"
        >
          <Image
            src={resultImg}
            bg="#191919"
            w={{ base: "64px", lg: "70px" }}
            borderTopLeftRadius="10px"
            borderBottomLeftRadius="10px"
          />
          <VStack justifyContent="start" alignItems="start" w="80%" py="10px">
            <Heading
              as="h3"
              className="listItemHead"
              fontSize={{ base: "11.81px", md: "14.77px" }}
              color="var(--text-color)"
              _hover={{ color: "var(--accent-color)" }}
              transition="all ease 0.25s"
              lineHeight={{ base: "18px", md: "22.5px" }}
              letterSpacing="0.5px"
              fontWeight="500"
              fontFamily="var(--font-family)"
            >
              {resultTitle?.length > 30
                ? `${resultTitle.slice(0, 30)}...`
                : resultTitle}
            </Heading>
            {media_type_exist && <StarRating rating={result.vote_average} />}
            <Flex justifyContent="space-between" mt="5px" mb="10px" w="100%">
              <Box display="flex" alignItems="center" gap="10px">
                <Text
                  as="span"
                  color="var(--text-color)"
                  cursor="pointer"
                  p="3px 10px"
                  _hover={{
                    color: "var(--background-color)",
                    bgColor: "var(--accent-color)",
                    border: "1px solid var(--accent-color)",
                  }}
                  borderRadius="6px"
                  border="1px solid var(--text-color)"
                  fontSize="11.06px"
                  lineHeight="18px"
                  letterSpacing="0.5px"
                  textTransform="uppercase"
                >
                  {!media_type_exist
                    ? `SUB ${result.tvInfo.sub || "N/A"}`
                    : formattedDate}
                </Text>
                {!media_type_exist && (
                  <Text
                    as="span"
                    color="var(--text-color)"
                    cursor="pointer"
                    p="3px 10px"
                    _hover={{
                      color: "var(--background-color)",
                      bgColor: "var(--accent-color)",
                      border: "1px solid var(--accent-color)",
                    }}
                    borderRadius="6px"
                    border="1px solid var(--text-color)"
                    fontSize="11.06px"
                    lineHeight="18px"
                    letterSpacing="0.5px"
                    textTransform="uppercase"
                  >
                    {`DUB ${result.tvInfo.dub || "N/A"}`}
                  </Text>
                )}
              </Box>
              <Spacer />
              <Box display="flex" alignItems="baseline">
                <Text
                  as="span"
                  color="var(--text-color)"
                  cursor="pointer"
                  p="3px 10px"
                  _hover={{ color: "var(--accent-color)" }}
                  fontSize="14.63px"
                  lineHeight="24px"
                  letterSpacing="0.5px"
                  textTransform="uppercase"
                >
                  {resultType || "NIL"}
                </Text>
              </Box>
            </Flex>
          </VStack>
        </ChakraLink>
      </GridItem>
    );
  };

  return (
    <Box>
      {displayedMovieResults.length === 0 && !loading && !error && (
        <Text color="var(--text-color)" fontSize="lg">
          No results found
        </Text>
      )}
      {error ? (
        <Text color="red.400" textAlign="center" fontSize="lg">
          {errorMessage}
        </Text>
      ) : (
        <Grid
          gridTemplateColumns={{
            base: "100%",
            sm: "repeat(2, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={{ base: "20px 0", sm: "20px", md: "25px 25px" }}
        >
          {loading
            ? renderSkeleton()
            : displayedMovieResults.map(renderResultItem)}
        </Grid>
      )}

      {/* Show All / Show Less Button */}
      {!loading && !error && results?.length > 8 && (
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
    </Box>
  );
};

export default ListView;
