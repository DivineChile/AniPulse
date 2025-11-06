import { Box, Flex, Heading, Text } from "@chakra-ui/react";

import RecentSub from "../../RecentList/RecentSub";
import { Clock } from "lucide-react";

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
      pb="120px"
    >
      <Box
        maxW={{
          base: "90%",
          sm: "95%",
          xl: "85%",
          "2xl": "container.xl",
        }}
        margin="auto"
        pos="relative"
      >
        {/* Recent Release Head */}
        <Box
          display="flex"
          flexDir={{ base: "column", md: "row" }}
          gap={{ base: "7px 0", md: "0 20px" }}
          alignItems="center"
          justifyContent={{ base: "center", md: "space-between" }}
          my="20px"
          pos="relative"
        >
          <Flex alignItems="center" justifyContent="center" gap="10px">
            <Clock size={30} color="var(--primary-color)" />
            <Heading
              as="h2"
              fontSize={{ base: "27.59px", lg: "32px", "2xl": "37.97px" }}
              fontWeight="500"
              lineHeight={{ base: "33px", lg: "38px", "2xl": "44px" }}
              letterSpacing="1.5px"
              color="var(--text-color)"
              m="0"
              textTransform="capitalize"
              fontFamily="var(--font-family)"
            >
              Recently Added
            </Heading>
          </Flex>
          <Text
            as="p"
            fontSize={{ base: "16px", "2xl": "20px" }}
            lineHeight={{ base: "17.6px", "2xl": "22px" }}
            letterSpacing="1.5px"
            color="var(--text-color)"
            m="0"
            textTransform="capitalize"
          >
            {`${fullDayName}, ${newFullDate}`}
          </Text>
        </Box>
        {/* Recent Animes Released */}
        <Box>
          <RecentSub />
        </Box>
      </Box>
    </Box>
  );
};

export default RecentUpdate;
