import { Box, Heading, List, ListItem, Text } from "@chakra-ui/react";
import { NavList } from "../utils/NavUtil";
import { Link, useLocation } from "react-router-dom";
import "../../index.css";
import "./style.css";
import SearchBar from "../SearchBar/SearchBar";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation().pathname;

  const openNavbar = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = document.querySelectorAll(".navbar ul li.nav-item");

  const toggleNav = (link) => {
    let i = 0;
    while (i < navLinks.length) {
      if (navLinks[i].classList.contains("active")) {
        navLinks[i].classList.remove("active");
      }
      i++;
    }

    if (link) {
      link.classList.toggle("active");
    }
  };

  switch (location) {
    case "/":
      toggleNav(navLinks[0]);
      break;
    case "/trending":
      toggleNav(navLinks[1]);
      break;
    case "/movies":
      toggleNav(navLinks[2]);
      break;
    case "/popular":
      toggleNav(navLinks[3]);
      break;

    default:
      toggleNav(null);
      break;
  }

  return (
    // Navbar
    <Box
      className="navbar"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      background="var(--primary-background-color)"
      width={{ base: "100%" }}
      p={{ base: "15px 20px", lg: "20px 80px", xl: "20, 100px" }}
      pos="relative"
    >
      <Box>
        <Heading m="0">
          <Link to="/" className="logo">
            <Text as="span" color="var(--secondary-color)">
              Ani
            </Text>
            <Text className="logo_tag" as="span" color="var(--primary-color)">
              Pulse
            </Text>
          </Link>
        </Heading>
      </Box>

      <Box display="flex" alignItems="center" gap="0 20px">
        <List
          display={isOpen ? { base: "flex" } : { base: "flex", lg: "block" }}
          overflow={
            isOpen
              ? { base: "initial", md: "hidden", lg: "initial" }
              : "initial"
          }
          flexDir={{ base: "column", lg: "row" }}
          alignItems={{ base: "flex-start", lg: "center" }}
          justifyContent={{ base: "flex-start", lg: "center" }}
          boxShadow={{
            base: "0px 2px 4px 0px var(--secondary-color)",
            lg: "none",
          }}
          backgroundColor="var(--primary-background-color)"
          transition="all ease 0.5s"
          width={{ base: "100%", lg: "fit-content" }}
          flexWrap="wrap"
          pos={{ base: "absolute", lg: "initial" }}
          left="0"
          top={{ base: "70.89px", md: "74px", lg: "none" }}
          p={isOpen ? { base: "20px", lg: "0" } : { base: "0 20px", lg: "0" }}
          gap={{ base: "10px 0", lg: "0" }}
          h={
            isOpen
              ? { base: "250px", lg: "initial" }
              : { base: "0", lg: "initial" }
          }
          zIndex="1"
        >
          <SearchBar above="lg" displayProp={isOpen ? "block" : "none"} />
          {NavList.map((item, key) => {
            return (
              <ListItem
                className="nav-item"
                textAlign="center"
                mx={{ base: "5px", md: "10px" }}
                px={{ base: "5px", md: "10px" }}
                key={key}
                display={
                  isOpen
                    ? { base: "block", lg: "none" }
                    : { base: "none", lg: "inline-block" }
                }
              >
                <Link to={item.to}>{item.label}</Link>
              </ListItem>
            );
          })}
        </List>

        <SearchBar below="lg" />
        {isOpen ? (
          <CloseIcon
            h="15px"
            w="19.5px"
            color="var(--text-color)"
            cursor="pointer"
            hideFrom="lg"
            onClick={openNavbar}
          />
        ) : (
          <HamburgerIcon
            h="30px"
            w="19.5px"
            color="var(--text-color)"
            cursor="pointer"
            hideFrom="lg"
            onClick={openNavbar}
          />
        )}
      </Box>
    </Box>
  );
};

export default Navbar;
