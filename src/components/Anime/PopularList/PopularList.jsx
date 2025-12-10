// import {
//   Box,
//   Heading,
//   Grid,
//   GridItem,
//   Link as ChakraLink,
//   Skeleton,
//   SkeletonText,
//   HStack,
// } from "@chakra-ui/react";
// import { Link as ReactRouterLink } from "react-router-dom";
// import Error from "../../ErrorPage/Error";
// import "./style.css";
// import { useEffect, useState } from "react";

// import { BsInfoCircle } from "react-icons/bs";
// import Loading from "../../ErrorPage/Loading";
// import { Flame, Info } from "lucide-react";
// import { cacheFetch } from "../../../utils/cacheFetch";
// import AnimeCard from "../AnimeCard/AnimeCard";

// const PopularList = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [results, setResults] = useState([]);

//   const backup_api = "https://anime-api-production-bc3d.up.railway.app/";
//   const proxy = "https://cors-anywhere-aifwkw.fly.dev/";

//   const fetchPopularAnimes = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const data = await cacheFetch("api", { cacheKey: "homeData" }, true);
//       setResults(data?.results?.mostPopular || []);
//     } catch (err) {
//       setError("Failed to load data. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPopularAnimes();
//   }, []);

//   const truncatedResults = results?.length > 4 ? results?.slice(0, 5) : results;

//   return (
//     <Box bg="var(--primary-background-color)" pt="60px" pb="80px">
//       <Box
//         maxW={{
//           base: "90%",
//           sm: "95%",
//           xl: "85%",
//           "2xl": "container.xl",
//         }}
//         margin="auto"
//       >
//         <Box
//           display="flex"
//           gap="10px"
//           alignItems="center"
//           justifyContent={{ base: "center", md: "initial" }}
//         >
//           <Flame size={30} color="var(--primary-color)" />
//           <Heading
//             textTransform="capitalize"
//             color="var(--text-color)"
//             fontSize={{ base: "27.59px", lg: "32px", "2xl": "37.97px" }}
//             fontWeight="500"
//             lineHeight={{ base: "33px", lg: "38px", "2xl": "44px" }}
//             letterSpacing="1.5px"
//             fontFamily="var(--font-family)"
//             textAlign={{ base: "center", md: "start" }}
//           >
//             Popular Anime
//           </Heading>
//         </Box>

//         <Box my="30px">
//           <Grid
//             gridTemplateColumns={{
//               base: "repeat(2, 1fr)",
//               sm: "repeat(3, 1fr)",
//               md: "repeat(4, 1fr)",
//               lg: "repeat(5, 1fr)",
//             }}
//             gap="20px"
//             pos="relative"
//           >
//             {isLoading &&
//               [...Array(5)].map((_, index) => (
//                 <GridItem key={index}>
//                   <Skeleton
//                     h={{
//                       base: "276px",
//                       sm: "290.23px",
//                       md: "285px",
//                       lg: "290px",
//                       "2xl": "284px",
//                     }}
//                     w="100%"
//                     borderRadius="10px"
//                   />
//                 </GridItem>
//               ))}
//             {error && <Error msg={error} pos="absolute" />}
//             {!isLoading &&
//               !error &&
//               truncatedResults?.map((item, index) => {
//                 return <AnimeCard key={item.id} anime={item} />;
//               })}
//           </Grid>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default PopularList;

import { Box, Heading, Grid, GridItem, Skeleton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Flame } from "lucide-react";
import Error from "../../ErrorPage/Error";
import { cacheFetch } from "../../../utils/cacheFetch";
import AnimeCard from "../AnimeCard/AnimeCard";

const PopularList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);

  const fetchPopularAnimes = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await cacheFetch("api", { cacheKey: "homeData" }, true);
      setResults(data?.results?.mostPopular || []);
    } catch (err) {
      setError("Failed to load data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularAnimes();
  }, []);

  const truncated = results.length > 4 ? results.slice(0, 5) : results;

  return (
    <Box bg="var(--primary-background-color)" pt="60px" pb="80px">
      <Box
        maxW={{
          base: "90%",
          sm: "95%",
          xl: "85%",
          "2xl": "container.xl",
        }}
        mx="auto"
      >
        {/* Header */}
        <Box
          display="flex"
          gap="10px"
          alignItems="center"
          justifyContent={{ base: "center", md: "flex-start" }}
        >
          <Flame size={30} color="var(--primary-color)" />

          <Heading
            color="var(--text-color)"
            textTransform="capitalize"
            fontSize={{ base: "27.6px", lg: "32px", "2xl": "38px" }}
            fontWeight="500"
            lineHeight={{ base: "33px", lg: "38px", "2xl": "44px" }}
            letterSpacing="1.5px"
            fontFamily="var(--font-family)"
            textAlign={{ base: "center", md: "start" }}
          >
            Popular Anime
          </Heading>
        </Box>

        {/* Main Grid */}
        <Box my="30px">
          <Grid
            gridTemplateColumns={{
              base: "repeat(2, 1fr)",
              sm: "repeat(3, 1fr)",
              md: "repeat(4, 1fr)",
              lg: "repeat(5, 1fr)",
            }}
            gap="20px"
            position="relative"
          >
            {/* SKELETONS */}
            {isLoading &&
              [...Array(5)].map((_, i) => (
                <GridItem key={i}>
                  <Skeleton
                    h={{
                      base: "276px",
                      sm: "290px",
                      md: "285px",
                      lg: "290px",
                      "2xl": "284px",
                    }}
                    w="100%"
                    borderRadius="10px"
                  />
                </GridItem>
              ))}

            {/* ERROR */}
            {error && <Error msg={error} pos="absolute" />}

            {/* DATA */}
            {!isLoading &&
              !error &&
              truncated.map((item) => <AnimeCard key={item.id} anime={item} />)}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default PopularList;
