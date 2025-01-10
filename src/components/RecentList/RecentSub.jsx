import {
  Link as ChakraLink,
  GridItem,
  Box,
  Image,
  Text,
  Icon,
  Skeleton,
  SkeletonText,
  HStack,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { useState, useEffect } from "react";
import "./style.css";
import Error from "../ErrorPage/Error";
import { BsPlayCircle } from "react-icons/bs";
import Loading from "../ErrorPage/Loading";
import axios from "axios";

const Recents = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subAnimeData, setSubAnimeData] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const api = "https://consumet-api-puce.vercel.app/";
  const backup_api = "https://aniwatch-api-gamma-wheat.vercel.app/";
  const proxy = "https://fluoridated-recondite-coast.glitch.me/";

  const fetchRecentReleaseAnime = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${proxy}${backup_api}/api/v2/hianime/category/recently-updated`
      );
      const data = await response.json();
      setSubAnimeData(data.data.animes);
      console.log(data);
    } catch (err) {
      setError("Failed to load data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentReleaseAnime();
  }, []);

  // Handle slicing for "Show All" and "Show Less"
  const displayedAnime = showAll
    ? subAnimeData
    : subAnimeData.slice(0, Math.min(8, subAnimeData.length));

  // Render loading state
  if (isLoading) {
    return [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => {
      <GridItem key={index}>
        <Skeleton
          borderRadius="10px"
          h={{
            base: "400.23px",
            sm: "380.23px",
            md: "350px",
            lg: "360px",
            "2xl": "408.19px",
          }}
          w="100%"
        />
        <HStack mt="10px">
          <Skeleton h="20px" w="50px" />
          <Skeleton h="20px" w="50px" />
        </HStack>
        <SkeletonText noOfLines={2} h={2} spacing={2} my="10px" />
      </GridItem>;
    });
  }

  // Render error state
  if (error) {
    return <Error msg={error} pos="absolute" />;
  }

  return (
    <>
      {displayedAnime.map((item, index) => {
        const epLength =
          item.name.length > 30 ? `${item.name.slice(0, 30)}...` : item.name;

        return (
          <GridItem key={item.id} w={{ base: "100%" }}>
            <Box
              as={ReactRouterLink}
              to={`/watch/${encodeURIComponent(item.poster)}/${item.id}`}
              pos="relative"
              overflow="hidden"
              display="block"
              className="episode-container"
              h={{
                base: "400.23px",
                sm: "380.23px",
                md: "350px",
                lg: "360px",
                "2xl": "408.19px",
              }}
              borderRadius="10px"
              transition="opacity 0.5s"
            >
              {/* Anime Image */}
              <Image
                src={item.poster}
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
                background="rgba(0, 0, 0, 0.7)"
                transition="height 0.7s ease, opacity 0.7s ease"
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
                  to={`/watch/${encodeURIComponent(item.poster)}/${item.id}`}
                  color="var(--link-color)"
                  _hover={{
                    color: "var(--accent-color)",
                    transition: "all ease 0.25s",
                  }}
                  fontSize="22.88px"
                  lineHeight="36px"
                  letterSpacing="0.5px"
                  fontWeight="500"
                  className="playNowBtn"
                  display="flex"
                  alignItems="center"
                  gap="8px"
                >
                  <Icon
                    as={BsPlayCircle}
                    color="var(--secondary-color)"
                    transition="all ease 0.25s"
                    className="playIcon"
                    h="40px"
                    w="40px"
                  />
                  Play Now
                </ChakraLink>
              </Box>
            </Box>

            {/* Anime Info */}
            <Box
              display="flex"
              flexDir="column"
              alignItems="flex-start"
              mt="10px"
            >
              <Text
                as="p"
                color="var(--text-color)"
                fontSize={{ base: "15.91px", "2xl": "17.97px" }}
                lineHeight="24px"
                letterSpacing="0.5px"
              >
                Episode {item.episodes.sub || "Loading..."}
              </Text>
              <ChakraLink
                as={ReactRouterLink}
                to={`/watch/${encodeURIComponent(item.poster)}/${item.id}`}
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
                  color="var(--link-color)"
                  transition="all ease 0.25s"
                  _hover={{ color: "var(--accent-color)" }}
                >
                  {epLength}
                </Text>
              </ChakraLink>
            </Box>
          </GridItem>
        );
      })}

      {/* Show All / Show Less Button */}
      {subAnimeData.length > 7 && (
        <ChakraLink
          as="button"
          onClick={() => setShowAll((prev) => !prev)}
          color="var(--text-color)"
          fontSize={{ base: "15px", md: "17px", lg: "19px", "2xl": "22.96px" }}
          border="1px solid var(--secondary-color)"
          borderRadius="5px"
          padding="5px 15px"
          transition="all ease 0.25s"
          width={{ base: "100%", sm: "100%" }}
          _hover={{
            textDecor: "none",
            color: "var(--background-color)",
            background: "var(--accent-color)",
            border: "none",
          }}
          pos="absolute"
          bottom="-70px"
        >
          {showAll ? "Show Less" : "Show All"}
        </ChakraLink>
      )}
    </>
  );
};

export default Recents;
