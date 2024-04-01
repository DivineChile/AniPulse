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
} from "@chakra-ui/react";
import { Form, Link, useNavigate } from "react-router-dom";
import "../../index.css";
import "./style.css";
import { useState, useEffect } from "react";
import { debounce } from "lodash";

const SearchBar = ({ above, below, displayProp }) => {
  const [query, setQuery] = useState("");
  const [animeData, setAnimeData] = useState(null);
  const [searchResults, setSearchResults] = useState(undefined);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchData = async () => {
    const url = "https://api-amvstrm.nyt92.eu.org/api/v2/search";
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const body = JSON.stringify({
      search: query,
    });
    const options = {
      method: "POST",
      headers: headers,
      body: body,
    };

    try {
      setLoading(true);
      const response = await fetch(url, options);
      const data = await response.json();
      setSearchResults(data.results);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  const debouncedFetchData = debounce(fetchData, 1000, []);

  const handleInputFocus = () => {
    setShowDropdown(true);
  };

  const handleInputBlur = () => {
    // Use setTimeout to allow click on result before hiding the dropdown
    setTimeout(() => {
      setShowDropdown(false);
      setSearchResults([]);
    }, 1000);
  };

  const handleInputChange = (event) => {
    // Only fetch data if the query is not empty
    setQuery(event.target.value);
    if (query.trim() && query !== "") {
      debouncedFetchData();
      setAnimeData(debouncedFetchData);
    } else {
      setSearchResults([]);
    }
  };

  const handleLinkClick = (itemId) => {
    navigate(`/anime/${itemId}`);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      navigate(`/search/keyword/${query}`);
    }
  };

  let top7Items = [];

  if (searchResults && searchResults.length > 0) {
    top7Items = searchResults.slice(0, 7);
  }

  return (
    <Box
      hideBelow={below}
      hideFrom={above}
      width={{ base: "100%", lg: "150px", xl: "250px", "2xl": "400px" }}
      display={displayProp}
      pos="relative"
    >
      <Form>
        <InputGroup
          h="40px"
          w={{ base: "100%", lg: "150px", xl: "250px", "2xl": "400px" }}
        >
          <InputLeftAddon
            background="none"
            color="var(--text-color)"
            borderRight="none!important"
            borderColor="var(--secondary-color)"
            _focus={{
              borderColor: "var(--link-hover-color)",
              outline: "none",
            }}
            className="icon-con"
            _hover={{ borderColor: "var(--hover-color)" }}
            cursor="pointer"
            onClick={() => {
              navigate(`/search/keyword/${query}`);
            }}
          >
            <SearchIcon
              color="var(--secondary-color)"
              className="search-icon"
            />
          </InputLeftAddon>
          <Input
            borderLeft="none"
            placeholder="Search..."
            color="var(--text-color)"
            borderColor="var(--secondary-color)"
            className="inputSearch"
            _focus={{
              border: "none!important",
              outline: "none!important",
              boxShadow: "0px 0px 4px 0px var(--secondary-color)",
            }}
            _hover={{ borderColor: "var(--link-hover-color)" }}
            value={query}
            onChange={handleInputChange}
            type="text"
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyPress}
          />
        </InputGroup>
      </Form>
      {/* Search Results */}
      {showDropdown && (
        <Box
          width={{ base: "100%", sm: "400px", md: "500px" }}
          top="50px"
          right="0"
          transition="all ease 0.25s"
          display="flex"
          flexDir="column"
          borderRadius="10px"
          bg="var(--primary-background-color)"
          p="20px"
          boxShadow="0 0 10px 0 rgba(0,0,0,0.6)"
          gap="20px 0"
          zIndex="999"
          position="absolute"
        >
          <Box borderBottom="1px solid #444444" width="100%">
            <Heading
              as="h4"
              color="var(--text-color)"
              fontWeight="400"
              fontSize="20px"
              mb="5px"
            >
              Search Results
            </Heading>
          </Box>
          {loading ? (
            <Box w="100%" display="flex" justifyContent="center">
              <Spinner color="var(--accent-color)" />
            </Box>
          ) : (
            <></>
          )}
          {error ? (
            <Text as="span" color="var(--text-color)">
              Error getting requested Anime...
            </Text>
          ) : (
            <></>
          )}

          {searchResults && searchResults?.length > 0 ? (
            top7Items.map((item) => {
              const itemId = item.id;
              const itemStatus = item.status;
              const itemTitle = item.title.userPreferred;
              const itemEp = item.episodes;
              const itemImg = item.coverImage.extraLarge;

              return (
                <Box key={itemId}>
                  <Link
                    style={{
                      display: "flex",
                      gap: "0 20px",
                      alignItems: "center",
                      width: "100%",
                    }}
                    to={`/anime/${itemId}`}
                    // onClick={() => handleLinkClick(itemId)}
                  >
                    <Box width="10%">
                      <Image
                        h="100%"
                        w="100%"
                        bg="#191919"
                        borderRadius="6px"
                        src={itemImg}
                      />
                    </Box>
                    <Box width="90%">
                      <Box display="flex" flexDir="column">
                        <Heading
                          as="h4"
                          fontWeight="500"
                          fontSize={{ base: "18px", md: "20px" }}
                          color="var(--secondary-color)"
                          transition="all ease 0.25s"
                          _hover={{
                            color: "var(--accent-color)",
                          }}
                        >
                          {itemTitle?.length > 40
                            ? `${itemTitle.slice(0, 36)}...`
                            : itemTitle}
                        </Heading>
                        <Text
                          as="span"
                          color="var(--text-color)"
                          fontSize={{ base: "12px", md: "13px" }}
                          fontWeight={{ base: "300", md: "normal" }}
                        >
                          {itemEp == null ? "NIL" : `Episodes: ${itemEp}`}
                        </Text>
                        <Text
                          as="span"
                          color="var(--text-color)"
                          fontSize={{ base: "12px", md: "13px" }}
                          fontWeight={{ base: "300", md: "normal" }}
                        >
                          {`Status: ${itemStatus}`}
                        </Text>
                      </Box>
                    </Box>
                  </Link>
                </Box>
              );
            })
          ) : (
            <></>
          )}

          {searchResults?.length >= 7 && (
            <Link
              to={`/search/keyword/${query}`}
              key="showMore"
              style={{
                color: "var(--text-color)",
                fontSize: "15px",
                border: "2px solid var(--secondary-color)",
                borderRadius: "5px",
                padding: "5px 15px",
                textAlign: window.innerWidth < 500 ? "center" : "start",
                width: window.innerWidth < 500 ? "100%" : "fit-content",
              }}
            >
              View All
            </Link>
          )}

          {/* {(() => {
            if (searchResults && searchResults?.length > 0) {
              // Declare a variable to store the elements
              const elements = [];

              // Determine the endIndex based on the showAll state
              const endIndex = showAll
                ? searchResults?.length
                : Math.min(searchResults.length, 7);

              // Iterate through the search results
              for (let i = 0; i < endIndex; i++) {
                const itemId = animeId[i];
                const itemStatus = animeStatus[i];
                const itemTitle = animeTitle[i];
                const itemEp = animeEp[i];
                const itemImg = animeImg[i];

                // Use item properties in JSX
                elements?.push(
                  itemStatus === undefined ? (
                    <></>
                  ) : (
                    <Box key={itemId}>
                      <Link
                        style={{
                          display: "flex",
                          gap: "0 20px",
                          alignItems: "center",
                          width: "100%",
                        }}
                        // to={`/anime/${itemId}`}
                        onClick={() => handleLinkClick(itemId)}
                      >
                        <Box width="10%">
                          <Image
                            h="100%"
                            w="100%"
                            bg="#191919"
                            borderRadius="6px"
                            src={itemImg}
                          />
                        </Box>
                        <Box width="90%">
                          <Box display="flex" flexDir="column">
                            <Heading
                              as="h4"
                              fontWeight="500"
                              fontSize={{ base: "18px", md: "20px" }}
                              color="var(--secondary-color)"
                              transition="all ease 0.25s"
                              _hover={{
                                color: "var(--accent-color)",
                              }}
                            >
                              {itemTitle === undefined ? "" : itemTitle}
                            </Heading>
                            <Text
                              as="span"
                              color="var(--text-color)"
                              fontSize={{ base: "12px", md: "13px" }}
                              fontWeight={{ base: "300", md: "normal" }}
                            >
                              {itemEp === undefined
                                ? ""
                                : itemEp == null
                                ? "NIL"
                                : `Episodes: ${itemEp}`}
                            </Text>
                            <Text
                              as="span"
                              color="var(--text-color)"
                              fontSize={{ base: "12px", md: "13px" }}
                              fontWeight={{ base: "300", md: "normal" }}
                            >
                              {itemStatus === undefined
                                ? ""
                                : `Status: ${itemStatus}`}
                            </Text>
                          </Box>
                        </Box>
                      </Link>
                    </Box>
                  )
                );
              }

              const handleShowAllClick = () => {
                setShowAll((prevShowAll) => setShowAll(!prevShowAll));
              };

              // Render the "View All" link if there are more than 7 results
              if (searchResults?.length > 7) {
                elements.push(
                  <Link
                    to={`/search/${query}`}
                    onClick={handleShowAllClick}
                    key="showMore"
                    style={{
                      color: "var(--text-color)",
                      fontSize: "15px",
                      border: "2px solid var(--secondary-color)",
                      borderRadius: "5px",
                      padding: "5px 15px",
                      textAlign: window.innerWidth < 500 ? "center" : "start",
                      width: window.innerWidth < 500 ? "100%" : "fit-content",
                    }}
                  >
                    {showAll ? "View Less" : "View All"}
                  </Link>
                );
              }

              return elements;
            }
          })()} */}
        </Box>
      )}
    </Box>
  );
};

export default SearchBar;
