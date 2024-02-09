import { Box, Heading, Spinner } from "@chakra-ui/react";

const Error = ({ msg, loadingState }) => {
  return loadingState ? (
    <Box
      h={{
        base: "calc(100vh - 70.89px)",
        md: "calc(100vh - 74px)",
        lg: "calc(100vh - 84px)",
      }}
      w="100%"
      background="rgba(25, 27, 40, 0.95)"
      pos="absolute"
      top={{ base: "70.89px", md: "74px", lg: "84px" }}
      left="0"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex="1"
    >
      <Box>
        <Spinner
          color="var(--primary-accent-color)"
          h="100px"
          w="100px"
          thickness="10px"
        />
      </Box>
      {msg ? (
        <Heading as="h1" fontSize="30px" color="var(--text-color)">
          {msg}
        </Heading>
      ) : (
        <></>
      )}
    </Box>
  ) : (
    <></>
  );
};

export default Error;
