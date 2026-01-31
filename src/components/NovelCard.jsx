import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NovelCard = ({
  id,
  title,
  author,
  genre,
  chapters,
  views,
  description,
  thumbnail,
  lastUpdatedAt,
}) => {
  const navigate = useNavigate();
  const DateTime = new Date(lastUpdatedAt);
  const formattedDateTime =
    DateTime.toLocaleDateString("th-TH", {
      year: "2-digit",
      month: "short",
      day: "numeric",
    }) +
    " / " +
    DateTime.toLocaleTimeString("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
    });
  return (
    <div
      className="rounded-xl border border-gray-200 p-3 flex flex-col h-full cursor-pointer hover:shadow-lg transition-all duration-200"
      onClick={() => navigate(`/novel/${id}`)}
    >
      <div className="flex items-start gap-2 text-wrap w-full">
        <img
          src={thumbnail || "/mask.png"}
          alt="Product"
          className="rounded-xl w-20 object-contain bg-gray-200"
        />
        <div className="py-1">
          <h2 className="line-clamp-1 text-lg font-bold hover:underline hover:underline-offset-1">
            {title || "-"}
          </h2>
          <p className="mt-1 line-clamp-1 text-sm font-medium text-orange-500 hover:underline hover:underline-offset-1">
            {genre || "-"}
          </p>
          <p className="mt-0.5 line-clamp-1 text-sm font-medium hover:underline hover:underline-offset-1">
            {author || "-"}
          </p>
        </div>
      </div>
      <div className="flex items-start gap-3 mt-3">
        <div className="flex">
          <img src="/chapter.svg" alt="Chapter" className="mr-1.5 pb-0.5" />
          <p className="text-sm font-medium text-gray-500">{chapters || "-"}</p>
        </div>
        <div className="flex">
          <Eye size={20} className="text-gray-500 mr-1.5 pb-0.5" />
          <p className="text-sm font-medium text-gray-500">
            {views.toLocaleString("th-TH") || "-"}
          </p>
        </div>
      </div>
      <p className="mt-1 text-sm font-medium">{description || "-"}</p>
      <p className="mt-1 text-xs font-medium text-gray-500">
        อัปเดตล่าสุด {formattedDateTime}
      </p>
    </div>
  );
};

export default NovelCard;
