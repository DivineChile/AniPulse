// import {
//   Box,
//   Text,
//   Grid,
//   GridItem,
//   Heading,
//   Image,
//   HStack,
//   Link as ChakraLink,
//   Link,
//   Skeleton,
//   Flex,
//   Button,
//   TagRoot,
//   TagLabel,
//   ButtonGroup,
//   Dialog,
//   CloseButton,
//   Portal,
//   IconButton,
// } from "@chakra-ui/react";
// import { useState, useEffect } from "react";
// import { useParams, useLocation } from "react-router-dom";
// import { Link as ReactRouterLink } from "react-router-dom";

// import Navbar from "../../Navbar/Navbar";
// import Error from "../../ErrorPage/Error";
// import { cacheFetch } from "../../../utils/cacheFetch";
// import SeasonTabs from "./SeasonTabs";
// import {
//   ArrowRight,
//   Building2Icon,
//   CalendarDays,
//   CheckCircle2,
//   ChevronLeft,
//   Film,
//   ListVideo,
//   Loader,
//   Star,
//   TagIcon,
//   Users,
// } from "lucide-react";
// import EpisodeList from "../../Anime/EpisodeList/EpisodeList";

// const DetailCard = ({ icon, label, value, loading }) => (
//   <Skeleton loading={loading}>
//     <Box
//       bg="rgba(255,255,255,0.05)"
//       border="1px solid rgba(255,255,255,0.1)"
//       p="20px"
//       borderRadius="12px"
//       color="var(--text-color)"
//     >
//       <Flex align="center" gap="10px" mb="5px">
//         {icon}
//         <Text fontSize="16px" fontWeight="600">
//           {label}
//         </Text>
//       </Flex>

//       <Text fontSize="14px" color="var(--text-secondary)">
//         {value || "Unknown"}
//       </Text>
//     </Box>
//   </Skeleton>
// );

// const ViewMovie = () => {
//   const [movieDetails, setMovieDetails] = useState(null);
//   const [providerEpisodes, setProviderEpisodes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [trailerOpen, setTrailerOpen] = useState(false);
//   const [trailerUrl, setTrailerUrl] = useState(null);
//   const [recommendedMedia, setRecommendedMedia] = useState([]);

//   const { id } = useParams();
//   const location = useLocation();
//   const isTV = location.pathname.includes("/tv");

//   const fetchMovieDetails = async () => {
//     try {
//       // Unique cache key per anime
//       const cacheKey = `${isTV ? "tv" : "movie"}Info_${id}`;

//       // Fetch + cache for 10 minutes
//       const data = await cacheFetch(`api/flixhq/media/${id}`, { cacheKey });

//       console.log(data);
//       setMovieDetails(data?.data);
//       setProviderEpisodes(data?.providerEpisodes);
//       setTrailerUrl(data?.data?.trailer);
//       setRecommendedMedia(data?.recommended);

//       document.title = `${
//         isTV ? `${data?.data?.name} (TV Series)` : data?.data?.name
//       } - AniPulse`;
//     } catch (err) {
//       console.error("Failed to fetch movie details", err);
//       setError(err);
//       setMovieDetails(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const options = {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   };
//   const formattedDate = new Date(movieDetails?.releaseDate).toLocaleDateString(
//     "en-US",
//     options
//   );

//   useEffect(() => {
//     fetchMovieDetails();
//   }, [id, isTV]);

//   const groupedBySeason = providerEpisodes.reduce((acc, episode) => {
//     const season = episode.seasonNumber;

//     if (!acc[season]) {
//       acc[season] = [];
//     }

//     acc[season].push(episode);

//     return acc;
//   }, {});

//   console.log(groupedBySeason);

//   return (
//     <Box>
//       <Navbar />

//       {error && (
//         <Error
//           height="100vh"
//           bg="var(--primary-background-color)"
//           msg="Still Loading..."
//         />
//       )}

