import React, { useEffect, useState } from "react";
import { readDataOrders } from "../../../components/firebase";
import Orderconfig from "./orderConfig/Orderconfig";
const MainOrders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const data = await readDataOrders();
      if (data) {
        setOrders(
          Object.entries(data).map(([id, value]) => ({ id, ...value }))
        );
      }
    };
    fetch();
  }, []);

  return (
    <div className="flex flex-col h-full w-full">
      <h1 className="font-semibold text-[30px]">Recent Orders</h1>
      <div className="w-full h-full overflow-y-auto">
        {orders
          .sort((a, b) => (a.order_date < b.order_date ? 1 : -1))
          .map((item, index) => (
            <Orderconfig item={item} />
          ))}
      </div>
    </div>
  );
};

export default MainOrders;
