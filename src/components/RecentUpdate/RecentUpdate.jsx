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
import Error from "../ErrorPage/Error";

const RecentUpdate = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subAnimeData, setSubAimeData] = useState([]);
  const [subAnimeTitle, setSubAnimeTitle] = useState([]);
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
        setSubAnimeEp(subAnimeData.map((item) => item.episode));

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
        setIsLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setIsLoading(false);
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

          <TabPanels transition="all ease 0.5s">
            <TabPanel transition="all ease 0.5s">
              <Grid
                display={{ base: "grid", md: "grid" }}
                justifyItems="flex-start"
                gridTemplateColumns={{
                  base: "100%",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                  lg: "repeat(4, 1fr)",
                  "2xl": "repeat(5, 1fr)",
                }}
                gap={{ base: "20px 0", sm: "20px", md: "40px 25px" }}
                pos="relative"
              >
                {/* {isLoading && (
                  <Error
                    // error={error}
                    loadingState={isLoading}
                    pos="absolute"
                    // msg={""}
                    height="fit-content"
                    width="100%"
                    left="0"
                  />
                )}
                {error && (
                  <Error
                    error={error}
                    // loadingState={isLoading}
                    pos="absolute"
                    msg={"Still Working..."}
                    height="fit-content"
                    width="100%"
                    left="0"
                  />
                )} */}
                {subAnimeData && <Recents />}
              </Grid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default RecentUpdate;
