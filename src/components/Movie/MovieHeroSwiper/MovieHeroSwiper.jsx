// components/Movies/HeroSection.jsx
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Badge,
  HStack,
} from "@chakra-ui/react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import {
  FaPlay,
  FaPlus,
  FaChevronLeft,
  FaChevronRight,
  FaStar,
} from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const MovieHeroSwiper = ({ movies }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  if (!movies || movies.length === 0) return null;

  return (
    <Box
      position="relative"
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
        modules={[Navigation, Autoplay, Pagination]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination-custom",
        }}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        speed={800}
        style={{ height: "100%" }}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <Box position="relative" h="100%" w="100%">
              {/* BACKGROUND IMAGE */}
              <Box
                position="absolute"
                top="0"
                left="0"
                w="100%"
                h="100%"
                bgImage={`url(${movie.coverImage || movie.posterImage})`}
                bgSize="cover"
                bgPosition="center"
                filter="blur(8px)"
                transform="scale(1.1)"
                zIndex="1"
              />

              {/* GRADIENT OVERLAYS */}
              <Box
                w="100%"
                h="100%"
                pos="absolute"
                top="0"
                left="0"
                background="linear-gradient(to bottom, rgba(12, 12, 12, 0.2) 0%, rgba(12, 12, 12, 0.6) 50%, var(--primary-background-color) 100%), linear-gradient(to right, rgba(12, 12, 12, 0.85) 0%, rgba(12, 12, 12, 0.4) 50%, rgba(12, 12, 12, 0.85) 100%)"
                zIndex="3"
              />

              {/* CONTENT */}
              <Flex
                position="absolute"
                bottom={{ base: "40px", md: "80px" }}
                left="0"
                w="100%"
                zIndex="4"
                alignItems="flex-end"
                px={{ base: "5vw", xl: "7.5vw" }}
              >
                <Box
                  maxW={{ base: "100%", md: "600px", lg: "700px" }}
                  bg="rgba(12, 12, 12, 0.7)"
                  backdropFilter="blur(20px)"
                  borderRadius="16px"
                  p={{ base: "24px", md: "32px" }}
                  border="1px solid rgba(255, 255, 255, 0.1)"
                >
                  {/* BADGES */}
                  <HStack spacing="8px" mb="16px" flexWrap="wrap">
                    <Badge
                      bg="var(--primary-color)"
                      color="var(--text-color)"
                      fontSize="11px"
                      fontWeight="700"
                      px="10px"
                      py="4px"
                      borderRadius="4px"
                    >
                      FEATURED
                    </Badge>
                    {movie.quality && (
                      <Badge
                        bg="var(--secondary-color)"
                        color="var(--text-color)"
                        fontSize="11px"
                        fontWeight="700"
                        px="10px"
                        py="4px"
                        borderRadius="4px"
                      >
                        {movie.quality}
                      </Badge>
                    )}
                  </HStack>

                  {/* TITLE */}
                  <Heading
                    as="h1"
                    fontSize={{ base: "32px", md: "48px", lg: "56px" }}
                    fontWeight="700"
                    color="var(--text-color)"
                    mb="12px"
                    lineHeight="1.1"
                    lineClamp={2}
                  >
                    {movie.name || movie.title}
                  </Heading>

                  {/* META INFO */}
                  <HStack
                    spacing="12px"
                    mb="16px"
                    fontSize="14px"
                    color="var(--text-secondary)"
                  >
                    {movie.score && (
                      <Flex alignItems="center" gap="4px">
                        <FaStar size={14} color="var(--secondary-color)" />
                        <Text fontWeight="600" color="var(--text-color)">
                          {movie.score}
                        </Text>
                      </Flex>
                    )}
                    <Text>•</Text>
                    {movie.duration && <Text>{movie.duration}</Text>}
                    <Text>•</Text>
                    {movie.type && <Text>{movie.type}</Text>}
                  </HStack>

                  {/* DESCRIPTION */}
                  <Text
                    fontSize={{ base: "14px", md: "15px" }}
                    color="var(--text-secondary)"
                    mb="24px"
                    lineClamp={3}
                    lineHeight="1.7"
                  >
                    {movie.description ||
                      movie.synopsis ||
                      "No description available."}
                  </Text>

                  {/* ACTION BUTTONS */}
                  <HStack spacing="12px">
                    <Button
                      as={Link}
                      to={`/movie/${movie.id}`}
                      size="lg"
                      bg="var(--primary-color)"
                      color="var(--text-color)"
                      leftIcon={<FaPlay />}
                      borderRadius="8px"
                      fontWeight="600"
                      fontSize="15px"
                      h="52px"
                      px="32px"
                      _hover={{
                        filter: "brightness(110%)",
                        transform: "scale(1.02)",
                      }}
                      transition="all 0.2s ease"
                    >
                      Watch Now
                    </Button>

                    <Button
                      size="lg"
                      bg="transparent"
                      color="var(--text-color)"
                      border="2px solid"
                      borderColor="rgba(255, 255, 255, 0.3)"
                      leftIcon={<FaPlus />}
                      borderRadius="8px"
                      fontWeight="600"
                      fontSize="15px"
                      h="52px"
                      px="32px"
                      _hover={{
                        borderColor: "var(--text-color)",
                        bg: "rgba(255, 255, 255, 0.1)",
                      }}
                      transition="all 0.2s ease"
                    >
                      My List
                    </Button>
                  </HStack>
                </Box>
              </Flex>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* NAVIGATION BUTTONS */}
      <Box
        ref={prevRef}
        position="absolute"
        left="24px"
        top="50%"
        transform="translateY(-50%)"
        zIndex="10"
        w="48px"
        h="48px"
        bg="rgba(28, 28, 28, 0.8)"
        backdropFilter="blur(10px)"
        borderRadius="50%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        opacity="0"
        transition="opacity 0.3s ease"
        _hover={{
          bg: "var(--primary-color)",
        }}
        sx={{
          ".swiper:hover &": {
            opacity: 1,
          },
        }}
      >
        <FaChevronLeft size={20} color="var(--text-color)" />
      </Box>

      <Box
        ref={nextRef}
        position="absolute"
        right="24px"
        top="50%"
        transform="translateY(-50%)"
        zIndex="10"
        w="48px"
        h="48px"
        bg="rgba(28, 28, 28, 0.8)"
        backdropFilter="blur(10px)"
        borderRadius="50%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        opacity="0"
        transition="opacity 0.3s ease"
        _hover={{
          bg: "var(--primary-color)",
        }}
        sx={{
          ".swiper:hover &": {
            opacity: 1,
          },
        }}
      >
        <FaChevronRight size={20} color="var(--text-color)" />
      </Box>

      {/* PAGINATION DOTS */}
      <Box
        className="swiper-pagination-custom"
        pos="absolute"
        bottom="20px !important"
        left="50% !important"
        transform="translateX(-50%) !important"
        display="flex"
        width="fit-content !important"
        position="absolute"
        zIndex="10"
        gap="8px"
        sx={{
          ".swiper-pagination-bullet": {
            w: "6px",
            h: "6px",
            borderRadius: "50%",
            bg: "rgba(255, 255, 255, 0.3)",
            transition: "all 0.3s ease",
            cursor: "pointer",
          },
          ".swiper-pagination-bullet-active": {
            w: "32px",
            h: "6px",
            borderRadius: "3px",
            bg: "var(--primary-color)",
          },
        }}
      />
    </Box>
  );
};

export default MovieHeroSwiper;
