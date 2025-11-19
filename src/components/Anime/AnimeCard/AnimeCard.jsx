import {
  GridItem,
  Image,
  Link as ChakraLink,
  Card,
  HStack,
  Badge,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

const AnimeCard = ({ anime }) => {
  const { id, poster, tvInfo } = anime;

  const epLength =
    anime.title.length > 30 ? `${anime.title.slice(0, 25)}...` : anime.title;

  return (
    // <GridItem w="100%">
    //   <Box
    //     as={ReactRouterLink}
    //     to={`/anime/${id}`}
    //     pos="relative"
    //     overflow="hidden"
    //     display="block"
    //     h={{
    //       base: "216px",
    //       sm: "290px",
    //       md: "350px",
    //       lg: "360px",
    //       "2xl": "408px",
    //     }}
    //     borderRadius="10px"
    //     transition="opacity 0.5s"
    //     className="episode-container"
    //   >
    //     {/* Anime Image */}
    //     <Image
    //       src={poster}
    //       w="100%"
    //       h="100%"
    //       bg="var(--card-background-color)"
    //       borderRadius="10px"
    //       transition="transform 0.7s ease-in-out"
    //       className="thumbnail"
    //     />

    //     {/* Overlay */}
    //     <Box
    //       pos="absolute"
    //       top="0"
    //       left="0"
    //       w="100%"
    //       h="0"
    //       borderRadius="10px"
    //       display="flex"
    //       alignItems="center"
    //       justifyContent="center"
    //       className="overlay"
    //       textAlign="center"
    //       background="rgba(0,0,0,0.85)"
    //       opacity="0"
    //       transition="height 0.5s ease, opacity 0.5s ease"
    //       _hover={{ h: "100%", opacity: 1 }}
    //     >
    //       <ChakraLink
    //         as={ReactRouterLink}
    //         to={`/anime/${id}`}
    //         color="var(--link-hover-color)"
    //         fontSize={{ base: "15px", sm: "18px" }}
    //         lineHeight="36px"
    //         letterSpacing="0.5px"
    //         fontWeight="500"
    //         display="flex"
    //         alignItems="center"
    //         gap="8px"
    //         _hover={{
    //           color: "var(--link-hover-color)",
    //           transition: "all 0.25s ease",
    //         }}
    //       >
    //         <Info size={40} color="var(--link-hover-color)" />
    //       </ChakraLink>
    //     </Box>
    //   </Box>

    //   {/* Anime Info */}
    //   <Box display="flex" flexDir="column" alignItems="flex-start" mt="10px">
    //     <Flex gap="10px" mt="5px" mb="10px" flexWrap="wrap">
    //       <Text
    //         as="span"
    //         color="var(--text-color)"
    //         p={{ base: "0px 6px", lg: "3px 10px" }}
    //         borderRadius="8px"
    //         border={{
    //           base: "1px solid var(--text-color)",
    //           md: "2px solid var(--text-color)",
    //         }}
    //         fontSize={{ base: "12.63px", md: "14.63px" }}
    //         lineHeight="24px"
    //         letterSpacing="0.5px"
    //         textTransform="uppercase"
    //         cursor="pointer"
    //         transition="all 0.25s ease"
    //         _hover={{ bgColor: "var(--accent-color)", fontWeight: "bold" }}
    //       >
    //         SUB {tvInfo.sub || "N/A"}
    //       </Text>
    //       <Text
    //         as="span"
    //         color="var(--text-color)"
    //         p={{ base: "0px 6px", lg: "3px 10px" }}
    //         borderRadius="8px"
    //         border={{
    //           base: "1px solid var(--text-color)",
    //           md: "2px solid var(--text-color)",
    //         }}
    //         fontSize={{ base: "12.63px", md: "14.63px" }}
    //         lineHeight="24px"
    //         letterSpacing="0.5px"
    //         textTransform="uppercase"
    //         cursor="pointer"
    //         transition="all 0.25s ease"
    //         _hover={{ bgColor: "var(--accent-color)", fontWeight: "bold" }}
    //       >
    //         DUB {tvInfo.dub || "N/A"}
    //       </Text>
    //       <Text
    //         as="span"
    //         color="var(--text-secondary)"
    //         p={{ base: "0px 6px", lg: "3px 10px" }}
    //         fontSize={{ base: "12.63px", md: "14.63px" }}
    //         lineHeight="24px"
    //         letterSpacing="0.5px"
    //         textTransform="uppercase"
    //         hideBelow="sm"
    //       >
    //         {tvInfo.showType || "N/A"}
    //       </Text>
    //     </Flex>

    //     <ChakraLink
    //       as={ReactRouterLink}
    //       to={`/anime/${id}`}
    //       _hover={{ textDecor: "none" }}
    //     >
    //       <Text
    //         as="p"
    //         fontSize={{ base: "17px", sm: "19px", lg: "20px", "2xl": "22px" }}
    //         lineHeight="26px"
    //         letterSpacing="0.5px"
    //         fontWeight="500"
    //         color="var(--text-color)"
    //         _hover={{ color: "var(--link-hover-color)", fontWeight: "bold" }}
    //       >
    //         {epLength}
    //       </Text>
    //     </ChakraLink>
    //   </Box>
    // </GridItem>
    <GridItem w="100%">
      <LinkBox
        pos="relative"
        overflow="hidden"
        display="block"
        h={{
          base: "250px",
          sm: "350px",
          md: "370px",
          lg: "390px",
          "2xl": "408px",
        }}
        w="100%"
        _hover={{ transform: "scale(1.02)" }}
        transition="transform 0.3s"
      >
        <Card.Root
          w="100%"
          overflow="hidden"
          variant="elevated"
          h="100%"
          transition="opacity 0.3s"
        >
          <Image
            src={poster}
            w="100%"
            bg="var(--card-background-color)"
            h={{ base: "60%", sm: "75%", md: "70%" }}
            alt={epLength}
            objectFit="cover"
          />

          <Card.Body
            gap="2"
            p={{ base: 2, md: 4 }}
            // bg="var(--card-background-color)"
          >
            <HStack gap="2" flexWrap="wrap">
              {tvInfo.sub && (
                <Badge
                  variant="surface"
                  size={{ base: "sm", md: "md", lg: "lg" }}
                >
                  {`SUB ${tvInfo.sub}`}
                </Badge>
              )}
              {tvInfo.dub && (
                <Badge
                  variant="surface"
                  size={{ base: "sm", md: "md", lg: "lg" }}
                >
                  {`DUB ${tvInfo.dub}`}
                </Badge>
              )}
              <Badge
                hideBelow="md"
                variant="surface"
                size={{ base: "sm", md: "md", lg: "lg" }}
              >
                {tvInfo.showType || "N/A"}
              </Badge>
            </HStack>
            <LinkOverlay asChild>
              <ReactRouterLink to={`/anime/${id}`}>
                <Card.Title
                  fontSize={{
                    base: "15px",
                    sm: "18px",
                    lg: "20px",
                    "2xl": "22px",
                  }}
                  lineHeight="25px"
                  letterSpacing="0.5px"
                  fontFamily="var(--font-family)"
                >
                  {epLength}
                </Card.Title>
              </ReactRouterLink>
            </LinkOverlay>
          </Card.Body>
        </Card.Root>
      </LinkBox>
    </GridItem>
  );
};

export default AnimeCard;
