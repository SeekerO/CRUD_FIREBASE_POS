import React, { useState } from "react";
import AddToCartModal from "../AddtoCartModal/AddToCartModal";

const ItemCell = ({ item, isAddToCart, setAddToCart }) => {
  const [openaddToCart, setopenaddToCart] = useState(false);

  return (
    <>
      <div
        onClick={() => setopenaddToCart(!openaddToCart)}
        className={`w-[200px] h-[200px] MainBgColor text-white rounded-md p-2 flex flex-col shadow-md select-none cursor-pointer hover:scale-105 duration-300`}
      >
        <label className="font-semibold text-[25px] cursor-pointer">
          {item.item_name}
        </label>
        {item.item_price !== "" && item.item_quantity !== "" && (
          <>
            <label className="text-[20px] cursor-pointer">
              ₱ {item.item_price}
            </label>

            <em
              className={`${
                item.item_quantity === 0 && "text-red-600 font-bold"
              } text-[15px] flex gap-1 mt-1 text-gray-100`}
            >
              In Stock <span>{item.item_quantity}</span>
            </em>
          </>
        )}

        {item?.item_sizes?.map((item, index) => (
          <div key={index} className={`text-whiteflex flex-col `}>
            <div className="w-full justify-between flex">
              <span className="text-[20px]">{item.size} </span>
              <span>₱{item.price} </span>
            </div>
            <em
              className={`${
                item.stock === 0
                  ? " font-bold text-red-600"
                  : `${item.stock < 10 && "font-bold text-orange-500"}`
              } text-[10px] flex gap-1 mt-1`}
            >
              In Stock <span>{item.stock}</span>
            </em>
          </div>
        ))}
      </div>
      <AddToCartModal
        openaddToCart={openaddToCart}
        setopenaddToCart={setopenaddToCart}
        isAddToCart={isAddToCart}
        setAddToCart={setAddToCart}
        item={item}
      />
    </>
  );
};

export default ItemCell;
