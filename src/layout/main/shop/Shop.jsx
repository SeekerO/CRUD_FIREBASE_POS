import React, { useState } from "react";
import SearchBar from "../../../components/SearchBar";
import ItemCell from "./itemcell/ShopItemCell";
import { FaCartShopping } from "react-icons/fa6";
import Cart from "./GoToCard/Cart";
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

    return data.filter((item) => item.item_category === categoryFilter);
  };

  const filteredData = isFetch_Data?.filter((meta_data) => {
    const search = searchTerm.toLowerCase();
    return meta_data.item_name.toLowerCase().includes(search);
  });

  const categoryFilteredData = filter_data_by_category(filteredData);

  return (
    <div className="w-full h-full bg-slate-200 rounded-md p-2 flex flex-col ">
      <div className="Title flex w-full  hitems-center justify-between ">
        <h1 className="Title">SHOP</h1>
        <div
          onClick={() => setopenCart(!openCart)}
          className={`${
            isAddToCart.length !== 0 && "text-red-500"
          } flex gap-1 items-center cursor-pointer`}
        >
          <span className="">{isAddToCart.length}</span>{" "}
          <FaCartShopping className="mr-3" />
        </div>
      </div>
      <div className="flex flex-col gap-2 mb-2 border-b-2 border-slate-300">
        <SearchBar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
        <div className="flex gap-4 mb-3 w-full flex-wrap">
          <button
            onClick={handleCategoryChange}
            value={"ALL"}
            className="uppercase p-1 MainBgColor text-white font-bold rounded-md px-4"
          >
            ALL
          </button>
          {metaData_Category.map((item, index) => (
            <button
              key={index}
              onClick={handleCategoryChange}
              value={item.category}
              className="uppercase p-1 MainBgColor text-white font-bold rounded-md px-4"
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

      <div className="flex gap-10 flex-wrap w-full px-2 h-full overflow-y-auto overflow-x-hidden py-3">
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
