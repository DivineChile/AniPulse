import { Box, Heading, Spinner } from "@chakra-ui/react";
import "../../index.css";

const Error = ({
  msg,
  loadingState,
  error,
  height,
  pos,
  top,
  left,
  width,
  radius,
  index,
}) => {
  return (
    <Box
      h={height}
      w={width}
      background="var(--primary-background-color)"
      pos={pos}
      top={top}
      left={left}
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex="1"
      borderRadius={radius}
    >
      {loadingState && (
        <Box>
          {" "}
          <Spinner
            color="var(--accent-color)"
            h={{ base: "50px", md: "80px", lg: "100px" }}
            w={{ base: "50px", md: "80px", lg: "100px" }}
            thickness={{ base: "5px", md: "10px" }}
            transition="all ease 0.25s"
          />
        </Box>
      )}
      {error && (
        <Heading
          as="h1"
          fontSize={{ base: "20px", md: "30px" }}
          color="var(--text-color)"
          transition="all ease 0.25s"
          display="flex"
          flexDir={{ base: "column", sm: "row" }}
          alignItems="center"
          gap="10px"
          fontWeight="500"
        >
          <Spinner
            color="var(--accent-color)"
            h={{ base: "30px", md: "40px", lg: "50px" }}
            w={{ base: "30px", md: "40px", lg: "50px" }}
            thickness={{ base: "5px", md: "5px" }}
            transition="all ease 0.25s"
          />
          {msg}
        </Heading>
      )}
    </Box>
  );
};

export default Error;
