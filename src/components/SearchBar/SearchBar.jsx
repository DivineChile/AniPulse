import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Spinner,
  Text,
  Link as ChakraLink,
  Flex,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import "../../index.css";
import "./style.css";
import { useState, useCallback } from "react";
import { debounce } from "lodash";

const SearchBar = ({ above, below, displayProp }) => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();
  const api = "https://consumet-api-puce.vercel.app/";
  const backup_api = "https://aniwatch-api-gamma-wheat.vercel.app/";
  const proxy = "https://fluoridated-recondite-coast.glitch.me/";

  // Fetch anime data based on the query
  const fetchData = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${proxy}${backup_api}/api/v2/hianime/search?q=${query}`
      );
      const data = await response.json();
      setSearchResults(data.data.animes || []);
    } catch (err) {
      setError("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Debounced fetch function
  const debouncedFetchData = useCallback(debounce(fetchData, 1000), []);

  // Handle input change and initiate debounce
  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);

    if (value.trim()) {
      debouncedFetchData(value);
    } else {
      setSearchResults([]);
    }
  };

  // Handle focus and blur events
  const handleInputFocus = () => setShowDropdown(true);

  const handleInputBlur = () => {
    setTimeout(() => setShowDropdown(false), 200);
  };

  // Handle Enter key press to navigate to search results
  const handleKeyPress = (event) => {
    if (event.key === "Enter" && query.trim()) {
      navigate(`/search/keyword/${query}`);
    }
  };

  // Extract top 7 results for the dropdown
  const top7Items = searchResults.slice(0, 7);

  return (
    <Box
      hideBelow={below}
      hideFrom={above}
      width={{ base: "100%", lg: "150px", xl: "250px", "2xl": "400px" }}
      display={displayProp}
      pos="relative"
    >
      <InputGroup
        h="40px"
        w={{ base: "100%", lg: "150px", xl: "250px", "2xl": "400px" }}
      >
        <InputLeftAddon
          background="none"
          color="var(--text-color)"
          borderRight="none"
          borderColor="#d4d4d4"
          cursor="pointer"
          onClick={() => query.trim() && navigate(`/search/keyword/${query}`)}
        >
          <SearchIcon color="#d4d4d4" />
        </InputLeftAddon>
        <Input
          borderLeft="none"
          placeholder="Search"
          _placeholder={{
            color: "#d4d4d4",
            fontSize: {base: "13px", lg: "13px", "2xl": "15.38px"}
          }}
          color="var(--text-color)"
          borderColor="#d4d4d4"
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyPress}
        />
      </InputGroup>

      {showDropdown && (
        <Box
          width={{ base: "100%", sm: "400px", md: "500px" }}
          top="50px"
          right="0"
          bg="var(--primary-background-color)"
          borderRadius="10px"
          p="20px"
          boxShadow="0 0 10px 0 rgba(0,0,0,0.6)"
          position="absolute"
          zIndex="999"
        >
          <Box borderBottom="1px solid #444444" mb="20px">
            <Heading as="h4" color="var(--text-color)" fontSize="20px" mb="5px">
              Search Results
            </Heading>
          </Box>

          {loading && (
            <Box display="flex" justifyContent="center">
              <Spinner color="var(--accent-color)" />
            </Box>
          )}

          {error && (
            <Text as="span" color="var(--text-color)">
              {error}
            </Text>
          )}

          {top7Items.map((item) => (
            <ChakraLink
              as={ReactRouterLink}
              key={item.id}
              to={`/anime/${item.id}`}
              style={{
                display: "flex",
                gap: "20px",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <Image
                h="60px"
                w="50px"
                bg="#191919"
                borderRadius="6px"
                src={item.poster}
                alt={item.name}
              />
              <Box>
                <Heading
                  as="h4"
                  fontSize="16px"
                  color="var(--secondary-color)"
                  _hover={{ color: "var(--accent-color)" }}
                >
                  {item.name}
                </Heading>

                <Flex gap="5px">
                  <Text color="var(--text-color)" fontSize="12px">
                    Sub: {item.episodes.sub || "N/A"}
                  </Text>
                  <Text color="var(--text-color)" fontSize="12px">
                    ~
                  </Text>
                  <Text color="var(--text-color)" fontSize="12px">
                    Dub: {item.episodes.dub || "N/A"}
                  </Text>
                </Flex>
                <Text
                  color="var(--text-color)"
                  fontSize="12px"
                  border="1px solid var(--text-color)"
                  w="fit-content"
                  borderRadius="5px"
                  px="5px"
                >
                  {item.type || "N/A"}
                </Text>
              </Box>
            </ChakraLink>
          ))}

          {searchResults.length > 7 && (
            <ChakraLink
              as={ReactRouterLink}
              to={`/search/keyword/${query}`}
              _hover={{
                background: "var(--accent-color)",
                color: "var(--primary-background-color)",
                border: "none",
              }}
              transition="all ease 0.25s"
              display="block"
              mt="10px"
              color="var(--text-color)"
              textAlign="center"
              border="1px solid var(--secondary-color)"
              borderRadius="5px"
              padding="5px"
            >
              View All
            </ChakraLink>
          )}
        </Box>
      )}
    </Box>
  );
};

export default SearchBar;
