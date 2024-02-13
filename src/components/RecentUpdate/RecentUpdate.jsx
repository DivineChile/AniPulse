import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Image,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import animeImg from "../../assets/img-2.png";
import { useEffect, useState } from "react";
import Recents from "../RecentList/Recents";

const RecentUpdate = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subAnimeData, setSubAimeData] = useState([]);
  const [subAnimeTitle, setSubAnimeTitle] = useState([]);
  const [subAnimeImg, setSubAnimeImg] = useState([]);
  const [subAnimeEpId, setSubAnimeEpId] = useState([]);
  const [dubAnimeData, setDubAimeData] = useState([]);
  const [CnAnimeData, setCnAimeData] = useState([]);

  useEffect(() => {
    // Fecth Subbed Anime
    async function fetchRecentReleaseAnime() {
      try {
        //Subbed Api
        const responseSub = await fetch(
          "https://api-amvstrm.nyt92.eu.org/api/v1/recentepisode/sub"
        );

        if (!responseSub.ok) {
          setError("Please Check Connection");
          setIsLoading(false);
        }
        const subData = await responseSub.json();
        setSubAimeData(subData.results.map((item) => item));
        setSubAnimeEpId(subAnimeData.map((item) => item.episode_id));
        setSubAnimeImg(subAnimeData.map((item) => item.image_url));
        setSubAnimeTitle(subAnimeData.map((item) => item.title));

        //Dubbed Api
        const responseDub = await fetch(
          "https://api-amvstrm.nyt92.eu.org/api/v1/recentepisode/dub"
        );

        if (!responseDub.ok) {
          setError("Please Check Connection");
          setIsLoading(false);
        }
        const dubData = await responseDub.json();
        setDubAimeData(dubData.results);

        //Subbed Api
        const responseCn = await fetch(
          "https://api-amvstrm.nyt92.eu.org/api/v1/recentepisode/cn"
        );

        if (!responseCn.ok) {
          setError("Please Check Connection");
          setIsLoading(false);
        }
        const cnData = await responseCn.json();
        setCnAimeData(cnData.results);
      } catch (error) {
        setError("Still Working...");
      }
    }
    // Fetch Dubbed Anime
    fetchRecentReleaseAnime();
  }, []);

  const getCurrentDate = () => {
    const today = new Date();

    const dayOfWeek = today.getDay();

    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const fullDayName = daysOfWeek[dayOfWeek];

    const fullDate = today.toDateString().split(" ");
    fullDate.shift();
    const newFullDate = fullDate.join(" ");

    return { dayOfWeek, fullDayName, newFullDate };
  };

  const { dayOfWeek, fullDayName, newFullDate } = getCurrentDate();

  console.log(subAnimeTitle);
  console.log(dubAnimeData);
  console.log(CnAnimeData);
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
        pos="relative"
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
          {`${fullDayName} ${newFullDate}`}
        </Text>
      </Box>
      {/* Recent Animes Released */}
      <Box>
        <Tabs
          position="relative"
          top={{ base: "initial", md: "-60px" }}
          variant="unstyled"
          align="end"
          defaultIndex={0}
          isLazy="true"
        >
          <TabList mb="20px" gap="0 10px">
            <Tab
              color="var(--secondary-accent-color)"
              transition="all ease 0.25s"
              _hover={{
                color: "var(--text-color)",
              }}
              borderRadius="6px"
              fontSize={{ base: "16.03px", md: "14.25px" }}
              lineHeight="24px"
              letterSpacing="0.5px"
              textTransform="uppercase"
              _selected={{
                color: "var(--text-color)",
                bgColor: "var(--secondary-accent-color)",
              }}
            >
              Sub
            </Tab>
            <Tab
              color="var(--secondary-accent-color)"
              transition="all ease 0.25s"
              _hover={{
                color: "var(--text-color)",
              }}
              borderRadius="6px"
              fontSize={{ base: "16.03px", md: "14.25px" }}
              lineHeight="24px"
              letterSpacing="0.5px"
              textTransform="uppercase"
              _selected={{
                color: "var(--text-color)",
                bgColor: "var(--secondary-accent-color)",
              }}
            >
              DUB
            </Tab>
            <Tab
              color="var(--secondary-accent-color)"
              transition="all ease 0.25s"
              _hover={{
                color: "var(--text-color)",
              }}
              borderRadius="6px"
              fontSize={{ base: "16.03px", md: "14.25px" }}
              lineHeight="24px"
              letterSpacing="0.5px"
              textTransform="uppercase"
              _selected={{
                color: "var(--text-color)",
                bgColor: "var(--secondary-accent-color)",
              }}
            >
              CN
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel transition="all ease 0.25s">
              <Grid
                display={{ base: "grid", md: "grid" }}
                justifyItems="flex-start"
                gridTemplateColumns={{
                  base: "100%",
                  md: "repeat(3, 1fr)",
                  xl: "repeat(4, 1fr)",
                }}
                gap={{ base: "20px 0", md: "15px 25px" }}
              >
                {/* <GridItem w={{ base: "100%", md: "306px" }}>
                  <Box
                    as={ReactRouterLink}
                    pos="relative"
                    overflow="hidden!important"
                  >
                    Anime Img
                    <Image
                      // src={}
                      bg={"#191919"}
                      w="100%"
                      borderRadius="10px"
                      transition="all ease 0.45s"
                      h={{ base: "488.23px", md: "408.19px" }}
                      _hover={{ transform: "scale(1.2)" }}
                      border="1px solid red"
                    />

                    Overlay
                    <Box
                      pos="absolute"
                      top="0"
                      left="0"
                      width="100%"
                      height="100%"
                      background="rgba(0,0,0,0.5)"
                      opacity="0"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      transition="opacity 0.2s"
                      border="1px solid blue"
                      _hover={{ opacity: "1" }}
                    >
                      <ChakraLink
                        as={ReactRouterLink}
                        to={"/"}
                        color="var(--text-color)"
                        _hover={{
                          color: "var(--secondary-accent-color)",
                          transition: "all ease 0.25s",
                        }}
                        fontSize="22.88px"
                        lineHeight="36px"
                        letterSpacing="0.5px"
                        fontWeight="500"
                      >
                        Play Now
                      </ChakraLink>
                    </Box>
                  </Box>
                  <ChakraLink as={ReactRouterLink}>
                    Anime Name
                    <Text
                      as="p"
                      fontSize="22.88px"
                      lineHeight="36px"
                      letterSpacing="0.5px"
                      fontWeight="500"
                      color="var(--text-color)"
                      textAlign="start"
                    >
                      Hello
                    </Text>
                  </ChakraLink>
                </GridItem> */}
                <Recents
                  item={subAnimeTitle}
                  itemId={subAnimeEpId}
                  itemImg={subAnimeImg}
                  itemTitle={subAnimeTitle}
                />
              </Grid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default RecentUpdate;
