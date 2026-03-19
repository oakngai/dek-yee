import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useBookmarkStore = create(
  persist(
    (set) => ({
      bookmarks: {},
      
      setBookmarks: (newBookmarks) => set({ bookmarks: newBookmarks }),
      
      removeBookmarks: (keysToRemove) => set((state) => {
        const newBookmarks = { ...state.bookmarks };
        keysToRemove.forEach((key) => {
          delete newBookmarks[key];
        });
        return { bookmarks: newBookmarks };
      }),

      toggleBookmark: (bookmarkData) => set((state) => {
        const newBookmarks = { ...state.bookmarks };
        const key = bookmarkData.bookId;
        
        if (newBookmarks[key]) {
          delete newBookmarks[key];
        } else {
          newBookmarks[key] = {
            ...bookmarkData,
            bookAt: new Date().toISOString(),
          };
        }
        
        return { bookmarks: newBookmarks };
      }),
    }),
    {
      name: "bookmarks", 
    }
  )
);