//       <Box bg="var(--primary-background-color)">
//         {/* ================= HERO SECTION ================= */}
//         <Box
//           h={{ base: "auto", md: "550px" }}
//           pos="relative"
//           overflow="hidden"
//           pb={{ base: "30px", md: "30px" }}
//           pt={{ base: "60px", md: "0" }}
//         >
//           <Box
//             w="100%"
//             h="100%"
//             pos="absolute"
//             bottom="0"
//             background="linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.99))"
//             zIndex="1"
//           ></Box>
//           {/* Background */}
//           <Box
//             pos="absolute"
//             inset="0"
//             bg={loading ? "#191919" : `url(${movieDetails?.posterImage})`}
//             bgSize="cover"
//             bgPos="center"
//             transform={{ base: "scale(1.1)", md: "scale(1)" }}
//           ></Box>

//           {/* Foreground content */}
//           <Flex
//             maxW={{
//               base: "90%",
//               sm: "95%",
//               xl: "85%",
//               "2xl": "container.xl",
//             }}
//             m="auto"
//             direction={{ base: "column", md: "row" }}
//             pos="relative"
//             zIndex="2"
//             h={{ base: "auto", md: "full" }}
//             px={{ base: "0", md: "50px" }}
//             pt={{ base: "40px", md: "0" }}
//             gap={{ base: "25px", md: "30px" }}
//             alignItems={{ base: "center", md: "end" }}
//           >
//             {/* Back button */}
//             <IconButton
//               as={ReactRouterLink}
//               to="/movies"
//               variant="subtle"
//               position="absolute"
//               top={{ base: "40px", md: "100px" }}
//               left="0"
//               zIndex="2"
//             >
//               <ChevronLeft size={20} color="var(--text-secondary)" />
//             </IconButton>
//             {/* Poster */}
//             <Skeleton loading={loading}>
//               <Image
//                 src={movieDetails?.posterImage}
//                 alt={movieDetails?.name}
//                 w={{ base: "180px", md: "250px" }}
//                 h={{ base: "270px", md: "350px" }}
//                 borderRadius="12px"
//                 objectFit="cover"
//                 shadow="xl"
//                 mx={{ base: "auto", md: "0" }}
//               />
//             </Skeleton>

//             {/* Title + Info */}
//             <Box
//               color="white"
//               width={{ base: "300px", md: "450px", lg: "650px" }}
//               textAlign={{ base: "center", md: "left" }}
//               mx={{ base: "auto", md: "0" }}
//             >
//               <Skeleton loading={loading}>
//                 <Heading
//                   fontSize={{ base: "28px", md: "48px" }}
//                   lineHeight="1.15"
//                   color="var(--text-color)"
//                   mb="10px"
//                 >
//                   {movieDetails?.name?.length > 30
//                     ? `${movieDetails?.name?.slice(0, 27)}...`
//                     : movieDetails?.name}
//                 </Heading>
//               </Skeleton>
//               <Flex
//                 justify={{ base: "center", md: "flex-start" }}
//                 gap="12px"
//                 wrap="wrap"
//                 fontSize={{ base: "14px", md: "15px" }}
//                 opacity={0.9}
//               >
//                 {isTV && <Text>Seasons</Text>}
//                 <Skeleton loading={loading}>
//                   <Text>{movieDetails?.type}</Text>
//                 </Skeleton>
//                 <Text color="var(--text-secondary)">•</Text>
//                 <Skeleton loading={loading}>
//                   <Text>{formattedDate}</Text>
//                 </Skeleton>
//                 <Text color="var(--text-secondary)">•</Text>
//                 {isTV ? (
//                   <Skeleton loading={loading}>
//                     <Text>{movieDetails?.episodeCount} Episodes</Text>
//                   </Skeleton>
//                 ) : (
//                   <Skeleton loading={loading}>
//                     <Text>{movieDetails?.duration}</Text>
//                   </Skeleton>
//                 )}
//               </Flex>

