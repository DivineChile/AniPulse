import { ChevronLeft } from "lucide-react";
import { useSwiper } from "swiper/react";

const Prev = () => {
  const swiper = useSwiper();
  return (
    <ChevronLeft
      color="var(--text-color)"
      size={60}
      opacity="0.2"
      _hover={{ opacity: "1" }}
      cursor="pointer"
      transition="all ease 0.25s"
      onClick={() => swiper.slidePrev()}
    />
  );
};

export default Prev;
