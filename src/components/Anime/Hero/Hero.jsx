import {
  Box,
  Flex,
  VStack,
  Heading,
  Text,
  HStack,
  Badge,
  Skeleton,
  SkeletonText,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Navigation, FreeMode, Autoplay, Pagination } from "swiper/modules";
import { cacheFetch } from "../../../utils/cacheFetch";

//components
import Navbar from "../../Navbar/Navbar";
import Prev from "../HeroSliderButtons/Prev";
import Next from "../HeroSliderButtons/Next";
import "./Hero.css";
import { Info, Play, Plus } from "lucide-react";

const Hero = () => {
  const [animeInfo, setAnimeInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAnimeData = async () => {
    setLoading(true);
    setError(null);
    try {
      const homeData = await cacheFetch("api/hianime/home", {
        cacheKey: "homeData",
      });
      const spotlights = homeData?.data ?? [];
      console.log(homeData);
      setAnimeInfo([...spotlights]);
    } catch (err) {
      setError(err.message || "Something went wrong");
      setAnimeInfo([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimeData();
  }, []);

  // -------------------------
  //  SKELETON UI COMPONENT
  // -------------------------
  const HeroSkeleton = () => (
    <Box
      w="100%"
      h={{
        base: "calc(100vh - 70px)",
        md: "calc(100vh - 73px)",
        lg: "calc(100vh - 84px)",
      }}
      top={{ base: "70px", md: "73px", lg: "84px" }}
      pos="relative"
      bg="black"
      overflow="hidden"
    >
      <Flex
        maxW={{
          base: "90%",
          sm: "95%",
          xl: "85%",
          "2xl": "container.xl",
        }}
        margin="auto"
        h="100%"
        alignItems="center"
        justifyContent="space-between"
        pos="relative"
        zIndex="2"
      >
        <VStack
          width={{ base: "100%", lg: "550px" }}
          align="flex-start"
          gap="20px"
        >
          <Skeleton height="55px" width="80%" borderRadius="md" />
          <Skeleton height="25px" width="60%" borderRadius="md" />

          <HStack gap="10px" flexWrap="wrap">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} height="28px" width="70px" borderRadius="md" />
            ))}
          </HStack>

          <SkeletonText noOfLines={5} spacing="4" width="100%" />

          <Skeleton height="45px" width="150px" borderRadius="md" />
        </VStack>

        <Box hideBelow="xl">
          <Skeleton
            w={{ lg: "550px", "2xl": "670px" }}
            h={{ lg: "450px", "2xl": "600px" }}
            borderRadius="20px"
          />
        </Box>
      </Flex>
    </Box>
  );

  // -------------------------
  //  ERROR UI
  // -------------------------
  const HeroError = () => (
    <Box
      w="100%"
      h={{
        base: "calc(100vh - 70px)",
        md: "calc(100vh - 73px)",
        lg: "calc(100vh - 84px)",
      }}
      top={{ base: "70px", md: "73px", lg: "84px" }}
      bg="#191919"
      pos="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Text color="red.300" fontSize="xl">
        {error}
      </Text>
    </Box>
  );

  // -------------------------
  //       MAIN RETURN
  // -------------------------
  return (
    <Box w="100%" h="100vh">
      <Navbar />

      {loading && (!animeInfo || !animeInfo.length) && <HeroSkeleton />}
      {error && <HeroError />}

      {!loading && !error && animeInfo && (
        // <Box
        //   w="100%"
        //   h={{
        //     base: "calc(100vh - 70px)",
        //     md: "calc(100vh - 73px)",
        //     lg: "calc(100vh - 84px)",
        //   }}
        //   top={{ base: "70px", md: "73px", lg: "84px" }}
        //   pos="relative"
        // >
        //   <Swiper
        //     modules={[Navigation, FreeMode]}
        //     autoplay={{ delay: 5000, disableOnInteraction: false }}
        //     loop
        //     effect="slide"
        //     style={{ height: "100%" }}
        //   >
        //     {/* BUTTONS */}
        //     <Box
        //       pos="absolute"
        //       left="20px"
        //       top="0"
        //       hideBelow="lg"
        //       zIndex="2"
        //       h="100%"
        //       display="flex"
        //       alignItems="center"
        //     >
        //       <Prev />
        //     </Box>
        //     <Box
        //       pos="absolute"
        //       right="20px"
        //       top="0"
        //       hideBelow="lg"
        //       zIndex="2"
        //       h="100%"
        //       display="flex"
        //       alignItems="center"
        //     >
        //       <Next />
        //     </Box>

        //     {/* SLIDES */}
        //     {animeInfo.map((anime, index) => {
        //       const tvInfo = anime.episodes;
        //       return (
        //         <SwiperSlide key={index}>
        //           <Box
        //             background={`url(${anime.posterImage})`}
        //             backgroundPosition="center"
        //             backgroundSize="cover"
        //             backgroundRepeat="no-repeat"
        //             h="100%"
        //             w="100%"
        //             pos="relative"
        //           >
        //             <Box
        //               w="100%"
        //               h="100%"
        //               pos="absolute"
        //               bottom="0"
        //               background="linear-gradient(to bottom, transparent 80%, #0C0C0C 100%), linear-gradient(to right, rgba(12, 12, 12, 0.95) 40%, transparent 100%)"
        //             />

        //             <Flex
        //               maxW={{
        //                 base: "90%",
        //                 sm: "95%",
        //                 xl: "85%",
        //                 "2xl": "container.xl",
        //               }}
        //               margin="auto"
        //               h="100%"
        //               alignItems="center"
        //               justifyContent="space-between"
        //               pos="relative"
        //               zIndex="1"
        //             >
        //               {/* LEFT */}
        //               <VStack
        //                 width={{ base: "100%", lg: "550px" }}
        //                 align="flex-start"
        //               >
        //                 <Heading
        //                   color="var(--text-color)"
        //                   textTransform="uppercase"
        //                   fontSize={{ base: "2xl", md: "4xl", lg: "5xl" }}
        //                   letterSpacing="wide"
        //                   lineHeight={{ base: "40px", md: "48px", lg: "56px" }}
        //                   fontFamily="var(--font-family)"
        //                   lineClamp={2}
        //                 >
        //                   {anime.name}
        //                 </Heading>

        //                 <Heading
        //                   as="h4"
        //                   textTransform="capitalize"
        //                   color="gray.300"
        //                   fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
        //                   letterSpacing="wide"
        //                   lineHeight={{ base: "30px", md: "36px", lg: "48px" }}
        //                   fontStyle="italic"
        //                   fontWeight="400"
        //                   fontFamily="var(--font-family)"
        //                   mt={{ base: "10px", "2xl": "15px" }}
        //                   lineClamp={1}
        //                 >
        //                   {anime.romaji}
        //                 </Heading>

        //                 <HStack my="10px" gap="10px" flexWrap="wrap">
        //                   {anime.spotlight && (
        //                     <Badge
        //                       variant="subtle"
        //                       size={{ base: "sm", md: "md" }}
        //                       bg="var(--secondary-color)"
        //                       color="var(--primary-background-color)"
        //                     >
        //                       {anime.spotlight}
        //                     </Badge>
        //                   )}
        //                   {anime.releaseDate && (
        //                     <Badge
        //                       size={{ base: "sm", md: "md" }}
        //                       variant="surface"
        //                     >
        //                       {anime.releaseDate}
        //                     </Badge>
        //                   )}
        //                   {tvInfo.sub && (
        //                     <Badge
        //                       size={{ base: "sm", md: "md" }}
        //                       variant="surface"
        //                     >
        //                       SUB {tvInfo.sub}
        //                     </Badge>
        //                   )}
        //                   {tvInfo.dub && (
        //                     <Badge
        //                       size={{ base: "sm", md: "md" }}
        //                       variant="surface"
        //                     >
        //                       DUB {tvInfo.dub}
        //                     </Badge>
        //                   )}

        //                   {anime.quality && (
        //                     <Badge
        //                       size={{ base: "sm", md: "md" }}
        //                       variant="surface"
        //                     >
        //                       {anime.quality}
        //                     </Badge>
        //                   )}
        //                   {anime.type && (
        //                     <Badge
        //                       size={{ base: "sm", md: "md" }}
        //                       variant="surface"
        //                     >
        //                       {anime.type}
        //                     </Badge>
        //                   )}
        //                 </HStack>

        //                 <Text
        //                   color="var(--text-secondary)"
        //                   my="10px"
        //                   maxW="95%"
        //                   lineClamp={3}
        //                   fontSize={{ base: "sm", md: "md" }}
        //                 >
        //                   {anime.synopsis}
        //                 </Text>

        //                 <Box width="100%" my="15px">
        //                   <Link
        //                     to={`anime/${anime.id}`}
        //                     className="play-now-btn"
        //                   >
        //                     VIEW MORE
        //                   </Link>
        //                 </Box>
        //               </VStack>

        //               {/* RIGHT IMAGE */}
        //               <Box hideBelow="xl">
        //                 <Box
        //                   background={
        //                     anime.posterImage
        //                       ? `url(${anime.posterImage})`
        //                       : "#191919"
        //                   }
        //                   w={{ lg: "550px", "2xl": "670px" }}
        //                   h={{ lg: "450px", "2xl": "600px" }}
        //                   backgroundSize="cover"
        //                   borderRadius="20px"
        //                   backgroundPosition="center"
        //                   _hover={{
        //                     transform: "scale(1.02)",
        //                     cursor: "pointer",
        //                   }}
        //                   transition="transform 0.25s ease"
        //                 />
        //               </Box>
        //             </Flex>
        //           </Box>
        //         </SwiperSlide>
        //       );
        //     })}
        //   </Swiper>
        // </Box>

        <Box
          w="100%"
          h={{
            base: "calc(100vh - 70px)",
            md: "calc(100vh - 73px)",
            lg: "calc(100vh - 84px)",
          }}
          top={{ base: "70px", md: "73px", lg: "84px" }}
          pos="relative"
        >
          <Swiper
            modules={[Navigation, FreeMode, Autoplay, Pagination]}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              type: "bullets",
              el: ".swiper-pagination-custom",
              bulletClass: "swiper-pagination-bullet",
              bulletActiveClass: "swiper-pagination-bullet-active",
            }}
            loop
            navigation={{
              prevEl: ".swiper-button-prev-custom",
              nextEl: ".swiper-button-next-custom",
            }}
            speed={800}
            effect="slide"
            style={{ height: "100%" }}
          >
            {/* SLIDES */}
            {animeInfo.map((anime, index) => {
              const tvInfo = anime.episodes || {};

              return (
                <SwiperSlide key={anime.id || index}>
                  <Box
                    background={`url(${anime.posterImage})`}
                    backgroundPosition="center"
                    backgroundSize="cover"
                    backgroundRepeat="no-repeat"
                    h="100%"
                    w="100%"
                    pos="relative"
                  >
                    {/* GRADIENT OVERLAYS */}
                    <Box
                      w="100%"
                      h="100%"
                      pos="absolute"
                      top="0"
                      left="0"
                      background="linear-gradient(to bottom, rgba(12, 12, 12, 0.2) 0%, rgba(12, 12, 12, 0.6) 50%, var(--primary-background-color) 100%), linear-gradient(to right, rgba(12, 12, 12, 0.85) 0%, rgba(12, 12, 12, 0.4) 50%, rgba(12, 12, 12, 0.85) 100%)"
                      zIndex="0"
                    />
                    <Flex
                      maxW={{
                        base: "90%",
                        sm: "95%",
                        xl: "85%",
                        "2xl": "container.xl",
                      }}
                      margin="auto"
                      h="100%"
                      alignItems="flex-end"
                      pb={{ base: "60px", lg: "60px", "2xl": "100px" }}
                      pos="relative"
                      zIndex="1"
                    >
                      {/* CONTENT CONTAINER */}
                      <Box
                        maxW={{ base: "100%", lg: "580px" }}
                        p={{ base: "24px", xl: "30px", "2xl": "40px" }}
                        bg="rgba(28, 28, 28, 0.4)"
                        backdropFilter="blur(20px)"
                        borderRadius="12px"
                        border="1px solid rgba(255, 255, 255, 0.05)"
                        boxShadow="0 20px 25px -5px rgba(0, 0, 0, 0.7)"
                      >
                        {/* TITLE */}
                        <Heading
                          as="h1"
                          color="var(--text-color)"
                          fontSize={{
                            base: "32px",
                            md: "42px",
                            "2xl": "52px",
                          }}
                          fontWeight="700"
                          lineHeight="1.1"
                          mb="12px"
                          textShadow="0 2px 8px rgba(0, 0, 0, 0.8)"
                          lineClamp={2}
                        >
                          {anime.name}
                        </Heading>

                        {/* ROMAJI TITLE (if available) */}
                        {anime.romaji && (
                          <Heading
                            as="h2"
                            color="var(--text-secondary)"
                            fontSize={{ base: "16px", md: "18px" }}
                            fontWeight="400"
                            fontStyle="italic"
                            mb="16px"
                            lineClamp={1}
                          >
                            {anime.romaji}
                          </Heading>
                        )}

                        {/* DESCRIPTION */}
                        <Text
                          color="var(--text-secondary)"
                          fontSize={{ base: "14px", md: "16px" }}
                          lineHeight="1.6"
                          mb="24px"
                          lineClamp={3}
                        >
                          {anime.synopsis || anime.description}
                        </Text>

                        {/* ACTION BUTTONS */}
                        <HStack mb="20px" gap="12px" flexWrap="wrap">
                          {/* Info BUTTON */}
                          <Button
                            as={Link}
                            to={`/anime/${anime.id}`}
                            bg="var(--primary-color)"
                            color="var(--text-color)"
                            fontSize="16px"
                            fontWeight="600"
                            size="xl"
                            borderRadius="6px"
                            _hover={{
                              filter: "brightness(110%)",
                              transform: "scale(1.02)",
                              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.6)",
                            }}
                            transition="all 0.2s ease"
                          >
                            <Info size={20} /> View Info
                          </Button>

                          {/* MY LIST BUTTON */}
                          <Button
                            bg="rgba(28, 28, 28, 0.9)"
                            border="2px solid rgba(255, 255, 255, 0.2)"
                            color="var(--text-color)"
                            fontSize="16px"
                            fontWeight="600"
                            size="xl"
                            borderRadius="6px"
                            _hover={{
                              borderColor: "var(--text-color)",
                              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.5)",
                            }}
                            transition="all 0.2s ease"
                          >
                            <Plus size={20} /> My List
                          </Button>
                        </HStack>

                        {/* METADATA BADGES */}
                        <HStack gap="12px" flexWrap="wrap">
                          {/* SPOTLIGHT/FEATURED BADGE */}
                          {anime.spotlight && (
                            <Badge
                              bg="rgba(225, 29, 72, 0.2)"
                              border="1px solid var(--primary-color)"
                              color="var(--primary-color)"
                              px="12px"
                              py="6px"
                              borderRadius="4px"
                              fontSize="13px"
                              fontWeight="600"
                              textTransform="uppercase"
                            >
                              {anime.spotlight}
                            </Badge>
                          )}

                          {/* RELEASE DATE */}
                          {anime.releaseDate && (
                            <Badge
                              bg="rgba(99, 102, 241, 0.15)"
                              border="1px solid var(--accent-color)"
                              color="var(--accent-color)"
                              px="12px"
                              py="6px"
                              borderRadius="4px"
                              fontSize="13px"
                              fontWeight="500"
                            >
                              {anime.releaseDate}
                            </Badge>
                          )}

                          {/* TYPE */}
                          {anime.type && (
                            <Badge
                              bg="rgba(99, 102, 241, 0.15)"
                              border="1px solid var(--accent-color)"
                              color="var(--accent-color)"
                              px="12px"
                              py="6px"
                              borderRadius="4px"
                              fontSize="13px"
                              fontWeight="500"
                            >
                              {anime.type}
                            </Badge>
                          )}

                          {/* SUB EPISODES */}
                          {tvInfo.sub && (
                            <Badge
                              bg="rgba(99, 102, 241, 0.15)"
                              border="1px solid var(--accent-color)"
                              color="var(--accent-color)"
                              px="12px"
                              py="6px"
                              borderRadius="4px"
                              fontSize="13px"
                              fontWeight="500"
                            >
                              SUB {tvInfo.sub}
                            </Badge>
                          )}

                          {/* DUB EPISODES */}
                          {tvInfo.dub && (
                            <Badge
                              bg="rgba(99, 102, 241, 0.15)"
                              border="1px solid var(--accent-color)"
                              color="var(--accent-color)"
                              px="12px"
                              py="6px"
                              borderRadius="4px"
                              fontSize="13px"
                              fontWeight="500"
                            >
                              DUB {tvInfo.dub}
                            </Badge>
                          )}

                          {/* QUALITY */}
                          {anime.quality && (
                            <Badge
                              bg="rgba(16, 185, 129, 0.15)"
                              border="1px solid var(--secondary-color)"
                              color="var(--secondary-color)"
                              px="12px"
                              py="6px"
                              borderRadius="4px"
                              fontSize="13px"
                              fontWeight="600"
                            >
                              {anime.quality}
                            </Badge>
                          )}

                          {/* GENRES (first 3) */}
                          {anime.genres?.slice(0, 3).map((genre, idx) => (
                            <Badge
                              key={idx}
                              bg="rgba(99, 102, 241, 0.15)"
                              border="1px solid var(--accent-color)"
                              color="var(--accent-color)"
                              px="12px"
                              py="6px"
                              borderRadius="4px"
                              fontSize="13px"
                              fontWeight="500"
                            >
                              {genre}
                            </Badge>
                          ))}
                        </HStack>
                      </Box>
                    </Flex>
                  </Box>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* CUSTOM PAGINATION DOTS (Optional) */}
          <Box
            pos="absolute"
            bottom="20px !important"
            left="50% !important"
            transform="translateX(-50%) !important"
            zIndex="3"
            display="flex"
            width="fit-content !important"
            // height="40px"
            // border="1px solid orange"
            gap="8px"
            className="swiper-pagination-custom"
          >
            {/* Pagination dots will be rendered here via Swiper if you add pagination module */}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Hero;
