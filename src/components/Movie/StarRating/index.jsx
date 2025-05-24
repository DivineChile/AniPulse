import { Icon, HStack } from "@chakra-ui/react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
0;

const StarRating = ({ rating }) => {
  const stars = [];
  const ratingOutOfFive = rating / 2;

  for (let i = 1; i <= 5; i++) {
    if (ratingOutOfFive >= i) {
      stars.push(<Icon as={BsStarFill} color="yellow.400" key={i} />);
    } else if (ratingOutOfFive >= i - 0.5) {
      stars.push(<Icon as={BsStarHalf} color="yellow.400" key={i} />);
    } else {
      stars.push(<Icon as={BsStar} color="gray.500" key={i} />);
    }
  }

  return <HStack spacing={0.5}>{stars}</HStack>;
};

export default StarRating;
