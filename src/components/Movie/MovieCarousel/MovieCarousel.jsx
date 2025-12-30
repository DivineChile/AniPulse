// components/Movies/MovieCarousel.jsx
import { Box } from "@chakra-ui/react";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MovieCard from "../MovieCard";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { AnimeCardSkeleton } from "../../Skeleton/CardSkeleton";

const MovieCarousel = ({ movies, uniqueId, isLoading }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const skeletons = [...Array(10)].map((_, index) => (
    <SwiperSlide key={index} style={{ width: "auto" }}>
      <AnimeCardSkeleton />
    </SwiperSlide>
  ));

  return (
    <Box position="relative" className="movie-carousel-container">
      <Swiper
        modules={[Navigation, FreeMode]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        spaceBetween={16}
        freeMode={{
          enabled: true,
          sticky: false,
          momentumRatio: 0.5,
        }}
        breakpoints={{
          320: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          640: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
          768: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          1024: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
          1280: {
            slidesPerView: 6,
            slidesPerGroup: 6,
          },
          1536: {
            slidesPerView: 6,
            slidesPerGroup: 6,
          },
        }}
        style={{
          paddingLeft: "16px",
          paddingRight: "16px",
        }}
      >
        {isLoading && movies.length === 0
          ? skeletons
          : movies.map((movie) => (
              <SwiperSlide key={`${uniqueId}-${movie.id}`}>
                <MovieCard movie={movie} />
              </SwiperSlide>
            ))}
      </Swiper>

      {/* NAVIGATION BUTTONS */}
      <Box
        ref={prevRef}
        position="absolute"
        left="0"
        top="50%"
        transform="translateY(-50%)"
        zIndex="10"
        w="40px"
        h="40px"
        bg="rgba(28, 28, 28, 0.95)"
        backdropFilter="blur(10px)"
        borderRadius="50%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        opacity="1"
        transition="opacity 0.3s ease"
        border="1px solid rgba(255, 255, 255, 0.1)"
        _hover={{
          bg: "var(--primary-color)",
          borderColor: "var(--primary-color)",
        }}
      >
        <ChevronLeft size={16} color="var(--text-color)" />
      </Box>

      <Box
        ref={nextRef}
        position="absolute"
        right="0"
        top="50%"
        transform="translateY(-50%)"
        zIndex="10"
        w="40px"
        h="40px"
        bg="rgba(28, 28, 28, 0.95)"
        backdropFilter="blur(10px)"
        borderRadius="50%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        opacity="1"
        transition="opacity 0.3s ease"
        border="1px solid rgba(255, 255, 255, 0.1)"
        _hover={{
          bg: "var(--primary-color)",
          borderColor: "var(--primary-color)",
        }}
      >
        <ChevronRight size={16} color="var(--text-color)" />
      </Box>
    </Box>
  );
};

export default MovieCarousel;
