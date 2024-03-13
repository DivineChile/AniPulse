import { useEffect, useState } from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { register } from "swiper/element/bundle";
import moment from "moment";
import "swiper/css";
import "./style.css";
import Error from "../ErrorPage/Error";

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

        if (res.ok) {
          const data = await res.json();
          setResults(data.data);
          setIsLoading(false);
          setError(false);
        } else {
          setIsLoading(false);
          setError(true);
        }
      } catch {
        setIsLoading(false);
        setError(true);
      }
    };

    fetchUpcomingAnimes();
  }, []);

  useEffect(() => {
    // Calculate countdown and update every second
    const interval = setInterval(() => {
      const updatedCountdowns = results.map((item) => {
        const airDay = item.aired.prop.from.day;
        const airMonth = item.aired.prop.from.month;
        const airYear = item.aired.prop.from.year;

        const targetDate = moment({
          year: airYear,
          month: airMonth - 1,
          day: airDay,
        });
        const now = moment();

        let duration;
        if (now.isAfter(targetDate)) {
          duration = moment.duration(0);
        } else {
          duration = moment.duration(targetDate.diff(now));
        }

        return {
          malId: item.mal_id,
          countdown: {
            days: duration.days(),
            hours: duration.hours(),
            minutes: duration.minutes(),
            seconds: duration.seconds(),
          },
        };
      });

      setCountdowns(updatedCountdowns);
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [results]);

  return (
    <swiper-container
      // ref={swiperElRef}
      slides-per-view="1"
      navigation="false"
      pagination="false"
      loop="true"
      autoplay={{ delay: 8000 }}
      effect="fade"
    >
      {isLoading && (
        <Error
          // msg="Still Loading"
          loadingState={isLoading}
          height="100%"
          width="100%"
          // error={err}
          pos="absolute"
          top="0"
          left="0"
          bg="#191919"
          spinnerH={{ base: "50px", md: "80px", lg: "100px" }}
          spinnerW={{ base: "50px", md: "80px", lg: "100px" }}
        />
      )}

      {error && (
        <Error
          msg="Still Loading"
          height="100%"
          width="100%"
          error={error}
          pos="absolute"
          top="0"
          left="0"
          bg="#191919"
          spinnerH={{ base: "50px", md: "80px", lg: "100px" }}
          spinnerW={{ base: "50px", md: "80px", lg: "100px" }}
        />
      )}
      {results
        .filter((item) => item.aired.prop.from.day !== null)
        .map((item) => {
          const countdownItem = countdowns.find(
            (countdown) => countdown.malId === item.mal_id
          );
          const title = item.title_english;
          const season = item.season === null ? "NIL" : item.season;
          const genres = item.genres;
          const type = item.type;
          const year = item.year;
          const rating = item.rating;
          const newRating = rating?.split();
          const newnewRating = rating?.slice(0, 6);

          // Create a Moment.js object representing the target date

          return (
            <swiper-slide key={item.mal_id}>
              <Box
                // px={{ base: "20px", lg: "80px", xl: "100px" }}
                py="40px"
                bg={
                  isLoading
                    ? "#191919"
                    : `url(${item.images.jpg.large_image_url})`
                }
                transition="all ease 0.25s"
                bgBlendMode="overlay"
                bgColor={
                  isLoading
                    ? "#191919"
                    : { base: "rgba(0,0,0,0.8)", md: "rgba(0,0,0,0.9)" }
                }
                bgSize="cover"
                bgPos="center"
                bgRepeat="no-repeat"
                height={{ base: "500px", md: "100vh", "2xl": "631px" }}
                pos="relative"
                display="flex"
                alignItems="center"
              >
                <Box
                  maxW={{
                    base: "95%",
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
                      fontWeight="bold"
                      lineHeight={{
                        base: "48px",
                        md: "68px",
                        lg: "76px",
                        "2xl": "88px",
                      }}
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
                      textTransform="uppercase"
                      mb="15px"
                      mt={{ base: "15px", md: "5px" }}
                      textColor="#fff"
                      letterSpacing="0.5px"
                    >
                      Season: {season}
                    </Text>

                    <Flex mb="15px">
                      {genres.map((item) => {
                        return (
                          <Text
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
                            key={item.mal_id}
                          >
                            {`${item.name}, `}
                          </Text>
                        );
                      })}
                    </Flex>
                    <Flex gap="10px 10px" flexWrap="wrap" mb="30px">
                      {item.rating === null ? (
                        <></>
                      ) : (
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
                          {newnewRating}
                        </Text>
                      )}
                      {item.type === null ? (
                        <></>
                      ) : (
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
                          {type}
                        </Text>
                      )}
                      {year === null ? (
                        <></>
                      ) : (
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
                        lineHeight={{
                          base: "39px",
                          md: "43px",
                          lg: "47px",
                          "2xl": "60px",
                        }}
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
                          {countdownItem?.countdown.days}
                          <Text
                            as="sub"
                            ms="5px"
                            fontSize={{
                              base: "12px",
                              md: "16px",
                              "2xl": "20px",
                            }}
                            lineHeight={{
                              base: "18px",
                              md: "22px",
                              "2xl": "30px",
                            }}
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
                          {countdownItem?.countdown.hours}
                          <Text
                            as="sub"
                            ms="5px"
                            fontSize={{
                              base: "12px",
                              md: "16px",
                              "2xl": "20px",
                            }}
                            lineHeight={{
                              base: "18px",
                              md: "22px",
                              "2xl": "30px",
                            }}
                            letterSpacing="0.5px"
                            fontWeight="light"
                          >
                            h
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
                          {countdownItem?.countdown.minutes}
                          <Text
                            as="sub"
                            ms="5px"
                            fontSize={{
                              base: "12px",
                              md: "16px",
                              "2xl": "20px",
                            }}
                            lineHeight={{
                              base: "18px",
                              md: "22px",
                              "2xl": "30px",
                            }}
                            letterSpacing="0.5px"
                            fontWeight="light"
                          >
                            m
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
                          {countdownItem?.countdown.seconds}
                          <Text
                            as="sub"
                            ms="5px"
                            fontSize={{
                              base: "12px",
                              md: "16px",
                              "2xl": "20px",
                            }}
                            lineHeight={{
                              base: "18px",
                              md: "22px",
                              "2xl": "30px",
                            }}
                            letterSpacing="0.5px"
                            fontWeight="light"
                          >
                            s
                          </Text>
                        </Text>
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
