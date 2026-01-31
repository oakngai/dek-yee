import { useContext, useState } from "react";
import Banner from "@/components/Banner";
import BookmarkCard from "@/components/BookmarkCard";
import Navbar from "@/components/Navbar";
import { BookmarkContext } from "../../lib/bookmark";
import { toast } from "sonner";

const Bookmarks = () => {
  const { bookmarks, setBookmarks } = useContext(BookmarkContext);

  const [novels, setNovels] = useState(Object.values(bookmarks));
  const [isEditing, setIsEditing] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  // Reset selectedItems when editing mode is turned off
  if (!isEditing && selectedItems.length > 0) {
    setSelectedItems([]);
  }

  const deleteSelectedItems = () => {
    const newNovels = novels.filter(
      (novel) => !selectedItems.includes(novel.bookId),
    );
    const newBookmarks = { ...bookmarks };
    selectedItems.forEach((bookId) => {
      delete newBookmarks[bookId];
    });
    setBookmarks(newBookmarks);
    setNovels(newNovels);
    toast.success("ลบรายการที่คั่นไว้เรียบร้อยแล้ว");
    setIsEditing(false);
    setSelectedItems([]);
  };

  return (
    <>
      <Navbar />
      <Banner />

      <h1 className="text-3xl font-bold md:max-w-3xl lg:max-w-5xl mx-auto px-2.5 mt-20">
        รายการที่คั่นไว้
      </h1>
      <div className="mt-3 border-b border-gray-300" />

      <div className="md:max-w-3xl lg:max-w-5xl mx-auto px-2.5">
        <div className="flex justify-between items-center my-6">
          <p className="font-medium text-sm text-gray-500">
            จำนวนทั้งหมด {novels.length} รายการ
          </p>
          {isEditing ? (
            <div className="flex gap-2">
              <button
                className="rounded-full border border-gray-500 px-5 py-2.5 cursor-pointer text-sm text-gray-500
                font-medium hover:bg-gray-100 hover:border-gray-500 transition-all duration-200"
                onClick={() => setIsEditing(false)}
              >
                ยกเลิก
              </button>
              <button
                className={`rounded-full border border-gray-500 px-5 py-2.5 cursor-pointer text-sm text-gray-500
                font-medium hover:bg-gray-100 hover:border-gray-500 transition-all duration-200 flex items-center gap-2 ${
                  selectedItems.length === 0 ? "opacity-50" : ""
                }`}
                onClick={deleteSelectedItems}
                disabled={selectedItems.length === 0}
              >
                <img src="./Trash.svg" alt="Trash" /> ลบ
              </button>
            </div>
          ) : (
            <button
              className="rounded-full border border-gray-500 px-5 py-2.5 cursor-pointer text-sm text-gray-500
              font-medium hover:bg-gray-100 hover:border-gray-500 transition-all duration-200"
              onClick={() => setIsEditing(true)}
            >
              แก้ไข
            </button>
          )}
        </div>
        <ul className="grid sm:grid-cols-2 gap-4 lg:grid-cols-3">
          {novels.toReversed().map((novel) => (
            <li key={novel.bookId}>
              <BookmarkCard
                {...novel}
                isEditing={isEditing}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="my-6 border-b border-gray-300" />
    </>
  );
};

export default Bookmarks;
