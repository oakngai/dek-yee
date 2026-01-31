import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-300 bg-white shadow-sm">
      <div className="flex h-14 mx-auto md:max-w-3xl lg:max-w-5xl px-2.5 items-center">
        <div className="flex flex-row items-center gap-3 sm:gap-5">
          <Link to="/">
            <div className="flex items-center gap-1 cursor-pointer">
              <img
                src="/yee.jpg"
                alt="Logo"
                className="aspect-square w-10 rounded-lg"
              />
              <h1 className="text-lg sm:text-xl font-black italic">DekYee</h1>
            </div>
          </Link>
          <Link to="/">
            <p
              className={`text-md sm:text-lg font-bold hover:text-orange-300 cursor-pointer transition
              ${location.pathname === "/" ? "text-orange-500" : ""}`}
            >
              นิยาย
            </p>
          </Link>
          <Link to="/bookmarks">
            <p
              className={`text-md sm:text-lg font-bold hover:text-orange-300 cursor-pointer transition
              ${location.pathname === "/bookmarks" ? "text-orange-500" : ""}`}
            >
              รายการที่คั่นไว้
            </p>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
