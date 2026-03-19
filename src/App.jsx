import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Bookmarks from "./pages/bookmarks";
import Home from "./pages/home";
import Error from "./pages/error";
import NovelPage from "./pages/novel_page";
import ReadChapter from "./pages/read_chapter";
import { Toaster } from "sonner";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/bookmarks",
    element: <Bookmarks />,
  },
  {
    path: "/novel/:NovelId",
    element: <NovelPage />,
  },
  {
    path: "/novel/:NovelId/chapter/:Ch",
    element: <ReadChapter />,
  },
]);

const App = () => {
  return (
    <div>
      <Toaster richColors position="bottom-right" />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;