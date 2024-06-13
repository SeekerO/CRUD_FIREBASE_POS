import React, { useState } from "react";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";
const AddToCartModal = ({
  item,
  openaddToCart,
  setopenaddToCart,
  isAddToCart,
  setAddToCart,
}) => {
  const [itemQuantity, setItemQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);

  const handleSizeChange = (size, price) => {
    setSelectedSize({ size, price });
  };
  const handleDecrease = () => {
    if (itemQuantity > 0) {
      setItemQuantity(itemQuantity - 1);
    }
  };

  const handleIncrease = () => {
    setItemQuantity(itemQuantity + 1);
  };

  const handleAddToCart = () => {
    const newItem =
      selectedSize === null
        ? {
            id: item.id,
            item: item.item_name,
            size: "Regular",
            price: item.item_price,
            quantity: itemQuantity,
          }
        : {
            id: item.id,
            item: item.item_name,
            size: selectedSize.size,
            price: selectedSize.price,
            quantity: itemQuantity,
          };

    setAddToCart([...isAddToCart, newItem]);
    setopenaddToCart(!openaddToCart);
    setItemQuantity(1);
  };

  if (!openaddToCart) return;
  return (
    <div className="fixed inset-0 w-full h-full backdrop-blur-[1px] items-center justify-center flex">
      <div className="flex flex-col gap-1 bg-slate-100 w-[300px] h-auto shadow-md p-2 rounded-md select-none">
        <div className="flex justify-end">
          <IoClose
            onClick={() =>
              setopenaddToCart(!openaddToCart) || setItemQuantity(1)
            }
            className="text-[25px] hover:text-red-500 cursor-pointer"
          />
        </div>
        <h1 className="text-[30px] font-semibold">{item.item_name}</h1>
        {item.item_price !== "" && item.item_quantity !== "" && (
          <div className="text-black">
            <label className="text-[25px]">₱ {item.item_price}</label>
            <em className="text-[15px] flex gap-1 mt-1">
              In Stock <span className="">{item.item_quantity}</span>
            </em>
          </div>
        )}

        {item?.item_sizes?.map((itemSize, index) => (
          <div key={index} className="flex gap-1 items-center ">
            <input
              type="radio"
              className="h-10 w-10"
              checked={selectedSize && selectedSize.size === itemSize.size}
              onChange={() => handleSizeChange(itemSize.size, itemSize.price)}
            />
            <div className="flex flex-col w-full">
              <div className="w-full justify-between flex text-[20px]">
                <span>{itemSize.size}</span>
                <span>₱{itemSize.price}</span>
              </div>
              <em className="text-[15px] flex gap-1 mt-1 text-gray-600">
                In Stock <span>{itemSize.stock}</span>
              </em>
            </div>
          </div>
        ))}
        <div className="flex gap-1 items-center justify-center mt-10">
          <CiCircleMinus
            className="text-[30px] IconHoverItem"
            onClick={handleDecrease}
          />
          <input
            type="text"
            value={itemQuantity}
            onChange={(e) => setItemQuantity(e.target.value)}
            className="rounded-md w-[50px] h-fit  text-center text-black outline-none"
          />
          <CiCirclePlus
            className="text-[30px] IconHoverItem"
            onClick={handleIncrease}
          />
        </div>
        <button
          onClick={() => handleAddToCart()}
          className="w-full bg-blue-500 p-1 rounded-md font-semibold text-white mt-5"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default AddToCartModal;
