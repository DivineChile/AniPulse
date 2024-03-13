import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Link, Form } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import googleIcon from "../../assets/googleIcon.svg";
import facebookIcon from "../../assets/facebookIcon.svg";
import emailIcon from "../../assets/emailIcon.svg";
import userIcon from "../../assets/user.svg";
import loginBanner from "../../assets/loginBanner.png";

const Login = () => {
  return (
    <Box>
      <Navbar />
      <Box
        px={{ base: "20px", lg: "20px", xl: "100px" }}
        bg={`url(${loginBanner})`}
        backgroundBlendMode="overlay"
        backgroundColor="rgba(0,0,0,0.5)"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          width="450px"
          p="70px 40px"
          bg="rgba(0,0,0,0.7)"
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box w="101px" h="101px" mb="20px">
            <Image src={userIcon} />
          </Box>

          <Heading
            as="h3"
            fontSize={{ base: "37.81px" }}
            lineHeight={{ base: "48px" }}
            textTransform="uppercase"
            fontWeight="500"
            letterSpacing="1.5px"
            color="#fff"
            mb="20px"
          >
            LOG IN
          </Heading>

          <Form
            style={{ width: "100%" }}
            // onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
          >
            <FormControl mb="20px">
              <Box
                type="button"
                value="Enter"
                height="56px"
                width="100%"
                transition="all ease 0.5s"
                // onClick={handleGoogleSignIn}
                borderRadius="10px"
                border="1px solid #b4b4b4"
                color="#fff"
                _hover={{
                  outline: "none",
                  borderColor: "#ffd700",
                  transform: "scale(1.03)",
                }}
                _focus={{
                  boxShadow: "0 0 5px 0 #ffd700",
                  borderColor: "#ffd700",
                }}
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap="0 20px"
                cursor="pointer"
              >
                <Box>
                  <Image src={googleIcon} height="33px" width="28px" />
                </Box>
                <Text
                  as="span"
                  fontSize="14.41px"
                  fontWeight="400"
                  lineHeight="22.5px"
                  color="#fff"
                >
                  Continue With Google
                </Text>
              </Box>
            </FormControl>
            <FormControl mb="20px">
              <Box
                type="button"
                value="Enter"
                height="56px"
                width="100%"
                // onClick={handleFacebookSignIn}
                transition="all ease 0.5s"
                borderRadius="10px"
                border="1px solid #b4b4b4"
                color="#fff"
                _hover={{
                  outline: "none",
                  borderColor: "#ffd700",
                  transform: "scale(1.03)",
                }}
                _focus={{
                  boxShadow: "0 0 5px 0 #ffd700",
                  borderColor: "#ffd700",
                }}
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap="0 20px"
                cursor="pointer"
              >
                <Box>
                  <Image src={facebookIcon} height="33px" width="53px" />
                </Box>
                <Text
                  as="span"
                  fontSize="14.41px"
                  fontWeight="400"
                  lineHeight="22.5px"
                  color="#fff"
                >
                  Continue With Facebook
                </Text>
              </Box>
            </FormControl>
            <FormControl mb="20px">
              <Box
                type="button"
                value="Enter"
                height="56px"
                width="100%"
                transition="all ease 0.5s"
                borderRadius="10px"
                // onClick={handleEmailSignIn}
                border="1px solid #b4b4b4"
                color="#fff"
                _hover={{
                  outline: "none",
                  borderColor: "#ffd700",
                  transform: "scale(1.03)",
                }}
                _focus={{
                  boxShadow: "0 0 5px 0 #ffd700",
                  borderColor: "#ffd700",
                }}
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap="0 20px"
                cursor="pointer"
              >
                <Box>
                  <Image src={emailIcon} height="23px" width="53px" />
                </Box>
                <Text
                  as="span"
                  fontSize="14.41px"
                  fontWeight="400"
                  lineHeight="22.5px"
                  color="#fff"
                >
                  Continue With email
                </Text>
              </Box>
            </FormControl>

            <Box display="flex" gap="0 20px" justifyContent="center" mb="20px">
              <FormControl w="fit-content">
                <Checkbox name="recieveEmails" />
              </FormControl>
              <Text
                as="span"
                fontSize="15.38px"
                lineHeight="24px"
                letterSpacing="0.5px"
                color="var(--text-color)"
              >
                I wish to recieve news and promotions from ANIPLUSE Company by
                email.
              </Text>
            </Box>

            <Box textAlign="center" mb="20px">
              <Text
                as="span"
                fontSize="15.38px"
                lineHeight="24px"
                letterSpacing="0.5px"
                color="var(--text-color)"
                textAlign="center"
              >
                By continuing, you agree to ANIPULSE{" "}
                <Text as="p">
                  <Link style={{ color: "#ffd700" }}>Terms of Use</Link> and{" "}
                  <Link style={{ color: "#ffd700" }}>Privacy Policy.</Link>
                </Text>
              </Text>
            </Box>

            <Box textAlign="center">
              <Text
                as="span"
                fontSize="19.53px"
                lineHeight="24px"
                letterSpacing="0.5px"
                color="#fff"
                fontWeight="400"
                textAlign="center"
              >
                Create an account?{" "}
                <Link
                  style={{ color: "#ffd700", textDecoration: "underline" }}
                  to="/auth/signup"
                >
                  Sign Up
                </Link>
              </Text>
            </Box>
          </Form>
        </Box>
      </Box>
      <Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Login;
