import { Box, Flex, Grid, GridItem, Heading, Text } from "@chakra-ui/react";

const RecentUpdate = () => {
  return (
    // Recent Release
    <Box
      px={{ base: "20px", lg: "80px", xl: "100px" }}
      bg="var(--primary-background-color)"
      py="40px"
    >
      {/* Recent Release Head */}
      <Box
        display="flex"
        flexDir={{ base: "column", md: "row" }}
        gap={{ base: "7px 0", md: "0 20px" }}
        alignItems="center"
        justifyContent={{ base: "center", md: "flex-start" }}
        my="20px"
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

      {/* Recent Animes Released */}
      <Box>
        <Grid
          gridTemplateColumns={{
            base: "100%",
            md: "repeat(3, 1fr)",
            xl: "repeat(4, 1fr)",
          }}
          gap={{ base: "10px 0", md: "15px 10px" }}
        >
          {/* Anime Item */}
          <GridItem>
            {/* Anime Img */}
            <Box
              bg={`url()`}
              bgRepeat="no-repeat"
              bgPos="center"
              bgSize="cover"
              w="100%"
              borderRadius="10px"
            ></Box>
            {/* Details */}
            <Flex gap="10px" my="6px" alignItems="center">
              <Text
                as="span"
                color="var(--secondary-accent-color)"
                cursor="pointer"
                p="3px 10px"
                transition="all ease 0.25s"
                _hover={{
                  color: "var(--text-color)",
                  bgColor: "var(--secondary-accent-color)",
                }}
                borderRadius="6px"
                border="2px solid var(--secondary-accent-color)"
                fontSize={{ base: "16.03px", md: "14.25px" }}
                lineHeight="24px"
                letterSpacing="0.5px"
                textTransform="uppercase"
              >
                Dub
              </Text>
              <Text
                as="span"
                color="var(--secondary-accent-color)"
                cursor="pointer"
                p="3px 10px"
                transition="all ease 0.25s"
                _hover={{
                  color: "var(--text-color)",
                  bgColor: "var(--secondary-accent-color)",
                }}
                borderRadius="6px"
                border="2px solid var(--secondary-accent-color)"
                fontSize={{ base: "16.03px", md: "14.25px" }}
                lineHeight="24px"
                letterSpacing="0.5px"
                textTransform="uppercase"
              >
                sub
              </Text>
              <Text
                fontSize={{ base: "12.69px", lg: "17px" }}
                lineHeight={{ base: "24px" }}
                color="var(--text-color)"
              >
                TV
              </Text>
            </Flex>
            <Text
              as="p"
              fontSize="22.88px"
              lineHeight="36px"
              letterSpacing="0.5px"
              fontWeight="500"
              color="var(--text-color)"
            >
              My Hero Academia
            </Text>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};

export default RecentUpdate;
