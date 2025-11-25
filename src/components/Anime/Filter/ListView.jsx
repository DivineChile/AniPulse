import {
  Grid,
  GridItem,
  Link as ChakraLink,
  Image,
  VStack,
  Text,
  Flex,
  Box,
  Skeleton,
  SkeletonText,
  HStack,
  LinkBox,
  Card,
  LinkOverlay,
  Badge,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { useState } from "react";
import "./style.css";
import SmallCard from "../SmallCard/SmallCard";

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
        <Skeleton bg="#191919" borderRadius="10px" height="91px">
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
    const resultId = result.id;
    return <SmallCard key={resultId} page="filter" result={result} />;
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
          display="flex"
          alignItems="center"
          justifyContent="start"
          transition="all ease 0.25s"
          width={{ base: "100%", md: "fit-content" }}
          _hover={{
            textDecor: "none",
            color: "var(--text-color)",
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
