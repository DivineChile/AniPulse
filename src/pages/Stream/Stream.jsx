import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Grid,
  GridItem,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import playIcon from "../../assets/playIcon.svg";

const Stream = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  return (
    <Box>
      <Navbar />

      <Box background="var(--primary-background-color)">
        <Box px={{ base: "20px", lg: "80px", xl: "100px" }} py="20px">
          {/* BreadCrumb Links */}
          <Breadcrumb mb="20px">
            <BreadcrumbItem
              fontSize={{ base: "15.13px", lg: "18.75px" }}
              lineHeight={{ base: "24px", lg: "30px" }}
              letterSpacing="0.5px"
              color="var(--text-color)"
              _hover={{ color: "var(--link-hover-color)" }}
            >
              <BreadcrumbLink as={Link} to="/">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem
              isCurrentPage
              fontSize={{ base: "15.13px", lg: "18.75px" }}
              lineHeight={{ base: "24px", lg: "30px" }}
              letterSpacing="0.5px"
              color="var(--link-color)"
              _hover={{ color: "var(--link-hover-color)" }}
            >
              <BreadcrumbLink>Stream</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          {/* Anime Stream */}
          <Box>
            <Grid
              gridTemplateColumns="repeat(6, 1fr)"
              gap={{ base: "20px 0", md: "0 10px" }}
            >
              {/* Anime Video */}
              <GridItem
                colSpan={{ base: 6, md: 4 }}
                h={{
                  base: "250px",
                  sm: "300px",
                  md: "350px",
                  lg: "450px",
                  "2xl": "600px",
                }}
                pos="relative"
              >
                <Box
                  w="100%"
                  h="100%"
                  bg="var(--secondary-accent-color)"
                  borderRadius="10px"
                ></Box>
                {/* Overlay */}
                <Box
                  bg="rgba(25, 27, 40, 0.7)"
                  pos="absolute"
                  top="0"
                  left="0"
                  w="100%"
                  h="100%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Box
                    border="1px solid var(--text-color)"
                    borderRadius="50%"
                    w={{ base: "80px", lg: "100px" }}
                    h={{ base: "80px", lg: "100px" }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    cursor="pointer"
                  >
                    <Image
                      src={playIcon}
                      h={{ base: "40px", lg: "50px" }}
                      w={{ base: "35px", lg: "44px" }}
                    />
                  </Box>
                </Box>
              </GridItem>
              {/* Anime Episodes */}
              <GridItem
                colSpan={{ base: 6, md: 2 }}
                h={{
                  base: "250px",
                  sm: "300px",
                  md: "350px",
                  lg: "450px",
                  "2xl": "600px",
                }}
              >
                <Box
                  w="100%"
                  h="100%"
                  bg="var(--secondary-accent-color)"
                  borderRadius="10px"
                ></Box>
              </GridItem>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Stream;
