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
import Popular from "./pages/Home/Popular/Popular";
import Stream from "./pages/Stream/Stream";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" index element={<Home />} />
      <Route path="/trending" index element={<Trending />} />
      <Route path="/movies" index element={<Movies />} />
      <Route path="/popular" element={<Popular />} />
      <Route path="/stream" element={<Stream />} />
    </>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
