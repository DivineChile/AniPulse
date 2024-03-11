import {
  Box,
  FormControl,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import Navbar from "../../components/Navbar/Navbar";

// import icons / images
import userIcon from "../../assets/user.svg";
import eyeIcon from "../../assets/eye.svg";
import banner1 from "../../assets/banner-img-1.png";
import { Form } from "react-router-dom";

const Signup = () => {
  return (
    <Box>
      <Navbar />
      <Box
        px={{ base: "20px", lg: "20px", xl: "100px" }}
        bg={`url(${banner1})`}
        backgroundBlendMode="overlay"
        backgroundColor="rgba(0,0,0,0.5)"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          width="450px"
          p="40px 40px"
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
            Sign up
          </Heading>

          <Form style={{ width: "100%" }}>
            <FormControl mb="20px">
              <Input
                type="email"
                placeholder="username or email address"
                height="56px"
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
            </FormControl>
            <FormControl mb="20px">
              <InputGroup>
                <Input
                  type="password"
                  placeholder="enter password"
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
                  borderTop="1px solid #b4b4b4"
                  borderRight="1px solid #b4b4b4"
                  borderBottom="1px solid #b4b4b4"
                  borderLeft="none"
                  borderTopRightRadius="10px"
                  borderBottomRightRadius="10px"
                >
                  <Image src={eyeIcon} h="16px" w="19.7px" cursor="pointer" />
                </InputRightAddon>
              </InputGroup>
            </FormControl>
            <FormControl mb="20px">
              <InputGroup>
                <Input
                  type="password"
                  placeholder="confirm password"
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
                  borderTop="1px solid #b4b4b4"
                  borderRight="1px solid #b4b4b4"
                  borderBottom="1px solid #b4b4b4"
                  borderLeft="none"
                  borderTopRightRadius="10px"
                  borderBottomRightRadius="10px"
                >
                  <Image src={eyeIcon} h="16px" w="19.7px" cursor="pointer" />
                </InputRightAddon>
              </InputGroup>
            </FormControl>
          </Form>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;
