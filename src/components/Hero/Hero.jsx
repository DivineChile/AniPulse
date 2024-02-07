import { Box, Flex, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import Navbar from "../Navbar/Navbar";
import Bg from "../../assets/banner-img-1.png";
import { Link } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  return (
    <Box w="100%" h="100vh">
      <Box>
        <Navbar />
      </Box>
      <Box
        background={`url(${Bg})`}
        backgroundPosition="center"
        backgroundSize="100%"
        backgroundBlendMode="overlay"
        backgroundColor="rgba(0,0,0,0.65)"
        backgroundRepeat="no-repeat"
        w="100%"
        h="calc(100vh - 84px)"
      >
        {/* Anime Recommendation */}
        <Flex px="100px" h="100%" alignItems="center">
          {/* Anime Details */}
          <VStack
            width="550px"
            display="flex"
            flexDir="column"
            alignItems="flex-start"
          >
            {/* Anime Title */}
            <Heading
              color="var(--text-color)"
              textTransform="uppercase"
              fontWeight="600"
              fontSize="79.06px"
              lineHeight="88px"
              letterSpacing="1.5px"
              fontFamily="var(--font-family)"
            >
              Attack on Titans
            </Heading>
            {/* Anime Season */}
            <Heading
              as="h4"
              textTransform="uppercase"
              color="var(--text-color)"
              fontFamily="var(--font-family)"
              fontSize="37.97px"
              lineHeight="40px"
              letterSpacing="0.5px"
              fontWeight="400"
            >
              Season 3
            </Heading>
            {/* PG / Dub / Sub */}
            <HStack my="10px" gap="0 10px">
              <Text
                as="span"
                cursor="pointer"
                p="3px 10px"
                transition="all ease 0.25s"
                color="var(--text-color)"
                bgColor="var(--secondary-accent-color)"
                borderRadius="8px"
                border="2px solid var(--secondary-accent-color)"
                fontSize="16.63px"
                lineHeight="24px"
                letterSpacing="0.5px"
              >
                PG-13
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
                borderRadius="8px"
                border="2px solid var(--secondary-accent-color)"
                fontSize="16.63px"
                lineHeight="24px"
                letterSpacing="0.5px"
              >
                DUB
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
                borderRadius="8px"
                border="2px solid var(--secondary-accent-color)"
                fontSize="16.63px"
                lineHeight="24px"
                letterSpacing="0.5px"
              >
                SUB
              </Text>
            </HStack>
            {/* Release Date */}
            <Heading
              as="h4"
              textTransform="uppercase"
              color="var(--text-color)"
              fontFamily="var(--font-family)"
              fontSize="28.95px"
              lineHeight="40px"
              letterSpacing="0.5px"
              fontWeight="400"
            >
              april 07, 2013
            </Heading>
            {/* Description */}
            <Text
              as="p"
              fontSize="15.38px"
              lineHeight="24px"
              letterSpacing="0.5px"
              color="var(--text-color)"
            >
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occaecati cupiditate non
              provident.
            </Text>

            <Box width="100%" my="10px">
              <Link to="/stream" className="play-now-btn">
                PLAY NOW
              </Link>
            </Box>
          </VStack>
        </Flex>
      </Box>
    </Box>
  );
};

export default Hero;
