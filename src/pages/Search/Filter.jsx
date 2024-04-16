import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Link as ChakraLink,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputRightAddon,
  Heading,
  Icon,
  Text,
} from "@chakra-ui/react";
import {
  Link as ReactRouterLink,
  useParams,
  useNavigate,
} from "react-router-dom";
import { ChevronDownIcon } from "@chakra-ui/icons";

import { filterTypes } from "./utils/FilterTypes";
import { filterLetters } from "./utils/FilterLetters";
import { useEffect, useState } from "react";
import { ANIME, META } from "@consumet/extensions";

import Navbar from "../../components/Navbar/Navbar";

import "./style.css";
import GridView from "../../components/Filter/GridView";
import { BsGrid, BsListUl, BsX } from "react-icons/bs";
import ListView from "../../components/Filter/ListView";

const Filter = () => {
  const { searchQuery } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [newQueryValue, setNewQueryValue] = useState("");
  const [newQueryParam, setNewQueryParam] = useState("");
  const [buttonRotate, setButtonRotate] = useState(false);
  const [listView, setListView] = useState(false);
  const [gridView, setGridView] = useState(true);
  const [showClear, setShowClear] = useState(true);

  const navigate = useNavigate();

  const requestAnime = async () => {
    const animes = new ANIME.Gogoanime();
    const meta = new META.Anilist();

    // const results = await animes.search(searchQuery);

    const info = await meta.advancedSearch(searchQuery);
    setSearchResults(info.results);
    // console.log(searchResults);
  };

  useEffect(() => {
    requestAnime();
    setNewQueryValue(searchQuery);
  }, []);

  const handleNewQuery = (event) => {
    setNewQueryValue(event.target.value);
  };

  const handleNewRequestAnime = async () => {
    const newMeta = new META.Anilist();

    const newInfo = await newMeta.advancedSearch(newQueryValue);
    setSearchResults(newInfo.results);
  };

  const handleSearch = () => {
    handleNewRequestAnime();
    navigate(`/search/keyword/${encodeURIComponent(newQueryValue)}`);
  };

  const handleSearchInputFocus = () => {
    setShowClear(true);
  };

  const handleSearchInputBlur = () => {
    setShowClear(false);
  };

  const clearQuery = () => {
    setNewQueryValue("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  // const handleSearchQuery = async () => {
  //   setButtonRotate(!buttonRotate);
  //   const url = "https://api-amvstrm.nyt92.eu.org/api/v2/search";
  //   const headers = new Headers();
  //   headers.append("Content-Type", "application/json");
  //   const body = JSON.stringify({
  //     search: searchQuery,
  //   });
  //   const options = {
  //     method: "POST",
  //     headers: headers,
  //     body: body,
  //   };
  //   try {
  //     setIsLoading(true);
  //     const response = await fetch(url, options);
  //     if (response.ok) {
  //       const data = await response.json();
  //       setSearchResults(data.results);
  //       setIsLoading(false);
  //       setError(false);
  //     } else {
  //       setError(true);
  //       setIsLoading(false);
  //     }
  //   } catch (error) {
  //     setError(true);
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   handleSearchQuery();
  // }, []);

  // console.log(searchResults);

  const handleListView = () => {
    if (gridView) {
      setListView(true);
      setGridView(false);
      console.log(listView);
    } else {
      setListView(true);
      setGridView(false);
      console.log(listView);
    }
  };

  const handleGridView = () => {
    if (listView) {
      setGridView(true);
      setListView(false);
      console.log(gridView);
    } else {
      setGridView(true);
      setListView(false);
      console.log(gridView);
    }
  };
  return (
    <Box>
      <Box>
        <Navbar />
      </Box>

      <Box background="var(--primary-background-color)">
        <Box
          maxW={{
            base: "95%",
            xl: "85%",
            "2xl": "container.xl",
          }}
          margin="auto"
          py="20px"
        >
          {/* BreadCrumb Links */}
          <Breadcrumb mb="20px">
            <BreadcrumbItem
              fontSize={{ base: "15.13px", lg: "18.75px" }}
              lineHeight={{ base: "24px", lg: "30px" }}
              letterSpacing="0.5px"
              color="var(--text-color)"
              _hover={{ color: "var(--link-hover-color)", textDecor: "none" }}
            >
              <BreadcrumbLink as={ReactRouterLink} to="/" textDecor="none">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem
              isCurrentPage
              fontSize={{ base: "15.13px", lg: "18.75px" }}
              lineHeight={{ base: "24px", lg: "30px" }}
              letterSpacing="0.5px"
              color="var(--accent-color)"
              _hover={{ color: "var(--link-hover-color)" }}
            >
              <BreadcrumbLink>Search</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          {/* Filter Area */}
          <Box
            mt="70px"
            display="flex"
            flexDir="column"
            gap={{ base: "20px", md: "40px" }}
          >
            <Box
              display="flex"
              alignItems="center"
              flexDir={{ base: "column", md: "row" }}
              gap={{ base: "5px", md: "40px" }}
            >
              <Heading
                as="h1"
                color="#fff"
                textTransform="uppercase"
                fontSize={{ base: "28.83px", lg: "38.28px" }}
                lineHeight={{ base: "33px", lg: "44px" }}
                letterSpacing="1.5px"
              >
                Filter
              </Heading>
              <Flex
                alignItems="center"
                direction={{ base: "column", md: "row" }}
                justifyContent="space-between"
                w="100%"
                gap="20px"
              >
                <Box display="flex" gap="20px" alignItems="center">
                  <Icon
                    as={BsListUl}
                    h="20px"
                    w="20px"
                    color={
                      listView
                        ? "var(--accent-color)"
                        : "var(--secondary-color)"
                    }
                    _hover={{
                      color: "var(--accent-color)",
                    }}
                    cursor="pointer"
                    onClick={handleListView}
                  />
                  <Icon
                    as={BsGrid}
                    h="20px"
                    w="20px"
                    color={
                      gridView
                        ? "var(--accent-color)"
                        : "var(--secondary-color)"
                    }
                    _hover={{
                      color: "var(--accent-color)",
                    }}
                    cursor="pointer"
                    onClick={handleGridView}
                  />
                  <Box>
                    <Text
                      color="#fff"
                      fontWeight="400"
                      textTransform="uppercase"
                      fontSize={{ base: "16px", md: "20px" }}
                      lineHeight={{ base: "17.6px", md: "44px" }}
                      letterSpacing="1.5px"
                    >
                      Showing 1 - 9 of 50 Anime
                    </Text>
                  </Box>
                </Box>

                <Box
                  w={{ base: "100%", md: "fit-content" }}
                  onBlur={handleSearchInputBlur}
                >
                  <FormControl>
                    <InputGroup>
                      <Input
                        borderRadius="5px"
                        background="#111111"
                        fontSize="16px"
                        fontWeight="400"
                        lineHeight="24px"
                        letterSpacing="0.5px"
                        color="#b4b4b4"
                        border="none"
                        value={newQueryValue}
                        transition="all ease 0.5s"
                        onChange={handleNewQuery}
                        onFocus={handleSearchInputFocus}
                        _focus={{
                          border: "none!important",
                          outline: "none!important",
                          boxShadow: "0px 0px 4px 0px var(--secondary-color)",
                        }}
                        onKeyDown={handleKeyPress}
                        w="100%"
                      />

                      <InputRightAddon
                        cursor="pointer"
                        borderRadius="none"
                        background="#111111"
                        border="none"
                        borderTopRightRadius="5px"
                        borderBottomRightRadius="5px"
                        onClick={clearQuery}
                      >
                        {showClear ? (
                          <Icon
                            as={BsX}
                            color="#b4b4b4"
                            height="20px"
                            w="20px"
                          />
                        ) : (
                          <></>
                        )}
                      </InputRightAddon>
                    </InputGroup>
                  </FormControl>
                </Box>
              </Flex>
            </Box>

            {/* filter criteria */}
            <Box>
              {/* Filter letters */}
              <Box
                display="flex"
                alignItems="center"
                gap="10px"
                flexWrap="wrap"
              >
                {filterLetters.map((item, index) => {
                  return (
                    <Button
                      type="button"
                      h="38px"
                      w={
                        item.desc?.length > 1 ? "43.94px" : "38.81px!important"
                      }
                      borderRadius="5px"
                      background="#111111"
                      fontSize="16px"
                      fontWeight="400"
                      lineHeight="24px"
                      letterSpacing="0.5px"
                      color="#b4b4b4"
                      _hover={{
                        color: "var(--secondary-color)",
                        background: "#111111",
                      }}
                      key={index}
                      onClick={requestAnime}
                    >
                      {item.desc}
                    </Button>
                  );
                })}
                {filterTypes.map((item, index) => {
                  return (
                    <Button
                      type="button"
                      h="38px"
                      borderRadius="5px"
                      background="#111111"
                      fontSize="16px"
                      fontWeight="400"
                      lineHeight="24px"
                      letterSpacing="0.5px"
                      color="#b4b4b4"
                      _hover={{
                        color: "var(--secondary-color)",
                        background: "#111111",
                      }}
                      key={index}
                      onClick={requestAnime}
                    >
                      <Text as="span">{item.desc}</Text>
                      <ChevronDownIcon
                        h="26px"
                        w="24px"
                        className={
                          buttonRotate === true ? `icon_rotated` : "icon"
                        }
                        transition="all ease 0.25s"
                      />
                    </Button>
                  );
                })}
              </Box>
              <Box mt={"10px"}>
                <Button
                  borderRadius="5px"
                  border={{
                    base: "1px solid var(--secondary-color)",
                    md: "2px solid var(--secondary-color)",
                  }}
                  background="#111111"
                  h={{ base: "36px", sm: "42px" }}
                  w={{ base: "88.4px", sm: "106.59px" }}
                  color="#b4b4b4"
                  fontSize={{ base: "11.44px", sm: "15.38px" }}
                  lineHeight={{ base: "18px", md: "24px" }}
                  letterSpacing={{ base: "0.5px" }}
                  fontWeight="400"
                  _hover={{
                    color: "#fff",
                    background: "var(--secondary-color)",
                  }}
                  type="submit"
                  onClick={handleSearch}
                >
                  Filter Now
                </Button>
              </Box>
            </Box>

            {/* Results */}
            <Box mt="20px">
              {gridView ? (
                <GridView results={searchResults} />
              ) : (
                <ListView results={searchResults} />
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Filter;