//               <ButtonGroup
//                 mt="25px"
//                 direction={{ base: "column", md: "row" }}
//                 flexDir={{ base: "column", md: "row" }}
//                 w={{ base: "100%", md: "auto" }}
//               >
//                 <Skeleton loading={loading} w={{ base: "100%", md: "150px" }}>
//                   <Button
//                     as={ReactRouterLink}
//                     to={`/watch/${providerEpisodes[0]?.episodeId}`}
//                     bg="var(--accent-color)"
//                     _hover={{
//                       bg: "var(--link-hover-color)",
//                       color: "var(--accent-color)",
//                     }}
//                     w={{ base: "100%", md: "150px" }}
//                     h="50px"
//                     fontSize="16px"
//                     borderRadius="8px"
//                     color="var(--link-color)"
//                   >
//                     Watch Now
//                   </Button>
//                 </Skeleton>
//                 <Skeleton loading={loading} w={{ base: "100%", md: "150px" }}>
//                   <Button
//                     bg="var(--accent-color)"
//                     _hover={{
//                       bg: "var(--link-hover-color)",
//                       color: "var(--accent-color)",
//                     }}
//                     w={{ base: "100%", md: "150px" }}
//                     h="50px"
//                     fontSize="16px"
//                     borderRadius="8px"
//                     onClick={() => setTrailerOpen(true)}
//                     color="var(--link-color)"
//                   >
//                     Play Trailer
//                   </Button>
//                 </Skeleton>
//               </ButtonGroup>

//               <Dialog.Root
//                 open={trailerOpen}
//                 onOpenChange={() => setTrailerOpen(false)}
//                 unmountOnExit
//                 size="lg"
//                 placement={{ base: "center", md: "top" }}
//               >
//                 <Portal>
//                   <Dialog.Backdrop backdropFilter="blur(10px)" />
//                   <Dialog.Positioner>
//                     <Dialog.Content>
//                       <Dialog.Header>
//                         <Dialog.Title>
//                           {movieDetails?.name} Trailer
//                         </Dialog.Title>
//                       </Dialog.Header>
//                       <Dialog.Body>
//                         <Box w="100%" h="300px" bg="black">
//                           <iframe
//                             width="100%"
//                             height="100%"
//                             src={trailerUrl}
//                             title={`${movieDetails?.name} Trailer`}
//                             frameBorder="0"
//                             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                             allowFullScreen
//                           ></iframe>
//                         </Box>
//                       </Dialog.Body>
//                       <Dialog.Footer>
//                         <Button onClick={() => setTrailerOpen(false)}>
//                           Close
//                         </Button>
//                       </Dialog.Footer>
//                       <Dialog.CloseTrigger asChild>
//                         <CloseButton size="sm" />
//                       </Dialog.CloseTrigger>
//                     </Dialog.Content>
//                   </Dialog.Positioner>
//                 </Portal>
//               </Dialog.Root>
//             </Box>
//           </Flex>
//         </Box>

//         {/* ================= CONTENT SECTION ================= */}
//         <Box
//           maxW={{
//             base: "90%",
//             sm: "95%",
//             xl: "85%",
//             "2xl": "container.xl",
//           }}
//           mx="auto"
//           px={{ base: "0px", md: "40px" }}
//           py="40px"
//         >
//           <Grid templateColumns={{ base: "1fr", lg: "2fr 1.2fr" }} gap="40px">
//             {/* LEFT SIDE — SUMMARY + DETAILS */}
//             <GridItem>
//               {/* Summary Card */}
//               <Skeleton loading={loading}>
//                 <Box
//                   bg="rgba(255,255,255,0.05)"
//                   border="1px solid rgba(255,255,255,0.1)"
//                   backdropFilter="blur(8px)"
//                   borderRadius="15px"
//                   p="25px"
//                 >
//                   <Heading fontSize="26px" mb="12px" color="var(--text-color)">
//                     Plot Summary
//                   </Heading>

//                   <Text
//                     color="var(--text-secondary)"
//                     fontSize="15px"
//                     lineHeight="26px"
//                   >
//                     {isExpanded
//                       ? movieDetails?.synopsis
//                       : movieDetails?.synopsis?.slice(0, 300) + "..."}
//                     {movieDetails?.synopsis?.length > 300 && (
//                       <Text
//                         as="span"
//                         color="var(--link-color)"
//                         ml="8px"
//                         cursor="pointer"
//                         onClick={() => setIsExpanded(!isExpanded)}
//                       >
//                         {isExpanded ? "Show Less" : "Read More"}
//                       </Text>
//                     )}
//                   </Text>
//                 </Box>
//               </Skeleton>

//               {/* Details Grid */}
//               <Grid
//                 mt="30px"
//                 gap="20px"
//                 templateColumns={{ base: "1fr", md: "1fr 1fr" }}
//               >
//                 {/* CARD TEMPLATE */}
//                 <DetailCard
//                   icon={<CalendarDays size={20} />}
//                   label="Premiered"
//                   value={formattedDate}
//                   loading={loading}
//                 />

