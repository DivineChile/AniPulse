import {
  Link as ChakraLink,
  VStack,
  Flex,
  Box,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import Error from "../../ErrorPage/Error";
import SmallCard from "../SmallCard/SmallCard";

const TopAnime = ({ data, numbers, heading, loading, error, icon }) => {
  // Display up to 6 anime items
  const truncatedResults = data?.length > 6 ? data.slice(0, 6) : data;

  if (loading) {
    return (
      <VStack alignItems="start" gap="20px">
        {/* Skeleton placeholders */}
        <VStack spacing="20px" w="100%">
          {[...Array(6)].map((_, index) => (
            <Flex
              bg="var(--card-background-color)"
              borderRadius="8px"
              overflow="hidden"
              h={{ base: "100px", md: "120px" }}
              key={index}
            >
              <Skeleton w={{ base: "70px", md: "80px" }} h="100%" />
              <Box flex="1" p={{ base: "10px 12px", md: "12px 16px" }}>
                <SkeletonText noOfLines={2} spacing="4" mb="8px" />
                <SkeletonText noOfLines={1} spacing="4" />
              </Box>
            </Flex>
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
      <Box display="flex" flexDirection="column" gap="20px" w="100%">
        {truncatedResults?.map((item, index) => {
          const animeId = item.id;
          return <SmallCard key={animeId} result={item} />;
        })}
      </Box>
    </VStack>
  );
};

export default TopAnime;
