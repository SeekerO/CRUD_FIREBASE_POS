import React, { Suspense, useState, useLayoutEffect, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import { ring } from "ldrs";

ring.register();

const Dashboard = lazy(() => import("./dashboard/Dashboard"));
const Shop = lazy(() => import("./shop/Shop"));
const Orders = lazy(() => import("./orders/MainOrders"));
import {
  readData,
  readCategory,
  readDataOrders,
  listenForNewItems,
  listenForItemUpdates,
  listenForNewItemsCategory,
  listenForItemCategory,
  listenForOrdersonChildAdded,
  listenForOrdersOnValue,
} from "../../components/firebase";

const Mainlayout = () => {
  const [isFetch_Data, setFetch_Data] = useState([]);
  const [metaData_Category, setmetaData_Category] = useState([]);
  const [metaData_orders, setOrders] = useState([]);
  useLayoutEffect(() => {
    const fetch = async () => {
      try {
        const data = await readData();
        const category = await readCategory();
        const order = await readDataOrders();

        if (data) {
          setFetch_Data(
            Object.entries(data).map(([id, value]) => ({ id, ...value }))
          );
        }
        if (category) {
          setmetaData_Category(
            Object.entries(category).map(([id, value]) => ({ id, ...value }))
          );
        }

        if (order) {
          setOrders(
            Object.entries(order).map(([id, value]) => ({
              id,
              ...value,
            }))
          );
        }
      } catch (error) {
        console.error("Failed to fetch shop items:", error);
      }
    };
    fetch();

    const updateItems = (newItems) => {
      setFetch_Data(
        Object.entries(newItems)?.map(([id, value]) => ({ id, ...value }))
      );
    };

    const updateItemsCategory = (newItems) => {
      setmetaData_Category(
        Object.entries(newItems)?.map(([id, value]) => ({ id, ...value }))
      );
    };

    const updateItemsShop = (newItems) => {
      setOrders(
        Object.entries(newItems)?.map(([id, value]) => ({ id, ...value }))
      );
    };

    listenForItemUpdates(updateItems);
    listenForItemCategory(updateItemsCategory);
    listenForOrdersOnValue(updateItemsShop);
  }, []);

  useEffect(() => {
    const handleNewItem = (item) => {
      setFetch_Data((isFetch_Data) => [...isFetch_Data, item]);
    };

    const handleNewItemCategory = (item) => {
      setmetaData_Category((metaData_Category) => [...metaData_Category, item]);
    };

    const handleNewItemOrder = (item) => {
      setOrders((metaData_Category) => [...metaData_Category, item]);
    };

    listenForNewItems(handleNewItem);
    listenForNewItemsCategory(handleNewItemCategory);
    listenForOrdersonChildAdded(handleNewItemOrder);
  }, []);

  return (
    <div className="w-full h-full bg-slate-100 md:px-10  px-2 py-5 rounded-l-[40px] shadow-2xl shadow-gray-700">
      <Suspense
        fallback={
          <div className="w-full h-full flex justify-center items-center">
            <l-ring
              size="40"
              stroke="5"
              bg-opacity="0"
              speed="2"
              color="#25AE9C"
            ></l-ring>
          </div>
        }
      >
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                isFetch_Data={isFetch_Data}
                metaData_Category={metaData_Category}
              />
            }
          />
          <Route
            path="/shop"
            element={
              <Shop
                isFetch_Data={isFetch_Data}
                metaData_Category={metaData_Category}
              />
            }
          />
          <Route path="/orders" element={<Orders orders={metaData_orders} />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default Mainlayout;
