import React, { useState } from "react";
import SearchBar from "../../../../components/SearchBar";
import { FaSort } from "react-icons/fa";
import ItemConfig from "./itemconfig/ItemConfig";

const Itemlist = ({ isFetch_Data, metaData_Category }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState({ field: "", order: "" });
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const filter_data_by_category = (data) => {
    if (categoryFilter === "ALL") {
      return data;
    }

    return data.filter((item) => item.item_category === categoryFilter);
  };

  const filteredData = isFetch_Data?.filter((meta_data) => {
    const search = searchTerm.toLowerCase();
    return meta_data.item_name.toLowerCase().includes(search);
  });

  const categoryFilteredData = filter_data_by_category(filteredData);

  const handleSortChange = (field) => {
    setSortCriteria((prevSortCriteria) => {
      const isSameField = prevSortCriteria.field === field;
      const newOrder =
        isSameField && prevSortCriteria.order === "asc" ? "desc" : "asc";
      return { field, order: newOrder };
    });
  };

  const sortedData = [...categoryFilteredData].sort((a, b) => {
    if (sortCriteria.field) {
      const fieldA = a[sortCriteria.field];
      const fieldB = b[sortCriteria.field];

      if (fieldA < fieldB) {
        return sortCriteria.order === "asc" ? -1 : 1;
      }
      if (fieldA > fieldB) {
        return sortCriteria.order === "asc" ? 1 : -1;
      }
      return 0;
    }
    return 0;
  });

  return (
    <div className="w-full h-full">
      <div className="flex items-center gap-2">
        <div>
          <select
            required
            className="p-1 outline-none rounded-md"
            name="item_category"
            onChange={handleCategoryChange}
            value={categoryFilter}
          >
            <option value="ALL">ALL</option>
            {metaData_Category.map((cate, index) => (
              <option key={index} value={cate.category} className="lowercase">
                {cate.category}
              </option>
            ))}
          </select>
        </div>

        <SearchBar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      </div>

      <div className="mt-2 w-full px-2 grid items-center grid-cols-4 justify-between MainBgColor rounded-md py-2 font-semibold text-white">
        <span className="w-[100px]">ID</span>
        <span
          className="flex gap-2 items-center"
          onClick={() => handleSortChange("item_name")}
        >
          ITEM <FaSort className="hover:text-blue-600 cursor-pointer" />
        </span>
        <span>PRICE</span>
        <span
          className="flex gap-2 items-center"
          onClick={() => handleSortChange("item_quantity")}
        >
          STOCK <FaSort className="hover:text-blue-600 cursor-pointer" />
        </span>
      </div>

      <div>
        {sortedData.length === 0 ? (
          <>NO DATA</>
        ) : (
          <>
            {sortedData.map((item, index) => (
              <ItemConfig
                key={index}
                item={item}
                index={index}
                metaData_Category={metaData_Category}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Itemlist;
