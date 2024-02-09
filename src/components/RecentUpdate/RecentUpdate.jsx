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
} from "@chakra-ui/react";
import animeImg from "../../assets/img-2.png";
import { useEffect, useState } from "react";

const RecentUpdate = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subAnimeData, setSubAimeData] = useState([]);
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
        setSubAimeData(subData.results);

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

  console.log(subAnimeData);
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
          Sunday 01 Jan 2023
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
          //   isLazy="true"
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
              {/* <Grid
                display={{ base: "initial", md: "grid" }}
                justifyItems="flex-start"
                gridTemplateColumns={{
                  base: "100%",
                  md: "repeat(3, 1fr)",
                  xl: "repeat(4, 1fr)",
                }}
                gap={{ base: "10px 0", md: "15px 25px" }}
              >
                
              </Grid> */}
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Text fontSize="100px">Hello World</Text>
      </Box>
      {subAnimeData.map((item) => {
        //   <GridItem w={{ base: "100%", md: "306px" }} key={item.id}>
        //     {/* Anime Img */}
        //     <Box
        //       bg={`url(${item.image_url})`}
        //       bgRepeat="no-repeat"
        //       bgPos="center"
        //       bgSize="cover"
        //       borderRadius="10px"
        //       h={{ base: "488.23px", md: "408.19px" }}
        //     ></Box>
        //     {/* Details */}
        //     <Flex gap="10px" mt="10px" mb="5px" alignItems="center">
        //       <Text
        //         as="span"
        //         color="var(--secondary-accent-color)"
        //         cursor="pointer"
        //         p="3px 10px"
        //         transition="all ease 0.25s"
        //         _hover={{
        //           color: "var(--text-color)",
        //           bgColor: "var(--secondary-accent-color)",
        //         }}
        //         borderRadius="6px"
        //         border="2px solid var(--secondary-accent-color)"
        //         fontSize={{ base: "16.03px", md: "14.25px" }}
        //         lineHeight="24px"
        //         letterSpacing="0.5px"
        //         textTransform="uppercase"
        //       >
        //         Dub
        //       </Text>
        //       <Text
        //         as="span"
        //         color="var(--secondary-accent-color)"
        //         cursor="pointer"
        //         p="3px 10px"
        //         transition="all ease 0.25s"
        //         _hover={{
        //           color: "var(--text-color)",
        //           bgColor: "var(--secondary-accent-color)",
        //         }}
        //         borderRadius="6px"
        //         border="2px solid var(--secondary-accent-color)"
        //         fontSize={{ base: "16.03px", md: "14.25px" }}
        //         lineHeight="24px"
        //         letterSpacing="0.5px"
        //         textTransform="uppercase"
        //       >
        //         sub
        //       </Text>
        //       <Text
        //         fontSize={{ base: "12.69px", lg: "17px" }}
        //         lineHeight={{ base: "24px" }}
        //         color="var(--text-color)"
        //       >
        //         TV
        //       </Text>
        //     </Flex>
        //     <Text
        //       as="p"
        //       fontSize="22.88px"
        //       lineHeight="36px"
        //       letterSpacing="0.5px"
        //       fontWeight="500"
        //       color="var(--text-color)"
        //       textAlign="start"
        //     >
        //       {console.log(item.title)}
        //     </Text>
        //     <Text border="1px solid red" fontSize="1000px">
        //       Hello
        //     </Text>
        //   </GridItem>;

        <Heading fontSize="1000px">{item.title}</Heading>;
        <Box
          bg={`url(${animeImg})`}
          bgRepeat="no-repeat"
          bgPos="center"
          bgSize="cover"
          borderRadius="10px"
          h={{ base: "488.23px", md: "408.19px" }}
          border="1px solid red"
        >
          <Heading fontSize="1000px">Hello </Heading>
        </Box>;
      })}
    </Box>
  );
};

export default RecentUpdate;