//                 <DetailCard
//                   icon={<Star size={20} />}
//                   label="Score"
//                   value={movieDetails?.score}
//                   loading={loading}
//                 />

//                 <DetailCard
//                   icon={<Film size={20} />}
//                   label="Quality"
//                   value={movieDetails?.quality}
//                   loading={loading}
//                 />

//                 {isTV && (
//                   <DetailCard
//                     icon={
//                       movieDetails?.status
//                         ?.toLowerCase()
//                         ?.includes("currently") ? (
//                         <Loader size={20} />
//                       ) : (
//                         <CheckCircle2 size={20} />
//                       )
//                     }
//                     label="Status"
//                     value={movieDetails?.status}
//                     loading={loading}
//                   />
//                 )}

//                 <DetailCard
//                   icon={<Users size={20} />}
//                   label="Cast"
//                   value={movieDetails?.casts?.map((e) => e).join(", ")}
//                   loading={loading}
//                 />

//                 <Box>
//                   <Skeleton loading={loading}>
//                     <Flex align="center" gap="8px" mb="8px">
//                       <TagIcon size={20} color="var(--text-color)" />
//                       <Text
//                         fontSize="16px"
//                         color="var(--text-color)"
//                         fontWeight="600"
//                       >
//                         Genres
//                       </Text>
//                     </Flex>

//                     <Flex wrap="wrap" gap="8px">
//                       {movieDetails?.genre?.map((g) => (
//                         <TagRoot
//                           key={g}
//                           variant="subtle"
//                           bg="var(--accent-color)"
//                           color="white"
//                           borderRadius="full"
//                           px="10px"
//                           py="5px"
//                           fontSize="13px"
//                         >
//                           <TagLabel>{g}</TagLabel>
//                         </TagRoot>
//                       ))}
//                     </Flex>
//                   </Skeleton>
//                 </Box>

//                 <Box>
//                   <Skeleton loading={loading}>
//                     <Flex align="center" gap="8px" mb="8px">
//                       <Building2Icon size={20} color="var(--text-color)" />
//                       <Text
//                         fontSize="16px"
//                         color="var(--text-color)"
//                         fontWeight="600"
//                       >
//                         Studios
//                       </Text>
//                     </Flex>

//                     <Flex wrap="wrap" gap="8px">
//                       {movieDetails?.production?.map((g) => (
//                         <TagRoot
//                           key={g}
//                           variant="subtle"
//                           bg="var(--accent-color)"
//                           color="white"
//                           borderRadius="full"
//                           px="10px"
//                           py="5px"
//                           fontSize="13px"
//                         >
//                           <TagLabel>{g}</TagLabel>
//                         </TagRoot>
//                       ))}
//                     </Flex>
//                   </Skeleton>
//                 </Box>
//               </Grid>
//             </GridItem>

//             {/* RIGHT SIDE — EPISODE LIST */}
//             <GridItem id="episodes">
//               <Box>
//                 <Flex align="center" gap="12px" mb="20px">
//                   <ListVideo size={30} color="var(--text-color)" />
//                   <Heading fontSize="30px" color="var(--text-color)">
//                     {isTV ? "Seasons" : "Full Movie"}
//                   </Heading>
//                 </Flex>

//                 <Skeleton loading={loading}>
//                   <Box
//                     bg="rgba(255,255,255,0.05)"
//                     border="1px solid rgba(255,255,255,0.1)"
//                     backdropFilter="blur(6px)"
//                     borderRadius="12px"
//                     p="20px"
//                   >
//                     <EpisodeList
//                       items={providerEpisodes}
//                       itemId={providerEpisodes.map(
//                         (episode) => episode.episodeId
//                       )}
//                     />
//                   </Box>
//                 </Skeleton>
//               </Box>
//             </GridItem>
//           </Grid>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default ViewMovie;

