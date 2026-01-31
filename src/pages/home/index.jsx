import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import NovelCard from "../../components/NovelCard";
import { mockNovels } from "../../constants/novels";
import { chapters } from "../../constants/chapters";

const Home = () => {
  return (
    <>
      <Navbar />
      <Banner />

      <div className="md:max-w-3xl lg:max-w-5xl mx-auto px-2.5 mt-20">
        <h1 className="text-3xl font-bold">นิยายทั้งหมด</h1>
        <div className="mt-3 border-b border-gray-300" />
        <ul className="grid lg:grid-cols-2 gap-4 mt-5">
          {mockNovels.map((novel) => (
            <li key={novel.id}>
              <NovelCard {...novel} chapters={chapters[novel.id].length} />
            </li>
          ))}
        </ul>
      </div>
      <div className="my-6 border-b border-gray-300" />
    </>
  );
};

export default Home;
