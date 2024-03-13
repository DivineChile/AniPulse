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
import { useState } from "react";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import googleIcon from "../../assets/googleIcon.svg";
import eyeIcon from "../../assets/eye.svg";
import facebookIcon from "../../assets/facebookIcon.svg";
import emailIcon from "../../assets/emailIcon.svg";
import userIcon from "../../assets/user.svg";
import loginBanner from "../../assets/loginBanner.png";

const Login = () => {
  const [SignInWithProviders, setSignInWithProviders] = useState(true);
  const [signInWithEmail, setSignInWithEmail] = useState(false);
  const [type, setType] = useState(false);

  const handleInputType = () => {
    setType(!type);
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    recieveEmails: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({ ...prevData, [name]: newValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic form validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    let isValid = true;

    if (!formData.email || !emailRegex.test(formData.email)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "Invalid email" }));
      isValid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    }

    if (!formData.password || formData.password.length < 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 6 characters",
      }));
      isValid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    }

    // If the form is valid, Submit Form
    if (isValid) {
      console.log(formData);

      setFormData({
        email: "",
        password: "",
        recieveEmails: false,
      });
    }
  };

  const handleEmailSignIn = () => {
    setSignInWithProviders(false);
    setSignInWithEmail(true);
  };

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
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
          >
            {SignInWithProviders && (
              <>
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
                    onClick={handleEmailSignIn}
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
              </>
            )}

            {signInWithEmail && (
              <>
                <FormControl mb="20px" isInvalid={Boolean(errors.email)}>
                  <Input
                    type="email"
                    placeholder="username or email address"
                    height="56px"
                    value={formData.email}
                    onChange={handleChange}
                    name="email"
                    width="100%"
                    borderRadius="10px"
                    border="1px solid #b4b4b4"
                    color="#fff"
                    _hover={{
                      outline: "none",
                      borderColor: "#ffd700",
                    }}
                    _focus={{
                      boxShadow: "0 0 5px 0 #ffd700",
                      borderColor: "#ffd700",
                    }}
                  />
                  {errors.email ? (
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  ) : (
                    <></>
                  )}
                </FormControl>
                <FormControl mb="20px" isInvalid={Boolean(errors.password)}>
                  <InputGroup>
                    <Input
                      type={type ? "text" : "password"}
                      placeholder="enter password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      height="56px"
                      width="100%"
                      borderRadius="10px"
                      border="1px solid #b4b4b4"
                      borderRight="none"
                      color="#fff"
                      _hover={{
                        outline: "none",
                        borderColor: "#ffd700",
                      }}
                      _focus={{
                        boxShadow: "0 0 5px 0 #ffd700",
                        borderColor: "#ffd700",
                      }}
                    />
                    <InputRightAddon
                      h="56px"
                      bg="none"
                      borderTop={errors.password ? "none" : "1px solid #b4b4b4"}
                      borderRight={
                        errors.password ? "none" : "1px solid #b4b4b4"
                      }
                      borderBottom={
                        errors.password ? "none" : "1px solid #b4b4b4"
                      }
                      borderLeft="none"
                      borderTopRightRadius="10px"
                      borderBottomRightRadius="10px"
                      boxShadow={errors.password ? "0 0 0 1px #e53e3e" : "none"}
                    >
                      <Image
                        src={eyeIcon}
                        h="16px"
                        w="19.7px"
                        cursor="pointer"
                        onClick={handleInputType}
                      />
                    </InputRightAddon>
                  </InputGroup>
                  {errors.password ? (
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  ) : (
                    <></>
                  )}
                </FormControl>
              </>
            )}

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

            {signInWithEmail && (
              <>
                <Button
                  type="submit"
                  textTransform="uppercase"
                  height="52px"
                  width="100%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  border="2px solid #ffd700"
                  color="#fff"
                  borderRadius="10px"
                  background="none"
                  fontSize="23.44px"
                  lineHeight="37.5px"
                  letterSpacing="0.5px"
                  fontWeight="500"
                  mb="20px"
                  _hover={{ background: "#ffd700" }}
                >
                  Log in
                </Button>
              </>
            )}

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
