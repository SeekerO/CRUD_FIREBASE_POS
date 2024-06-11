import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { FaCashRegister } from "react-icons/fa";
import { handlePaid, handleOrderStore } from "../../../../components/firebase";
import { v4 as uuidv4 } from "uuid";

import moment from "moment/moment";
import { NotifySuccess } from "../../../../components/Notify";
const Checkout = ({
  isAddToCart,
  openCheckout,
  setopenCheckout,
  setopenCart,
  setAddToCart,
}) => {
  const handleComputation = (quantity, price) => {
    const intNumber = parseInt(price, 10);
    const result = intNumber * quantity;
    return result;
  };

  const computeTotal = () => {
    return isAddToCart.reduce((total, item) => {
      return total + handleComputation(item.quantity, item.price);
    }, 0);
  };

  const totalPrice = computeTotal();

  const handlePayment = async () => {
    try {
      await handlePaid(isAddToCart);
      // You can add additional logic here if needed, such as clearing the cart
      const order_list = {
        id: uuidv4(),
        items: isAddToCart,
        total: totalPrice,
        date: moment().format("MMMM Do YYYY, h:mm:ss a"),
      };

      if (handleOrderStore(order_list));
      {
        setopenCheckout(false);
        setopenCart(false);
        setAddToCart([]);
      }

      // alert("Payment successful and stock updated.");
    } catch (error) {
      console.error("Payment failed: ", error);
    }
  };

  if (!openCheckout) return;
  return (
    <div className="fixed inset-0 w-full h-full backdrop-blur-[1px] justify-center items-center flex ">
      <div className="w-[450px] h-[500px] bg-slate-100 rounded-md p-1 shadow-md px-2 overflow-hidden select-none">
        <div className="justify-end flex"></div>
        <div className="flex  gap-2 w-full text-[30px] mt-1 items-center ">
          <IoIosArrowBack
            onClick={() => setopenCheckout(!openCheckout)}
            className="hover:text-red-500 cursor-pointer"
          />

          <h1 className="font-semibold ">PAYMENT</h1>
          <span className="text-white MainBgColor  rounded-md text-[20px] px-2">
            {isAddToCart.length}
          </span>
        </div>
        <div className="flex h-[70%] flex-col w-full  overflow-y-auto mt-2 ">
          <div className="w-full grid grid-cols-3 text-center text-[20px] font-semibold">
            <span className="text-start">ITEM</span>
            <span>QTY</span>
            <span>PRICE</span>
          </div>

          {isAddToCart.map((item, index) => (
            <div
              key={index}
              className="w-full grid grid-cols-3 text-center items-center mt-1 text-[20px] py-2"
            >
              <span className="text-start">
                {item.item} ({item.size ? item.size : "Regular"})
              </span>
              <span>{item.quantity}</span>
              <span>{handleComputation(item.quantity, item.price)}</span>
            </div>
          ))}
          <div className="border-t-2 border-black w-full flex justify-between px-1 text-[20px] font-semibold py-1 mt-1">
            <span>TOTAL</span>
            <span className="mr-12">{totalPrice}</span>
          </div>
        </div>
        <button
          onClick={() => handlePayment()}
          className="flex gap-1 items-center justify-center w-full bg-blue-600 text-white py-1 rounded-md font-semibold hover:bg-opacity-50 hover:text-black "
        >
          <FaCashRegister />
          PAID
        </button>
      </div>
    </div>
  );
};

export default Checkout;
