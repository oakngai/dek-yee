import { useParams } from "react-router-dom";
import NovelDetails from "../../components/NovelDetails";
import Navbar from "../../components/Navbar";
import NovelChapters from "../../components/NovelChapters";

const NovelPage = () => {
  const { NovelId } = useParams();

  return (
    <>
      <Navbar />
      <NovelDetails novelId={NovelId} />
      <NovelChapters novelId={NovelId} />
      <div className="my-6 border-b border-gray-300" />
    </>
  );
};

export default NovelPage;
