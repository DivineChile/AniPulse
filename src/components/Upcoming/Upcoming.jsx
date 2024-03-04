import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import banner1 from "../../assets/banner-img-1.png";

const Upcoming = () => {
  return (
    <Box
      px={{ base: "20px", lg: "80px", xl: "100px" }}
      py="40px"
      bg={`url(${banner1})`}
      bgBlendMode="overlay"
      bgColor={{ base: "rgba(0,0,0,0.8)" }}
      bgSize="cover"
      bgPos="center"
      bgRepeat="no-repeat"
      height="100vh"
      pos="relative"
      display="flex"
      alignItems="center"
    >
      <Box
        height="100%"
        w="193px"
        bg={`url(${banner1})`}
        bgBlendMode="overlay"
        bgColor={{ base: "rgba(0,0,0,0.5)" }}
        bgSize="cover"
        bgPos="center right"
        pos="absolute"
        bgRepeat="repeat-x"
        top="0"
        right="0"
        hideBelow="md"
      ></Box>
      <Box
        height="100%"
        w="253px"
        bg={`url(${banner1})`}
        bgBlendMode="overlay"
        bgColor={{ base: "rgba(0,0,0,0.5)" }}
        bgSize="cover"
        bgPos="center"
        pos="absolute"
        bgRepeat="repeat-x"
        top="0"
        right="213px"
        hideBelow="md"
      ></Box>
      <Box zIndex="1">
        {/* Upcoming Anime Name */}
        <Heading
          as="h1"
          textTransform="uppercase"
          textColor="#fff"
          fontSize={{
            base: "40px",
            sm: "50px",
            md: "60.13px",
            lg: "65.13px",
            "2xl": "77.34px",
          }}
          fontWeight="bold"
          lineHeight={{ base: "48px", md: "68px", lg: "76px", "2xl": "88px" }}
          letterSpacing="1.5px"
          width={{ base: "80%", md: "90%", lg: "70%" }}
        >
          attack on titans
        </Heading>
        {/* Upcoming anime season */}
        <Text
          as="p"
          fontSize={{ base: "20.97px", md: "25px", lg: "30px", "2xl": "40px" }}
          lineHeight={{ base: "33px", md: "35px", lg: "40px", "2xl": "60px" }}
          textTransform="uppercase"
          mb="15px"
          mt={{ base: "15px", md: "5px" }}
          textColor="#fff"
          letterSpacing="0.5px"
        >
          Season 4
        </Text>
        {/* upcoming Genres */}
        <Flex mb="15px">
          <Text
            as="span"
            fontSize={{
              base: "15.53px",
              md: "18px",
              lg: "22px",
              "2xl": "29.3px",
            }}
            lineHeight={{ base: "24px", md: "27px", lg: "31px", "2xl": "45px" }}
            letterSpacing="0.5px"
            textColor="var(--text-color)"
          >
            Dark fantasy,{"  "}
          </Text>
          <Text
            as="span"
            fontSize={{
              base: "15.53px",
              md: "18px",
              lg: "22px",
              "2xl": "29.3px",
            }}
            lineHeight={{ base: "24px", md: "27px", lg: "31px", "2xl": "45px" }}
            letterSpacing="0.5px"
            textColor="var(--text-color)"
          >
            Post Apocalyptic
          </Text>
        </Flex>
        <Flex gap="10px 10px" flexWrap="wrap" mb="30px">
          <Text
            as="span"
            color="var(--primary-background-color)"
            cursor="pointer"
            p="3px 10px"
            transition="all ease 0.25s"
            _hover={{
              color: "var(--background-color)",
              bgColor: "var(--accent-color)",
              border: "none",
            }}
            borderRadius="8px"
            bg="var(--secondary-color)"
            fontSize={{ base: "14.63px" }}
            lineHeight="24px"
            letterSpacing="0.5px"
          >
            PG-13
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
              border: "none",
            }}
            borderRadius="8px"
            border="2px solid var(--text-color)"
            fontSize={{ base: "14.63px" }}
            lineHeight="24px"
            letterSpacing="0.5px"
          >
            PG-13
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
              border: "none",
            }}
            borderRadius="8px"
            border="2px solid var(--text-color)"
            fontSize={{ base: "14.63px" }}
            lineHeight="24px"
            letterSpacing="0.5px"
          >
            PG-13
          </Text>
        </Flex>
        <Box>
          <Text
            as="p"
            fontSize={{
              base: "25.39px",
              md: "29px",

              "2xl": "38.91px",
            }}
            lineHeight={{ base: "39px", md: "43px", lg: "47px", "2xl": "60px" }}
            letterSpacing="0.5px"
            textColor="#fff"
            mb="15px"
          >
            Coming Out in
          </Text>
          <Flex gap="20px">
            <Text
              as="span"
              color="var(--primary-background-color)"
              p="10px"
              transition="all ease 0.25s"
              _hover={{
                boxShadow: "0 0 15px 0 var(--secondary-color)",
              }}
              borderRadius="8px"
              background="#fff"
              fontSize={{
                base: "16.63px",
                md: "20px",
                lg: "30px",
                "2xl": "35px",
              }}
              boxShadow="0 0 10px 0 var(--secondary-color)"
              lineHeight={{
                base: "24px",
                md: "28px",
                lg: "37px",
                "2xl": "52.5px",
              }}
              letterSpacing="0.5px"
              fontWeight="bold"
            >
              297
              <Text
                as="sub"
                ms="5px"
                fontSize={{ base: "12px", md: "16px", "2xl": "20px" }}
                lineHeight={{ base: "18px", md: "22px", "2xl": "30px" }}
                letterSpacing="0.5px"
                fontWeight="light"
              >
                d
              </Text>
            </Text>
            <Text
              as="span"
              color="var(--primary-background-color)"
              p="10px"
              transition="all ease 0.25s"
              _hover={{
                boxShadow: "0 0 15px 0 var(--secondary-color)",
              }}
              borderRadius="8px"
              background="#fff"
              fontSize={{
                base: "16.63px",
                md: "20px",
                lg: "30px",
                "2xl": "35px",
              }}
              boxShadow="0 0 10px 0 var(--secondary-color)"
              lineHeight={{
                base: "24px",
                md: "28px",
                lg: "37px",
                "2xl": "52.5px",
              }}
              letterSpacing="0.5px"
              fontWeight="bold"
            >
              52
              <Text
                as="sub"
                ms="5px"
                fontSize={{ base: "12px", md: "16px", "2xl": "20px" }}
                lineHeight={{ base: "18px", md: "22px", "2xl": "30px" }}
                letterSpacing="0.5px"
                fontWeight="light"
              >
                h
              </Text>
            </Text>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default Upcoming;
