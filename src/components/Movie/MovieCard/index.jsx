import {
  GridItem,
  Box,
  Link as ChakraLink,
  Icon,
  Image,
  Text,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import StarRating from "../StarRating";

const MovieCard = ({ movie }) => {
  const is_TV = movie.media_type === "tv" ? true : false;
  //get full date from release_date
  const date = new Date(is_TV ? movie.first_air_date : movie.release_date);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return (
    <GridItem key={movie.id}>
      <Box
        as={ReactRouterLink}
        to={is_TV ? `/movies/tv/${movie.id}` : `/movies/movie/${movie.id}`}
        pos="relative"
        overflow="hidden"
        display="block"
        className="episode-container"
        h={{
          base: "216px",
          sm: "290.23px",
          md: "350px",
          lg: "360px",
          "2xl": "408.19px",
        }}
        borderRadius="10px"
        transition="opacity 0.5s"
      >
        {/* Anime Image */}
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          w="100%"
          bg="#191919"
          borderRadius="10px"
          transition="transform 0.7s ease-in-out"
          h="100%"
          className="thumbnail"
        />

        {/* Overlay */}
        <Box
          className="overlay"
          pos="absolute"
          top="0"
          left="0"
          textAlign="center"
          background="rgba(0, 0, 0, 0.85)"
          transition="height 0.5s ease, opacity 0.5s ease"
          h="0"
          w="100%"
          borderRadius="10px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          opacity="0"
        >
          <ChakraLink
            as={ReactRouterLink}
            to={is_TV ? `/movies/tv/${movie.id}` : `/movies/movie/${movie.id}`}
            color="var(--text-color)"
            _hover={{
              color: "var(--link-hover-color)",
              transition: "all ease 0.25s",
            }}
            fontSize={{ base: "15px", sm: "18.88px" }}
            lineHeight="36px"
            letterSpacing="0.5px"
            fontWeight="500"
            className="playNowBtn"
            display="flex"
            alignItems="center"
            gap="8px"
          >
            <Icon
              as={BsInfoCircle}
              color="var(--link-hover-color)"
              transition="all ease 0.25s"
              className="playIcon"
              h={{ base: "20px", "2xl": "40px" }}
              w={{ base: "20px", "2xl": "40px" }}
            />
            {is_TV ? "View Series" : "View Movie"}
          </ChakraLink>
        </Box>
      </Box>

      {/* Movie / TV Info */}
      <Box display="flex" flexDir="column" alignItems="flex-start" mt="10px">
        <StarRating rating={movie.vote_average} />

        <Text
          as="span"
          color="var(--text-color)"
          cursor="pointer"
          hideBelow="sm"
          transition="all ease 0.25s"
          _hover={{
            color: "var(--link-hover-color)",
          }}
          fontSize={{ base: "12.63px", md: "14.63px" }}
          lineHeight="24px"
          letterSpacing="0.5px"
          textTransform="uppercase"
          mt="5px"
          mb="10px"
        >
          {formattedDate}
        </Text>

        <ChakraLink
          as={ReactRouterLink}
          to={is_TV ? `/movies/tv/${movie.id}` : `/movies/movie/${movie.id}`}
          _hover={{ textDecor: "none" }}
        >
          <Text
            as="p"
            fontSize={{
              base: "17px",
              sm: "19px",
              lg: "20px",
              "2xl": "22.88px",
            }}
            lineHeight="26px"
            letterSpacing="0.5px"
            fontWeight="500"
            textAlign="start"
            color="var(--text-color)"
            transition="all ease 0.25s"
            _hover={{ color: "var(--link-hover-color)" }}
          >
            {is_TV
              ? movie.name.length > 30
                ? `${movie.name.slice(0, 20)}...`
                : movie.name
              : movie.title?.length > 30
              ? `${movie.title.slice(0, 20)}...`
              : movie.title}
          </Text>
        </ChakraLink>
      </Box>
    </GridItem>
  );
};

export default MovieCard;
0;
