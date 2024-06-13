import React, { useState } from "react";
import SearchBar from "../../../components/SearchBar";
import ItemCell from "./itemcell/ShopItemCell";
import { RiFilePaper2Fill } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import Cart from "./GoToCart/Cart";
import { interpolate } from "framer-motion";
const Shop = ({ isFetch_Data, metaData_Category }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [isAddToCart, setAddToCart] = useState([]);
  const [openCart, setopenCart] = useState(false);

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const filter_data_by_category = (data) => {
    if (categoryFilter === "ALL") {
      return data;
    }

    return data.filter(
      (item) =>
        item?.item_category?.toLowerCase() === categoryFilter?.toLowerCase()
    );
  };

  const filteredData = isFetch_Data?.filter((meta_data) => {
    const search = searchTerm?.toLowerCase();
    return meta_data.item_name?.toLowerCase().includes(search);
  });

  const categoryFilteredData = filter_data_by_category(filteredData);

  return (
    <div className="w-full h-full rounded-md p-2 flex flex-col ">
      <div className="Title flex w-full  hitems-center justify-between ">
        <h1 className="Title">SHOP</h1>
        <div className="flex items-center">
          {" "}
          <div
            onClick={() => setopenCart(!openCart)}
            className={`${
              isAddToCart.length !== 0 && "text-blue-500"
            } flex gap-1 items-center cursor-pointer`}
          >
            <span className="">{isAddToCart.length}</span>{" "}
            <RiFilePaper2Fill className="mr-3" />
          </div>
          {isAddToCart.length !== 0 && (
            <CiCircleRemove
              className="hover:text-red-500 cursor-pointer"
              onClick={() => setAddToCart([])}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2 mb-2 border-b-2 border-slate-300">
        <SearchBar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
        <div className="flex gap-3 mb-3 w-full flex-wrap">
          <button
            onClick={handleCategoryChange}
            value={"ALL"}
            className={`${
              categoryFilter === "ALL" &&
              "MainTextColor underline underline-offset-2"
            } uppercase p-1 text-black font-semibold rounded-md px-2`}
          >
            ALL
          </button>
          {metaData_Category.map((item, index) => (
            <button
              key={index}
              onClick={handleCategoryChange}
              value={item.category}
              className={`${
                categoryFilter === item.category &&
                "MainTextColor underline underline-offset-2"
              } uppercase p-1 text-black font-semibold rounded-md px-2`}
            >
              {item.category}
            </button>
          ))}
        </div>
      </div>
      <Cart
        isAddToCart={isAddToCart}
        setAddToCart={setAddToCart}
        openCart={openCart}
        setopenCart={setopenCart}
      />

      <div className="flex gap-6 flex-wrap w-full px-2 h-full overflow-y-auto overflow-x-hidden py-3">
        {categoryFilteredData.length !== 0 ? (
          <>
            {categoryFilteredData.map((item, index) => (
              <ItemCell
                key={index}
                item={item}
                isAddToCart={isAddToCart}
                setAddToCart={setAddToCart}
              />
            ))}
          </>
        ) : (
          <>NO DATA</>
        )}
      </div>
    </div>
  );
};

export default Shop;
