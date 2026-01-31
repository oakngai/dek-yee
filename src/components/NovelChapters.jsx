import { chapters } from "../constants/chapters";
import Error from "../pages/error";
import ChapterList from "./ChapterList";

const NovelChapters = ({ novelId }) => {
  const data = chapters[novelId] || [];
  const datalen = data.length;
  if (datalen === 0) {
    return <Error />;
  }
  return (
    <div className="md:max-w-3xl lg:max-w-5xl mx-auto px-2.5 mt-5">
      <div className="rounded-2xl w-full bg-gray-200">
        <h2 className="text-lg font-bold pt-4 px-8">สารบัญ: {datalen} ตอน</h2>
        <div className="border-b border-gray-400 mt-3" />
        <div className="flex flex-col">
          {data.map((ch, idx) => (
            <ChapterList
              key={ch.chapter}
              {...ch}
              idx={idx}
              datalen={datalen}
              novelId={novelId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NovelChapters;
