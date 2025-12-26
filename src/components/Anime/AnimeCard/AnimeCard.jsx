import {
  Box,
  Image,
  Text,
  Badge,
  LinkBox,
  LinkOverlay,
  Flex,
  HStack,
  AspectRatio,
  IconButton,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { useState } from "react";
import { Info, Play, Plus } from "lucide-react";

const AnimeCard = ({ anime }) => {
  const {
    id,
    posterImage,
    episodes,
    name,
    type,
    totalEpisodes,
    releaseDate,
    watchProgress, // Optional: percentage of episodes watched (0-100)
  } = anime;

  const [isHovered, setIsHovered] = useState(false);
  return (
    <LinkBox
      w="100%"
      borderRadius="8px"
      overflow="hidden"
      bg="var(--card-background-color)"
      cursor="pointer"
      transition="all 0.3s ease"
      position="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      _hover={{
        transform: "scale(1.02)",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.7)",
        zIndex: 10,
      }}
      shadow="lg"
    >
      {/* IMAGE CONTAINER */}
      <Box position="relative" overflow="hidden">
        <AspectRatio ratio={4 / 4}>
          <Image
            src={posterImage}
            alt={name}
            objectFit="cover"
            bg="var(--primary-background-color)"
            transition="transform 0.3s ease"
            _groupHover={{
              transform: "scale(1.1)",
            }}
            sx={{
              filter: isHovered ? "brightness(110%)" : "brightness(100%)",
            }}
          />
        </AspectRatio>

        {/* TOP-RIGHT BADGES */}
        <Box
          position="absolute"
          top="8px"
          right="8px"
          display="flex"
          flexDirection="column"
          gap="6px"
        >
          {/* SUB Badge */}
          {episodes?.sub && (
            <Badge
              bg="rgba(99, 102, 241, 0.9)"
              color="var(--text-color)"
              fontSize={{ base: "10px", md: "11px" }}
              fontWeight="600"
              px="8px"
              py="4px"
              borderRadius="4px"
              boxShadow="0 2px 8px rgba(0, 0, 0, 0.4)"
            >
              SUB
            </Badge>
          )}

          {/* DUB Badge */}
          {episodes?.dub && (
            <Badge
              bg="rgba(99, 102, 241, 0.9)"
              color="var(--text-color)"
              fontSize={{ base: "10px", md: "11px" }}
              fontWeight="600"
              px="8px"
              py="4px"
              borderRadius="4px"
              boxShadow="0 2px 8px rgba(0, 0, 0, 0.4)"
            >
              DUB
            </Badge>
          )}
        </Box>

        {/* WATCH PROGRESS BAR (if user has started watching) */}
        {watchProgress > 0 && (
          <Box
            position="absolute"
            bottom="0"
            left="0"
            w="100%"
            h="4px"
            bg="rgba(255, 255, 255, 0.2)"
          >
            <Box
              h="100%"
              w={`${watchProgress}%`}
              bg="var(--primary-color)"
              transition="width 0.3s ease"
            />
          </Box>
        )}

        {/* HOVER OVERLAY WITH QUICK ACTIONS */}
        <Box
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          bg="linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.9) 100%)"
          opacity={isHovered ? 1 : 0}
          transition="opacity 0.3s ease"
          display="flex"
          flexDirection="column"
          justifyContent="flex-end"
          p="16px"
        >
          {/* Quick Action Buttons */}
          <HStack gap="8px" mb="12px">
            {/* Play Button */}
            <IconButton
              as={ReactRouterLink}
              to={`/anime/${id}`}
              aria-label="Play"
              size="sm"
              borderRadius="50%"
              bg="var(--primary-color)"
              color="var(--text-color)"
              _hover={{
                bg: "var(--link-hover-color)",
                transform: "scale(1.1)",
              }}
              transition="all 0.2s ease"
            >
              <Play size="12px" />
            </IconButton>

            {/* Add to List Button */}
            <IconButton
              aria-label="Add to list"
              size="sm"
              borderRadius="50%"
              bg="rgba(28, 28, 28, 0.8)"
              border="1px solid rgba(255, 255, 255, 0.2)"
              color="var(--text-color)"
              _hover={{
                borderColor: "var(--text-color)",
                transform: "scale(1.1)",
              }}
              transition="all 0.2s ease"
            >
              <Plus size="12px" />
            </IconButton>

            {/* Info Button */}
            <IconButton
              as={ReactRouterLink}
              to={`/anime/${id}`}
              aria-label="More info"
              size="sm"
              borderRadius="50%"
              bg="rgba(28, 28, 28, 0.8)"
              border="1px solid rgba(255, 255, 255, 0.2)"
              color="var(--text-color)"
              _hover={{
                borderColor: "var(--text-color)",
                transform: "scale(1.1)",
              }}
              transition="all 0.2s ease"
            >
              <Info size="12px" />
            </IconButton>
          </HStack>

          {/* Additional Info on Hover */}
          {totalEpisodes && (
            <Text
              color="var(--text-secondary)"
              fontSize="12px"
              fontWeight="500"
            >
              {totalEpisodes} Episodes
            </Text>
          )}
        </Box>
      </Box>

      {/* CARD INFO SECTION */}
      <Box p="12px" bg="var(--card-background-color)">
        {/* TITLE */}
        <LinkOverlay as={ReactRouterLink} to={`/anime/${id}`}>
          <Text
            fontSize={{ base: "13px", md: "14px" }}
            fontWeight="600"
            lineHeight="1.3"
            color="var(--text-color)"
            lineClamp={2}
            mb="8px"
            minH="36px"
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
          fontSize="12px"
          color="var(--text-secondary)"
          fontWeight="400"
        >
          {releaseDate && (
            <>
              <Text>{releaseDate}</Text>
              {type && <Text>•</Text>}
            </>
          )}
          {type && <Text>{type}</Text>}
        </Flex>

        {/* EPISODE INFO (if not shown in badges) */}
        {!isHovered && episodes && (
          <Flex
            mt="6px"
            gap="6px"
            fontSize="11px"
            color="var(--text-secondary)"
          >
            {episodes.sub && <Text>Sub: {episodes.sub}</Text>}
            {episodes.dub && episodes.sub && <Text>•</Text>}
            {episodes.dub && <Text>Dub: {episodes.dub}</Text>}
          </Flex>
        )}
      </Box>
    </LinkBox>
  );
};

export default AnimeCard;
