import { Text, Box } from "@chakra-ui/react";

const Loading = ({ height, bg }) => {
  return (
    <Box
      height={height}
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg={bg}
    >
      <Text color="var(--accent-color)" fontSize={{ base: "20px", md: "25px" }}>
        Loading...
      </Text>
    </Box>
  );
};

export default Loading;