// pages/Movies/MovieDetailPage.jsx
import {
  Box,
  Flex,
  Grid,
  Heading,
  Text,
  Button,
  IconButton,
  HStack,
  VStack,
  Badge,
  Image,
  AspectRatio,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Play,
  Plus,
  Share2,
  Star,
  Calendar,
  Clock,
  Film,
  Globe,
  Award,
  Users,
} from "lucide-react";
import Navbar from "../../Navbar/Navbar";
import MovieCarousel from "../MovieCarousel/MovieCarousel";
import Loading from "../../ErrorPage/Loading";
import Error from "../../ErrorPage/Error";
import { cacheFetch } from "../../../utils/cacheFetch";

const ViewMovie = () => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movieData, setMovieData] = useState(null);
  const [providerEpisodes, setProviderEpisodes] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [showFullSynopsis, setShowFullSynopsis] = useState(false);

  // Fetch movie data
  useEffect(() => {
    const fetchMovieData = async () => {
      setLoading(true);
      setError(null);

      try {
        const cacheKey = `movie_${id}`;

        // Fetch movie details
        const data = await await cacheFetch(`api/flixhq/media/${id}`, {
          cacheKey,
        });

        setMovieData(data.data);
        setProviderEpisodes(data.providerEpisodes || []);
        setRecommendedMovies(data.recommended || []);
        console.log(data);

        document.title = `${data.data.name || data.data.title} - AniPulse`;
      } catch (err) {
        setError("Failed to load movie details. Please try again.");
        console.error("Error fetching movie data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieData();
    }
  }, [id]);

  if (loading) {
    return (
      <Box>
        <Navbar />
        <Loading
          bg="var(--linear-gradient)"
          isLoading={loading}
          pos="absolute"
          top={{ base: "70px", md: "73px", lg: "84px" }}
          height={{
            base: "calc(100dvh - 70px)",
            md: "calc(100dvh - 73px)",
            lg: "calc(100dvh - 84px)",
          }}
        />
      </Box>
    );
  }

  if (error || !movieData) {
    return (
      <Box>
        <Navbar />
        <Error
          height="100vh"
          bg="var(--primary-background-color)"
          msg={error || "Movie not found"}
        />
      </Box>
    );
  }

  const movieTitle = movieData.name || movieData.title;
  const synopsis = movieData.description || movieData.synopsis || "";
  const truncatedSynopsis =
    synopsis.length > 400 ? synopsis.slice(0, 400) + "..." : synopsis;

  return (
    <Box bg="var(--primary-background-color)" minH="100vh">
      <Navbar />

      {/* HERO SECTION WITH BACKDROP */}
      <Box position="relative" pt={{ base: "70px", md: "84px" }}>
        {/* BLURRED BACKDROP */}
        <Box
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h={{ base: "500px", md: "650px" }}
          bgImage={`url(${
            movieData.coverImage ||
            movieData.backdropImage ||
            movieData.posterImage
          })`}
          bgSize="cover"
          bgPosition="center"
          filter="blur(8px)"
          transform="scale(1.1)"
          zIndex="1"
        />

        {/* GRADIENT OVERLAY */}
        <Box
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h={{ base: "500px", md: "650px" }}
          bgGradient="linear(to-b, rgba(12,12,12,0.3) 0%, rgba(12,12,12,0.7) 50%, var(--primary-background-color) 100%)"
          zIndex="2"
        />

        {/* CONTENT */}
        <Box
          position="relative"
          zIndex="3"
          maxW={{
            base: "95%",
            xl: "85%",
            "2xl": "container.xl",
          }}
          mx="auto"
          py={{ base: "32px", md: "48px" }}
        >
          {/* BACK BUTTON */}
          <IconButton
            as={Link}
            to="/movies"
            aria-label="Back to movies"
            size="md"
            mb="24px"
            bg="rgba(28, 28, 28, 0.8)"
            backdropFilter="blur(10px)"
            border="1px solid rgba(255, 255, 255, 0.1)"
            color="var(--text-color)"
            borderRadius="50%"
            w="44px"
            h="44px"
            _hover={{
              bg: "var(--primary-color)",
              borderColor: "var(--primary-color)",
            }}
            transition="all 0.2s ease"
          >
            <ChevronLeft size={20} />
          </IconButton>

          {/* MAIN CONTENT GRID */}
          <Grid
            templateColumns={{ base: "1fr", md: "280px 1fr" }}
            gap={{ base: "24px", md: "40px" }}
          >
            {/* LEFT - POSTER */}
            <Box>
              <AspectRatio
                ratio={2 / 3}
                w="100%"
                maxW={{ base: "200px", md: "280px" }}
                mx={{ base: "auto", md: "0" }}
              >
                <Image
                  src={movieData.posterImage}
                  alt={movieTitle}
                  borderRadius="8px"
                  objectFit="cover"
                  border="2px solid rgba(255, 255, 255, 0.1)"
                  boxShadow="0 20px 25px -5px rgba(0, 0, 0, 0.7)"
                />
              </AspectRatio>

              {/* STATUS BADGE ON POSTER */}
              {movieData.status && (
                <Badge
                  position="absolute"
                  top="12px"
                  left="12px"
                  bg={
                    movieData.status.toLowerCase().includes("released")
                      ? "var(--secondary-color)"
                      : "var(--accent-color)"
                  }
                  color="var(--text-color)"
                  fontSize="11px"
                  fontWeight="700"
                  px="12px"
                  py="6px"
                  borderRadius="4px"
                  textTransform="uppercase"
                >
                  {movieData.status}
                </Badge>
              )}
            </Box>

            {/* RIGHT - MOVIE INFO */}
            <VStack align="stretch" spacing="24px">
              {/* TITLE & BADGES */}
              <Box>
                <Heading
                  as="h1"
                  fontSize={{ base: "32px", md: "40px", lg: "48px" }}
                  fontWeight="700"
                  color="var(--text-color)"
                  mb="12px"
                  lineHeight="1.1"
                >
                  {movieTitle}
                </Heading>

                {movieData.originalTitle &&
                  movieData.originalTitle !== movieTitle && (
                    <Text
                      fontSize="16px"
                      color="var(--text-secondary)"
                      mb="16px"
                      fontStyle="italic"
                    >
                      {movieData.originalTitle}
                    </Text>
                  )}

                {/* METADATA BADGES */}
                <HStack spacing="8px" flexWrap="wrap">
                  {movieData.quality && (
                    <Badge
                      bg="var(--secondary-color)"
                      color="var(--text-color)"
                      fontSize="12px"
                      fontWeight="600"
                      px="12px"
                      py="6px"
                      borderRadius="4px"
                    >
                      {movieData.quality}
                    </Badge>
                  )}
                  {movieData.type && (
                    <Badge
                      bg="var(--accent-color)"
                      color="var(--text-color)"
                      fontSize="12px"
                      fontWeight="600"
                      px="12px"
                      py="6px"
                      borderRadius="4px"
                    >
                      {movieData.type}
                    </Badge>
                  )}
                  {movieData.rating && (
                    <Badge
                      bg="rgba(255, 255, 255, 0.1)"
                      color="var(--text-color)"
                      fontSize="12px"
                      fontWeight="600"
                      px="12px"
                      py="6px"
                      borderRadius="4px"
                    >
                      {movieData.rating}
                    </Badge>
                  )}
                </HStack>
              </Box>

              {/* ACTION BUTTONS */}
              <HStack spacing="12px" flexWrap="wrap">
                <Button
                  as={Link}
                  to={`/watch-movie/${providerEpisodes[0]?.episodeId}`}
                  size="lg"
                  bg="var(--primary-color)"
                  color="var(--text-color)"
                  h="52px"
                  px="32px"
                  fontSize="15px"
                  fontWeight="600"
                  borderRadius="8px"
                  _hover={{
                    filter: "brightness(110%)",
                    transform: "scale(1.02)",
                  }}
                  transition="all 0.2s ease"
                >
                  <Play size={18} />
                  Watch Now
                </Button>

                <Button
                  size="lg"
                  bg="transparent"
                  color="var(--text-color)"
                  border="2px solid"
                  borderColor="rgba(255, 255, 255, 0.3)"
                  h="52px"
                  px="32px"
                  fontSize="15px"
                  fontWeight="600"
                  borderRadius="8px"
                  _hover={{
                    borderColor: "var(--text-color)",
                    bg: "rgba(255, 255, 255, 0.05)",
                  }}
                  transition="all 0.2s ease"
                >
                  <Plus size={18} />
                  My List
                </Button>

                <IconButton
                  aria-label="Share"
                  size="lg"
                  bg="transparent"
                  color="var(--text-color)"
                  border="2px solid"
                  borderColor="rgba(255, 255, 255, 0.3)"
                  w="52px"
                  h="52px"
                  borderRadius="8px"
                  _hover={{
                    borderColor: "var(--text-color)",
                    bg: "rgba(255, 255, 255, 0.05)",
                  }}
                  transition="all 0.2s ease"
                >
                  <Share2 size={18} />
                </IconButton>
              </HStack>

              {/* RATING */}
              {movieData.score && (
                <Flex alignItems="center" gap="12px">
                  <HStack gap="4px">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        fill={
                          i < Math.floor(parseFloat(movieData.score) / 2)
                            ? "var(--secondary-color)"
                            : "none"
                        }
                        color={
                          i < Math.floor(parseFloat(movieData.score) / 2)
                            ? "var(--secondary-color)"
                            : "rgba(255, 255, 255, 0.2)"
                        }
                      />
                    ))}
                  </HStack>
                  <Text
                    fontSize="18px"
                    fontWeight="700"
                    color="var(--text-color)"
                  >
                    {(parseFloat(movieData.score) / 2).toFixed(1)}/5
                  </Text>
                  <Text fontSize="14px" color="var(--text-secondary)">
                    ({movieData.score}/10)
                  </Text>
                </Flex>
              )}

              {/* SYNOPSIS */}
              <Box
                bg="rgba(28, 28, 28, 0.6)"
                backdropFilter="blur(10px)"
                borderRadius="12px"
                p={{ base: "20px", md: "32px" }}
                border="1px solid rgba(255, 255, 255, 0.05)"
              >
                <Heading
                  as="h3"
                  fontSize="18px"
                  fontWeight="600"
                  color="var(--text-color)"
                  mb="12px"
                >
                  Synopsis
                </Heading>
                <Text
                  fontSize="15px"
                  lineHeight="1.8"
                  color="var(--text-secondary)"
                  mb={synopsis.length > 400 ? "12px" : "0"}
                >
                  {showFullSynopsis ? synopsis : truncatedSynopsis}
                </Text>
                {synopsis.length > 400 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    color="var(--link-color)"
                    onClick={() => setShowFullSynopsis(!showFullSynopsis)}
                    _hover={{
                      color: "var(--link-hover-color)",
                      bg: "transparent",
                    }}
                  >
                    {showFullSynopsis ? "Show Less" : "Read More"}
                  </Button>
                )}
              </Box>
            </VStack>
          </Grid>
        </Box>
      </Box>

      {/* MOVIE DETAILS SECTION */}
      <Box
        maxW={{
          base: "95%",
          xl: "85%",
          "2xl": "container.xl",
        }}
        mx="auto"
        py={{ base: "32px", md: "48px" }}
      >
        {/* DETAILS GRID */}
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
          gap="16px"
          mb={{ base: "32px", md: "48px" }}
        >
          {/* Release Date */}
          {movieData.releaseDate && (
            <DetailCard
              icon={<Calendar size={20} color="var(--accent-color)" />}
              label="Release Date"
              value={movieData.releaseDate}
            />
          )}

          {/* Duration */}
          {movieData.duration && (
            <DetailCard
              icon={<Clock size={20} color="var(--accent-color)" />}
              label="Duration"
              value={movieData.duration}
            />
          )}

          {/* Type */}
          {movieData.type && (
            <DetailCard
              icon={<Film size={20} color="var(--accent-color)" />}
              label="Type"
              value={movieData.type}
            />
          )}

          {/* Language */}
          {movieData.language && (
            <DetailCard
              icon={<Globe size={20} color="var(--accent-color)" />}
              label="Language"
              value={movieData.language}
            />
          )}

          {/* Production */}
          {movieData.production && (
            <DetailCard
              icon={<Film size={20} color="var(--accent-color)" />}
              label="Production"
              value={movieData.production}
            />
          )}

          {/* Rating */}
          {movieData.score && (
            <DetailCard
              icon={<Award size={20} color="var(--secondary-color)" />}
              label="Rating"
              value={`${movieData.score}/10`}
            />
          )}
        </Grid>

        {/* CAST & CREW */}
        {(movieData.cast || movieData.director) && (
          <Box
            bg="var(--card-background-color)"
            borderRadius="12px"
            p={{ base: "20px", md: "32px" }}
            border="1px solid rgba(255, 255, 255, 0.05)"
            mb={{ base: "32px", md: "48px" }}
          >
            <Flex alignItems="center" gap="12px" mb="20px">
              <Users size={24} color="var(--primary-color)" />
              <Heading
                as="h3"
                fontSize="20px"
                fontWeight="700"
                color="var(--text-color)"
              >
                Cast & Crew
              </Heading>
            </Flex>

            <Grid
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
              gap="16px"
            >
              {movieData.director && (
                <Box>
                  <Text
                    fontSize="13px"
                    fontWeight="600"
                    color="var(--text-secondary)"
                    mb="4px"
                  >
                    Director
                  </Text>
                  <Text
                    fontSize="15px"
                    fontWeight="500"
                    color="var(--text-color)"
                  >
                    {movieData.director}
                  </Text>
                </Box>
              )}

              {movieData.cast && (
                <Box>
                  <Text
                    fontSize="13px"
                    fontWeight="600"
                    color="var(--text-secondary)"
                    mb="4px"
                  >
                    Cast
                  </Text>
                  <Text
                    fontSize="15px"
                    fontWeight="500"
                    color="var(--text-color)"
                  >
                    {Array.isArray(movieData.cast)
                      ? movieData.cast.slice(0, 5).join(", ")
                      : movieData.cast}
                  </Text>
                </Box>
              )}
            </Grid>
          </Box>
        )}

        {/* GENRES */}
        {movieData.genres && movieData.genres.length > 0 && (
          <Box
            bg="var(--card-background-color)"
            borderRadius="12px"
            p={{ base: "20px", md: "32px" }}
            border="1px solid rgba(255, 255, 255, 0.05)"
            mb={{ base: "32px", md: "48px" }}
          >
            <Heading
              as="h3"
              fontSize="18px"
              fontWeight="600"
              color="var(--text-color)"
              mb="16px"
            >
              Genres
            </Heading>
            <Flex gap="12px" flexWrap="wrap">
              {movieData.genres.map((genre) => (
                <Badge
                  key={genre}
                  as={Link}
                  to={`/movies/genre/${genre
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  bg="rgba(99, 102, 241, 0.15)"
                  border="1px solid var(--accent-color)"
                  color="var(--accent-color)"
                  fontSize="13px"
                  fontWeight="500"
                  px="16px"
                  py="8px"
                  borderRadius="20px"
                  cursor="pointer"
                  _hover={{
                    bg: "var(--accent-color)",
                    color: "var(--text-color)",
                    transform: "scale(1.05)",
                  }}
                  transition="all 0.2s ease"
                >
                  {genre}
                </Badge>
              ))}
            </Flex>
          </Box>
        )}

        {/* SIMILAR MOVIES */}
        {recommendedMovies.length > 0 && (
          <Box>
            <Flex justifyContent="space-between" alignItems="center" mb="24px">
              <Heading
                fontSize={{ base: "20px", md: "24px" }}
                fontWeight="700"
                color="var(--text-color)"
              >
                Similar Movies
              </Heading>
              <Button
                variant="ghost"
                size="sm"
                color="var(--link-color)"
                _hover={{
                  color: "var(--link-hover-color)",
                  bg: "transparent",
                }}
              >
                View All
              </Button>
            </Flex>
            <MovieCarousel
              movies={recommendedMovies}
              uniqueId="recommended-movies"
              isLoading={loading}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

// DETAIL CARD COMPONENT
const DetailCard = ({ icon, label, value }) => {
  return (
    <Flex
      alignItems="center"
      gap="16px"
      bg="rgba(255, 255, 255, 0.03)"
      borderRadius="8px"
      p="16px"
      border="1px solid rgba(255, 255, 255, 0.05)"
    >
      <Box flexShrink="0">{icon}</Box>
      <Box flex="1">
        <Text
          fontSize="12px"
          fontWeight="600"
          color="var(--text-secondary)"
          mb="4px"
          textTransform="uppercase"
          letterSpacing="0.5px"
        >
          {label}
        </Text>
        <Text fontSize="15px" fontWeight="600" color="var(--text-color)">
          {value}
        </Text>
      </Box>
    </Flex>
  );
};

export default ViewMovie;
