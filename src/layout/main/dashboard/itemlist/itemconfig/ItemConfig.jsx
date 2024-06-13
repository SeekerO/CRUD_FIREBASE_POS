import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import ItemModalUpdate from "./ItemModalUpdate";
import { MdDelete } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { deleteItem } from "../../../../../components/firebase";

const ItemConfig = ({ item, index, metaData_Category }) => {
  const [isEdit, setisEdit] = useState(false);
  const [isDelete, setisDelete] = useState(false);

  const handleDelete = (id) => {
    deleteItem(id);
    setisDelete(false);
    window.location.reload;
  };

  return (
    <>
      <div className="MainBgColor flex flex-col w-full mt-1  rounded-md py-2 font-semibold text-white hover:py-3 duration-300 ">
        <div
          key={index}
          className=" w-full px-2 grid items-center grid-cols-4 justify-between "
        >
          <label className="w-[100px]">{index + 1}</label>
          <label className="truncate overflow-hidden">{item.item_name}</label>
          <label>{item.item_price}</label>
          <div className="w-full justify-between flex items-center">
            <label>{item.item_quantity}</label>
            <div className="flex gap-2 text-[25px]">
              <FiEdit
                onClick={() => setisEdit(!isEdit)}
                className="hover:text-blue-500 cursor-pointer"
              />
              <MdDelete
                onClick={() => setisDelete(!isDelete)}
                className="hover:text-red-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {item.item_sizes?.map((sizes, index) => (
          <div className="grid items-center grid-cols-4 font-thin px-2">
            <label></label>
            <label className="pl-2">{sizes.size}</label>
            <label>{sizes.price}</label>
            <label>{sizes.stock}</label>
          </div>
        ))}
      </div>

      {isDelete && (
        <div className="fixed inset-0 w-full h-full backdrop-blur-[1px] items-center justify-center flex">
          <div className="bg-slate-100 w-[320px] h-[150px] flex flex-col p-2 text-center rounded-md shadow-md">
            <div className="justify-end flex">
              <IoClose
                className="text-[20px] cursor-pointer hover:text-red-500"
                onClick={() => setisDelete(!isDelete)}
              />
            </div>
            <>
              Are you sure you want to delete this item?
              <span>
                Confirm to <strong>DELETE</strong>.
              </span>
            </>
            <div className="w-full flex gap-2 justify-center mt-3">
              <button
                onClick={() => handleDelete(item?.id)}
                className="px-2 py-1 bg-blue-500 rounded-md hover:text-white"
              >
                CONFIRM
              </button>
            </div>
          </div>
        </div>
      )}
      <ItemModalUpdate
        item={item}
        setisEdit={setisEdit}
        isEdit={isEdit}
        metaData_Category={metaData_Category}
      />
    </>
  );
};

export default ItemConfig;
