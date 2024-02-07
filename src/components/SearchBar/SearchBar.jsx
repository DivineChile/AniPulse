import { SearchIcon } from "@chakra-ui/icons";
import { Box, Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import { Form } from "react-router-dom";
import "../../index.css";

const SearchBar = () => {
  return (
    <Box>
      <Form>
        <InputGroup
          h="40px"
          w={{ base: "100%", md: "200px", lg: "350px", "2xl": "400px" }}
        >
          <InputLeftAddon
            background="none"
            color="var(--text-color)"
            borderRight="none!important"
            borderColor="var(--secondary-accent-color)"
            _focus={{
              borderColor: "var(--link-color)",
              outline: "none",
            }}
            _hover={{ borderColor: "var(--link-hover-color)" }}
          >
            <SearchIcon color="var(--secondary-accent-color)" />
          </InputLeftAddon>
          <Input
            borderLeft="none"
            placeholder="Search"
            color="var(--text-color)"
            borderColor="var(--secondary-accent-color)"
            _focus={{
              border: "none!important",
              outline: "none!important",
            }}
            _hover={{ borderColor: "var(--link-hover-color)" }}
          />
        </InputGroup>
      </Form>
    </Box>
  );
};

export default SearchBar;
