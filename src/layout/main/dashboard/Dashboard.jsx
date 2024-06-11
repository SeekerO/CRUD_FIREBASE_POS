import React, { useLayoutEffect, useState } from "react";
import AddItems from "./additems/AddItems";
import Itemlist from "./itemlist/Itemlist";

const Dashboard = ({ isFetch_Data, metaData_Category }) => {
  return (
    <div className="w-full h-full bg-slate-200 rounded-md p-2 flex flex-col">
      <h1 className="Title">DASHBOARD</h1>

      <main className="mt-4 gap-2 h-full flex">
        {/* ADD ITEMS */}
        <AddItems metaData_Category={metaData_Category} />
        {/* ITEM LIST */}
        <Itemlist
          isFetch_Data={isFetch_Data}
          metaData_Category={metaData_Category}
        />
      </main>
    </div>
  );
};

export default Dashboard;
