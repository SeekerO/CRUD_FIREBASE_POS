import React, { useEffect, useState } from "react";
import AddItems from "./additems/AddItems";
import Itemlist from "./itemlist/Itemlist";

const Dashboard = ({ isFetch_Data, metaData_Category, isMobile }) => {
  const [openAddItems, setopenAddItems] = useState(false);

  const HandleDeviceScreen = () => {
    setopenAddItems(!openAddItems);
  };

  useEffect(() => {
    if (isMobile) setopenAddItems(true);
  }, []);

  return (
    <div className="w-full h-full rounded-md p-2 flex gap-2">
      {/* ADD ITEMS */}
      <div
        className={`${openAddItems ? `hidden` : "visibe"} h-full flex flex-col`}
      >
        <span className="MainTextColor font-semibold text-[30px] text-start w-full tracking-wide">
          DASHBOARD
        </span>{" "}
        <AddItems
          metaData_Category={metaData_Category}
          HandleDeviceScreen={HandleDeviceScreen}
          deviceType={isMobile}
        />
      </div>

      {/* ITEM LIST */}

      <Itemlist
        isFetch_Data={isFetch_Data}
        metaData_Category={metaData_Category}
        HandleDeviceScreen={HandleDeviceScreen}
        deviceType={isMobile}
      />
    </div>
  );
};

export default Dashboard;
