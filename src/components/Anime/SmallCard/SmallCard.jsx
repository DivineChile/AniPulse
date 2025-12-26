// import {
//   LinkBox,
//   Card,
//   Image,
//   LinkOverlay,
//   Box,
//   Flex,
//   HStack,
//   Badge,
//   Text,
// } from "@chakra-ui/react";
// import { Link as ReactRouterLink } from "react-router-dom";

// const SmallCard = ({ result, page }) => {
//   const resultId = result.id;
//   const resultImg = result.posterImage;
//   const resultTitle = result.name;
//   const resultType = result.type;
//   const episodes = result.episodes;

//   return (
//     <LinkBox
//       key={resultId}
//       _hover={{
//         transform: "scale(1.01)",
//       }}
//       transition={"all 0.2s ease-in-out"}
//     >
//       <Card.Root
//         flexDirection="row"
//         bg="var(--card-background-color)"
//         overflow="hidden"
//       >
//         <Image
//           objectFit="cover"
//           src={resultImg}
//           bg="#000000ff"
//           w={{ base: "60.94px", md: "75px", lg: "85px" }}
//           alt={resultId}
//         />
//         <Box>
//           <Card.Body w="100%">
//             <LinkOverlay asChild>
//               <ReactRouterLink to={`/anime/${resultId}`}>
//                 <Card.Title
//                   mb="2"
//                   fontSize={{
//                     base: "12.81px",
//                     sm: "13px",
//                     md: "14.77px",
//                     lg: "16.63px",
//                   }}
//                   lineHeight={{ base: "18px", md: "22.5px" }}
//                   letterSpacing="0.5px"
//                   fontFamily="var(--font-family)"
//                   lineClamp={1}
//                   color="var(--text-color)"
//                 >
//                   {resultTitle}
//                 </Card.Title>
//               </ReactRouterLink>
//             </LinkOverlay>
//             <Flex alignItems="center" w="100%" gap={3}>
//               {episodes.sub && (
//                 <HStack>
//                   {episodes.sub && (
//                     <Badge
//                       variant="solid"
//                       // colorPalette="blackAlpha"
//                       size={{ base: "xs", md: "sm" }}
//                       // color="var(--primary-background-color)"
//                     >
//                       SUB {episodes.sub}
//                     </Badge>
//                   )}
//                   {episodes.dub && (
//                     <Badge
//                       variant="outline"
//                       size={{ base: "xs", md: "sm" }}
//                       colorPalette="blackAlpha"
//                     >
//                       DUB {episodes.dub}
//                     </Badge>
//                   )}
//                 </HStack>
//               )}
//               <Text
//                 fontSize={{
//                   base: "12.81px",
//                   sm: "13px",
//                 }}
//                 color="var(--text-secondary)"
//                 lineHeight={{ base: "18px", md: "22.5px" }}
//               >
//                 {resultType}
//               </Text>
//             </Flex>
//           </Card.Body>
//         </Box>
//       </Card.Root>
//     </LinkBox>
//   );
// };

// export default SmallCard;

