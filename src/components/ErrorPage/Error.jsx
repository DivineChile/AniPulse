import { Box, Text } from "@chakra-ui/react";
import "../../index.css";

const Error = ({ msg, height }) => {
  return (
    <Box
      height={height}
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg="#191919"
      color="var(--accent-color)"
    >
      <Text fontSize={{ base: "20px", md: "25px" }} color="var(--accent-color)">
        {msg || "An error occurred!"}
      </Text>
    </Box>
  );
};

export default Error;
