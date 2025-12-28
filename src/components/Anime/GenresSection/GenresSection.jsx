import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const GenresSection = () => {
  const genres = [
    "Action",
    "Adventure",
    "Cars",
    "Comedy",
    "Dementia",
    "Demons",
    "Drama",
    "Ecchi",
    "Fantasy",
    "Game",
    "Harem",
    "Historical",
    "Horror",
    "Isekai",
    "Josei",
    "Kids",
    "Magic",
    "Martial-arts",
    "Mecha",
    "Military",
    "Music",
    "Mystery",
    "Parody",
    "Police",
    "Psychological",
    "Romance",
    "Samurai",
    "School",
    "Sci-fi",
    "Seinen",
    "Shoujo",
    "Shoujo-ai",
    "Shounen",
    "Shounen-ai",
    "Slice-of-life",
    "Space",
    "Sports",
    "Super-power",
    "Supernatural",
    "Thriller",
    "Vampire",
  ];

  return (
    <Box
      w="100%"
      bg="var(--linear-gradient)"
      py={{ base: "60px", lg: "88px" }}
      mb={{ base: "40px", lg: "60px" }}
      borderTop="1px solid rgba(255, 255, 255, 0.05)"
      borderBottom="1px solid rgba(255, 255, 255, 0.05)"
    >
      <Box
        maxW={{
          base: "90%",
          sm: "95%",
          xl: "85%",
          "2xl": "container.xl",
        }}
        margin="auto"
      >
        <Heading
          as="h2"
          fontSize={{ base: "18px", md: "20px" }}
          fontWeight="700"
          color="var(--text-color)"
          mb="20px"
        >
          Browse by Genre
        </Heading>

        <Flex flexWrap="wrap" gap="12px">
          {genres.map((genre) => (
            <Button
              key={genre}
              as={Link}
              to={`/anime/genre/${genre.toLowerCase()}`}
              px="20px"
              py="10px"
              bg="var(--card-background-color)"
              border="1px solid rgba(255, 255, 255, 0.1)"
              borderRadius="24px"
              color="var(--text-color)"
              fontSize="14px"
              fontWeight="500"
              _hover={{
                bg: "var(--accent-color)",
                borderColor: "var(--accent-color)",
                transform: "scale(1.05)",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.5)",
              }}
              transition="all 0.3s ease"
            >
              {genre}
            </Button>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default GenresSection;
