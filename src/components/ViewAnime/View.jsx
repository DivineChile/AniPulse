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
import Error from "../ErrorPage/Error";
import moment from "moment";

const View = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animeInfo, setAnimeInfo] = useState([]);
  const [animeTitle, setAnimeTitle] = useState([]);
  const [animeStudio, setAnimeStudio] = useState([]);
  const [animeImg, setAnimeImg] = useState([]);
  const [animeGenre, setAnimeGenre] = useState(0);
  const [animeId, setAnimeId] = useState([]);
  const [animeScore, setAnimeScore] = useState([]);
  const [animeDesc, setAnimeDesc] = useState("");
  const [animeEp, setAnimeEp] = useState([]);
  const [animeEpId, setAnimeEpId] = useState([]);
  const [animeEpNum, setAnimeEpNum] = useState([]);
  const [epLength, setEpLength] = useState(0);
  const [epError, setEpError] = useState(null);

  const [nextAirDate, setNextAirDate] = useState(0);

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
        setAnimeImg(
          Object.entries(animeData.coverImage).map((item) => item[1])
        );
        setAnimeStudio(animeData.studios.map((item) => item.name));
        setAnimeGenre(animeData.genres.length);
        setAnimeScore(Object.entries(animeData.score).map((item) => item[1]));
        setAnimeDesc(
          window.innerWidth > 768
            ? animeData.description.length > 150
              ? animeData.description.slice(0, 150)
              : animeData.description
            : animeData.description
        );
        setNextAirDate(animeData.nextair.airingAt);

        const response = await fetch(
          `https://api-amvstrm.nyt92.eu.org/api/v2/episode/${animeId}`
        );
        const data = await response.json();

        setAnimeEp(data.episodes.map((item) => item));
        setAnimeEpNum(data.episodes.map((item) => item.number));
        setAnimeEpId(data.episodes.map((item) => item.id));
        setEpLength(animeEpNum.length);
        setIsLoading(false);
        setError(false);
      } catch {
        setIsLoading(false);
        setError(true);
      }
    };

    fetchAnimeData();
  }, []);

  const targetDate = moment(nextAirDate);

  const calculateTimeRemaining = () => {
    const now = moment();
    const difference = moment.duration(targetDate.diff(now));
    // console.log(targetDate);
    // console.log(nextAirDate - Date.now());

    const days = difference.days();
    const hours = difference.hours();
    const minutes = difference.minutes();
    const seconds = difference.seconds();
    const dayOfWeek = targetDate.format("dddd");
    return {
      days,
      hours,
      minutes,
      seconds,
      dayOfWeek,
    };
  };
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, [nextAirDate]);

  console.log(targetDate.format("HH:mm:ss"));
  // console.log(animeEpNum);

  return (
    <Box>
      <Navbar />
      {isLoading && (
        <Error
          // msg={"Still Working..."}
          loadingState={isLoading}
          height="100%"
          error={error}
          pos="fixed"
        />
      )}

      {error && (
        <Error
          msg={"Still Working..."}
          loadingState={isLoading}
          height="100%"
          error={error}
          pos="fixed"
        />
      )}

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
                  bg={
                    animeImg[0]
                      ? `url(${animeImg[0]})`
                      : "rgba(25, 27, 40, 0.7)"
                  }
                  bgSize="cover"
                  bgPos="center"
                  bgRepeat="no-repeat"
                  h={{ base: "217.64px", sm: "300px", md: "377.5px" }}
                  transition="background ease 0.25s"
                  borderRadius="10px"
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
                    transition="background ease 0.25s"
                  >
                    {animeTitle[1]}
                  </Heading>
                  <Text
                    as="h3"
                    fontSize="24.02px"
                    fontWeight="300"
                    lineHeight="37.5px"
                    color="var(--text-color)"
                    transition="background ease 0.25s"
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
                      transition="background ease 0.25s"
                    >
                      {animeDesc ? `${animeDesc}...` : "Loading..."}
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
              <GridItem colSpan={{ base: 7, md: 3, lg: 4, "2xl": 2 }}>
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
                      transition="background ease 0.25s"
                    >
                      {animeStudio[0]
                        ? `${animeStudio[0]}, ${animeStudio[1]}, ${animeStudio[2]}`
                        : "Loading..."}
                    </Text>
                  </Box>
                  {/* Anime Season */}
                  <Box display="flex" gap="0 10px">
                    <Text
                      as="p"
                      color="var(--text-color)"
                      fontSize="15px"
                      fontWeight="300"
                      lineHeight="24px"
                    >
                      Season:{"  "}
                    </Text>
                    <Text
                      color="var(--secondary-accent-color)"
                      as="span"
                      fontSize="15px"
                      fontWeight="300"
                      lineHeight="24px"
                      transition="background ease 0.25s"
                    >
                      {animeInfo.season ? animeInfo.season : "Loading..."}
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
                      transition="background ease 0.25s"
                      lineHeight="24px"
                    >
                      {animeInfo.year ? animeInfo.year : "Loading..."}
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
                      transition="background ease 0.25s"
                    >
                      {animeInfo.status ? animeInfo.status : "Loading..."}
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
                      {(() => {
                        const elements = [];

                        for (let i = 0; i < animeGenre; i++) {
                          const item = animeInfo.genres[i];

                          elements.push(
                            <Text
                              color="var(--text-color)"
                              as="span"
                              fontSize="15px"
                              fontWeight="300"
                              lineHeight="24px"
                              transition="background ease 0.25s"
                              key={item[i]}
                            >
                              {`${item}, `}
                            </Text>
                          );
                        }

                        return elements;
                      })()}
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
                      transition="background ease 0.25s"
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
                      {animeScore[1] ? animeScore[1] : "Loading..."}
                    </Text>
                  </Box>
                  {/* Next Release Date */}
                  <Box display="flex" gap="0 10px">
                    <Text
                      as="p"
                      color="var(--text-color)"
                      fontSize="15px"
                      fontWeight="300"
                      transition="background ease 0.25s"
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
                      {timeRemaining.days}
                    </Text>
                  </Box>
                </Box>
              </GridItem>
              {/* Episodes List */}
              <GridItem
                colSpan={{ base: 7, md: 4, lg: 3, "2xl": 5 }}
                mt={{ base: "20px", md: 0 }}
                id="episodes"
              >
                <Box>
                  <Heading
                    color="var(--text-color)"
                    fontSize={{ base: "26.36px", md: "30px", lg: "37.5px" }}
                    fontWeight="700"
                    lineHeight={{ base: "30.8px", md: "35px", lg: "44px" }}
                    letterSpacing="1.5px"
                  >
                    Episode List
                  </Heading>
                  <Box mt="20px">
                    {isLoading
                      ? "Loading..."
                      : (() => {
                          const elements = [];

                          const reversedAnimeEpNum = animeEpNum
                            .slice()
                            .reverse();
                          const reversedAnimeEpId = animeEpId.slice().reverse();

                          for (let i = 0; i < epLength; i++) {
                            const itemNum = reversedAnimeEpNum[i];
                            const itemId = reversedAnimeEpId[i];

                            itemNum
                              ? elements.push(
                                  <ChakraLink
                                    as={ReactRouterLink}
                                    to={`watch/${itemId}`}
                                    _hover={{
                                      textDecor: "none",
                                      color: "var(--link-hover-color)",
                                      borderBottomColor:
                                        "var(--link-hover-color)",
                                    }}
                                    color="var(--text-color)"
                                    borderBottom="1px solid var(--text-color)"
                                    w="100%"
                                    display="block"
                                    py="5px"
                                    fontSize={{
                                      base: "15.63px",
                                      md: "17px",
                                      lg: "19.38px",
                                    }}
                                    fontWeight="300"
                                    lineHeight={{
                                      base: "17.6px",
                                      md: "19px",
                                      lg: "22px",
                                    }}
                                    letterSpacing="1.5px"
                                    transition="all ease 0.25s"
                                    mb="10px"
                                    key={itemNum[i]}
                                  >
                                    {`Episode ${itemNum}`}
                                  </ChakraLink>
                                )
                              : elements.push("Loading...");
                          }

                          return elements;
                        })()}
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
