import { useEffect, useState } from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { register } from "swiper/element/bundle";
import moment from "moment";
import "swiper/css";
import "./style.css";
import Error from "../ErrorPage/Error";
import Loading from "../ErrorPage/Loading";

register();

const Upcoming = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);
  const [countdowns, setCountdowns] = useState([]);

  useEffect(() => {
    const fetchUpcomingAnimes = async () => {
      try {
        const res = await fetch("https://api.jikan.moe/v4/seasons/upcoming");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();

        const filtered = data.data.filter(
          (item) =>
            item?.aired?.prop?.from?.day !== null &&
            item?.aired?.prop?.from?.month !== null &&
            item?.aired?.prop?.from?.year !== null
        );

        setResults(filtered);
        setIsLoading(false);
      } catch (err) {
        setError(true);
        setIsLoading(false);
      }
    };

    fetchUpcomingAnimes();
  }, []);

  useEffect(() => {
    const updateCountdowns = () => {
      const now = moment();
      const updated = results.map((item) => {
        const { year, month, day } = item.aired.prop.from;
        const target = moment({ year, month: month - 1, day });
        const diff = moment.duration(target.diff(now));

        return {
          malId: item.mal_id,
          countdown: {
            days: diff.asSeconds() > 0 ? Math.floor(diff.asDays()) : 0,
            hours: diff.asSeconds() > 0 ? diff.hours() : 0,
            minutes: diff.asSeconds() > 0 ? diff.minutes() : 0,
            seconds: diff.asSeconds() > 0 ? diff.seconds() : 0,
          },
        };
      });
      setCountdowns(updated);
    };

    const interval = setInterval(updateCountdowns, 1000);
    return () => clearInterval(interval);
  }, [results]);

  return (
    <swiper-container
      slides-per-view="1"
      navigation="false"
      autoplay="true"
      effect="fade"
      loop
    >
      {isLoading && (
        <Loading pos={"absolute"} bg="var(--primary-background-color)" />
      )}

      {error && (
        <Error
          msg="failed to load, please try again."
          bg="var(--primary-background-color)"
          pos="absolute"
        />
      )}

      {results.map((item, index) => {
        const countdown = countdowns.find((c) => c.malId === item.mal_id);
        const title = item.title_english || item.title;
        const genres = item.genres || [];
        const season = item.season || "Unknown";
        const rating = item.rating || "Unknown";
        const type = item.type || "Unknown";
        const year = item.year || "Unknown";

        return (
          <swiper-slide key={index}>
            <Box
              py="40px"
              bg={`url(${item.images.jpg.large_image_url})`}
              bgBlendMode="overlay"
              bgColor={{ base: "rgba(0,0,0,0.8)", md: "rgba(0,0,0,0.9)" }}
              bgSize="cover"
              bgPos="center"
              bgRepeat="no-repeat"
              height={{ base: "700px", md: "100vh" }}
              pos="relative"
              display="flex"
              alignItems="center"
            >
              <Box
                maxW={{
                  base: "90%",
                  sm: "95%",
                  xl: "85%",
                  "2xl": "container.xl",
                }}
                margin="auto"
              >
                <Box
                  height="100%"
                  w="193px"
                  bg={`url(${item.images.jpg.large_image_url})`}
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
                  bg={`url(${item.images.jpg.large_image_url})`}
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
                <Box zIndex="1" position="relative">
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
                    fontWeight={{ base: "800", md: "800", lg: "800" }}
                    lineHeight={{
                      base: "48px",
                      md: "68px",
                      lg: "76px",
                      "2xl": "88px",
                    }}
                    fontFamily="var(--font-family)"
                    letterSpacing="1.5px"
                    width={{ base: "100%", md: "90%", lg: "70%" }}
                  >
                    {title?.length > 25 ? `${title.slice(0, 25)}...` : title}
                  </Heading>

                  <Text
                    as="p"
                    fontSize={{
                      base: "20.97px",
                      md: "25px",
                      lg: "30px",
                      "2xl": "40px",
                    }}
                    lineHeight={{
                      base: "33px",
                      md: "35px",
                      lg: "40px",
                      "2xl": "60px",
                    }}
                    textTransform="Capitalize"
                    mb="15px"
                    mt={{ base: "15px", md: "5px" }}
                    textColor="#fff"
                    letterSpacing="0.5px"
                    fontFamily="var(--font-family)"
                  >
                    Season: {season}
                  </Text>

                  <Flex mb="15px">
                    {genres.map((genre) => (
                      <Text
                        key={genre.mal_id}
                        as="span"
                        fontSize={{
                          base: "15.53px",
                          md: "18px",
                          lg: "22px",
                          "2xl": "29.3px",
                        }}
                        lineHeight={{
                          base: "24px",
                          md: "27px",
                          lg: "31px",
                          "2xl": "45px",
                        }}
                        letterSpacing="0.5px"
                        textColor="var(--text-color)"
                      >
                        {`${genre.name}, `}
                      </Text>
                    ))}
                  </Flex>

                  <Flex gap="10px 10px" flexWrap="wrap" mb="30px">
                    {rating && (
                      <Text
                        as="span"
                        color="var(--primary-background-color)"
                        p="3px 10px"
                        bg="var(--secondary-color)"
                        borderRadius="8px"
                        fontSize={{ base: "14.63px" }}
                        fontWeight="bold"
                        letterSpacing="0.5px"
                      >
                        {rating}
                      </Text>
                    )}
                    {type && (
                      <Text
                        as="span"
                        color="var(--text-color)"
                        p="3px 10px"
                        border="2px solid var(--text-color)"
                        borderRadius="8px"
                        fontSize={{ base: "14.63px" }}
                        fontWeight="bold"
                        letterSpacing="0.5px"
                      >
                        {type}
                      </Text>
                    )}
                    {year && (
                      <Text
                        as="span"
                        color="var(--text-color)"
                        p="3px 10px"
                        border="2px solid var(--text-color)"
                        borderRadius="8px"
                        fontSize={{ base: "14.63px" }}
                        fontWeight="bold"
                        letterSpacing="0.5px"
                      >
                        {year}
                      </Text>
                    )}
                  </Flex>

                  <Box>
                    <Text
                      as="p"
                      fontSize={{
                        base: "25.39px",
                        md: "29px",
                        "2xl": "38.91px",
                      }}
                      color="#fff"
                      mb="15px"
                    >
                      Coming Out in
                    </Text>

                    <Flex gap="20px" mt="10px">
                      {["days", "hours", "minutes", "seconds"].map((unit) => (
                        <Text
                          key={unit}
                          as="span"
                          color="var(--primary-background-color)"
                          p="10px"
                          bg="var(--text-color)"
                          borderRadius="8px"
                          boxShadow="0 0 10px 0 var(--secondary-color)"
                          fontSize={{
                            base: "29.63px",
                            md: "40px",
                            lg: "65px",
                            xl: "70px",
                            "2xl": "90px",
                          }}
                          fontWeight="bold"
                        >
                          {countdown?.countdown[unit] ?? "--"}
                          <Text
                            as="sub"
                            ms="5px"
                            fontSize={{
                              base: "15px",
                              md: "19px",
                              "2xl": "23px",
                            }}
                            fontWeight="light"
                            color="var(--primary-background-color)"
                          >
                            {unit[0]}
                          </Text>
                        </Text>
                      ))}
                    </Flex>
                  </Box>
                </Box>
              </Box>
            </Box>
          </swiper-slide>
        );
      })}
    </swiper-container>
  );
};

export default Upcoming;
