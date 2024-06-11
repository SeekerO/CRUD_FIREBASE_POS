import React from "react";
import { IoSearch } from "react-icons/io5";
const SearchBar = ({ setSearchTerm, searchTerm }) => {
  return (
    <div className="bg-slate-300 p-1 px-2 w-full flex items-center gap-1 rounded-md">
      <IoSearch className="text-[20px] text-gray-600" />
      <input
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        type="search"
        className="rounded-md outline-none px-2 py-0.5  w-full focus:shadow-md"
        placeholder="Search Item.."
      />
    </div>
  );
};

export default SearchBar;
