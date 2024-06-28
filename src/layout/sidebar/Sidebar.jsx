import React, { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdDashboard } from "react-icons/md";
import { FaBasketShopping } from "react-icons/fa6";
import { VscListOrdered } from "react-icons/vsc";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { MdOutlineStackedBarChart } from "react-icons/md";
const Sidebar = ({ isMobile }) => {
  const currURL = useLocation();
  const [expandMenu, setexpandMenu] = useState(true);
  const [focusOn, setfocusOn] = useState(currURL.pathname);

  const SideBaritems = [
    { item: "DashBoard", icons: <MdDashboard />, to: "/" },
    { item: "Shop", icons: <FaBasketShopping />, to: "/shop" },
    { item: "Recent Orders", icons: <VscListOrdered />, to: "/orders" },
  ];

  useEffect(() => {
    if (isMobile) setexpandMenu(false);
  }, [isMobile]);

  useEffect(() => {
    setfocusOn(currURL.pathname);
  }, [currURL]);

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
          <h1 className="text-[20px] font-semibold text-[#25AE9C] flex items-center tracking-wider bg-slate-100 px-2 rounded-md">
            <MdOutlineStackedBarChart className="text-[30px]" />
            TrackITpos
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
            className={`${expandMenu ? "ml-3" : "ml-1"} ${
              focusOn === sidebar.to && "rounded-l-md text-black  bg-white"
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
