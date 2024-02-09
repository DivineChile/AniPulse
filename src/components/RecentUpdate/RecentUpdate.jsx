import { Box, Heading, Text } from "@chakra-ui/react";

const RecentUpdate = () => {
  return (
    <Box
      px={{ base: "20px", lg: "80px", xl: "100px" }}
      bg="var(--primary-background-color)"
    >
      <Box
        display="flex"
        flexDir={{ base: "column", md: "row" }}
        gap="0 20px"
        alignItems="center"
        justifyContent={{ base: "center", md: "flex-start" }}
      >
        <Heading
          as="h2"
          fontSize={{ base: "28.59px", lg: "32px", "2xl": "37.97px" }}
          fontWeight="600"
          lineHeight={{ base: "33px", lg: "38px", "2xl": "44px" }}
          letterSpacing="1.5px"
          color="var(--text-color)"
          m="0"
          textTransform="uppercase"
        >
          Recently Updated
        </Heading>
        <Text
          as="p"
          fontSize={{ base: "16px", "2xl": "20px" }}
          lineHeight={{ base: "17.6px", "2xl": "22px" }}
          letterSpacing="1.5px"
          color="var(--text-color)"
          m="0"
          textTransform="uppercase"
        >
          Sunday 01 Jan 2023
        </Text>
      </Box>
    </Box>
  );
};

export default RecentUpdate;