import {
  LinkBox,
  LinkOverlay,
  Box,
  Flex,
  HStack,
  Badge,
  Text,
  Image,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { useState } from "react";

const SmallCard = ({ result }) => {
  const {
    id,
    posterImage,
    name,
    type,
    episodes,
    releaseDate,
    quality,
    totalEpisodes,
  } = result;

  const [isHovered, setIsHovered] = useState(false);

  return (
    <LinkBox
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      transition="all 0.3s ease"
      _hover={{
        transform: "scale(1.02)",
        cursor: "pointer",
      }}
      shadow="lg"
    >
      <Flex
        bg="var(--card-background-color)"
        borderRadius="8px"
        overflow="hidden"
        border="1px solid rgba(255, 255, 255, 0.05)"
        h={{ base: "100px", md: "120px" }}
        position="relative"
        transition="all 0.3s ease"
        _hover={{
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.6)",
          borderColor: "rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* IMAGE SECTION */}
        <Box
          position="relative"
          w={{ base: "70px", md: "80px" }}
          minW={{ base: "70px", md: "80px" }}
          overflow="hidden"
        >
          <Image
            src={posterImage}
            alt={name}
            objectFit="cover"
            w="100%"
            h="100%"
            bg="var(--primary-background-color)"
            transition="transform 0.3s ease"
            transform={isHovered ? "scale(1.1)" : "scale(1)"}
            filter={isHovered ? "brightness(110%)" : "brightness(100%)"}
          />

          {/* OVERLAY BADGES ON IMAGE */}
          <Box
            position="absolute"
            top="6px"
            right="6px"
            display="flex"
            flexDirection="column"
            gap="4px"
          >
            {/* QUALITY Badge */}
            {quality && (
              <Badge
                bg="rgba(16, 185, 129, 0.9)"
                color="var(--text-color)"
                fontSize="9px"
                fontWeight="700"
                px="6px"
                py="2px"
                borderRadius="3px"
                textTransform="uppercase"
                boxShadow="0 2px 4px rgba(0, 0, 0, 0.4)"
              >
                {quality}
              </Badge>
            )}
          </Box>
        </Box>

        {/* CONTENT SECTION */}
        <Flex
          flex="1"
          flexDirection="column"
          justifyContent="center"
          p={{ base: "10px 12px", md: "12px 16px" }}
          overflow="hidden"
        >
          {/* TITLE */}
          <LinkOverlay as={ReactRouterLink} to={`/anime/${id}`}>
            <Text
              fontSize={{ base: "13px", md: "14px" }}
              fontWeight="600"
              lineHeight="1.3"
              color="var(--text-color)"
              lineClamp={2}
              mb="6px"
              _hover={{
                color: "var(--link-color)",
              }}
              transition="color 0.2s ease"
            >
              {name}
            </Text>
          </LinkOverlay>

          {/* METADATA ROW */}
          <Flex
            alignItems="center"
            gap="8px"
            flexWrap="wrap"
            fontSize="11px"
            color="var(--text-secondary)"
          >
            {/* TYPE */}
            {type && <Text fontWeight="500">{type}</Text>}

            {/* SEPARATOR */}
            {type && releaseDate && <Text>•</Text>}

            {/* RELEASE DATE */}
            {releaseDate && <Text>{releaseDate}</Text>}

            {/* SEPARATOR */}
            {(type || releaseDate) && totalEpisodes && <Text>•</Text>}

            {/* TOTAL EPISODES */}
            {totalEpisodes && <Text>{totalEpisodes} Eps</Text>}
          </Flex>

          {/* SUB/DUB BADGES */}
          {episodes && (episodes.sub || episodes.dub) && (
            <HStack gap="6px" mt="6px" flexWrap="wrap">
              {episodes.sub && (
                <Badge
                  bg="rgba(99, 102, 241, 0.15)"
                  border="1px solid var(--accent-color)"
                  color="var(--accent-color)"
                  fontSize="10px"
                  fontWeight="600"
                  px="8px"
                  py="2px"
                  borderRadius="3px"
                >
                  SUB {episodes.sub}
                </Badge>
              )}

              {episodes.dub && (
                <Badge
                  bg="rgba(99, 102, 241, 0.15)"
                  border="1px solid var(--accent-color)"
                  color="var(--accent-color)"
                  fontSize="10px"
                  fontWeight="600"
                  px="8px"
                  py="2px"
                  borderRadius="3px"
                >
                  DUB {episodes.dub}
                </Badge>
              )}
            </HStack>
          )}
        </Flex>

        {/* HOVER INDICATOR (Right Edge) */}
        <Box
          position="absolute"
          right="0"
          top="0"
          bottom="0"
          w="3px"
          bg="var(--primary-color)"
          opacity={isHovered ? 1 : 0}
          transition="opacity 0.3s ease"
        />
      </Flex>
    </LinkBox>
  );
};

export default SmallCard;
