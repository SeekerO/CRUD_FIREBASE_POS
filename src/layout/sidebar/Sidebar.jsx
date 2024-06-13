import React, { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdDashboard } from "react-icons/md";
import { FaBasketShopping } from "react-icons/fa6";
import { VscListOrdered } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Sidebar = ({ isMobile }) => {
  const [expandMenu, setexpandMenu] = useState(true);
  const [focusOn, setfocusOn] = useState("DashBoard");
  const SideBaritems = [
    { item: "DashBoard", icons: <MdDashboard />, to: "/" },
    { item: "Shop", icons: <FaBasketShopping />, to: "/shop" },
    { item: "Recent Orders", icons: <VscListOrdered />, to: "/orders" },
  ];

  useEffect(() => {
    if (isMobile) setexpandMenu(false);
  }, [isMobile]);

  return (
    <div
      className={`${
        expandMenu ? "w-[250px] MainBgColor" : "w-[50px] MainBgColor"
      } h-full MainBgColor text-white duration-300`}
    >
      <div
        className={`${
          expandMenu ? "justify-between" : "justify-center"
        } flex  px-2 py-2 items-center MainTextColor `}
      >
        {expandMenu && (
          <h1 className="text-[1.3rem] font-semibold">
            <svg
              version="1.2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1782 343"
              width="100"
              height="35"
              fill="white"
            >
              <path d="m293 343l-94-98c0 0-14.2 14-48 14-33.8 0-61.8-18.6-69-38 0 0-5.9 3-15 3-9.1 0-67-8.8-67-70 0-71.6 86.7-154 192-154 121 0 197 100 197 169 0 43.2-26.7 51-32 51 0 0 10.8 54.3-80 62"></path>
              <path d="m427 20h48v164c0 0 1 56 61 56 45.1 0 59-36.1 59-58 0-14.8 0-162 0-162h48v159c0 0 2.7 107-108 107-107.4 0-108-101.8-108-105 0-15 0-161 0-161z"></path>
              <path d="m869 20v47h-74v219h-47v-219h-74v-47z"></path>
              <path d="m993 20l95 266h-47l-23-68h-95l-23 68h-47l95-266zm-55 157h65l-32-92z"></path>
              <path d="m1115 20h48v266h-48z"></path>
              <path d="m1166 143l96-123h57l-97 123 101 143h-57z"></path>
              <path d="m1336 96c0 0 20.7-4 45-4 71 0 73 43.2 73 56 0 62.3-62.3 63-73 63-10.7 0-20-2-20-2v77h-25zm25 92c0 0 4.2 2 18 2 23.5 0 50-6.7 50-41 0-34.3-37.6-38-46-38-8.4 0-22 3-22 3z"></path>
              <path d="m1564 92c0 0 87-3.8 87 97 0 26.5-8.2 97-87 97-71 0-89.3-55.7-89.3-96.3 0-55.9 29.3-97.7 89.3-97.7zm-62 97c0 53.1 26.2 79 63 79 30.3 0 59-25.8 59-75 0-84.3-60-82-60-82-54.5 0-62 55.6-62 78z"></path>
              <path d="m1732 113c-15.7 0-36 8.7-36 28 0 20.3 11.4 23.5 32 33 20.6 9.5 54 16.7 54 60 0 35.4-29.1 52-65 52-35.9 0-50-12-50-12l8-20c0 0 20.7 12 45 12 24.3 0 36-15.7 36-32 0-13.9-12.3-32.2-41-40-30.8-8.4-44-28.7-44-50 0-37.6 29.8-51 62-51 32.2 0 41 9 41 9l-6 20c0 0-12.2-9-36-9z"></path>
            </svg>{" "}
          </h1>
        )}

        <RxHamburgerMenu
          onClick={() => setexpandMenu(!expandMenu)}
          className="text-[25px] text-white hover:text-black cursor-pointer "
        />
      </div>

      <div className="">
        {SideBaritems.map((sidebar, index) => (
          <Link
            to={sidebar.to}
            key={index}
            value={sidebar.item}
            onClick={() => setfocusOn(sidebar.item)}
            className={`${expandMenu ? "ml-3" : "ml-1"} ${
              focusOn === sidebar.item && "rounded-l-md text-black  bg-white"
            } flex  items-center gap-2 text-[18px] uppercase p-3 mt-1 font-semibold  cursor-pointer  duration-300 overflow-hidden `}
          >
            {sidebar.icons}
            {expandMenu && (
              <motion.label className="  cursor-pointer">
                {sidebar.item}
              </motion.label>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
