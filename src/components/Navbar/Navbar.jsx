import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  Avatar,
  Box,
  Button,
  Heading,
  List,
  ListItem,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { NavList } from "../utils/NavUtil";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../index.css";
import "./style.css";
import SearchBar from "../SearchBar/SearchBar";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { auth } from "../../firebase";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const [profileDialogState, setProfileDialogState] = useState(false);
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const userSignedOut = () => {
    signOut(auth)
      .then(() => {
        toast({
          title: "Sign Out Successful",
          description: "You have successfully signed out.",
          status: "success",
          duration: 3000,
          isClosable: true,
          style: {
            background: "var(--accent-color)",
            color: "#fff",
          },
        });
        setProfileDialogState(false);
        navigate("/");
      })
      .catch((error) => {
        toast({
          title: "Sign Out Error",
          description: "An error occured during sign out",
          status: "error",
          duration: 3000,
          isClosable: true,
          style: {
            background: "var(--accent-color)",
            color: "#fff",
          },
        });
      });
  };

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
      background="var(--primary-background-color)"
      width={{ base: "100%" }}
      py={{ base: "15px", lg: "20px" }}
      pos="relative"
      boxShadow="0 0 10px 0 rgba(0,0,0,0.3)"
      // border="1px solid red"
    >
      <Box
        maxW={{
          base: "95%",
          xl: "85%",
          "2xl": "container.xl",
        }}
        margin="auto"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
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
            overflowY={
              isOpen
                ? { base: "initial", md: "initial", lg: "initial" }
                : "initial"
            }
            overflowX={isOpen ? { base: "initial", md: "initial" } : "initial"}
            flexDir={{ base: "column", lg: "row" }}
            alignItems={{ base: "flex-start", lg: "center" }}
            justifyContent={{ base: "flex-start", lg: "center" }}
            boxShadow={{
              base: "0 4px 10px 0 rgba(0,0,0,0.25)",
              lg: "none",
            }}
            backgroundColor="var(--primary-background-color)"
            transition="all ease 0.3s"
            width={{ base: "100%", lg: "fit-content" }}
            flexWrap="wrap"
            pos={{ base: "absolute", lg: "initial" }}
            left="0"
            top={{ base: "70.89px", md: "74px", lg: "none" }}
            p={isOpen ? { base: "20px", lg: "0" } : { base: "0 20px", lg: "0" }}
            gap={{ base: "10px 0", lg: "0" }}
            h={
              isOpen
                ? { base: "fit-content", lg: "initial" }
                : { base: "0", lg: "initial" }
            }
            zIndex="999"
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
            {/* <ListItem
              className="nav-item"
              textAlign="center"
              mx={{ base: "5px", md: "10px" }}
              px={{ base: "5px", md: "10px" }}
              display={
                authUser != null ? (
                  isOpen ? (
                    { base: "block", lg: "none" }
                  ) : (
                    { base: "none", lg: "inline-block" }
                  )
                ) : (
                  <></>
                )
              }
              hideFrom="lg"
            >
              <Link to="/profile">Profile</Link>
            </ListItem> */}
            <Box
              className="authCon"
              hideFrom="lg"
              borderTop={isOpen ? "1px solid #333333" : "none"}
              w="100%"
              paddingTop="10px"
            >
              {authUser != null ? (
                <Box display={isOpen ? "flex" : "none"}>
                  <Box display="flex" alignItems="center" gap="20px" pt="10px">
                    <Text color="var(--text-color)">
                      {authUser != null ? (
                        authUser.displayName ? (
                          authUser.displayName
                        ) : (
                          authUser.email
                        )
                      ) : (
                        <></>
                      )}
                    </Text>
                    <Button
                      background="none"
                      border="1px solid var(--secondary-color)"
                      color="var(--secondary-color)"
                      fontWeight="normal"
                      transition="all ease 0.25s"
                      _hover={{
                        color: "var(--primary-background-color)",
                        background: "var(--accent-color)",
                        border: "1px solid var(--accent-color)",
                      }}
                    >
                      Sign Out
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Box gap="0 20px" display={isOpen ? "flex" : "none"}>
                  <Link to="/auth/signup" className="authLinks">
                    Sign Up
                  </Link>
                  <Link to="/auth/login" className="authLinks">
                    Sign In
                  </Link>
                </Box>
              )}
            </Box>
          </List>

          <SearchBar below="lg" />
          {isOpen ? (
            <Box
              height="40px"
              w="40px"
              _hover={{
                background: "#333333",
              }}
              background="#2a2a2a"
              transition="all ease 0.25s"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="40px"
              cursor="pointer"
              onClick={openNavbar}
              hideFrom="lg"
            >
              <CloseIcon h="15px" w="19.5px" color="var(--text-color)" />
            </Box>
          ) : (
            <Box
              height="40px"
              w="40px"
              _hover={{
                background: "#333333",
              }}
              background="#2a2a2a"
              transition="all ease 0.25s"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="40px"
              cursor="pointer"
              onClick={openNavbar}
              hideFrom="lg"
            >
              <HamburgerIcon
                h="30px"
                w="20.5px"
                color="var(--text-color)"
                cursor="pointer"
                transition="all ease 0.25s"
              />
            </Box>
          )}

          {/* Auth Links */}
          <Box className="authCon" pos="relative" hideBelow="lg">
            {authUser != null ? (
              <Avatar
                src={authUser.photoUrl}
                name={authUser.email}
                bg="var(--secondary-color)"
                color="var(--text-color)"
                transition="all ease 0.25s"
                _hover={{
                  background: "var(--accent-color)",
                  color: "var(--primary-background-color)",
                }}
                onMouseEnter={() => {
                  setProfileDialogState(true);
                }}
                cursor="pointer"
              />
            ) : (
              <Box gap="0 20px" display="flex">
                <Link to="/auth/signup" className="authLinks">
                  Sign Up
                </Link>
                <Link to="/auth/login" className="authLinks">
                  Sign In
                </Link>
              </Box>
            )}
            <Box
              top="55px"
              right="0"
              w="200px"
              bg="var(--primary-background-color)"
              p="20px"
              boxShadow="0 0 10px 0 rgba(0,0,0,0.6)"
              pos="absolute!important"
              borderRadius="10px"
              onMouseEnter={() => {
                setProfileDialogState(true);
              }}
              onMouseLeave={() => {
                setProfileDialogState(false);
              }}
              display="flex"
              transition="all ease 0.25s"
              zIndex={profileDialogState ? "1" : "-1"}
              flexDir="column"
              gap="10px"
              opacity={profileDialogState ? "1" : "0"}
            >
              <Box>
                <Text color="var(--text-color)" fontSize="13px">
                  {authUser != null
                    ? authUser.displayName
                      ? authUser.displayName
                      : authUser.email
                    : ""}
                </Text>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                w="100%"
                borderTop="1px solid #333333"
                pt="10px"
              >
                <Box w="50%">
                  <Link to="/profile" className="profileLink">
                    Go to Profile
                  </Link>
                </Box>
                <Box w="50%" display="flex" justifyContent="end">
                  <Button
                    width="90%"
                    border="1px solid var(--secondary-color)"
                    bg="none"
                    color="var(--secondary-color)"
                    onClick={userSignedOut}
                    _hover={{
                      background: "var(--accent-color)",
                      color: "var(--primary-background-color)",
                      border: "1px solid var(--accent-color)",
                    }}
                    fontSize="13px"
                    fontWeight="normal"
                    h="35px"
                  >
                    Sign Out
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
