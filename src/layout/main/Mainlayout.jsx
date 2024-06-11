import React, { Suspense, useState, useLayoutEffect, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { lazy } from "react";

const Dashboard = lazy(() => import("./dashboard/Dashboard"));
const Shop = lazy(() => import("./shop/Shop"));
const Orders = lazy(() => import("./orders/MainOrders"));
import {
  readData,
  readCategory,
  listenForNewItems,
  listenForItemUpdates,
} from "../../components/firebase";

const Mainlayout = () => {
  const [isFetch_Data, setFetch_Data] = useState([]);
  const [metaData_Category, setmetaData_Category] = useState([]);
  useLayoutEffect(() => {
    const fetch = async () => {
      try {
        const data = await readData();
        const category = await readCategory();
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
      } catch (error) {
        console.error("Failed to fetch shop items:", error);
      }
    };

    const updateItems = (newItems) => {
      setFetch_Data(
        Object.entries(newItems)?.map(([id, value]) => ({ id, ...value }))
      );
    };

    listenForItemUpdates(updateItems);
    fetch();
  }, []);

  useEffect(() => {
    const handleNewItem = (item) => {
      setFetch_Data((isFetch_Data) => [...isFetch_Data, item]);
    };

    listenForNewItems(handleNewItem);
  }, []);
  return (
    <div className="w-full h-full bg-slate-100 px-10 py-5">
      <Suspense fallback={"Loading..."}>
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
          <Route
            path="/orders"
            element={<Orders isFetch_Data={isFetch_Data} />}
          />
        </Routes>
      </Suspense>
    </div>
  );
};

export default Mainlayout;
