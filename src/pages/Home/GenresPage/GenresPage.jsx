import {
  Box,
  Flex,
  Grid,
  Heading,
  Text,
  Button,
  IconButton,
  HStack,
  VStack,
  Badge,
  NativeSelect,
  Breadcrumb,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaThLarge, FaList } from "react-icons/fa";
import { ChevronLeft } from "lucide-react";
import Navbar from "../../../components/Navbar/Navbar";
import AnimeCard from "../../../components/Anime/AnimeCard/AnimeCard";
import SmallCard from "../../../components/Anime/SmallCard/SmallCard";
import Loading from "../../../components/ErrorPage/Loading";
import Error from "../../../components/ErrorPage/Error";
import { cacheFetch } from "../../../utils/cacheFetch";
import {
  AnimeCardSkeleton,
  SmallCardSkeleton,
} from "../../../components/Skeleton/CardSkeleton";

const GenresPage = () => {
  const { genre } = useParams();

  // State management
  const [error, setError] = useState(null);
  const [animeList, setAnimeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);

  // Filter & Sort states
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("popularity");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterYear, setFilterYear] = useState("all");

  const kenjitsu_api = "https://kenjitsu-api-production.up.railway.app/";

  // Format genre name for display
  const genreName = genre
    ? genre
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "";

  // Available genres for quick navigation
  const allGenres = [
    "Action",
    "Adventure",
    "Cars",
    "Comedy",
    "Dementia",
    "Demons",
    "Drama",
    "Ecchi",
    "Fantasy",
    "Game",
    "Harem",
    "Historical",
    "Horror",
    "Isekai",
    "Josei",
    "Kids",
    "Magic",
    "Martial-arts",
    "Mecha",
    "Military",
    "Music",
    "Mystery",
    "Parody",
    "Police",
    "Psychological",
    "Romance",
    "Samurai",
    "School",
    "Sci-fi",
    "Seinen",
    "Shoujo",
    "Shoujo-ai",
    "Shounen",
    "Shounen-ai",
    "Slice-of-life",
    "Space",
    "Sports",
    "Super-power",
    "Supernatural",
    "Thriller",
    "Vampire",
  ];

  // Generate year options (last 20 years)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 20 }, (_, i) => currentYear - i);

  // ============================================================
  // FETCH ANIME BY GENRE (Server-side pagination)
  // ============================================================
  useEffect(() => {
    const fetchAnimeByGenre = async () => {
      // Show appropriate loading state
      if (currentPage === 1) {
        setInitialLoading(true);
      } else {
        setPageLoading(true);
      }

      setError(null);

      try {
        // Build query params for API (if your API supports these filters)
        // Fetch from API
        const res = await fetch(
          `${kenjitsu_api}api/hianime/anime/genre/${genre}?page=${currentPage}`
        );
        const data = await res.json();
        console.log("API Response:", data);

        // Update state with API response
        setAnimeList(data.data || []);
        setCurrentPage(data.currentPage || currentPage);
        setTotalPages(data.lastPage || 1);
        setHasNextPage(data.hasNextPage || false);

        document.title = `${genreName} Anime - AniPulse`;
      } catch (err) {
        setError("Failed to load anime. Please try again.");
        console.error("Error fetching genre anime:", err);
      } finally {
        setInitialLoading(false);
        setPageLoading(false);
      }
    };

    if (genre) {
      fetchAnimeByGenre();
    }
  }, [genre]); // Only genre and currentPage trigger API calls

  // Useeffect for currentPage data fetching
  useEffect(() => {
    const fetchPageData = async () => {
      setPageLoading(true);
      setError(null);
      try {
        // Fetch from API
        const res = await fetch(
          `${kenjitsu_api}api/hianime/anime/genre/${genre}?page=${currentPage}`
        );
        const data = await res.json();

        console.log(currentPage);
        console.log("API Response:", data);

        // Update state with API response
        setAnimeList(data.data || []);
        setCurrentPage(data.currentPage || currentPage);
        setTotalPages(data.lastPage || 1);
        setHasNextPage(data.hasNextPage || false);
      } catch (err) {
        setError("Failed to load anime. Please try again.");
        console.error("Error fetching genre anime:", err);
      } finally {
        setPageLoading(false);
      }
    };
    if (genre) {
      fetchPageData();
    }
  }, [currentPage]);

  // ============================================================
  // CLIENT-SIDE FILTERING (on already fetched data)
  // ============================================================
  const [displayedAnime, setDisplayedAnime] = useState([]);

  useEffect(() => {
    let filtered = [...animeList];

    // Filter by type
    if (filterType !== "all") {
      filtered = filtered.filter(
        (anime) => anime.type?.toLowerCase() === filterType
      );
    }

    // Filter by status
    if (filterStatus !== "all") {
      filtered = filtered.filter((anime) => {
        if (filterStatus === "ongoing") {
          return anime.status?.toLowerCase().includes("currently");
        } else if (filterStatus === "completed") {
          return !anime.status?.toLowerCase().includes("currently");
        }
        return true;
      });
    }

    // Filter by year
    if (filterYear !== "all") {
      filtered = filtered.filter((anime) =>
        anime.releaseDate?.includes(filterYear)
      );
    }

    // Sort
    switch (sortBy) {
      case "rating":
        filtered.sort((a, b) => (b.score || 0) - (a.score || 0));
        break;
      case "title":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "release":
        filtered.sort(
          (a, b) =>
            parseInt(b.releaseDate || "0") - parseInt(a.releaseDate || "0")
        );
        break;
      case "popularity":
      default:
        break;
    }

    setDisplayedAnime(filtered);
  }, [animeList, sortBy, filterType, filterStatus, filterYear]);

  // ============================================================
  // RESET TO PAGE 1 WHEN GENRE CHANGES
  // ============================================================
  useEffect(() => {
    setCurrentPage(1);
    setFilterType("all");
    setFilterStatus("all");
    setFilterYear("all");
    setSortBy("popularity");
  }, [genre]);

  // ============================================================
  // SCROLL TO TOP ON PAGE CHANGE
  // ============================================================
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // ============================================================
  // LOADING STATE
  // ============================================================
  if (initialLoading) {
    return (
      <Box>
        <Navbar />
        <Loading
          bg="var(--linear-gradient)"
          isLoading={initialLoading}
          pos="absolute"
          top={{ base: "70px", md: "73px", lg: "84px" }}
          height={{
            base: "calc(100dvh - 70px)",
            md: "calc(100dvh - 73px)",
            lg: "calc(100dvh - 84px)",
          }}
        />
      </Box>
    );
  }

  // ============================================================
  // ERROR STATE
  // ============================================================
  if (error) {
    return (
      <Box>
        <Navbar />
        <Error
          height="100vh"
          bg="var(--primary-background-color)"
          msg={error}
        />
      </Box>
    );
  }

  return (
    <Box bg="var(--primary-background-color)" minH="100vh">
      <Navbar />

      {/* PAGE HEADER */}
      <Box
        bg="var(--linear-gradient)"
        borderBottom="1px solid rgba(255, 255, 255, 0.05)"
        pt={{ base: "90px", md: "100px" }}
        pb={{ base: "24px", md: "32px" }}
      >
        <Box
          maxW={{
            base: "90%",
            sm: "95%",
            xl: "85%",
            "2xl": "container.xl",
          }}
          mx="auto"
        >
          {/* BACK BUTTON & BREADCRUMB */}
          <Flex alignItems="center" gap="12px" mb="20px">
            <IconButton
              as={Link}
              to="/anime"
              aria-label="Back to anime"
              size="sm"
              bg="rgba(28, 28, 28, 0.8)"
              border="1px solid rgba(255, 255, 255, 0.1)"
              color="var(--text-color)"
              borderRadius="8px"
              _hover={{
                bg: "var(--primary-color)",
                borderColor: "var(--primary-color)",
              }}
              transition="all 0.2s ease"
            >
              <ChevronLeft size={14} />
            </IconButton>

            <Breadcrumb.Root
              fontSize="13px"
              color="var(--text-secondary)"
              fontWeight="500"
            >
              <Breadcrumb.List>
                <Breadcrumb.Item>
                  <Breadcrumb.Link
                    as={Link}
                    to="/anime"
                    _hover={{ color: "var(--link-color)" }}
                    transition="color 0.2s"
                  >
                    Anime
                  </Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator />
                <Breadcrumb.Item>
                  <Breadcrumb.Link href="#">Genres</Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator />
                <Breadcrumb.Item>
                  <Breadcrumb.CurrentLink color="var(--text-color)">
                    {genreName}
                  </Breadcrumb.CurrentLink>
                </Breadcrumb.Item>
              </Breadcrumb.List>
            </Breadcrumb.Root>
          </Flex>

          {/* PAGE TITLE */}
          <Heading
            as="h1"
            fontSize={{ base: "32px", md: "40px", lg: "48px" }}
            fontWeight="700"
            color="var(--text-color)"
            mb="12px"
          >
            {genreName} Anime
          </Heading>

          <Text
            fontSize={{ base: "14px", md: "16px" }}
            color="var(--text-secondary)"
            mb="24px"
          >
            Discover the best {genreName.toLowerCase()} anime
            {totalPages > 0 && ` • Page ${currentPage} of ${totalPages}`}
          </Text>

          {/* GENRE PILLS - QUICK NAVIGATION */}
          <Flex
            gap="8px"
            flexWrap="wrap"
            overflowX="auto"
            pb="8px"
            css={{
              "&::-webkit-scrollbar": { display: "none" },
              scrollbarWidth: "none",
            }}
          >
            {allGenres.map((g) => (
              <Badge
                key={g}
                as={Link}
                to={`/anime/genre/${g.toLowerCase().replace(/\s+/g, "-")}`}
                bg={
                  g.toLowerCase().replace(/\s+/g, "-") === genre
                    ? "var(--accent-color)"
                    : "rgba(255, 255, 255, 0.05)"
                }
                border="1px solid"
                borderColor={
                  g.toLowerCase().replace(/\s+/g, "-") === genre
                    ? "var(--accent-color)"
                    : "rgba(255, 255, 255, 0.1)"
                }
                color={
                  g.toLowerCase().replace(/\s+/g, "-") === genre
                    ? "var(--text-color)"
                    : "var(--text-secondary)"
                }
                fontSize="12px"
                fontWeight="500"
                px="14px"
                py="6px"
                borderRadius="20px"
                cursor="pointer"
                whiteSpace="nowrap"
                _hover={{
                  bg:
                    g.toLowerCase().replace(/\s+/g, "-") === genre
                      ? "var(--accent-color)"
                      : "rgba(255, 255, 255, 0.08)",
                  borderColor:
                    g.toLowerCase().replace(/\s+/g, "-") === genre
                      ? "var(--accent-color)"
                      : "rgba(255, 255, 255, 0.2)",
                  transform: "scale(1.05)",
                }}
                transition="all 0.2s ease"
              >
                {g}
              </Badge>
            ))}
          </Flex>
        </Box>
      </Box>

      {/* FILTERS & CONTENT */}
      <Box
        maxW={{
          base: "90%",
          sm: "95%",
          xl: "85%",
          "2xl": "container.xl",
        }}
        mx="auto"
        py={{ base: "24px", md: "40px" }}
      >
        {/* FILTER & SORT BAR */}
        <Flex
          direction={{ base: "column", md: "row" }}
          gap="12px"
          mb="32px"
          alignItems={{ base: "stretch", md: "center" }}
          justifyContent="space-between"
          bg="var(--card-background-color)"
          border="1px solid rgba(255, 255, 255, 0.05)"
          borderRadius="12px"
          p={{ base: "16px", md: "20px" }}
        >
          {/* LEFT SIDE - FILTERS */}
          <Flex gap="12px" flexWrap={{ base: "wrap", md: "nowrap" }} flex="1">
            {/* TYPE FILTER */}
            <Box minW={{ base: "140px", md: "160px" }}>
              <NativeSelect.Root
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                size="md"
                bg="rgba(255, 255, 255, 0.05)"
                border="1px solid rgba(255, 255, 255, 0.1)"
                color="var(--text-color)"
                borderRadius="8px"
                _hover={{
                  borderColor: "rgba(255, 255, 255, 0.2)",
                }}
                _focus={{
                  borderColor: "var(--accent-color)",
                  boxShadow: "none",
                }}
              >
                <NativeSelect.Field placeholder="Select type">
                  <option value="all">All Types</option>
                  <option value="tv">TV Series</option>
                  <option value="movie">Movies</option>
                  <option value="ova">OVA</option>
                  <option value="ona">ONA</option>
                  <option value="special">Special</option>
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </Box>

            {/* STATUS FILTER */}
            <Box minW={{ base: "140px", md: "160px" }}>
              <NativeSelect.Root
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                size="md"
                bg="rgba(255, 255, 255, 0.05)"
                border="1px solid rgba(255, 255, 255, 0.1)"
                color="var(--text-color)"
                borderRadius="8px"
                _hover={{
                  borderColor: "rgba(255, 255, 255, 0.2)",
                }}
                _focus={{
                  borderColor: "var(--accent-color)",
                  boxShadow: "none",
                }}
              >
                <NativeSelect.Field placeholder="Select status">
                  <option value="all">All Status</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </Box>

            {/* YEAR FILTER */}
            <Box minW={{ base: "140px", md: "160px" }}>
              <NativeSelect.Root
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                size="md"
                bg="rgba(255, 255, 255, 0.05)"
                border="1px solid rgba(255, 255, 255, 0.1)"
                color="var(--text-color)"
                borderRadius="8px"
                _hover={{
                  borderColor: "rgba(255, 255, 255, 0.2)",
                }}
                _focus={{
                  borderColor: "var(--accent-color)",
                  boxShadow: "none",
                }}
              >
                <NativeSelect.Field placeholder="Select year">
                  <option value="all">All Years</option>
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </Box>
          </Flex>

          {/* RIGHT SIDE - SORT & VIEW */}
          <Flex gap="12px">
            {/* SORT BY */}
            <Box minW={{ base: "140px", md: "160px" }}>
              <NativeSelect.Root
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                size="md"
                bg="rgba(255, 255, 255, 0.05)"
                border="1px solid rgba(255, 255, 255, 0.1)"
                color="var(--text-color)"
                borderRadius="8px"
                _hover={{
                  borderColor: "rgba(255, 255, 255, 0.2)",
                }}
                _focus={{
                  borderColor: "var(--accent-color)",
                  boxShadow: "none",
                }}
              >
                <NativeSelect.Field placeholder="Sort by">
                  <option value="popularity">Popular</option>
                  <option value="rating">Top Rated</option>
                  <option value="title">A-Z</option>
                  <option value="release">Latest</option>
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </Box>

            {/* VIEW MODE TOGGLE */}
            <HStack gap="0">
              <IconButton
                aria-label="Grid view"
                size="md"
                bg={
                  viewMode === "grid"
                    ? "var(--accent-color)"
                    : "rgba(255, 255, 255, 0.05)"
                }
                border="1px solid"
                borderColor={
                  viewMode === "grid"
                    ? "var(--accent-color)"
                    : "rgba(255, 255, 255, 0.1)"
                }
                color={
                  viewMode === "grid"
                    ? "var(--text-color)"
                    : "var(--text-secondary)"
                }
                borderRadius="8px 0 0 8px"
                onClick={() => setViewMode("grid")}
                _hover={{
                  bg:
                    viewMode === "grid"
                      ? "var(--accent-color)"
                      : "rgba(255, 255, 255, 0.08)",
                }}
              >
                <FaThLarge />
              </IconButton>
              <IconButton
                aria-label="List view"
                size="md"
                bg={
                  viewMode === "list"
                    ? "var(--accent-color)"
                    : "rgba(255, 255, 255, 0.05)"
                }
                border="1px solid"
                borderColor={
                  viewMode === "list"
                    ? "var(--accent-color)"
                    : "rgba(255, 255, 255, 0.1)"
                }
                borderLeft="none"
                color={
                  viewMode === "list"
                    ? "var(--text-color)"
                    : "var(--text-secondary)"
                }
                borderRadius="0 8px 8px 0"
                onClick={() => setViewMode("list")}
                _hover={{
                  bg:
                    viewMode === "list"
                      ? "var(--accent-color)"
                      : "rgba(255, 255, 255, 0.08)",
                }}
              >
                <FaList />
              </IconButton>
            </HStack>
          </Flex>
        </Flex>

        {/* RESULTS COUNT */}
        <Text
          fontSize="14px"
          color="var(--text-secondary)"
          mb="20px"
          fontWeight="500"
        >
          {displayedAnime.length > 0
            ? `Showing ${displayedAnime.length} results on page ${currentPage}`
            : "No results found"}
        </Text>

        {/* ANIME GRID/LIST */}
        {pageLoading ? (
          // SKELETON LOADING FOR PAGE CHANGES
          <>
            {viewMode === "grid" ? (
              <Grid
                templateColumns={{
                  base: "repeat(2, 1fr)",
                  sm: "repeat(3, 1fr)",
                  md: "repeat(4, 1fr)",
                  lg: "repeat(5, 1fr)",
                  xl: "repeat(6, 1fr)",
                }}
                gap="16px"
                mb="40px"
                w="100%"
                overflow="hidden"
              >
                {[...Array(24)].map((_, idx) => (
                  <AnimeCardSkeleton key={idx} />
                ))}
              </Grid>
            ) : (
              <VStack spacing="12px" mb="40px" align="stretch">
                {[...Array(20)].map((_, idx) => (
                  <SmallCardSkeleton key={idx} />
                ))}
              </VStack>
            )}
          </>
        ) : displayedAnime.length > 0 ? (
          // ACTUAL CONTENT - Use displayedAnime (filtered) instead of filteredAnime
          <>
            {viewMode === "grid" ? (
              <Grid
                templateColumns={{
                  base: "repeat(2, 1fr)",
                  sm: "repeat(3, 1fr)",
                  md: "repeat(4, 1fr)",
                  lg: "repeat(5, 1fr)",
                  xl: "repeat(6, 1fr)",
                }}
                gap="16px"
                mb="40px"
              >
                {displayedAnime.map((anime) => (
                  <AnimeCard key={anime.id} anime={anime} />
                ))}
              </Grid>
            ) : (
              <VStack spacing="12px" mb="40px" align="stretch">
                {displayedAnime.map((anime) => (
                  <SmallCard key={anime.id} result={anime} />
                ))}
              </VStack>
            )}
          </>
        ) : (
          // EMPTY STATE
          <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            py="80px"
            gap="16px"
          >
            <Text fontSize="48px">🔍</Text>
            <Heading fontSize="24px" fontWeight="600" color="var(--text-color)">
              No Results Found
            </Heading>
            <Text
              fontSize="14px"
              color="var(--text-secondary)"
              textAlign="center"
              maxW="400px"
            >
              Try adjusting your filters or browse other genres
            </Text>
            <Button
              onClick={() => {
                setFilterType("all");
                setFilterStatus("all");
                setFilterYear("all");
                setSortBy("popularity");
              }}
              bg="var(--primary-color)"
              color="var(--text-color)"
              size="md"
              mt="16px"
              _hover={{
                filter: "brightness(110%)",
              }}
            >
              Reset Filters
            </Button>
          </Flex>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && !pageLoading && (
          <Flex
            justifyContent="center"
            alignItems="center"
            gap="12px"
            flexWrap="wrap"
          >
            {/* PREVIOUS BUTTON */}
            <IconButton
              aria-label="Previous page"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              bg="rgba(255, 255, 255, 0.05)"
              border="1px solid rgba(255, 255, 255, 0.1)"
              color="var(--text-color)"
              borderRadius="8px"
              _hover={{
                bg: "rgba(255, 255, 255, 0.08)",
                borderColor: "rgba(255, 255, 255, 0.2)",
              }}
              _disabled={{
                opacity: 0.4,
                cursor: "not-allowed",
              }}
            >
              <ChevronLeft />
            </IconButton>

            {/* PAGE NUMBERS */}
            <HStack spacing="8px">
              {[...Array(Math.min(totalPages, 5))].map((_, idx) => {
                let pageNum;

                if (totalPages <= 5) {
                  pageNum = idx + 1;
                } else if (currentPage <= 3) {
                  pageNum = idx + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + idx;
                } else {
                  pageNum = currentPage - 2 + idx;
                }

                return (
                  <Button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    bg={
                      currentPage === pageNum
                        ? "var(--primary-color)"
                        : "rgba(255, 255, 255, 0.05)"
                    }
                    border="1px solid"
                    borderColor={
                      currentPage === pageNum
                        ? "var(--primary-color)"
                        : "rgba(255, 255, 255, 0.1)"
                    }
                    color="var(--text-color)"
                    size="md"
                    minW="44px"
                    borderRadius="8px"
                    fontWeight="600"
                    _hover={{
                      bg:
                        currentPage === pageNum
                          ? "var(--primary-color)"
                          : "rgba(255, 255, 255, 0.08)",
                      borderColor:
                        currentPage === pageNum
                          ? "var(--primary-color)"
                          : "rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </HStack>

            {/* NEXT BUTTON */}
            <IconButton
              aria-label="Next page"
              disabled={!hasNextPage || currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              bg="rgba(255, 255, 255, 0.05)"
              border="1px solid rgba(255, 255, 255, 0.1)"
              color="var(--text-color)"
              borderRadius="8px"
              _hover={{
                bg: "rgba(255, 255, 255, 0.08)",
                borderColor: "rgba(255, 255, 255, 0.2)",
              }}
              _disabled={{
                opacity: 0.4,
                cursor: "not-allowed",
              }}
            >
              <ChevronLeft style={{ transform: "rotate(180deg)" }} />
            </IconButton>

            {/* PAGE INFO */}
            <Text
              fontSize="14px"
              color="var(--text-secondary)"
              ml="8px"
              display={{ base: "none", md: "block" }}
            >
              Page {currentPage} of {totalPages}
            </Text>
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default GenresPage;
