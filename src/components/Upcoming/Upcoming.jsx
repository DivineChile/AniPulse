import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  useBreakpointValue,
  Badge,
  Stack,
} from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { Navigation, FreeMode } from "swiper/modules";
import "./style.css";
import Error from "../ErrorPage/Error";
import Loading from "../ErrorPage/Loading";
import { cacheFetch } from "../../utils/cacheFetch";
import CountDown from "../Anime/CountDowns/CountDown";

const Upcoming = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);

  const kenjitsu_api = "https://kenjitsu-api-production.up.railway.app/";
  const proxy = "https://cors-anywhere-aifwkw.fly.dev/";

  useEffect(() => {
    const fetchUpcomingAnimes = async () => {
      try {
        const cacheKey = `upcomingAnimes`;

        // Fetch + cache for 10 minutes
        const data = await cacheFetch("api/jikan/anime/top/upcoming", {
          cacheKey,
        });

        const filtered = data.data.filter(
          (item) => item?.releaseDate !== "Unknown"
        );

        setResults(filtered);
      } catch (err) {
        setError(true);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUpcomingAnimes();
  }, []);

  // Helper to safely extract year from "January 16, 2026"
  const getYear = (releaseDate) => {
    try {
      const d = new Date(releaseDate);
      if (!isNaN(d)) return d.getFullYear();
      // fallback parse taking last token
      const parts = String(releaseDate).trim().split(" ");
      return parts[parts.length - 1] || "Unknown";
    } catch {
      return "Unknown";
    }
  };

  const posterVisible = useBreakpointValue({ base: false, lg: true });

  return (
    // <swiper-container
    //   slides-per-view="1"
    //   navigation="false"
    //   autoplay="true"
    //   effect="fade"
    //   loop
    // >
    //   {isLoading && (
    //     <Loading pos={"absolute"} bg="var(--primary-background-color)" />
    //   )}

    //   {error && (
    //     <Error
    //       msg="failed to load, please try again."
    //       bg="var(--primary-background-color)"
    //       pos="absolute"
    //     />
    //   )}

    //   {results.map((item, index) => {
    //     const title = item.title.english || item.title.romaji;
    //     const genres = item.genres || [];
    //     const season = item.season || "Unknown";
    //     const rating = item.rating || "N/A";
    //     const type = item.format || "Unknown";
    //     const year = item.releaseDate.split(" ")[2] || "Unknown";
    //     const posterImg = item.image;

    //     return (
    //       <swiper-slide key={index}>
    //         <Box
    //           py="40px"
    //           bg={`url(${posterImg})`}
    //           bgBlendMode="overlay"
    //           bgColor={{ base: "rgba(0,0,0,0.8)", md: "rgba(0,0,0,0.9)" }}
    //           bgSize="cover"
    //           bgPos="center"
    //           bgRepeat="no-repeat"
    //           height={{ base: "700px", md: "100vh" }}
    //           pos="relative"
    //           display="flex"
    //           alignItems="center"
    //         >
    //           <Box
    //             maxW={{
    //               base: "90%",
    //               sm: "95%",
    //               xl: "85%",
    //               "2xl": "container.xl",
    //             }}
    //             margin="auto"
    //           >
    //             <Box
    //               height="100%"
    //               w="193px"
    //               bg={`url(${posterImg})`}
    //               bgBlendMode="overlay"
    //               bgColor={{ base: "rgba(0,0,0,0.5)" }}
    //               bgSize="cover"
    //               bgPos="center right"
    //               pos="absolute"
    //               bgRepeat="repeat-x"
    //               top="0"
    //               right="0"
    //               hideBelow="md"
    //             ></Box>
    //             <Box
    //               height="100%"
    //               w="253px"
    //               bg={`url(${posterImg})`}
    //               bgBlendMode="overlay"
    //               bgColor={{ base: "rgba(0,0,0,0.5)" }}
    //               bgSize="cover"
    //               bgPos="center"
    //               pos="absolute"
    //               bgRepeat="repeat-x"
    //               top="0"
    //               right="213px"
    //               hideBelow="md"
    //             ></Box>
    //             <Box zIndex="1" position="relative">
    //               <Heading
    //                 as="h1"
    //                 textTransform="uppercase"
    //                 textColor="#fff"
    //                 fontSize={{
    //                   base: "40px",
    //                   sm: "50px",
    //                   md: "60.13px",
    //                   lg: "65.13px",
    //                   "2xl": "77.34px",
    //                 }}
    //                 fontWeight={{ base: "800", md: "800", lg: "800" }}
    //                 lineHeight={{
    //                   base: "48px",
    //                   md: "68px",
    //                   lg: "76px",
    //                   "2xl": "88px",
    //                 }}
    //                 fontFamily="var(--font-family)"
    //                 letterSpacing="1.5px"
    //                 width={{ base: "100%", md: "90%", lg: "70%" }}
    //               >
    //                 {title?.length > 25 ? `${title.slice(0, 25)}...` : title}
    //               </Heading>

    //               <Text
    //                 as="p"
    //                 fontSize={{
    //                   base: "20.97px",
    //                   md: "25px",
    //                   lg: "30px",
    //                   "2xl": "40px",
    //                 }}
    //                 lineHeight={{
    //                   base: "33px",
    //                   md: "35px",
    //                   lg: "40px",
    //                   "2xl": "60px",
    //                 }}
    //                 textTransform="Capitalize"
    //                 mb="15px"
    //                 mt={{ base: "15px", md: "5px" }}
    //                 textColor="#fff"
    //                 letterSpacing="0.5px"
    //                 fontFamily="var(--font-family)"
    //               >
    //                 Season: {season}
    //               </Text>

    //               <Flex mb="15px">
    //                 {genres.map((genre) => (
    //                   <Text
    //                     key={genre}
    //                     as="span"
    //                     fontSize={{
    //                       base: "15.53px",
    //                       md: "18px",
    //                       lg: "22px",
    //                       "2xl": "29.3px",
    //                     }}
    //                     lineHeight={{
    //                       base: "24px",
    //                       md: "27px",
    //                       lg: "31px",
    //                       "2xl": "45px",
    //                     }}
    //                     letterSpacing="0.5px"
    //                     textColor="var(--text-color)"
    //                   >
    //                     {`${genre}, `}
    //                   </Text>
    //                 ))}
    //               </Flex>

    //               <Flex gap="10px 10px" flexWrap="wrap" mb="30px">
    //                 {rating && (
    //                   <Text
    //                     as="span"
    //                     color="var(--primary-background-color)"
    //                     p="3px 10px"
    //                     bg="var(--secondary-color)"
    //                     borderRadius="8px"
    //                     fontSize={{ base: "14.63px" }}
    //                     fontWeight="bold"
    //                     letterSpacing="0.5px"
    //                   >
    //                     {rating}
    //                   </Text>
    //                 )}
    //                 {type && (
    //                   <Text
    //                     as="span"
    //                     color="var(--text-color)"
    //                     p="3px 10px"
    //                     border="2px solid var(--text-color)"
    //                     borderRadius="8px"
    //                     fontSize={{ base: "14.63px" }}
    //                     fontWeight="bold"
    //                     letterSpacing="0.5px"
    //                   >
    //                     {type}
    //                   </Text>
    //                 )}
    //                 {year && (
    //                   <Text
    //                     as="span"
    //                     color="var(--text-color)"
    //                     p="3px 10px"
    //                     border="2px solid var(--text-color)"
    //                     borderRadius="8px"
    //                     fontSize={{ base: "14.63px" }}
    //                     fontWeight="bold"
    //                     letterSpacing="0.5px"
    //                   >
    //                     {year}
    //                   </Text>
    //                 )}
    //               </Flex>

    //               <Box>
    //                 <Text
    //                   as="p"
    //                   fontSize={{
    //                     base: "25.39px",
    //                     md: "29px",
    //                     "2xl": "38.91px",
    //                   }}
    //                   color="#fff"
    //                   mb="15px"
    //                 >
    //                   Coming Out in
    //                 </Text>

    //                 <CountDown releaseDate={item.releaseDate} />
    //               </Box>
    //             </Box>
    //           </Box>
    //         </Box>
    //       </swiper-slide>
    //     );
    //   })}
    // </swiper-container>
    <Box as="section" w="100%" pos="relative" overflow="hidden">
      <Swiper
        modules={[Navigation, FreeMode]}
        loop
        slidesPerView={1}
        effect="fade"
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        style={{ width: "100%", height: "100%" }}
      >
        {isLoading && (
          <Box
            pos="absolute"
            inset={0}
            zIndex={50}
            display="grid"
            placeItems="center"
            bg="rgba(0,0,0,0.45)"
          >
            <Text color="white">Loading…</Text>
          </Box>
        )}

        {error && (
          <Box
            pos="absolute"
            inset={0}
            zIndex={50}
            display="grid"
            placeItems="center"
            bg="rgba(0,0,0,0.45)"
          >
            <Text color="white">Failed to load — please try again.</Text>
          </Box>
        )}

        {results.map((item, idx) => {
          const title = item.title?.english || item.title?.romaji || "Untitled";
          const genres = item.genres || [];
          const season = item.season || "Unknown";
          const rating = item.rating || "N/A";
          const type = item.format || "Unknown";
          const year = getYear(item.releaseDate);
          const poster = item.image;

          return (
            <SwiperSlide key={idx}>
              {/* Full hero banner */}
              <Box
                minH={{ base: "680px", md: "100vh" }}
                position="relative"
                bgImage={`linear-gradient(180deg, rgba(6,6,10,0.6) 0%, rgba(6,6,10,0.75) 40%, rgba(6,6,10,0.95) 100%), url(${poster})`}
                bgSize="cover"
                bgPos="center"
                bgRepeat="no-repeat"
                display="flex"
                alignItems="center"
                px={{ base: 6, md: 12, lg: 24 }}
              >
                <Box
                  maxW="1200px"
                  w="100%"
                  mx="auto"
                  display="flex"
                  gap={{ base: 6, md: 8 }}
                  alignItems="center"
                >
                  {/* Left: Content column */}
                  <Box
                    flex="1 1 0"
                    color="white"
                    zIndex={2}
                    pt={{ base: 8, md: 12 }}
                    pb={{ base: 12, md: 0 }}
                    minH={{ base: "auto", md: "420px" }}
                  >
                    <Heading
                      as="h1"
                      textTransform="uppercase"
                      fontSize={{ base: "34px", md: "56px", lg: "62px" }}
                      lineHeight={{ base: "38px", md: "64px", lg: "70px" }}
                      fontWeight="900"
                      letterSpacing="1.5px"
                      mb={4}
                      width={{ base: "100%", md: "85%", lg: "75%" }}
                    >
                      {title.length > 30 ? `${title.slice(0, 30)}...` : title}
                    </Heading>

                    <Text
                      color="gray.200"
                      fontSize={{ base: "16px", md: "18px" }}
                      mb={4}
                    >
                      Season:{" "}
                      <Text as="span" color="white" textTransform="capitalize">
                        {season}
                      </Text>{" "}
                      •{" "}
                      <Text as="span" color="white">
                        {type}
                      </Text>{" "}
                      •{" "}
                      <Text as="span" color="white">
                        {year}
                      </Text>
                    </Text>

                    <Flex wrap="wrap" gap={2} mb={6}>
                      {genres.slice(0, 6).map((g) => (
                        <Badge
                          key={g}
                          bg="rgba(255,255,255,0.06)"
                          color="white"
                          px={3}
                          py={1}
                          borderRadius="md"
                          fontSize="12px"
                          border="1px solid rgba(255,255,255,0.06)"
                          backdropFilter="blur(6px)"
                        >
                          {g}
                        </Badge>
                      ))}
                    </Flex>

                    <Stack
                      spacing={4}
                      direction={{ base: "column", sm: "row" }}
                    >
                      <Box>
                        <Text
                          fontSize={{ base: "18px", md: "22px" }}
                          color="gray.200"
                          mb={2}
                        >
                          Coming Out In:
                        </Text>

                        {/* COUNTDOWN — keep your CountDown component */}
                        <Box bg="transparent" display="inline-block" mt={1}>
                          <CountDown releaseDate={item.releaseDate} />
                        </Box>
                      </Box>
                    </Stack>
                  </Box>

                  {/* Right: Poster card (tilted) */}
                  {posterVisible && (
                    <Box
                      w={{ md: "260px", lg: "340px" }}
                      flex="0 0 auto"
                      pos="relative"
                      transform="rotate(-6deg)"
                      boxShadow="0 20px 50px rgba(2,6,23,0.6)"
                      borderRadius="12px"
                      overflow="hidden"
                      _hover={{
                        transform: "rotate(0deg) scale(1.02)",
                        transition: "all 300ms ease",
                      }}
                    >
                      <Box
                        as="img"
                        src={poster}
                        alt={`${title} poster`}
                        loading="lazy"
                        display="block"
                        w="100%"
                        h={{ md: "380px", lg: "400px" }}
                        objectFit="cover"
                      />
                      <Box
                        pos="absolute"
                        bottom="0"
                        left="0"
                        right="0"
                        p={3}
                        bg="linear-gradient(180deg, transparent, rgba(0,0,0,0.75))"
                      >
                        <Text color="white" fontWeight="700" fontSize="14px">
                          {title.length > 24
                            ? `${title.slice(0, 24)}...`
                            : title}
                        </Text>
                      </Box>
                    </Box>
                  )}
                </Box>
              </Box>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
};

export default Upcoming;
