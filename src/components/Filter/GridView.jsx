import {
  Grid,
  GridItem,
  Link as ChakraLink,
  Box,
  Text,
  Flex,
  Image,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

const GridView = ({ results }) => {
  return (
    <Grid
      gridTemplateColumns={{
        base: "100%",
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
        lg: "repeat(4, 1fr)",
      }}
      gap={{ base: "20px 0", sm: "20px", md: "40px 25px" }}
    >
      {results.map((item, index) => {
        return (
          <GridItem w={{ base: "100%" }} key={index}>
            <Box
              as={ReactRouterLink}
              to={`/anime/`}
              pos="relative"
              overflow="hidden!important"
              className={`episode-container`}
              h={{
                base: "400.23px",
                sm: "380.23px",
                md: "350px",
                lg: "360px",
                "2xl": "408.19px",
              }}
              display="flex"
              borderRadius="10px"
              transition="opacity 0.5s"
            >
              {/* Anime Img */}
              <Image
                // src={bg}
                w="100%"
                bg="#191919"
                borderRadius="10px"
                transition="transform 0.7s ease-in-out"
                h="100%"
                className="thumbnail"
              />

              {/* Overlay */}
              <Box
                className="overlay"
                pos="absolute"
                top="0"
                left="0"
                textAlign="center"
                background="rgba(0, 0, 0, 0.7)!important"
                transition="height 0.7s ease, opacity 0.7s ease"
                h="0"
                w="100%"
                borderRadius="10px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                opacity="0"
              >
                <ChakraLink
                  as={ReactRouterLink}
                  to={`/anime/`}
                  color="var(--link-color)"
                  _hover={{
                    color: "var(--accent-color)",
                    transition: "all ease 0.25s",
                  }}
                  fontSize="22.88px"
                  lineHeight="36px"
                  letterSpacing="0.5px"
                  fontWeight="500"
                >
                  View Anime
                </ChakraLink>
              </Box>
            </Box>
            <Box
              display="flex"
              flexDir="column"
              alignItems={{ base: "flex-start" }}
              mt="10px"
            >
              <Flex gap="10px" mt="5px" mb="10px">
                <Text
                  as="span"
                  color="var(--text-color)"
                  cursor="pointer"
                  p="3px 10px"
                  transition="all ease 0.25s"
                  _hover={{
                    color: "var(--background-color)",
                    bgColor: "var(--accent-color)",
                    border: "2px solid var(--accent-color)",
                  }}
                  borderRadius="8px"
                  border="2px solid var(--text-color)"
                  fontSize={{ base: "14.63px" }}
                  lineHeight="24px"
                  letterSpacing="0.5px"
                  textTransform="uppercase"
                >
                  SPRING
                </Text>
                <Text
                  as="span"
                  color="var(--text-color)"
                  cursor="pointer"
                  p="3px 10px"
                  transition="all ease 0.25s"
                  _hover={{
                    color: "var(--background-color)",
                    bgColor: "var(--accent-color)",
                    border: "2px solid var(--accent-color)",
                  }}
                  borderRadius="8px"
                  border="2px solid var(--text-color)"
                  fontSize={{ base: "14.63px" }}
                  lineHeight="24px"
                  letterSpacing="0.5px"
                  textTransform="uppercase"
                >
                  2022
                </Text>
                <Text
                  as="span"
                  color="var(--text-color)"
                  cursor="pointer"
                  p="3px 10px"
                  transition="all ease 0.25s"
                  _hover={{
                    color: "var(--accent-color)",
                  }}
                  fontSize={{ base: "14.63px" }}
                  lineHeight="24px"
                  letterSpacing="0.5px"
                  textTransform="uppercase"
                >
                  TV
                </Text>
              </Flex>
              <ChakraLink
                as={ReactRouterLink}
                _hover={{ textDecor: "none" }}
                to={`/anime/`}
              >
                {/* Anime Name */}
                <Text
                  as="p"
                  fontSize={{
                    base: "17px",
                    sm: "19px",
                    lg: "20px",
                    "2xl": "22.88px",
                  }}
                  lineHeight="26px"
                  // mt="5px"
                  letterSpacing="0.5px"
                  fontWeight="500"
                  textAlign={{ base: "start" }}
                  color="var(--link-color)"
                  transition="all ease 0.25s"
                  _hover={{ color: "var(--accent-color)" }}
                >
                  Title
                </Text>
              </ChakraLink>
            </Box>
          </GridItem>
        );
      })}
    </Grid>
  );
};

export default GridView;
