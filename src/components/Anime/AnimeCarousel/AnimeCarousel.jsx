import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Navigation, FreeMode } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Box } from "@chakra-ui/react";
import AnimeCard from "../AnimeCard/AnimeCard";
import { useRef } from "react";
import { AnimeCardSkeleton } from "../../Skeleton/CardSkeleton";

const AnimeCarousel = ({ animeList, uniqueId, isLoading }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const skeletons = [...Array(10)].map((_, index) => (
    <SwiperSlide key={index} style={{ width: "auto" }}>
      <AnimeCardSkeleton />
    </SwiperSlide>
  ));

  return (
    <Box position="relative">
      {/* Navigation Buttons */}
      <Box
        // className="swiper-button-prev-continue-trending"
        position="absolute"
        ref={prevRef}
        left="-16px"
        top="50%"
        transform="translateY(-50%)"
        zIndex="10"
        display="flex"
        alignItems="center"
        justifyContent="center"
        w="40px"
        h="40px"
        borderRadius="50%"
        bg="rgba(28, 28, 28, 0.9)"
        backdropFilter="blur(10px)"
        border="1px solid rgba(255, 255, 255, 0.1)"
        color="var(--text-color)"
        cursor="pointer"
        opacity="1"
        _hover={{
          bg: "var(--primary-color)",
        }}
        transition="all 0.3s ease"
      >
        <ChevronLeft size="16px" />
      </Box>

      <Box
        // className="swiper-button-next-continue-trending"
        position="absolute"
        right="-16px"
        ref={nextRef}
        top="50%"
        transform="translateY(-50%)"
        zIndex="10"
        display="flex"
        alignItems="center"
        justifyContent="center"
        w="40px"
        h="40px"
        borderRadius="50%"
        bg="rgba(28, 28, 28, 0.9)"
        backdropFilter="blur(10px)"
        border="1px solid rgba(255, 255, 255, 0.1)"
        color="var(--text-color)"
        cursor="pointer"
        opacity="1"
        _hover={{
          bg: "var(--primary-color)",
        }}
        transition="all 0.3s ease"
      >
        <ChevronRight size="16px" />
      </Box>

      {/* Swiper Carousel */}
      <Box className={`carousel-${uniqueId}`}>
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
          slidesPerView="auto"
          freeMode={true}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 12 },
            640: { slidesPerView: 3, spaceBetween: 16 },
            768: { slidesPerView: 4, spaceBetween: 16 },
            1024: { slidesPerView: 5, spaceBetween: 16 },
            1280: { slidesPerView: 6, spaceBetween: 16 },
          }}
        >
          {isLoading
            ? skeletons
            : animeList?.map((anime) => (
                <SwiperSlide key={anime.id}>
                  <AnimeCard anime={anime} />
                </SwiperSlide>
              ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default AnimeCarousel;
