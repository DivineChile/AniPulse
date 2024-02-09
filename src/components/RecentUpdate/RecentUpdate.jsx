import { Box, Heading } from "@chakra-ui/react";

const RecentUpdate = () => {
  return (
    <Box px={{ base: "20px", lg: "80px", xl: "100px" }}>
      <Box>
        <Heading as="h2">Recently Updated</Heading>
      </Box>
    </Box>
  );
};

export default RecentUpdate;
