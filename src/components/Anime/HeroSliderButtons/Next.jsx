import { ChevronRightIcon } from "@chakra-ui/icons";
import { useSwiper } from "swiper/react";

const Next = () => {
  const swiper = useSwiper();
  return (
    <ChevronRightIcon
      color="var(--text-color)"
      h="60px"
      w="60px"
      opacity="0.2"
      _hover={{ opacity: "1" }}
      cursor="pointer"
      transition="all ease 0.25s"
      onClick={() => swiper.slideNext()}
    />
  );
};

export default Next;
