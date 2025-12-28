// components/Skeletons/AnimeCardSkeleton.jsx
import { Box } from "@chakra-ui/react";
import { Skeleton, SkeletonText } from "@chakra-ui/react";

export const AnimeCardSkeleton = () => {
  return (
    <Box
      w="100%"
      borderRadius="8px"
      overflow="hidden"
      bg="var(--card-background-color)"
    >
      {/* Image skeleton */}
      <Skeleton
        w="100%"
        h="190px" // 2:3 aspect ratio
        bg="rgba(255, 255, 255, 0.05)"
      />

      {/* Info skeleton */}
      <Box p="12px">
        <SkeletonText noOfLines={2} spacing="4" skeletonHeight="3" mb="8px" />
        <SkeletonText noOfLines={1} spacing="4" skeletonHeight="2" />
      </Box>
    </Box>
  );
};

export const SmallCardSkeleton = () => {
  return (
    <Box
      bg="var(--card-background-color)"
      borderRadius="8px"
      overflow="hidden"
      border="1px solid rgba(255, 255, 255, 0.05)"
      h="120px"
      display="flex"
    >
      {/* Image skeleton */}
      <Skeleton w="80px" h="100%" bg="rgba(255, 255, 255, 0.05)" />

      {/* Content skeleton */}
      <Box flex="1" p="12px">
        <SkeletonText noOfLines={2} spacing="4" skeletonHeight="3" mb="8px" />
        <SkeletonText noOfLines={1} spacing="4" skeletonHeight="2" />
      </Box>
    </Box>
  );
};
