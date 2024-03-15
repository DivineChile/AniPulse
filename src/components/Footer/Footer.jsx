import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
} from "@chakra-ui/react";
import { Form, Link } from "react-router-dom";

import footerImg from "../../assets/footer.png";
import "./style.css";

const Footer = () => {
  return (
    <Box>
      <Box
        bg={`url(${footerImg})`}
        bgPos="center"
        bgRepeat="no-repeat"
        bgSize="cover"
        py="40px"
      >
        {/* Footer Main */}
        <Box
          maxW={{
            base: "95%",
            xl: "85%",
            "2xl": "container.xl",
          }}
          margin="auto"
          display="flex"
          flexDir={{ base: "column", md: "row" }}
          gap={{ base: "40px 0", md: "0" }}
          alignItems="center"
          justifyContent={{ base: "center", md: "space-between" }}
        >
          {/* Footer con */}
          <Box w={{ base: "100%", md: "50%" }}>
            <Heading
              m="0"
              mb="20px"
              textAlign={{ base: "center", md: "start" }}
            >
              <Link to="/" className="logo">
                <Text as="span" color="var(--secondary-color)">
                  Ani
                </Text>
                <Text
                  className="logo_tag"
                  as="span"
                  color="var(--primary-color)"
                >
                  Pulse
                </Text>
              </Link>
            </Heading>

            <Text
              color="var(--text-color)"
              fontSize={{ base: "11.44px", md: "17.3px" }}
              fontWeight="400"
              lineHeight={{ base: "18px", md: "27px" }}
              letterSpacing="0.5px"
              w={{ base: "100%", md: "100%", lg: "70%" }}
              textAlign={{ base: "center", md: "start" }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laboriosam, laborum? Quaerat voluptates fugit asperiores
              dignissimos itaque eveniet? Voluptate, quam perferendis!
            </Text>
          </Box>

          {/* Footer newsletter */}
          <Box w={{ base: "100%", md: "40%" }} display="flex" flexDir="column">
            <Heading
              as="h3"
              textTransform="uppercase"
              mb="5px"
              color="#fff"
              fontSize={{ base: "20.11px", md: "27.54px" }}
              fontWeight="500"
              lineHeight={{ base: "24.2px", md: "33px" }}
              letterSpacing="1.5px"
              textAlign={{ base: "center", md: "start" }}
            >
              Get notified
            </Heading>
            <Text
              as="p"
              fontSize={{ base: "11.81px", md: "17.72px" }}
              fontWeight="400"
              lineHeight={{ base: "18px", md: "27px" }}
              letterSpacing="0.5px"
              color="#d4d4d4"
              textAlign={{ base: "center", md: "start" }}
            >
              get emails on latest news about anime and more.
            </Text>

            <Box my="20px">
              <Form>
                <FormControl>
                  <InputGroup>
                    <Input
                      placeholder="info@example.com"
                      color="#fff"
                      height="43px"
                      _focus={{
                        boxShadow: "0 0 5px 0 var(--accent-color)",
                        borderColor: "var(--accent-color)",
                      }}
                      _hover={{
                        outline: "none",
                        borderColor: "var(--accent-color)",
                        background: "none",
                      }}
                    />

                    <InputRightAddon
                      height="43px"
                      background="none"
                      w="141.38px"
                    >
                      <Button
                        type="submit"
                        w="100%"
                        height="100%"
                        background="none"
                        color="#fff"
                        fontSize={{ base: "11px", md: "20px" }}
                        fontWeight="600"
                        lineHeight={{ base: "18px", md: "30px" }}
                        letterSpacing="1px"
                        transition="all ease 0.25s"
                        _hover={{
                          background: "none",
                          color: "var(--accent-color)",
                        }}
                      >
                        Subscribe
                      </Button>
                    </InputRightAddon>
                  </InputGroup>
                </FormControl>
              </Form>
            </Box>

            <Text
              as="span"
              fontSize="13.45px"
              fontWeight="300"
              lineHeight="21px"
              letterSpacing="0.5px"
              color="#d4d4d4"
              textAlign={{ base: "center", md: "start" }}
            >
              By subscribing you agree to our terms and conditions.
            </Text>
          </Box>
        </Box>
      </Box>
      <Box bg="var(--primary-background-color)" py="20px">
        <Box
          maxW={{
            base: "95%",
            xl: "85%",
            "2xl": "container.xl",
          }}
          margin="auto"
          display="flex"
          flexDir={{ base: "column", md: "row" }}
          alignItems="center"
          justifyContent={{ base: "center", md: "space-between" }}
        >
          {/* Copyright */}
          <Box>
            <Text
              as="p"
              fontSize={{ base: "12.59px", md: "15.5px" }}
              fontWeight="400"
              lineHeight={{ base: "30px", md: "24px" }}
              color="#808080"
              letterSpacing="0.5px"
            >
              &copy;
              {` ${new Date().getFullYear()} All rights reserved by AniPulse.`}
            </Text>
          </Box>

          {/* Privacy Policy */}
          <Box display="flex" gap="20px">
            <Link className="policy">Privacy Policy</Link>
            <Link className="policy">Comments Policy</Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
