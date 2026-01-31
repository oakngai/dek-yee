import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Bookmarks from "./pages/bookmarks";
import Home from "./pages/home";
import Error from "./pages/error";
import NovelPage from "./pages/novel_page";
import ReadChapter from "./pages/read_chapter";
import { Bookmark } from "lucide-react";
import { BookmarkContext } from "./lib/bookmark";
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

const BOOKMARKS_STORAGE_KEY = "bookmarks";

const App = () => {
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const stored = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(bookmarks));
    } catch (error) {
      console.error("Failed to save bookmarks to localStorage:", error);
    }
  }, [bookmarks]);

  return (
    <div>
      <BookmarkContext.Provider value={{ bookmarks, setBookmarks }}>
        <Toaster richColors position="bottom-right" />
        <RouterProvider router={router} />
      </BookmarkContext.Provider>
    </div>
  );
};

export default App;
