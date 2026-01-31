import { useNavigate } from "react-router-dom";

const Card = ({
  isEditing,
  selectedItems,
  setSelectedItems,
  bookId,
  novelId,
  novelTitle,
  novelAuthor,
  novelThumbnail,
  chapter,
  chapterTitle,
  bookAt,
}) => {
  const navigate = useNavigate();
  const isSelected = selectedItems.includes(bookId);

  const handleSelect = (e) => {
    e.stopPropagation();
    if (isEditing) {
      if (!isSelected) {
        setSelectedItems((prev) => [...prev, bookId]);
      } else {
        setSelectedItems((prev) => prev.filter((id) => id !== bookId));
      }
    } else {
      navigate(`/novel/${novelId}/chapter/${chapter}`);
    }
  };

  return (
    <div
      className="rounded-xl flex flex-row h-40 cursor-pointer hover:shadow-lg transition-all duration-200"
      onClick={handleSelect}
    >
      <div className="flex items-start gap-2 text-wrap w-full">
        <img
          src={novelThumbnail || "./mask.png"}
          alt="Product"
          className="rounded-xl w-28 h-full object-contain bg-gray-200"
        />
        <div className="flex flex-col justify-between h-full py-1 pr-0.5 w-full">
          <div>
            <div className="flex flex-row justify-between">
              <p className="line-clamp-2 text-lg font-bold hover:underline hover:underline-offset-1">
                {novelTitle || "-"}
              </p>
              {isEditing &&
                (isSelected ? (
                  <img
                    src="./Check.svg"
                    alt="Checked"
                    className="ml-auto mt-1 w-5 h-5"
                  />
                ) : (
                  <img
                    src="./Uncheck.svg"
                    alt="Unchecked"
                    className="ml-auto mt-1 w-5 h-5"
                  />
                ))}
            </div>
            <p className="my-1 leading-5 line-clamp-1 text-sm font-medium hover:underline hover:underline-offset-1">
              {novelAuthor || "-"}
            </p>
          </div>
          <div>
            <div className="flex">
              <img src="./chapter.svg" alt="Chapter" className="mr-2 pb-0.5" />
              <p className="line-clamp-1 text-xs font-medium text-gray-500">
                ตอนที่ {chapter || "-"} {chapterTitle || ""}
              </p>
            </div>
            <div className="mt-1 flex">
              <img
                src="./bookmark.svg"
                alt="Chapter"
                className="mr-2.5 ml-0.5"
              />
              <p className="line-clamp-1 text-xs font-medium text-gray-500">
                คั่นล่าสุด{" "}
                {new Date(bookAt).toLocaleDateString("th-TH", {
                  year: "2-digit",
                  month: "short",
                  day: "numeric",
                }) || "-"}{" "}
                /{" "}
                {new Date(bookAt).toLocaleTimeString("th-TH", {
                  hour: "2-digit",
                  minute: "2-digit",
                }) || "-"}{" "}
                น.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
