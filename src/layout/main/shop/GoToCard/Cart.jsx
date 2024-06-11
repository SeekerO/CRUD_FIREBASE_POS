import React, { useState } from "react";
import { IoClose, IoBagCheckOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import Checkout from "../checkOut/Checkout";

const Cart = ({ isAddToCart, setAddToCart, openCart, setopenCart }) => {
  const [openCheckout, setopenCheckout] = useState(false);
  const handleComputation = (quantity, price) => {
    const intNumber = parseInt(price);
    const result = intNumber * quantity;
    return result;
  };

  const handleRemoveItem = (id) => {
    setAddToCart(isAddToCart.filter((item) => item.id !== id));
  };

  if (!openCart) return;
  return (
    <div className="fixed inset-0 w-full h-full backdrop-blur-[1px] justify-center items-center flex ">
      <div className="w-[450px] h-[500px] bg-slate-100 rounded-md p-1 shadow-md px-2 overflow-hidden select-none">
        <div className="justify-end flex">
          <IoClose
            className="text-[30px] cursor-pointer hover:text-red-500"
            onClick={() => setopenCart(!openCart)}
          />
        </div>
        <div className="flex  gap-2 w-full text-[30px] mt-1 items-center">
          <h1 className="font-semibold ">CART </h1>
          <span className="text-white MainBgColor  rounded-md text-[20px] px-2">
            {isAddToCart.length}
          </span>
        </div>
        <div className="flex h-[70%] flex-col w-full  overflow-y-auto mt-2 ">
          <div className="w-full grid grid-cols-4 text-center text-[20px] font-semibold">
            <span className="text-start">ITEM</span>
            <span>QTY</span>
            <span>PRICE</span>
          </div>

          {isAddToCart.map((item, index) => (
            <div
              key={index}
              className="w-full grid grid-cols-4 text-center items-center mt-1 text-[20px] py-2"
            >
              <span className="text-start">
                {item.item} ({item.size ? item.size : "Regular"})
              </span>
              <span>{item.quantity}</span>
              <span>{handleComputation(item.quantity, item.price)}</span>
              <span
                onClick={() => handleRemoveItem(item.id)}
                className="w-full justify-center flex items-center text-[20px] cursor-pointer hover:text-red-500"
              >
                <MdDelete />
              </span>
            </div>
          ))}
        </div>

        {isAddToCart.length !== 0 && (
          <button
            onClick={() => setopenCheckout(!openCheckout)}
            className="flex gap-1 items-center justify-center w-full bg-blue-600 text-white py-1 rounded-md font-semibold hover:bg-opacity-50 hover:text-black "
          >
            <IoBagCheckOutline />
            CHECK OUT
          </button>
        )}
      </div>
      <Checkout
        isAddToCart={isAddToCart}
        openCheckout={openCheckout}
        setopenCheckout={setopenCheckout}
        setopenCart={setopenCart}
        setAddToCart={setAddToCart}
      />
    </div>
  );
};

export default Cart;
