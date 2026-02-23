import { FiSearch } from "react-icons/fi";
import { FiBell } from "react-icons/fi";
import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

function TopBar() {
  const today = new Date();
  const [search, setSearch] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const { categoryName } = useParams();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search");

  const dayName = today.toLocaleDateString("en-US", {
    weekday: "long",
  });

  const fullDate = today.toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    if (categoryName) {
      navigate(`/category/${categoryName}?search=${search}`);
    } else {
      navigate(`/?search=${search}`);
    }
  };

  const handleSearchIconClick = () => {
    if (searchQuery) {
      if (categoryName) {
        navigate(`/category/${categoryName}`);
      } else {
        navigate("/");
      }

      setSearch("");
      setIsSearchOpen(false);
    } else {
      setIsSearchOpen((prev) => !prev);
    }
  };

  return (
    <div className="relative flex items-center justify-between border-b border-gray-300 pb-3">
      <div className="hidden md:block text-sm">
        <div className="font-bold">{dayName}</div>
        <div className="text-gray-500 text-xs">{fullDate}</div>
      </div>

      <div className="text-2xl md:text-3xl font-serif font-semibold md:absolute md:left-1/2 md:-translate-x-1/2">
        The Times
      </div>

      <div className="flex items-center gap-6">
        <FiSearch
          onClick={handleSearchIconClick}
          className={`cursor-pointer text-lg ${
            searchQuery ? "text-black" : "text-gray-700 hover:text-black"
          }`}
        />
        <div
          className={`transition-all duration-300 overflow-hidden ${
            isSearchOpen ? "w-48 opacity-100 ml-3" : "w-0 opacity-0"
          }`}
        >
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full border-b border-gray-300 focus:outline-none text-sm px-1"
            />
          </form>
        </div>

        <img
          src="https://i.pravatar.cc/150?img=11"
          alt="User"
          className="w-8 h-8 rounded-full object-cover md:hidden"
        />
      </div>
    </div>
  );
}

export default TopBar;
