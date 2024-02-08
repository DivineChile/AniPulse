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
        backgroundSize="cover"
        backgroundBlendMode="overlay"
        backgroundColor="rgba(0,0,0,0.65)"
        backgroundRepeat="no-repeat"
        w="100%"
        h={{
          base: "calc(100vh - 70.89px)",
          md: "calc(100vh - 74px)",
          lg: "calc(100vh - 84px)",
        }}
      >
        {/* Anime Recommendation */}
        <Flex
          px={{ base: "20px", lg: "80px", xl: "100px" }}
          h="100%"
          alignItems="center"
        >
          {/* Anime Details */}
          <VStack
            width={{ base: "100%", lg: "550px" }}
            display="flex"
            flexDir="column"
            alignItems="flex-start"
          >
            {/* Anime Title */}
            <Heading
              color="var(--text-color)"
              textTransform="uppercase"
              fontWeight="600"
              fontSize={{
                base: "40px",
                sm: "50px",
                md: "65px",
                lg: "67px",
                "2xl": "76.25px",
              }}
              lineHeight={{ base: "48px", md: "68px", "2xl": "88px" }}
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
              fontSize={{ base: "20.97px", md: "29px", "2xl": "37.97px" }}
              lineHeight={{ base: "33px", md: "35px", "2xl": "40px" }}
              letterSpacing="0.5px"
              fontWeight="400"
              mt={{ base: "10px", "2xl": "15px" }}
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
                fontSize={{ base: "14.63px", md: "16.63px" }}
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
                fontSize={{ base: "14.63px", md: "16.63px" }}
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
                fontSize={{ base: "14.63px", md: "16.63px" }}
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
              fontSize={{ base: "19.38px", md: "24px", "2xl": "28.95px" }}
              lineHeight={{ base: "30px", md: "35px", "2xl": "40px" }}
              letterSpacing="0.5px"
              fontWeight="400"
            >
              april 07, 2013
            </Heading>
            {/* Description */}
            <Text
              as="p"
              fontSize={{ base: "13.56px", md: "14.38px", "2xl": "15.38px" }}
              lineHeight={{ base: "21px", md: "22px", "2xl": "24px" }}
              letterSpacing="0.5px"
              color="var(--text-color)"
              my="10px"
              fontWeight={{ base: "300", md: "normal" }}
            >
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occaecati cupiditate non
              provident.
            </Text>

            <Box width="100%" my={{ base: "15px", md: "10px" }}>
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
