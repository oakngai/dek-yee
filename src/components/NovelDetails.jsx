import { Eye, TableOfContents } from "lucide-react";
import { mockNovels } from "../constants/novels";
import { chapters } from "../constants/chapters";
import Error from "../pages/error";
import { useNavigate } from "react-router-dom";

const NovelDetails = ({ novelId }) => {
  const navigate = useNavigate();
  const data = mockNovels.find((novel) => novel.id.toString() === novelId);
  if (!data) {
    return <Error />;
  }
  return (
    <div className="md:max-w-3xl lg:max-w-5xl mx-auto px-2.5 mt-5">
      <div className="flex flex-col sm:flex-row gap-5 rounded-2xl w-full bg-gray-200 p-5">
        <img
          src={data?.thumbnail || ""}
          alt="Novel Thumbnail"
          className="rounded-xl sm:w-45 h-67.5 object-contain bg-gray-300"
        />
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-sm font-medium text-orange-500 hover:cursor-pointer hover:underline hover:underline-offset-1">
              {data?.genre || "-"}
            </p>
            <h1 className="text-2xl font-bold mt-2">
              {data?.title || "ชื่อเรื่องนิยาย"}
            </h1>
            <p className="text-md text-gray-500 font-medium hover:cursor-pointer hover:underline hover:underline-offset-1">
              {data?.author || "-"}
            </p>
            <p className="text-md font-medium mt-3">
              {data?.description || "รายละเอียดเนื้อเรื่องนิยาย"}
            </p>
          </div>
          <div>
            <div className="flex gap-4 items-center my-3">
              <div className="flex gap-2 items-center">
                <Eye className="text-gray-500 pb-0.5" />
                <p className="text-sm font-medium text-gray-500">
                  {data?.views.toLocaleString("th-TH") || "-"} วิว
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <TableOfContents size={20} className="text-gray-500 pb-0.5" />
                <p className="text-sm font-medium text-gray-500">
                  {chapters[novelId]?.length || "-"} ตอน
                </p>
              </div>
            </div>
            <button
              className="bg-orange-500 text-white px-4 py-2 rounded-lg w-35 hover:cursor-pointer hover:bg-orange-600 transition"
              onClick={() => navigate(`/novel/${novelId}/chapter/1`)}
            >
              อ่านตอนแรก
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NovelDetails;
