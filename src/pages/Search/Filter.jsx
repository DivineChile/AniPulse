import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Link as ChakraLink,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useParams } from "react-router-dom";
import { ChevronDownIcon } from "@chakra-ui/icons";

import Navbar from "../../components/Navbar/Navbar";
import filterIcon from "../../assets/filterIcon.svg";
import { filterTypes } from "./utils/FilterTypes";
import { filterLetters } from "./utils/FilterLetters";
import { useState } from "react";

import "./style.css";

const Filter = () => {
  const { searchQuery } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [newQueryValue, setNewQueryValue] = useState("");
  const [newQueryParam, setNewQueryParam] = useState("");
  const [buttonRotate, setButtonRotate] = useState(false);

  const handleSearchQuery = async () => {
    setButtonRotate(!buttonRotate);
    console.log(buttonRotate);
    const url = "https://api-amvstrm.nyt92.eu.org/api/v2/search";
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const body = JSON.stringify({
      search: searchQuery,
    });
    const options = {
      method: "POST",
      headers: headers,
      body: body,
    };
    try {
      setIsLoading(true);
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.results);
        setIsLoading(false);
        setError(false);
      } else {
        setError(true);
        setIsLoading(false);
      }
    } catch (error) {
      setError(true);
      setIsLoading(false);
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
          <Box mt="70px" display="flex" flexDir="column" gap="40px">
            <Box display="flex" alignItems="center" gap="40px">
              <Heading
                as="h1"
                color="#fff"
                textTransform="uppercase"
                fontSize="38.28px"
                lineHeight="44px"
                letterSpacing="1.5px"
              >
                Filter
              </Heading>
              <Flex alignItems="center" gap="20px">
                <Image src={filterIcon} h="20px" w="20px" />
                <Box>
                  <Text
                    color="#fff"
                    fontWeight="400"
                    textTransform="uppercase"
                    fontSize="20px"
                    lineHeight="44px"
                    letterSpacing="1.5px"
                  >
                    Showing 1 - 9 of 50 Anime
                  </Text>
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
                      onClick={handleSearchQuery}
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
                      onClick={handleSearchQuery}
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
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Filter;
