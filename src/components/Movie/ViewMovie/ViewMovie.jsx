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
// components/Movies/ViewMovie.jsx (or MovieDetailPage.jsx)
// components/Movies/MovieDetailPage.jsx (or ViewMovie.jsx)
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
  Container,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useParams, Link as ReactRouterLink } from "react-router-dom";
import {
  ChevronLeft,
  Play,
  Plus,
  Share2,
  Star,
  Calendar,
  Clock,
  Film,
  Award,
  Users,
  Building2,
  Tag,
  Video,
} from "lucide-react";
import Navbar from "../../Navbar/Navbar";
import MovieCarousel from "../MovieCarousel/MovieCarousel";
import Loading from "../../ErrorPage/Loading";
import Error from "../../ErrorPage/Error";
import { cacheFetch } from "../../../utils/cacheFetch";

const ViewMovie = () => {
  const { id } = useParams();

  const [movieDetails, setMovieDetails] = useState(null);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullSynopsis, setShowFullSynopsis] = useState(false);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Fetch movie details
  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const cacheKey = `movieInfo_${id}`;
        const data = await cacheFetch(`api/flixhq/media/${id}`, { cacheKey });

        console.log("Movie Data:", data);

        setMovieDetails(data?.data);
        setRecommendedMovies(data?.recommended || []);

        document.title = `${data?.data?.name || "Movie"} - AniPulse`;
      } catch (err) {
        console.error("Failed to fetch movie details", err);
        setError("Failed to load movie details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  // Format release date
  const formattedDate = movieDetails?.releaseDate
    ? new Date(movieDetails.releaseDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown";

  const synopsis = movieDetails?.synopsis || movieDetails?.description || "";

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

  if (error || !movieDetails) {
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

  return (
    <Box bg="var(--primary-background-color)" minH="100vh">
      <Navbar />

      {/* ================= FULL-WIDTH HERO BANNER ================= */}
      <Box
        pos="relative"
        top={{ base: "70px", md: "73px", lg: "84px" }}
        height={{
          base: "100%",
          md: "calc(100dvh - 73px)",
          lg: "calc(100dvh - 84px)",
        }}
        overflow="hidden"
        mb="120px"
      >
        {/* BACKDROP IMAGE */}
        <Box
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          bgImage={`url(${
            movieDetails.coverImage || movieDetails.posterImage
          })`}
          bgSize="cover"
          bgPosition="center"
        />

        {/* GRADIENT OVERLAYS */}
        <Box
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          background="linear-gradient(to bottom, rgba(12, 12, 12, 0.3) 0%, rgba(12, 12, 12, 0.7) 50%, var(--primary-background-color) 100%)"
        />

        {/* CONTENT OVERLAY */}
        <Container
          maxW={{
            base: "95%",
            xl: "85%",
            "2xl": "container.xl",
          }}
          position="relative"
          h="100%"
          display="flex"
          flexDirection="column"
          justifyContent="flex-end"
          pb={{ base: "40px", md: "60px" }}
          pt={{ base: "100px", md: "120px" }}
        >
          {/* BACK BUTTON */}
          <IconButton
            as={ReactRouterLink}
            to="/movies"
            aria-label="Back to movies"
            position="absolute"
            top={{ base: "20px", md: "30px" }}
            left={{ base: "10px", md: "0" }}
            size="md"
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

          {/* HERO CONTENT */}
          <Flex
            direction={{ base: "column", lg: "row" }}
            gap={{ base: "24px", lg: "40px" }}
            alignItems={{ base: "center", lg: "flex-end" }}
          >
            {/* POSTER */}
            <Box flexShrink="0">
              <AspectRatio
                ratio={2 / 3}
                w={{ base: "200px", sm: "240px", md: "280px" }}
              >
                <Image
                  src={movieDetails.posterImage}
                  alt={movieDetails.name}
                  borderRadius="12px"
                  objectFit="cover"
                  boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.8)"
                  border="3px solid rgba(255, 255, 255, 0.1)"
                />
              </AspectRatio>
            </Box>

            {/* INFO */}
            <VStack
              align={{ base: "center", lg: "flex-start" }}
              spacing="20px"
              flex="1"
              textAlign={{ base: "center", lg: "left" }}
            >
              {/* BADGES */}
              <HStack
                spacing="8px"
                flexWrap="wrap"
                justify={{ base: "center", lg: "flex-start" }}
              >
                {movieDetails.quality && (
                  <Badge
                    bg="var(--secondary-color)"
                    color="var(--text-color)"
                    fontSize="12px"
                    fontWeight="700"
                    px="14px"
                    py="6px"
                    borderRadius="6px"
                    textTransform="uppercase"
                  >
                    {movieDetails.quality}
                  </Badge>
                )}
                {/* {movieDetails.score && (
                  <Badge
                    bg="rgba(255, 255, 255, 0.15)"
                    color="var(--text-color)"
                    fontSize="12px"
                    fontWeight="700"
                    px="14px"
                    py="6px"
                    borderRadius="6px"
                  >
                    {movieDetails.score}
                  </Badge>
                )} */}
              </HStack>

              {/* TITLE */}
              <Heading
                as="h1"
                fontSize={{ base: "36px", md: "52px", lg: "64px" }}
                fontWeight="700"
                color="var(--text-color)"
                lineHeight="1.2"
                lineClamp={2}
                maxW="900px"
              >
                {movieDetails.name}
              </Heading>

              {/* META INFO */}
              <HStack
                spacing="16px"
                fontSize={{ base: "14px", md: "16px" }}
                color="var(--text-secondary)"
                divider={<Text>•</Text>}
                flexWrap="wrap"
                justify={{ base: "center", lg: "flex-start" }}
              >
                {movieDetails.releaseDate && (
                  <Text fontWeight="500">
                    {new Date(movieDetails.releaseDate).getFullYear()}
                  </Text>
                )}
                <Text>•</Text>
                {movieDetails.duration && (
                  <Text fontWeight="500">{movieDetails.duration}</Text>
                )}
                <Text>•</Text>
                {movieDetails.score && (
                  <Flex alignItems="center" gap="6px">
                    <Star
                      size={16}
                      fill="var(--secondary-color)"
                      color="var(--secondary-color)"
                    />
                    <Text fontWeight="700" color="var(--text-color)">
                      {parseFloat(movieDetails.score).toFixed(1)}
                    </Text>
                  </Flex>
                )}
              </HStack>

              {/* GENRES */}
              {movieDetails.genre && movieDetails.genre.length > 0 && (
                <HStack
                  spacing="8px"
                  flexWrap="wrap"
                  justify={{ base: "center", lg: "flex-start" }}
                >
                  {movieDetails.genre.slice(0, 4).map((genre) => (
                    <Badge
                      key={genre}
                      bg="rgba(255, 255, 255, 0.1)"
                      color="var(--text-color)"
                      fontSize="13px"
                      fontWeight="500"
                      px="12px"
                      py="6px"
                      borderRadius="6px"
                    >
                      {genre}
                    </Badge>
                  ))}
                </HStack>
              )}

              {/* ACTION BUTTONS */}
              <HStack
                spacing="12px"
                pt="8px"
                flexWrap="wrap"
                justify={{ base: "center", lg: "flex-start" }}
              >
                <Button
                  as={ReactRouterLink}
                  to={`/watch-movie/${id}`}
                  size="lg"
                  bg="var(--primary-color)"
                  color="var(--text-color)"
                  leftIcon={<Play size={20} fill="currentColor" />}
                  h="56px"
                  px="40px"
                  fontSize="16px"
                  fontWeight="600"
                  borderRadius="8px"
                  _hover={{
                    filter: "brightness(110%)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 10px 20px rgba(225, 29, 72, 0.4)",
                  }}
                  transition="all 0.2s ease"
                >
                  Watch Now
                </Button>

                <IconButton
                  aria-label="Add to list"
                  size="lg"
                  bg="rgba(255, 255, 255, 0.1)"
                  backdropFilter="blur(10px)"
                  border="2px solid rgba(255, 255, 255, 0.2)"
                  color="var(--text-color)"
                  w="56px"
                  h="56px"
                  borderRadius="8px"
                  _hover={{
                    bg: "rgba(255, 255, 255, 0.15)",
                    borderColor: "var(--text-color)",
                    transform: "translateY(-2px)",
                  }}
                  transition="all 0.2s ease"
                >
                  <Plus size={22} />
                </IconButton>

                {movieDetails.trailer && (
                  <IconButton
                    aria-label="Play trailer"
                    size="lg"
                    bg="rgba(255, 255, 255, 0.1)"
                    backdropFilter="blur(10px)"
                    border="2px solid rgba(255, 255, 255, 0.2)"
                    color="var(--text-color)"
                    w="56px"
                    h="56px"
                    borderRadius="8px"
                    onClick={() => setTrailerOpen(true)}
                    _hover={{
                      bg: "rgba(255, 255, 255, 0.15)",
                      borderColor: "var(--text-color)",
                      transform: "translateY(-2px)",
                    }}
                    transition="all 0.2s ease"
                  >
                    <Video size={22} />
                  </IconButton>
                )}

                <IconButton
                  aria-label="Share"
                  size="lg"
                  bg="rgba(255, 255, 255, 0.1)"
                  backdropFilter="blur(10px)"
                  border="2px solid rgba(255, 255, 255, 0.2)"
                  color="var(--text-color)"
                  w="56px"
                  h="56px"
                  borderRadius="8px"
                  _hover={{
                    bg: "rgba(255, 255, 255, 0.15)",
                    borderColor: "var(--text-color)",
                    transform: "translateY(-2px)",
                  }}
                  transition="all 0.2s ease"
                >
                  <Share2 size={22} />
                </IconButton>
              </HStack>
            </VStack>
          </Flex>
        </Container>
      </Box>

      {/* ================= TABS NAVIGATION ================= */}
      <Box
        borderBottom="1px solid rgba(255, 255, 255, 0.05)"
        bg="rgba(12, 12, 12, 0.8)"
        backdropFilter="blur(20px)"
        position="sticky"
        top={{ base: "70px", md: "84px" }}
        zIndex="100"
      >
        <Container
          maxW={{
            base: "95%",
            xl: "85%",
            "2xl": "container.xl",
          }}
        >
          <HStack
            spacing="0"
            overflow="auto"
            css={{
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            <Button
              variant="ghost"
              h="56px"
              px="24px"
              borderRadius="0"
              color={
                activeTab === "overview"
                  ? "var(--text-color)"
                  : "var(--text-secondary)"
              }
              fontWeight="600"
              fontSize="15px"
              borderBottom="3px solid"
              borderColor={
                activeTab === "overview"
                  ? "var(--primary-color)"
                  : "transparent"
              }
              _hover={{
                color: "var(--text-color)",
                bg: "rgba(255, 255, 255, 0.02)",
              }}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </Button>
            <Button
              variant="ghost"
              h="56px"
              px="24px"
              borderRadius="0"
              color={
                activeTab === "details"
                  ? "var(--text-color)"
                  : "var(--text-secondary)"
              }
              fontWeight="600"
              fontSize="15px"
              borderBottom="3px solid"
              borderColor={
                activeTab === "details" ? "var(--primary-color)" : "transparent"
              }
              _hover={{
                color: "var(--text-color)",
                bg: "rgba(255, 255, 255, 0.02)",
              }}
              onClick={() => setActiveTab("details")}
            >
              Details
            </Button>
            {recommendedMovies.length > 0 && (
              <Button
                variant="ghost"
                h="56px"
                px="24px"
                borderRadius="0"
                color={
                  activeTab === "similar"
                    ? "var(--text-color)"
                    : "var(--text-secondary)"
                }
                fontWeight="600"
                fontSize="15px"
                borderBottom="3px solid"
                borderColor={
                  activeTab === "similar"
                    ? "var(--primary-color)"
                    : "transparent"
                }
                _hover={{
                  color: "var(--text-color)",
                  bg: "rgba(255, 255, 255, 0.02)",
                }}
                onClick={() => setActiveTab("similar")}
              >
                More Like This
              </Button>
            )}
          </HStack>
        </Container>
      </Box>

      {/* ================= TAB CONTENT ================= */}
      <Container
        maxW={{
          base: "95%",
          xl: "85%",
          "2xl": "container.xl",
        }}
        py={{ base: "40px", md: "60px" }}
      >
        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap="40px">
            {/* LEFT - SYNOPSIS */}
            <VStack align="stretch" spacing="32px">
              {/* Synopsis */}
              <Box>
                <Heading
                  fontSize="24px"
                  fontWeight="700"
                  color="var(--text-color)"
                  mb="16px"
                >
                  Synopsis
                </Heading>
                <Text
                  fontSize="16px"
                  lineHeight="1.8"
                  color="var(--text-secondary)"
                  mb={synopsis.length > 400 ? "12px" : "0"}
                >
                  {showFullSynopsis
                    ? synopsis
                    : synopsis.length > 400
                    ? synopsis.slice(0, 400) + "..."
                    : synopsis}
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

              {/* Cast */}
              {movieDetails.casts && movieDetails.casts.length > 0 && (
                <Box>
                  <Flex alignItems="center" gap="12px" mb="16px">
                    <Users size={22} color="var(--primary-color)" />
                    <Heading
                      fontSize="20px"
                      fontWeight="700"
                      color="var(--text-color)"
                    >
                      Cast
                    </Heading>
                  </Flex>
                  <Text
                    fontSize="15px"
                    color="var(--text-secondary)"
                    lineHeight="1.7"
                  >
                    {movieDetails.casts.join(", ")}
                  </Text>
                </Box>
              )}
            </VStack>

            {/* RIGHT - QUICK INFO */}
            <VStack align="stretch" spacing="20px">
              <InfoItem
                icon={<Calendar size={18} />}
                label="Release Date"
                value={formattedDate}
              />
              <InfoItem
                icon={<Clock size={18} />}
                label="Duration"
                value={movieDetails.duration || "Unknown"}
              />
              {movieDetails.score && (
                <InfoItem
                  icon={<Award size={18} />}
                  label="Rating"
                  value={`${movieDetails.score}/10 (${(
                    parseFloat(movieDetails.score) / 2
                  ).toFixed(1)}/5)`}
                />
              )}
              {movieDetails.type && (
                <InfoItem
                  icon={<Film size={18} />}
                  label="Type"
                  value={movieDetails.type}
                />
              )}
              {movieDetails.production &&
                movieDetails.production.length > 0 && (
                  <InfoItem
                    icon={<Building2 size={18} />}
                    label="Production"
                    value={movieDetails.production.join(", ")}
                  />
                )}
            </VStack>
          </Grid>
        )}

        {/* DETAILS TAB */}
        {activeTab === "details" && (
          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap="16px"
            maxW="1200px"
          >
            <DetailCard
              icon={<Calendar size={20} color="var(--accent-color)" />}
              label="Release Date"
              value={formattedDate}
            />
            <DetailCard
              icon={<Clock size={20} color="var(--accent-color)" />}
              label="Duration"
              value={movieDetails.duration || "Unknown"}
            />
            <DetailCard
              icon={<Film size={20} color="var(--accent-color)" />}
              label="Type"
              value={movieDetails.type || "Movie"}
            />
            {movieDetails.score && (
              <DetailCard
                icon={<Award size={20} color="var(--secondary-color)" />}
                label="Rating"
                value={`${movieDetails.score}/10`}
              />
            )}
            {movieDetails.quality && (
              <DetailCard
                icon={<Film size={20} color="var(--secondary-color)" />}
                label="Quality"
                value={movieDetails.quality}
              />
            )}
            {movieDetails.language && (
              <DetailCard
                icon={<Film size={20} color="var(--accent-color)" />}
                label="Language"
                value={movieDetails.language}
              />
            )}
            {movieDetails.genre && movieDetails.genre.length > 0 && (
              <Box
                gridColumn={{ base: "1", md: "1 / -1" }}
                bg="rgba(255, 255, 255, 0.03)"
                borderRadius="12px"
                p="20px"
                border="1px solid rgba(255, 255, 255, 0.05)"
              >
                <Flex alignItems="center" gap="12px" mb="12px">
                  <Tag size={20} color="var(--accent-color)" />
                  <Heading
                    fontSize="16px"
                    fontWeight="600"
                    color="var(--text-color)"
                  >
                    Genres
                  </Heading>
                </Flex>
                <Flex gap="8px" flexWrap="wrap">
                  {movieDetails.genre.map((genre) => (
                    <Badge
                      key={genre}
                      as={ReactRouterLink}
                      to={`/movies/genre/${genre
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      bg="rgba(99, 102, 241, 0.15)"
                      border="1px solid var(--accent-color)"
                      color="var(--accent-color)"
                      fontSize="13px"
                      fontWeight="500"
                      px="14px"
                      py="6px"
                      borderRadius="20px"
                      cursor="pointer"
                      _hover={{
                        bg: "var(--accent-color)",
                        color: "var(--text-color)",
                      }}
                    >
                      {genre}
                    </Badge>
                  ))}
                </Flex>
              </Box>
            )}
            {movieDetails.production && movieDetails.production.length > 0 && (
              <Box
                gridColumn={{ base: "1", md: "1 / -1" }}
                bg="rgba(255, 255, 255, 0.03)"
                borderRadius="12px"
                p="20px"
                border="1px solid rgba(255, 255, 255, 0.05)"
              >
                <Flex alignItems="center" gap="12px" mb="12px">
                  <Building2 size={20} color="var(--accent-color)" />
                  <Heading
                    fontSize="16px"
                    fontWeight="600"
                    color="var(--text-color)"
                  >
                    Production Companies
                  </Heading>
                </Flex>
                <Flex gap="8px" flexWrap="wrap">
                  {movieDetails.production.map((prod) => (
                    <Badge
                      key={prod}
                      bg="rgba(99, 102, 241, 0.15)"
                      border="1px solid var(--accent-color)"
                      color="var(--accent-color)"
                      fontSize="13px"
                      fontWeight="500"
                      px="14px"
                      py="6px"
                      borderRadius="20px"
                    >
                      {prod}
                    </Badge>
                  ))}
                </Flex>
              </Box>
            )}
          </Grid>
        )}

        {/* SIMILAR MOVIES TAB */}
        {activeTab === "similar" && recommendedMovies.length > 0 && (
          <Box>
            <Heading
              fontSize="24px"
              fontWeight="700"
              color="var(--text-color)"
              mb="24px"
            >
              Similar Movies
            </Heading>
            <MovieCarousel movies={recommendedMovies} uniqueId="recommended" />
          </Box>
        )}
      </Container>

      {/* ================= TRAILER MODAL ================= */}
      {trailerOpen && movieDetails.trailer && (
        <Box
          position="fixed"
          top="0"
          left="0"
          w="100vw"
          h="100vh"
          bg="rgba(0, 0, 0, 0.95)"
          backdropFilter="blur(10px)"
          zIndex="9999"
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={() => setTrailerOpen(false)}
        >
          <Box
            w={{ base: "95%", md: "85%", lg: "1000px" }}
            maxW="1200px"
            onClick={(e) => e.stopPropagation()}
          >
            <Flex justifyContent="space-between" alignItems="center" mb="16px">
              <Heading fontSize="20px" color="var(--text-color)">
                {movieDetails.name} - Trailer
              </Heading>
              <IconButton
                aria-label="Close"
                size="md"
                variant="ghost"
                color="var(--text-color)"
                onClick={() => setTrailerOpen(false)}
                _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}
              >
                <ChevronLeft size={20} />
              </IconButton>
            </Flex>
            <AspectRatio ratio={16 / 9} borderRadius="12px" overflow="hidden">
              <iframe
                src={movieDetails.trailer}
                title={`${movieDetails.name} Trailer`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </AspectRatio>
          </Box>
        </Box>
      )}
    </Box>
  );
};

// ================= COMPONENTS =================

const InfoItem = ({ icon, label, value }) => (
  <Flex gap="12px" alignItems="flex-start">
    <Box color="var(--text-secondary)" mt="2px">
      {icon}
    </Box>
    <Box flex="1">
      <Text
        fontSize="13px"
        color="var(--text-secondary)"
        mb="4px"
        fontWeight="600"
      >
        {label}
      </Text>
      <Text fontSize="15px" color="var(--text-color)" fontWeight="500">
        {value}
      </Text>
    </Box>
  </Flex>
);

const DetailCard = ({ icon, label, value }) => (
  <Box
    bg="rgba(255, 255, 255, 0.03)"
    borderRadius="12px"
    p="20px"
    border="1px solid rgba(255, 255, 255, 0.05)"
    transition="all 0.2s ease"
    _hover={{
      bg: "rgba(255, 255, 255, 0.05)",
      borderColor: "rgba(255, 255, 255, 0.1)",
    }}
  >
    <Flex alignItems="center" gap="12px" mb="8px">
      {icon}
      <Text
        fontSize="13px"
        fontWeight="600"
        color="var(--text-secondary)"
        textTransform="uppercase"
        letterSpacing="0.5px"
      >
        {label}
      </Text>
    </Flex>
    <Text fontSize="16px" fontWeight="600" color="var(--text-color)">
      {value || "Unknown"}
    </Text>
  </Box>
);

export default ViewMovie;
