import {
  Link as ChakraLink,
  Image,
  Heading,
  Text,
  VStack,
  Flex,
  Card,
  LinkBox,
  LinkOverlay,
  Badge,
  HStack,
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
