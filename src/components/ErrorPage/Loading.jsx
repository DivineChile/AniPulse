import { Text, Box } from "@chakra-ui/react";

const Loading = ({ height, bg, pos }) => {
  return (
    <Box
      height={height}
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg={bg}
      pos={{ base: "initial", md: pos }}
      left="0"
    >
      <Text
        color="var(--accent-color)"
        fontSize={{ base: "16px", md: "16px", lg: "20px" }}
        textAlign={{ base: "center", md: "start" }}
      >
        Loading...
      </Text>
    </Box>
  );
};

export default Loading;
