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
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MovieCard from "../../Movie/MovieCard";
import "../../../index.css";
import { Info } from "lucide-react";
import AnimeCard from "../AnimeCard/AnimeCard";

const GridView = ({ results = [], isLoading = false, error = null }) => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  const displayedResults = showAll
    ? results
    : results?.slice(0, Math.min(8, results?.length));

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
            <SkeletonText noOfLines={2} spacing={1} my="10px" />
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

            // Anime Card
            if (isAnime) {
              return <AnimeCard anime={item} page="filter" key={index} />;
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
          display="flex"
          justifyContent="center"
          alignItems="center"
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
        color: "var(--text-color)",
        bgColor: "var(--accent-color)",
        borderColor: "var(--accent-color)",
      }}
    >
      {label}
    </Text>
  );
};

export default GridView;
