import React, { useEffect, useState } from "react";
import { readDataOrders } from "../../../components/firebase";
import Orderconfig from "./orderConfig/Orderconfig";
import { FaPesoSign } from "react-icons/fa6";
import moment from "moment";
const MainOrders = () => {
  const [orders, setOrders] = useState([]);
  const [sales, setSales] = useState({
    todaySales: 0,
    AvgMonthSales: 0,
    totalSales: 0,
  });

  useEffect(() => {
    const fetch = async () => {
      const data = await readDataOrders();
      if (data) {
        const ordersArray = Object.entries(data).map(([id, value]) => ({
          id,
          ...value,
        }));
        setOrders(ordersArray);
        calculateSales(ordersArray);
      }
    };
    fetch();
  }, []);

  const calculateSales = (ordersArray) => {
    const today = moment().startOf("day");

    const todaySales = ordersArray
      .filter((order) => moment(order.order_date).isSame(today, "day"))
      .reduce((sum, order) => sum + (order.order_total || 0), 0);

    const totalSales = ordersArray.reduce(
      (sum, order) => sum + (order.order_total || 0),
      0
    );

    const averageMonthSales = totalSales / 12;

    setSales({
      todaySales: todaySales,
      AvgMonthSales: averageMonthSales,
      totalSales: totalSales,
    });
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex gap-4 flex-wrap">
        <div className="w-fit h-auto MainBgColor rounded-md p-2 font-semibold text-white flex flex-col ">
          <span className="font-bold text-[20px] mr-10">TODAY SALES</span>
          <span className="mt-1 flex gap-1 items-center text-[30px]">
            <FaPesoSign />{" "}
            <span>{parseFloat(sales.todaySales).toFixed(2)}</span>
          </span>
        </div>
        <div className="w-fit h-auto  MainBgColor rounded-md p-2 font-semibold text-white flex flex-col ">
          <span className="font-bold text-[20px] mr-10">
            AVG. MONTHLY SALES
          </span>
          <span className="mt-1 flex gap-1 items-center text-[30px]">
            <FaPesoSign />{" "}
            <span>{parseFloat(sales.AvgMonthSales).toFixed(2)}</span>
          </span>
        </div>
        <div className="w-fit h-auto MainBgColor rounded-md p-2 font-semibold text-white flex flex-col ">
          <span className="font-bold text-[20px] mr-10">TOTAL SALES</span>
          <span className="mt-1 flex gap-1 items-center text-[30px]">
            <FaPesoSign /> <span>{sales.totalSales}</span>
          </span>
        </div>
      </div>
      <h1 className="font-semibold text-[30px]">Recent Orders</h1>
      <div className="w-full h-full overflow-y-auto">
        {orders
          .sort((a, b) => (a.order_date < b.order_date ? 1 : -1))
          .map((item, index) => (
            <Orderconfig item={item} key={index} />
          ))}
      </div>
    </div>
  );
};

export default MainOrders;
