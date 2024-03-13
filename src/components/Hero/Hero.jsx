import { Box, Flex, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import Navbar from "../Navbar/Navbar";
// import Bg from "../../assets/banner-img-1.png";
import { Link } from "react-router-dom";
import "./Hero.css";
import { useEffect, useState } from "react";
import Error from "../ErrorPage/Error";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const Hero = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bgImages, setBgImages] = useState([]);
  const [animeTitles, setAnimeTitles] = useState([]);
  const [animeStatus, setAnimeStatus] = useState([]);
  const [animeDesc, setAnimeDesc] = useState([]);
  const [animeYear, setAnimeYear] = useState([]);
  const [animeGenres, setAnimeGenres] = useState([]);
  const [animeID, setAnimeID] = useState([]);

  useEffect(() => {
    const fetchRecomendedAnime = async () => {
      try {
        const response = await fetch(
          "https://api-amvstrm.nyt92.eu.org/api/v2/trending"
        );

        if (!response.ok) {
          setError("Please Check Connection");
          setIsLoading(false);
        }
        const data = await response.json();

        setBgImages(data.results.map((item) => item.coverImage.extraLarge));
        setAnimeTitles(data.results.map((item) => item.title.userPreferred));
        setAnimeStatus(data.results.map((item) => item.status));
        setAnimeDesc(data.results.map((item) => item.description));
        setAnimeYear(data.results.map((item) => item.seasonYear));
        setAnimeGenres(data.results.map((item) => item.genres));
        setAnimeID(data.results.map((item) => item.id));
        setIsLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setIsLoading(false);
      }
    };

    fetchRecomendedAnime();

    const intervalId = setInterval(() => {
      if (imageIndex === bgImages.length - 1) {
        setImageIndex(0);
      } else {
        setImageIndex(imageIndex + 1);
      }
    }, 5000);

    return () => {
      clearInterval(intervalId);
      //   setBgImages([]);
    };
  }, [imageIndex, bgImages]);

  const currentImage = bgImages.length > 0 ? bgImages[imageIndex] : "";
  const currentTitle = animeTitles.length > 0 ? animeTitles[imageIndex] : "";
  const currentStatus = animeStatus.length > 0 ? animeStatus[imageIndex] : "";
  const currentGenre = animeGenres.length > 0 ? animeGenres[imageIndex] : [];
  const currentRelease = animeYear.length > 0 ? animeYear[imageIndex] : "";
  const currentDesc = animeDesc.length > 0 ? animeDesc[imageIndex] : "";
  const currentID = animeID.length > 0 ? animeID[imageIndex] : "";

  const mainDesc =
    currentDesc?.length > 60 ? `${currentDesc.slice(0, 200)}...` : currentDesc;

  const handlePrevClick = () => {
    if (imageIndex === 0) {
      setImageIndex(bgImages.length - 1);
    } else {
      setImageIndex(imageIndex + 1);
    }
  };

  const handleNextClick = () => {
    if (imageIndex === bgImages.length - 1) {
      setImageIndex(0);
    } else {
      setImageIndex(imageIndex + 1);
    }
  };

  return (
    <Box w="100%" h="100vh">
      {isLoading && (
        <Error
          // msg={"Still Working..."}
          loadingState={isLoading}
          height={{
            base: "calc(100vh - 70.89px)",
            md: "calc(100vh - 74px)",
            lg: "calc(100vh - 84px)",
          }}
          error={error}
          pos="absolute"
          left="0"
          top={{ base: "70.89px", md: "74px", lg: "84px" }}
          width="100%"
          bg="#191919"
          spinnerH={{ base: "50px", md: "80px", lg: "100px" }}
          spinnerW={{ base: "50px", md: "80px", lg: "100px" }}
        />
      )}

      {error && (
        <Error
          msg={"Still Working..."}
          loadingState={isLoading}
          height={{
            base: "calc(100vh - 70.89px)",
            md: "calc(100vh - 74px)",
            lg: "calc(100vh - 84px)",
          }}
          error={error}
          pos="absolute"
          left="0"
          top={{ base: "70.89px", md: "74px", lg: "84px" }}
          width="100%"
          bg="#191919"
          spinnerH={{ base: "50px", md: "80px", lg: "100px" }}
          spinnerW={{ base: "50px", md: "80px", lg: "100px" }}
        />
      )}

      <Box>
        <Navbar />
      </Box>
      <Box
        background={currentImage ? `url(${currentImage})` : "#191919"}
        backgroundPosition="center"
        transition="background ease 0.25s"
        backgroundSize="cover"
        backgroundBlendMode="overlay"
        backgroundColor="rgba(0,0,0,0.55)"
        backgroundRepeat="no-repeat"
        w="100%"
        h={{
          base: "calc(100vh - 70.89px)",
          md: "calc(100vh - 74px)",
          lg: "calc(100vh - 84px)",
        }}
      >
        {/* Anime Recommendation */}
        <Flex
          // px={{ base: "20px", lg: "20px", xl: "100px" }}
          maxW={{
            base: "95%",
            xl: "85%",
            "2xl": "container.xl",
          }}
          margin="auto"
          h="100%"
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Buttons for Moving Content */}
          <Box pos="absolute" left="20px" hideBelow="lg">
            <ChevronLeftIcon
              color="var(--text-color)"
              h="60px"
              w="60px"
              opacity="0.2"
              _hover={{ opacity: "1" }}
              cursor="pointer"
              transition="all ease 0.25s"
              onClick={handlePrevClick}
            />
          </Box>

          <Box pos="absolute" right="20px" hideBelow="lg">
            <ChevronRightIcon
              color="var(--text-color)"
              h="60px"
              w="60px"
              opacity="0.2"
              _hover={{ opacity: "1" }}
              cursor="pointer"
              transition="all ease 0.25s"
              onClick={handleNextClick}
            />
          </Box>
          {/* Anime Details */}
          <VStack
            width={{ base: "100%", lg: "550px" }}
            display="flex"
            flexDir="column"
            alignItems="flex-start"
          >
            {/* Anime Title */}
            <Heading
              color="var(--text-color)"
              textTransform="uppercase"
              fontWeight="600"
              fontSize={{
                base: "40px",
                sm: "50px",
                md: "65px",
                lg: "67px",
                "2xl": "76.25px",
              }}
              lineHeight={{ base: "48px", md: "68px", "2xl": "88px" }}
              letterSpacing="1.5px"
              fontFamily="var(--font-family)"
              transition="all ease 0.25s"
            >
              {currentTitle?.length > 30
                ? `${currentTitle.slice(0, 25)}...`
                : currentTitle}
            </Heading>
            {/* Anime status */}
            <Heading
              as="h4"
              textTransform="uppercase"
              color="var(--text-color)"
              fontFamily="var(--font-family)"
              fontSize={{ base: "20.97px", md: "29px", "2xl": "37.97px" }}
              lineHeight={{ base: "33px", md: "35px", "2xl": "40px" }}
              letterSpacing="0.5px"
              fontWeight="400"
              mt={{ base: "10px", "2xl": "15px" }}
              transition="all ease 0.25s"
            >
              status: {currentStatus}
            </Heading>
            {/* PG / Dub / Sub */}
            <HStack my="10px" gap="10px 10px" display="flex" flexWrap="wrap">
              {Object.entries(currentGenre).map(([key, value]) => (
                <Text
                  as="span"
                  color="var(--secondary-color)"
                  cursor="pointer"
                  p="3px 10px"
                  transition="all ease 0.25s"
                  _hover={{
                    color: "var(--background-color)",
                    bgColor: "var(--accent-color)",
                    border: "none",
                  }}
                  borderRadius="8px"
                  border="2px solid var(--secondary-color)"
                  fontSize={{ base: "14.63px", md: "16.63px" }}
                  lineHeight="24px"
                  letterSpacing="0.5px"
                  key={key}
                >
                  {value}
                </Text>
              ))}
            </HStack>
            {/* Release Date */}
            <Heading
              as="h4"
              textTransform="uppercase"
              color="var(--text-color)"
              fontFamily="var(--font-family)"
              fontSize={{ base: "19.38px", md: "24px", "2xl": "28.95px" }}
              lineHeight={{ base: "30px", md: "35px", "2xl": "40px" }}
              letterSpacing="0.5px"
              fontWeight="400"
              transition="all ease 0.25s"
            >
              Release year: {currentRelease}
            </Heading>
            {/* Description */}
            <Text
              as="p"
              fontSize={{ base: "13.56px", md: "14.38px", "2xl": "15.38px" }}
              lineHeight={{ base: "21px", md: "22px", "2xl": "24px" }}
              letterSpacing="0.5px"
              color="var(--text-color)"
              my="10px"
              fontWeight={{ base: "300", md: "normal" }}
              transition="all ease 0.25s"
            >
              {mainDesc}
            </Text>

            <Box width="100%" my={{ base: "15px", md: "10px" }}>
              <Link to={`anime/${currentID}`} className="play-now-btn">
                VIEW MORE
              </Link>
            </Box>
          </VStack>

          <Box hideBelow="xl">
            <Box
              background={
                currentImage ? `url(${currentImage})` : "rgba(25, 27, 40, 0.7)"
              }
              w={{ lg: "550px", "2xl": "670px" }}
              h={{ lg: "450px", "2xl": "600px" }}
              backgroundSize="cover"
              borderRadius="20px"
              backgroundPosition="center"
              transition="background ease 0.25s"
              backgroundRepeat="no-repeat"
            ></Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Hero;
