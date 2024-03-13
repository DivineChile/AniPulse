import {
  Box,
  Grid,
  Heading,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

import RecentSub from "../RecentList/RecentSub";
import RecentDub from "../RecentList/RecentDub";
import RecentCn from "../RecentList/RecentCn";

const RecentUpdate = () => {
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
      // px={{ base: "20px", lg: "20px", xl: "100px" }}
      bg="var(--primary-background-color)"
      pt="40px"
      pb="80px"
    >
      <Box
        maxW={{
          base: "95%",
          xl: "85%",
          "2xl": "container.xl",
        }}
        margin="auto"
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
            isLazy
          >
            <TabList mb="20px" gap="0 10px">
              <Tab
                color="var(--secondary-color)"
                transition="all ease 0.25s"
                _hover={{
                  color: "var(--accent-color)",
                }}
                borderRadius="6px"
                fontSize={{ base: "13.03px", md: "14.25px" }}
                lineHeight="24px"
                letterSpacing="0.5px"
                textTransform="uppercase"
                _selected={{
                  color: "var(--primary-background-color)",
                  bgColor: "var(--secondary-color)",
                }}
              >
                Sub
              </Tab>
              <Tab
                color="var(--secondary-color)"
                transition="all ease 0.25s"
                _hover={{
                  color: "var(--accent-color)",
                }}
                borderRadius="6px"
                fontSize={{ base: "13.03px", md: "14.25px" }}
                lineHeight="24px"
                letterSpacing="0.5px"
                textTransform="uppercase"
                _selected={{
                  color: "var(--primary-background-color)",
                  bgColor: "var(--secondary-color)",
                }}
              >
                DUB
              </Tab>
              <Tab
                c
                color="var(--secondary-color)"
                transition="all ease 0.25s"
                _hover={{
                  color: "var(--accent-color)",
                }}
                borderRadius="6px"
                fontSize={{ base: "13.03px", md: "14.25px" }}
                lineHeight="24px"
                letterSpacing="0.5px"
                textTransform="uppercase"
                _selected={{
                  color: "var(--primary-background-color)",
                  bgColor: "var(--secondary-color)",
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
                  }}
                  gap={{ base: "20px 0", sm: "20px", md: "40px 25px" }}
                  pos="relative"
                >
                  {<RecentSub />}
                </Grid>
              </TabPanel>
              <TabPanel transition="all ease 0.5s">
                <Grid
                  display={{ base: "grid", md: "grid" }}
                  justifyItems="flex-start"
                  gridTemplateColumns={{
                    base: "100%",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                    lg: "repeat(4, 1fr)",
                  }}
                  gap={{ base: "20px 0", sm: "20px", md: "40px 25px" }}
                  pos="relative"
                >
                  {<RecentDub />}
                </Grid>
              </TabPanel>
              <TabPanel transition="all ease 0.5s">
                <Grid
                  display={{ base: "grid", md: "grid" }}
                  justifyItems="flex-start"
                  gridTemplateColumns={{
                    base: "100%",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                    lg: "repeat(4, 1fr)",
                  }}
                  gap={{ base: "20px 0", sm: "20px", md: "40px 25px" }}
                  pos="relative"
                >
                  {<RecentCn />}
                </Grid>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </Box>
  );
};

export default RecentUpdate;
