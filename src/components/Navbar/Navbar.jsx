import { Box, Heading, List, ListItem, Text } from "@chakra-ui/react";
import { NavList } from "../utils/NavUtil";
import { Link, useLocation } from "react-router-dom";
import "../../index.css";
import "./style.css";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = () => {
  const location = useLocation().pathname;

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
      p="20px 100px"
    >
      <Box>
        <Heading m="0">
          <Link to="/" className="logo">
            <Text as="span" color="var(--text-color)">
              Ani
            </Text>
            <Text
              className="logo_tag"
              as="span"
              color="var(--primary-accent-color)"
            >
              Pulse
            </Text>
          </Link>
        </Heading>
      </Box>

      <Box display="flex" alignItems="center" gap="0 20px">
        <List
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
        >
          {NavList.map((item, key) => {
            return (
              <ListItem
                className="nav-item"
                textAlign="center"
                mx={{ base: "5px", md: "10px" }}
                px={{ base: "5px", md: "10px" }}
                key={key}
              >
                <Link to={item.to}>{item.label}</Link>
              </ListItem>
            );
          })}
        </List>

        <SearchBar />
      </Box>
    </Box>
  );
};

export default Navbar;
