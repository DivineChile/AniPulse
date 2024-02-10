import {
  Box,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Grid,
  GridItem,
  Heading,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams, Link as ReactRouterLink } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const View = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animeInfo, setAnimeInfo] = useState([]);
  const [animeTitle, setAnimeTitle] = useState([]);
  const [animeStudio, setAnimeStudio] = useState([]);
  const [animeGenre, setAnimeGenre] = useState([]);
  const [animeId, setAnimeId] = useState([]);

  useEffect(() => {
    const fetchAnimeData = async () => {
      try {
        const animeRes = await fetch(
          `https://api-amvstrm.nyt92.eu.org/api/v2/info/${id}`
        );
        const animeData = await animeRes.json();
        setAnimeInfo(animeData);
        setAnimeId(animeData.id);
        setAnimeTitle(Object.entries(animeData.title).map((item) => item[1]));
        setAnimeStudio(animeData.studios.map((item) => item.name));
        setAnimeGenre(
          animeInfo.genres.map((item) => {
            item;
          })
        );
        setIsLoading(false);
      } catch {
        setIsLoading(false);
        setError(true);
      }
    };
    fetchAnimeData();
  }, []);
  //   console.group(animeInfo);
  console.group(animeTitle);
  console.group(animeStudio);
  console.group(animeId);

  return (
    <Box>
      <Navbar />

      <Box background="var(--primary-background-color)">
        <Box px={{ base: "20px", lg: "80px", xl: "100px" }} py="20px">
          {/* BreadCrumb Links */}
          <Breadcrumb mb="20px">
            <BreadcrumbItem
              fontSize={{ base: "15.13px", lg: "18.75px" }}
              lineHeight={{ base: "24px", lg: "30px" }}
              letterSpacing="0.5px"
              color="var(--text-color)"
              _hover={{ color: "var(--link-hover-color)" }}
            >
              <BreadcrumbLink as={ReactRouterLink} to="/">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem
              isCurrentPage
              fontSize={{ base: "15.13px", lg: "18.75px" }}
              lineHeight={{ base: "24px", lg: "30px" }}
              letterSpacing="0.5px"
              color="var(--link-color)"
              _hover={{ color: "var(--link-hover-color)" }}
            >
              <BreadcrumbLink>Anime</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          {/* Anime Details */}
          <Box my="20px">
            {/*  */}
            <Grid gridTemplateColumns="repeat(7, 1fr)" gap="20px">
              <GridItem
                colSpan={{ base: 7, "2xl": 5 }}
                display="flex"
                flexDir={{ base: "column", md: "row" }}
                gap={{ base: "20px 0", md: "0 20px" }}
                alignItems={{ base: "start", md: "center", "2xl": "start" }}
                mb="20px"
              >
                {/* Anime Image */}
                <Box
                  w={{ base: "100%", md: "55%" }}
                  bg={{
                    base: `url(${animeInfo.bannerImage})`,
                    // md: `url(${animeInfo.coverImage.large})`,
                  }}
                  bgSize="cover"
                  bgPos="center"
                  bgRepeat="no-repeat"
                  h={{ base: "217.64px", sm: "300px", md: "377.5px" }}
                  borderRadius="10px"
                  //   border="1px solid var(--link-color)"
                ></Box>
                {/* Anime Desc */}
                <Box
                  w={{ base: "100%", md: "45%" }}
                  mb={{ base: "20px", md: "0" }}
                >
                  {/* Anime Name */}
                  <Heading
                    as="h2"
                    fontSize="35px"
                    fontWeight="500"
                    color="var(--text-color)"
                    letterSpacing="1.5px"
                    lineHeight="38.5px"
                  >
                    {animeTitle[1]}
                  </Heading>
                  <Text
                    as="h3"
                    fontSize="24.02px"
                    fontWeight="300"
                    lineHeight="37.5px"
                    color="var(--text-color)"
                  >
                    Episodes : {animeInfo.episodes}
                  </Text>
                  {/* Anime Summary */}
                  <Box mt="20px">
                    <Text
                      as="h4"
                      mb="8px"
                      color="var(--text-color)"
                      fontSize="24.02px"
                      fontWeight="600"
                      lineHeight="27.5px"
                      letterSpacing="1.5px"
                    >
                      Plot Summary
                    </Text>
                    <Text
                      as="p"
                      color="var(--text-color)"
                      fontSize="15.38px"
                      fontWeight="300"
                      lineHeight="24px"
                      letterSpacing="0.5px"
                    >
                      {window.innerWidth > 768
                        ? animeInfo.description.length > 150
                          ? `${animeInfo.description.slice(0, 250)}...`
                          : animeInfo.description
                        : animeInfo.description}
                    </Text>
                  </Box>
                  <Box w="100%" h="47px">
                    <ChakraLink
                      href="#episodes"
                      w="100%"
                      h="47px!important"
                      color="var(--text-color)"
                      border="1px solid var(--secondary-accent-color)"
                      borderRadius="10px"
                      transition="all ease 0.25s"
                      _hover={{
                        color: "var(--text-color)",
                        textDecoration: "none",
                        background: "var(--link-color)",
                      }}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      mt="20px"
                      fontSize="19.77px"
                      fontWeight="500"
                      lineHeight="33px"
                      letterSpacing="0.5px"
                      textTransform="uppercase"
                    >
                      Watch Now
                    </ChakraLink>
                  </Box>
                </Box>
              </GridItem>
              {/* Anime Details */}
              <GridItem colSpan={{ base: 7, md: 3, "2xl": 2 }}>
                <Box display="flex" flexDir="column" gap="9px 0">
                  <Text
                    as="h3"
                    color="var(--text-color)"
                    fontSize="24.61px"
                    fontWeight="400"
                    lineHeight="27.5px"
                    letterSpacing="1.5px"
                    mb="10px"
                  >
                    Anime Details
                  </Text>
                  {/* Anime Author */}
                  <Box display="flex" gap="0 10px">
                    <Text
                      as="p"
                      color="var(--text-color)"
                      fontSize="15px"
                      fontWeight="300"
                      lineHeight="24px"
                    >
                      Studio:{"  "}
                    </Text>
                    <Text
                      color="var(--secondary-accent-color)"
                      as="span"
                      fontSize="15px"
                      fontWeight="300"
                      lineHeight="24px"
                    >
                      {`${animeStudio[0]}, ${animeStudio[1]}, ${animeStudio[2]}`}
                    </Text>
                  </Box>
                  {/* Anime Studio */}
                  <Box display="flex" gap="0 10px">
                    <Text
                      as="p"
                      color="var(--text-color)"
                      fontSize="15px"
                      fontWeight="300"
                      lineHeight="24px"
                    >
                      Author:{"  "}
                    </Text>
                    <Text
                      color="var(--secondary-accent-color)"
                      as="span"
                      fontSize="15px"
                      fontWeight="300"
                      lineHeight="24px"
                    >
                      Bones
                    </Text>
                  </Box>
                  {/* Release Year */}
                  <Box display="flex" gap="0 10px">
                    <Text
                      as="p"
                      color="var(--text-color)"
                      fontSize="15px"
                      fontWeight="300"
                      lineHeight="24px"
                    >
                      Year:{"  "}
                    </Text>
                    <Text
                      color="var(--text-color)"
                      as="span"
                      fontSize="15px"
                      fontWeight="300"
                      lineHeight="24px"
                    >
                      {animeInfo.year}
                    </Text>
                  </Box>
                  {/* Status */}
                  <Box display="flex" gap="0 10px">
                    <Text
                      as="p"
                      color="var(--text-color)"
                      fontSize="15px"
                      fontWeight="300"
                      lineHeight="24px"
                    >
                      Status:{"  "}
                    </Text>
                    <Text
                      color="var(--secondary-accent-color)"
                      as="span"
                      fontSize="15px"
                      fontWeight="300"
                      lineHeight="24px"
                    >
                      {animeInfo.status}
                    </Text>
                  </Box>
                  {/* Genres */}
                  <Box display="flex" gap="0 10px">
                    <Text
                      as="p"
                      color="var(--text-color)"
                      fontSize="15px"
                      fontWeight="300"
                      lineHeight="24px"
                    >
                      Genres:{"  "}
                    </Text>
                    {/* Genre */}
                    <Box display="flex" gap="2px" flexWrap="wrap">
                      {console.log(animeGenre)}
                      <Text
                        color="var(--text-color)"
                        as="span"
                        fontSize="15px"
                        fontWeight="300"
                        lineHeight="24px"
                      >
                        Action,
                      </Text>
                      <Text
                        color="var(--text-color)"
                        as="span"
                        fontSize="15px"
                        fontWeight="300"
                        lineHeight="24px"
                      >
                        Action
                      </Text>
                    </Box>
                  </Box>
                  {/* Views */}
                  <Box display="flex" gap="0 10px">
                    <Text
                      as="p"
                      color="var(--text-color)"
                      fontSize="15px"
                      fontWeight="300"
                      lineHeight="24px"
                    >
                      Score:{"  "}
                    </Text>
                    <Text
                      color="var(--text-color)"
                      as="span"
                      fontSize="15px"
                      fontWeight="300"
                      lineHeight="24px"
                    >
                      {animeInfo.score.decimalScore}
                    </Text>
                  </Box>
                  {/* Next Release Date */}
                  <Box display="flex" gap="0 10px">
                    <Text
                      as="p"
                      color="var(--text-color)"
                      fontSize="15px"
                      fontWeight="300"
                      lineHeight="24px"
                    >
                      Est. Episode At:{"  "}
                    </Text>
                    <Text
                      color="var(--text-color)"
                      as="span"
                      fontSize="15px"
                      fontWeight="300"
                      lineHeight="24px"
                    >
                      123456
                    </Text>
                  </Box>
                </Box>
              </GridItem>
              {/* Episodes List */}
              <GridItem
                colSpan={{ base: 7, md: 4, lg: 4, "2xl": 5 }}
                mt={{ base: "20px", md: 0 }}
                id="episodes"
              >
                <Box>
                  <Heading
                    color="var(--text-color)"
                    fontSize="37.5px"
                    fontWeight="700"
                    lineHeight="44px"
                    letterSpacing="1.5px"
                  >
                    Episode List
                  </Heading>
                  <Box mt="20px">
                    <ChakraLink
                      as={ReactRouterLink}
                      to="/stream/"
                      _hover={{
                        textDecor: "none",
                        color: "var(--link-hover-color)",
                        borderBottomColor: "var(--link-hover-color)",
                      }}
                      color="var(--text-color)"
                      borderBottom="1px solid var(--text-color)"
                      w="100%"
                      display="block"
                      py="5px"
                      fontSize="19.38px"
                      fontWeight="300"
                      lineHeight="22px"
                      letterSpacing="1.5px"
                      transition="all ease 0.25s"
                      mb="10px"
                    >
                      Episode 1
                    </ChakraLink>
                    <ChakraLink
                      as={ReactRouterLink}
                      to="/stream/"
                      _hover={{
                        textDecor: "none",
                        color: "var(--link-hover-color)",
                        borderBottomColor: "var(--link-hover-color)",
                      }}
                      color="var(--text-color)"
                      borderBottom="1px solid var(--text-color)"
                      w="100%"
                      display="block"
                      py="5px"
                      fontSize="19.38px"
                      fontWeight="300"
                      lineHeight="22px"
                      letterSpacing="1.5px"
                      transition="all ease 0.25s"
                      mb="10px"
                    >
                      Episode 1
                    </ChakraLink>
                  </Box>
                </Box>
              </GridItem>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default View;
