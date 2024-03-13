import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

//import Pages
import Home from "./pages/Home/Home";
import Trending from "./pages/Trending/Trending";
import Movies from "./pages/Movies/Movies";
import Popular from "./pages/Popular/Popular";
import Stream from "./pages/Stream/Stream";
import View from "./components/ViewAnime/View";
import Filter from "./pages/Search/Filter";
import Login from "./auth/Login/Login";
import Signup from "./auth/Signup/Signup";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" index element={<Home />} />
      <Route path="/auth/login" index element={<Login />} />
      <Route path="/auth/signup" index element={<Signup />} />
      <Route path="/trending" index element={<Trending />} />
      <Route path="/movies" index element={<Movies />} />
      <Route path="/popular" element={<Popular />} />
      <Route path="/anime/:id" element={<View />} />
      <Route path="/search/keyword/:id" element={<Filter />} />
      <Route path="/watch/:coverImg/:watchId" element={<Stream />} />
    </>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
