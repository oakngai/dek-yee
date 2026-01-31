import React from "react";
import { useNavigate } from "react-router-dom";

const ChapterList = ({
  chapter,
  title,
  publishedAt,
  idx,
  datalen,
  novelId,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="hover:cursor-pointer hover:bg-gray-300 transition"
      onClick={() => navigate(`/novel/${novelId}/chapter/${chapter}`)}
    >
      <h3 className="font-bold mt-3 px-8">
        ตอนที่ {chapter}: {title}
      </h3>
      <p className="text-sm mt-0.5 mb-3 px-8 text-gray-600">
        {new Date(publishedAt).toLocaleDateString("th-TH", {
          year: "2-digit",
          month: "short",
          day: "numeric",
        })}
      </p>
      {idx !== datalen - 1 && <div className="border-b border-gray-400 mt-3" />}
    </div>
  );
};

export default ChapterList;
