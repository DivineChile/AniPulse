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
  ButtonSpinner,
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

import Navbar from "../../components/Navbar/Navbar";

import "./style.css";
import GridView from "../../components/Anime/Filter/GridView";
import { BsGrid, BsListUl, BsX } from "react-icons/bs";
import ListView from "../../components/Anime/Filter/ListView";

const Filter = () => {
  const { searchQuery } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [animeResults, setAnimeResults] = useState([]);
  const [movieResults, setMovieResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [animePerPage, setAnimePerPage] = useState(0);
  const [newQueryValue, setNewQueryValue] = useState("");
  const [newQueryParam, setNewQueryParam] = useState("");
  const [buttonRotate, setButtonRotate] = useState(false);
  const [listView, setListView] = useState(false);
  const [gridView, setGridView] = useState(true);
  const [showClear, setShowClear] = useState(true);

  const api = "https://consumet-api-puce.vercel.app/";
  const backup_api = "https://aniwatch-api-production-68fd.up.railway.app/";
  const proxy = "https://fluoridated-recondite-coast.glitch.me/";
  const BEARER_TOKEN = import.meta.env.VITE_TMDB_BEARER_TOKEN;

  const headers = {
    Authorization: `Bearer ${BEARER_TOKEN}`,
    "Content-Type": "application/json;charset=utf-8",
  };

  const navigate = useNavigate();

  const requestAnime = async () => {
    setIsLoading(true);
    setError(false);
    try {
      const response = await fetch(
        `${proxy}${backup_api}/api/v2/hianime/search?q=${searchQuery}`
      );
      const data = await response.json();
      setAnimeResults(data.data.animes);
      setCurrentPage(data.data.currentPage);
      setTotalPages(data.data.totalPages);
      setIsLoading(false);
      setError(false);
    } catch (error) {
      console.error("Error fetching anime:", error.message);
      setIsLoading(false);
      setError(true);
    }
  };

  const requestMovie = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?query=${searchQuery}`,
        { headers }
      );
      const data = await response.json();
      const filteredResults = data.results.filter(
        (item) => item.media_type === "movie" || item.media_type === "tv"
      );
      setMovieResults(filteredResults);
    } catch (error) {
      console.error("Error fetching movies:", error.message);
    }
  };

  useEffect(() => {
    requestAnime();
    requestMovie();
    setNewQueryValue(searchQuery);
    document.title = `${searchQuery} - AniPulse`;
  }, [searchQuery]);

  const handleNewQuery = (event) => {
    setNewQueryValue(event.target.value);
  };

  const handleNewRequestAnime = async () => {
    setIsLoading(true);
    setError(false);
    try {
      const response = await fetch(
        `${proxy}${backup_api}/api/v2/hianime/search?q=${newQueryValue}`
      );
      const data = await response.json();
      setAnimeResults(data.data.animes);
      setCurrentPage(data.data.currentPage);
      setIsLoading(false);
      setError(false);
    } catch (error) {
      console.error("Error fetching anime:", error.message);
      setIsLoading(false);
      setError(true);
    }
  };

  const handleSearch = () => {
    handleNewRequestAnime();
    navigate(`/search/keyword/${encodeURIComponent(newQueryValue)}`);
    document.title = `${newQueryValue} - AniPulse`;
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

  const handleListView = () => {
    if (gridView) {
      setListView(true);
      setGridView(false);
    } else {
      setListView(true);
      setGridView(false);
    }
  };

  const handleGridView = () => {
    if (listView) {
      setGridView(true);
      setListView(false);
    } else {
      setGridView(true);
      setListView(false);
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
            base: "90%",
            sm: "95%",
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
              <BreadcrumbLink>Search / {searchQuery}</BreadcrumbLink>
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
                fontFamily="var(--font-family)"
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
                      {`Showing 1 - ${
                        isNaN(animePerPage) ? "0" : animePerPage
                      } of ${totalPages} Results`}
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
                  pointerEvents={isLoading === true ? "none" : "visible"}
                  opacity={isLoading === true ? "0.5" : 1}
                >
                  {isLoading === true ? (
                    <ButtonSpinner color="var(--accent-color)" />
                  ) : (
                    "Filter Now"
                  )}
                </Button>
              </Box>
            </Box>

            {/* Results */}
            <Box mt="20px">
              <Heading
                as="h1"
                color="#fff"
                textTransform="uppercase"
                fontSize={{ base: "24.83px", lg: "27.28px" }}
                lineHeight={{ base: "30px", lg: "34px" }}
                letterSpacing="1.5px"
                fontFamily="var(--font-family)"
                mb="20px"
              >
                Anime
              </Heading>
              {gridView ? (
                <GridView results={animeResults} />
              ) : (
                <ListView results={animeResults} />
              )}
            </Box>
            <Box mt="40px">
              <Heading
                as="h1"
                color="#fff"
                textTransform="uppercase"
                fontSize={{ base: "24.83px", lg: "27.28px" }}
                lineHeight={{ base: "30px", lg: "34px" }}
                letterSpacing="1.5px"
                fontFamily="var(--font-family)"
                mb="20px"
              >
                Movies & TV
              </Heading>
              {gridView ? (
                <GridView results={movieResults} />
              ) : (
                <ListView results={movieResults} />
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Filter;
