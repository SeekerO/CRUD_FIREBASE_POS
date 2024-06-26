import React, { useState, useRef, useEffect } from "react";
import moment from "moment";
const Orderconfig = ({ item }) => {
  const [expandCell, setexpandCell] = useState(false);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setexpandCell(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={ref}
      onClick={() => setexpandCell(!expandCell)}
      className={`${
        expandCell ? "h-[300px]" : "h-[100px]"
      } select-none flex flex-col gap-2 bg-slate-200 mt-2 p-2 rounded-md duration-300 active:bg-slate-400 active:text-white cursor-pointer overflow-hidden`}
    >
      <span className="gap-1 flex">
        <span className="font-semibold">UUID:</span>
        <span> {item.id}</span>
      </span>
      <span className="gap-1 flex">
        <span className="font-semibold">DATE:</span>
        <span>{moment(item.order_date).format("MMMM Do YYYY, h:mm a")}</span>
      </span>
      {expandCell && (
        <div className="h-full overflow-y-auto">
          <div className=" w-full grid-cols-3 grid font-semibold">
            <span>QUANTITY</span>
            <span>ITEM</span>
            <span>PRICE</span>
          </div>
          {item.order_items.map((item, index) => (
            <div key={index} className="flex flex-col px-1 py-2 striped ">
              <div className="w-full grid-cols-3 grid font-normal">
                <span>{item.quantity}</span>
                <span>{item.item}</span>
                <span>{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      <div
        className={`${
          expandCell
            ? "border-t-2 border-gray-300 py-1 grid grid-cols-3"
            : "flex gap-1"
        }  font-bold`}
      >
        <span className="font-semibold">TOTAL:</span>
        <div />
        <span> {item.order_total}</span>
      </div>
    </div>
  );
};

export default Orderconfig;
