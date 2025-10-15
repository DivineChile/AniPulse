import { Box, Text } from "@chakra-ui/react";
import "../../index.css";

const Error = ({ msg, height, bg, pos }) => {
  return (
    <Box
      height={height}
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg={bg}
      color="var(--link-hover-color)"
      pos={{ base: "initial", md: pos }}
      left="0"
      w={{ base: "100%", md: "initial" }}
    >
      <Text
        fontSize={{ base: "16px", md: "16px", lg: "20px" }}
        color="var(--link-hover-color)"
        textAlign={{ base: "center", md: "start" }}
      >
        {msg || "An error occurred!"}
      </Text>
    </Box>
  );
};

export default Error;
