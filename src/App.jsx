import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { useEffect, useState } from "react";

//import Pages
import Home from "./pages/Home/Home";
import Trending from "./pages/Trending/Trending";
import Movies from "./pages/Movies/Movies";
import Popular from "./pages/Popular/Popular";
import Stream from "./pages/Stream/Stream";
import View from "./components/Anime/ViewAnime/View";
import Login from "./auth/Login/Login";
import Signup from "./auth/Signup/Signup";
import Profile from "./pages/Profile/Profile";
import GenresPage from "./pages/Home/GenresPage/GenresPage";

import ViewMovie from "./components/Movie/ViewMovie/ViewMovie";
import { PlayerContext } from "./contexts/PlayerContext";
import BackToTop from "./components/BackToTop";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" index element={<Home />} />
      <Route path="/auth/login" index element={<Login />} />
      <Route path="/auth/signup" index element={<Signup />} />
      <Route path="/trending" index element={<Trending />} />
      <Route path="/movies" index element={<Movies />} />
      <Route path="/popular" element={<Popular />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/anime/:id" element={<View />} />
      <Route path="/anime/genre/:genre" element={<GenresPage />} />
      <Route path="/movie/:id" element={<ViewMovie />} />
      <Route path="/tv/:id" element={<ViewMovie />} />
      <Route path="/watch/:watchId" element={<Stream />} />
    </>
  )
);

const App = () => {
  const [selectedQuality, setSelectedQuality] = useState(null);
  const [availableQualities, setAvailableQualities] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("theme");

    if (stored !== "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      return;
    }
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        selectedQuality,
        availableQualities,
        setSelectedQuality,
        setAvailableQualities,
      }}
    >
      <RouterProvider router={router} />
      {/* Back to top */}
      <BackToTop />
    </PlayerContext.Provider>
  );
};

export default App;
