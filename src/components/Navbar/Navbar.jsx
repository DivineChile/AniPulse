import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  Box,
  Heading,
  List,
  Text,
  Image,
  Flex,
  useBreakpointValue,
  Group,
  Button,
  Input,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { NavList } from "./utils/NavUtil";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../index.css";
import "./style.css";
import SearchBar from "../Anime/SearchBar/SearchBar";
import { X, TvMinimalPlay, Search, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { auth } from "../../firebase";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const [profileDialogState, setProfileDialogState] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation().pathname;
  const navigate = useNavigate();
  // const toast = useToast();
  let userName = "";

  const toastStyles = {
    background: "orange",
    color: "var(--text-color)",
    borderRadius: "10px",
    width: "300px",
  };

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

  // const userSignedOut = () => {
  //   signOut(auth)
  //     .then(() => {
  //       toast({
  //         title: "Sign Out Successful",
  //         description: "You have successfully signed out.",
  //         status: "success",
  //         duration: 3000,
  //         isClosable: true,
  //         containerStyle: toastStyles,
  //       });
  //       setProfileDialogState(false);
  //       navigate("/");
  //     })
  //     .catch(() => {
  //       toast({
  //         title: "Sign Out Error",
  //         description: "An error occured during sign out",
  //         status: "error",
  //         duration: 3000,
  //         isClosable: true,
  //         style: {
  //           background: "var(--accent-color)",
  //           color: "#fff",
  //         },
  //       });
  //     });
  // };

  const openNavbar = () => {
    setIsOpen(!isOpen);
  };

  if (authUser != null && authUser.displayName == null) {
    userName = authUser.email?.split("@")[0];
  }

  //Navbar sticky feature
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLarge = useBreakpointValue({ base: false, lg: true });

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      w="100%"
      zIndex="99"
      py={{ base: "15px", lg: "20px" }}
      transition="all 0.25s ease"
      backdropFilter={scrolled ? "blur(12px)" : "blur(0px)"}
      backgroundColor={
        scrolled
          ? "rgba(11,15,20,0.95)" // blurred-dark-glass
          : "var(--primary-background-color)"
      }
      boxShadow={scrolled ? "0 2px 12px rgba(0,0,0,0.35)" : "none"}
      borderBottom={scrolled ? "1px solid rgba(255,255,255,0.06)" : "none"}
    >
      <Box
        maxW={{
          base: "90%",
          sm: "95%",
          xl: "85%",
          "2xl": "container.xl",
        }}
        margin="auto"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        {/* Logo */}
        <Box>
          <Heading m="0">
            <Link
              to="/"
              className="logo"
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <TvMinimalPlay
                className="logo_icon"
                size={30}
                color="var(--primary-color)"
              />
              <Flex gap="0">
                <Text
                  as="span"
                  color="var(--secondary-color)"
                  _hover={{
                    color: "var(--primary-color)",
                  }}
                  transition="all ease 0.25s"
                >
                  Ani
                </Text>
                <Text
                  className="logo_tag"
                  as="span"
                  color="var(--primary-color)"
                  _hover={{ color: "var(--secondary-color)" }}
                  transition="all ease 0.25s"
                >
                  Pulse
                </Text>
              </Flex>
            </Link>
          </Heading>
        </Box>

        {/* links */}
        <Box display="flex" alignItems="center" gap="0 20px">
          <List.Root
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
            backdropBlur={scrolled ? "12px" : "0px"}
            backgroundColor={
              scrolled
                ? "rgba(11,15,20,0.95)" // blurred-dark-glass
                : "var(--primary-background-color)"
            }
            boxShadow={scrolled ? "0 2px 12px rgba(0,0,0,0.35)" : "none"}
            transition="all ease 0.3s"
            width={{ base: "100%", lg: "fit-content" }}
            flexWrap="wrap"
            pos={{ base: "absolute", lg: "initial" }}
            left="0"
            top={{ base: "70px", sm: "70px", md: "70px", lg: "none" }}
            p={isOpen ? { base: "20px", lg: "0" } : { base: "0 20px", lg: "0" }}
            gap={{ base: "10px 0", lg: "0" }}
            h={
              isOpen
                ? {
                    base: "calc(100dvh - 70px)",
                    sm: "calc(100dvh - 71px)",
                    md: "calc(100dvh - 71px)",
                    lg: "initial",
                  }
                : { base: "0", lg: "initial" }
            }
            zIndex="999"
          >
            {NavList.map((item, key) => {
              const isActive =
                location === item.to ||
                location.includes(`${item.label.toLowerCase()}`);

              return (
                <List.Item
                  className={`nav-item${isActive ? " active" : ""}`}
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
                  <Link
                    to={item.to}
                    style={{
                      color: isActive
                        ? "var(--link-hover-color)"
                        : "var(--text-color)",
                    }}
                  >
                    {item.label}
                  </Link>
                </List.Item>
              );
            })}
            {/* {authUser != null ? (
              <ListItem
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
              </ListItem>
            ) : (
              <></>
            )} */}
            {/* <Box
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
                      onClick={userSignedOut}
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
            </Box> */}
          </List.Root>

          {isLarge && (
            <Button
              h="40px"
              w={{ base: "100%", lg: "300px", xl: "350px", "2xl": "400px" }}
              color="var(--text-secondary)"
              variant="surface"
              display="flex"
              gap="15px"
              justifyContent="flex-start"
              alignItems="center"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search color="var(--link-hover-color)" />
              <Text as="span"> Search anime or movies...</Text>
            </Button>
          )}

          {!isLarge && (
            <IconButton
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              variant="surface"
            >
              <Search size={20} color="var(--link-hover-color)" />
            </IconButton>
          )}

          {/* SEARCH MODAL */}
          <SearchBar
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
          />
          {isOpen ? (
            <IconButton
              onClick={openNavbar}
              aria-label="Close Menu"
              variant="surface"
              hideFrom="lg"
            >
              <X h="15px" w="19.5px" color="var(--link-hover-color)" />
            </IconButton>
          ) : (
            <IconButton
              onClick={openNavbar}
              aria-label="Open Menu"
              variant="surface"
              hideFrom="lg"
            >
              <Menu size={20} color="var(--link-hover-color)" />
            </IconButton>
          )}

          {/* Auth Links */}
          {/* <Box className="authCon" pos="relative" hideBelow="lg">
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
              zIndex={profileDialogState ? "3" : "-1"}
              flexDir="column"
              gap="10px"
              opacity={profileDialogState ? "1" : "0"}
            >
              <Box>
                <Text color="var(--text-color)" fontSize="13px">
                  {authUser != null
                    ? authUser.displayName
                      ? authUser.displayName
                      : userName
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
          </Box> */}
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
