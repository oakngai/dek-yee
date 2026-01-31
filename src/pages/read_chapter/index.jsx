import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { Bookmark, Eye, Home, TableOfContents } from "lucide-react";
import { mockNovels } from "../../constants/novels";
import { chapters } from "../../constants/chapters";
import Error from "../error";
import { BookmarkContext } from "../../lib/bookmark";
import { toast } from "sonner";

const ReadChapter = () => {
  const navigate = useNavigate();
  const { NovelId, Ch } = useParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { bookmarks, setBookmarks } = useContext(BookmarkContext);

  const novelData = mockNovels.find((novel) => novel.id.toString() === NovelId);
  const chapterData = chapters[NovelId];
  const chapterContent = chapterData
    ? chapterData.find((chapter) => chapter.chapter.toString() === Ch)
    : null;

  const key = `${NovelId}_${Ch}`;
  const isBookmark = !!bookmarks[key];

  if (!novelData || !chapterData) {
    return <Error />;
  }

  const handleBookmark = () => {
    const newBookmarks = { ...bookmarks };
    if (newBookmarks[key]) {
      delete newBookmarks[key];
    } else {
      newBookmarks[key] = {
        bookId: key,
        novelId: NovelId,
        chapter: Ch,
        chapterTitle: chapterContent.title,
        novelTitle: novelData.title,
        novelAuthor: novelData.author,
        novelThumbnail: novelData.thumbnail,
        bookAt: new Date().toISOString(),
      };
    }
    toast.success(isBookmark ? "ลบที่คั่นหน้าเรียบร้อยแล้ว" : "เพิ่มที่คั่นหน้าเรียบร้อยแล้ว");
    setBookmarks(newBookmarks);
  };

  return (
    <>
      <Navbar />
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
          <div className="bg-[#FFD166] rounded-xl shadow-lg w-full max-w-md mx-2 relative animate-fadeIn">
            <div className="flex items-center justify-between px-6 py-3 border-b border-yellow-300">
              <span className="text-lg font-bold text-white drop-shadow-sm">
                สารบัญ {chapterData.length} ตอน
              </span>
              <button
                className="text-white text-2xl font-bold hover:text-gray-200 transition absolute right-4 top-2"
                onClick={() => setIsDialogOpen(false)}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto bg-white rounded-b-xl">
              <ul>
                <li className="px-6 py-4 border-b border-gray-200 hover:bg-gray-100 cursor-pointer">
                  <p
                    className="font-medium"
                    onClick={() => {
                      navigate(`/novel/${NovelId}`);
                      setIsDialogOpen(false);
                    }}
                  >
                    กลับไปหน้านิยายเรื่องนี้
                  </p>
                </li>
                {chapterData.map((ch) => (
                  <li
                    key={ch.chapter}
                    className="px-6 py-4 border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      navigate(`/novel/${NovelId}/chapter/${ch.chapter}`);
                      setIsDialogOpen(false);
                    }}
                  >
                    <p className="font-medium">
                      ตอนที่ {ch.chapter}: {ch.title}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      <div className="md:max-w-3xl lg:max-w-5xl mx-auto px-2.5 mt-5">
        <div className="rounded-lg w-full bg-gray-200">
          <div className="flex justify-between items-center p-4 px-6 border-b border-gray-400 bg-gray-300 rounded-t-lg">
            <div className="flex gap-10 items-center">
              <button
                onClick={() => setIsDialogOpen(true)}
                className="rounded-full hover:cursor-pointer transition hover:bg-gray-400"
              >
                <TableOfContents />
              </button>
              <h2 className="text-lg font-bold">ตอนที่ {Ch}</h2>
            </div>
            <Bookmark
              className={`rounded-full hover:cursor-pointer transition hover:bg-gray-400 ${
                isBookmark ? "text-orange-400" : "text-black"
              }`}
              fill={isBookmark ? "currentColor" : "none"}
              onClick={handleBookmark}
            />
          </div>
          <div className="px-7.5 sm:px-15 py-10">
            <div className="flex flex-col justify-center items-center mb-10 gap-5">
              <p className="text-lg font-bold">{novelData.title}</p>
              <h1 className="text-2xl font-bold">
                ตอนที่ {Ch}: {chapterContent.title}
              </h1>
              <p className="text-sm">
                อัปเดตล่าสุด{" "}
                {new Date(chapterContent.publishedAt).toLocaleDateString(
                  "th-TH",
                  {
                    year: "2-digit",
                    month: "short",
                    day: "numeric",
                  },
                )}
              </p>
            </div>
            <div className="whitespace-pre-line font-medium text-md leading-7">
              {chapterContent.content}
            </div>
            <div className="flex flex-col justify-center items-center gap-2 mt-10">
              <p className="font-bold text-lg">เผยแพร่โดย</p>
              <p className="hover:cursor-pointer hover:underline hover:underline-offset-1">
                {novelData.author}
              </p>
            </div>
          </div>
          <div className="border-b border-gray-400" />
          <div className="flex justify-between items-center p-4 px-6 bg-gray-300 rounded-b-lg">
            <div className="flex items-center sm:border-r border-gray-700 sm:pr-10 gap-2">
              <Eye className="text-gray-700 mr-2" />
              <p className="text-sm text-gray-700">
                {novelData.views.toLocaleString("th-TH")}
              </p>
            </div>
            <div className="flex items-center justify-center gap-1 sm:gap-4 w-full pl-10">
              <button
                className={`bg-orange-500 flex justify-center text-white px-4 py-2 gap-3 rounded-lg w-auto hover:cursor-pointer hover:bg-orange-600 transition ${
                  Ch <= 1 ? "opacity-50" : ""
                }`}
                onClick={() =>
                  navigate(`/novel/${NovelId}/chapter/${Number(Ch) - 1}`)
                }
                disabled={Ch <= 1}
              >
                &lt;
              </button>
              <button
                className="bg-orange-500 flex justify-center text-white px-4 py-2 gap-3 rounded-lg w-auto hover:cursor-pointer hover:bg-orange-600 transition"
                onClick={() => navigate(`/novel/${NovelId}`)}
              >
                <Home />
              </button>
              <button
                className={`bg-orange-500 flex justify-center text-white px-4 py-2 gap-3 rounded-lg w-auto hover:cursor-pointer hover:bg-orange-600 transition ${
                  Ch >= chapterData.length ? "opacity-50" : ""
                }`}
                onClick={() =>
                  navigate(`/novel/${NovelId}/chapter/${Number(Ch) + 1}`)
                }
                disabled={Ch >= chapterData.length}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReadChapter;
