import { ChevronLeft } from "lucide-react";
import { useSwiper } from "swiper/react";

const Prev = () => {
  const swiper = useSwiper();
  return (
    <ChevronLeft
      color="var(--text-secondary)"
      size={60}
      opacity="0.2"
      _hover={{ color: "var(--text-color)" }}
      cursor="pointer"
      transition="all ease 0.25s"
      onClick={() => swiper.slidePrev()}
    />
  );
};

export default Prev;
