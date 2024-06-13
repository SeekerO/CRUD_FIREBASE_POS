import React, { useEffect, useState } from "react";
import {
  writeNewItem,
  writeDataCategory,
  UpdateCategory_Database,
} from "../../../../components/firebase";
import { v4 as uuidv4 } from "uuid";
import { IoAdd, IoClose } from "react-icons/io5";
import { MdOutlineAddBox } from "react-icons/md";
import { TbCategoryPlus } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { NotifyWarning } from "../../../../components/Notify";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { isMobile } from "react-device-detect";
import { BsPlusCircle } from "react-icons/bs";

const AddItems = ({ metaData_Category, HandleDeviceScreen }) => {
  const [addCategory, setaddCategory] = useState(false);
  const [isOptional, setisOptional] = useState(false);
  const [inputCatergories, setCategories] = useState("");
  const [sizesPrice, setSizesPrice] = useState([]);

  const [formData, setFormData] = useState({
    item_name: "",
    item_price: "",
    item_quantity: "",
    item_category: "",
  });
  const [meta_data_state, set_meta_data_state] = useState();

  useEffect(() => {
    set_meta_data_state(metaData_Category);
  }, [addCategory, metaData_Category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const saveItem_database = (e) => {
    e.preventDefault();
    const saveUUID = uuidv4();

    const isFormDataValid =
      formData.item_category !== "" && formData.item_name !== "";

    const isPriceAndQuantityValid =
      formData.item_price !== "" && formData.item_quantity !== "";

    const isSizesPriceValid =
      sizesPrice.length === 0 ||
      sizesPrice.every(
        (size) =>
          (size?.stock?.trim() ?? "") !== "" &&
          (size?.price?.trim() ?? "") !== "" &&
          (size?.size?.trim() ?? "") !== ""
      );

    if (!isFormDataValid) {
      NotifyWarning("Please select a category and name");
      return;
    }

    if (!isPriceAndQuantityValid && sizesPrice.length === 0) {
      NotifyWarning("Please fill the price and quantity");
      return;
    }

    if (sizesPrice.length !== 0 && !isSizesPriceValid) {
      NotifyWarning("Please fill all the size and price fields");
      return;
    }

    writeNewItem(formData, saveUUID, setFormData, sizesPrice);

    // Reset form data and states
    setFormData({
      item_name: "",
      item_price: "",
      item_quantity: "",
      item_category: "",
    });
    setisOptional(false);
    setSizesPrice([]);
    setCategories("");
  };

  const savecategory_databse = (e) => {
    e.preventDefault();
    const saveUUID = uuidv4();
    if (inputCatergories.trim() === "") {
      const warning = "Fill categories..";
      return NotifyWarning(warning);
    } else {
      writeDataCategory(inputCatergories, saveUUID);
      setCategories(""); // Clear category input
    }
  };

  const handleRemoveItem = (id) => {
    set_meta_data_state(meta_data_state.filter((item) => item.id !== id));
  };

  const handleUpdateCategories = (e) => {
    e.preventDefault();
    UpdateCategory_Database(meta_data_state);
  };

  const addSize = (e) => {
    e.preventDefault();
    setisOptional(!isOptional);
    setSizesPrice((prevState) => [
      ...prevState,
      { size: "", price: "", stock: "" },
    ]);
  };

  const updateSize = (index, field, value) => {
    setSizesPrice((prevState) =>
      prevState.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const removeSize = (index) => {
    setSizesPrice((prevState) => prevState.filter((_, i) => i !== index));
  };

  return (
    <div className="w-fit h-full py-5 px-1 bg-slate-300 rounded-md shadow-md flex flex-col items-center">
      <div className="flex w-full items-center">
        {isMobile && (
          <MdOutlineArrowBackIosNew
            className="text-[30px] cursor-pointer hover:text-blue-500"
            onClick={() => HandleDeviceScreen()}
          />
        )}

        <label className="w-full font-semibold text-[18px] underline underline-offset-2">
          ADD ITEMS
        </label>
      </div>
      <form className="px-2 mt-5 space-y-3 w-full  overflow-y-auto flex-flex-col">
        {/* CATEGORY */}
        <div className="gap-1 flex items-center justify-between flex-col w-full">
          <div className="flex gap-1 items-center justify-between w-full">
            <label>CATEGORY:</label>
            <div className="flex items-center justify-between">
              {addCategory ? (
                <div className="flex flex-col w-full h-full">
                  <form className="w-full flex">
                    <input
                      required
                      type="text"
                      className="ItemInput"
                      placeholder="Add Category Here.."
                      value={inputCatergories}
                      onChange={(e) => setCategories(e.target.value)}
                    />
                    <IoClose
                      onClick={() => setaddCategory(!addCategory)}
                      className="text-[30px] MainTextColor hover:text-blue-600 cursor-pointer"
                    />
                  </form>
                </div>
              ) : (
                <>
                  <select
                    onChange={handleChange}
                    required
                    className="p-1 outline-none rounded-md"
                    name="item_category"
                    value={formData.item_category}
                  >
                    <option hidden>Select Here..</option>
                    {metaData_Category.map((cate, index) => (
                      <option key={index} value={cate.category}>
                        {cate.category}
                      </option>
                    ))}
                  </select>
                  <MdOutlineAddBox
                    onClick={() => setaddCategory(!addCategory)}
                    className="text-[30px] MainTextColor hover:text-blue-600 cursor-pointer"
                  />
                </>
              )}
            </div>
          </div>
          {addCategory && (
            <div className="w-full">
              {meta_data_state.map((item, index) => (
                <div
                  onClick={() => handleRemoveItem(item.id)}
                  key={index}
                  className="flex w-full justify-between mt-1 border-[1px] border-gray-400 p-1 rounded-md"
                >
                  <span>{item.category}</span>

                  <MdDelete className="text-[20px] cursor-pointer hover:text-red-500" />
                </div>
              ))}
            </div>
          )}
        </div>
        {/* ITEM INPUT */}
        {!addCategory && (
          <>
            <div className="ItemCard">
              <label>NAME:</label>
              <input
                required
                name="item_name"
                value={formData.item_name}
                type="text"
                className="ItemInput"
                onChange={handleChange}
              />
            </div>
            {sizesPrice.length === 0 && (
              <>
                <div className="ItemCard">
                  <label>PRICE:</label>
                  <input
                    required
                    onKeyDown={(e) => {
                      if (
                        !/[0-9]/.test(e.key) &&
                        e.key !== "." &&
                        e.key !== "Backspace"
                      ) {
                        e.preventDefault();
                      }
                    }}
                    name="item_price"
                    value={formData.item_price}
                    type="number"
                    className="ItemInput"
                    onChange={handleChange}
                  />
                </div>
                <div className="ItemCard">
                  <label>STOCK:</label>
                  <input
                    required
                    onKeyDown={(e) => {
                      if (
                        !/[0-9]/.test(e.key) &&
                        e.key !== "." &&
                        e.key !== "Backspace"
                      ) {
                        e.preventDefault();
                      }
                    }}
                    name="item_quantity"
                    value={formData.item_quantity}
                    type="number"
                    className="ItemInput"
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
            <div className="flex items-center gap-2">
              <span>Optional Add Size:</span>
              <button
                onClick={addSize}
                className="px-2 py-1 MainBgColor hover:shadow-lg duration-300 text-white rounded-md"
              >
                <BsPlusCircle />
              </button>
            </div>
            {sizesPrice.map((item, index) => (
              <div key={index} className="flex gap-x-2 mt-5">
                <input
                  type="text"
                  placeholder="Size"
                  value={item.size}
                  name="size"
                  onChange={(e) => updateSize(index, "size", e.target.value)}
                  className="w-[70px] px-1 py-1 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Price"
                  value={item.price}
                  name="price"
                  onKeyDown={(e) => {
                    if (
                      !/[0-9]/.test(e.key) &&
                      e.key !== "." &&
                      e.key !== "Backspace"
                    ) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => updateSize(index, "price", e.target.value)}
                  className="w-[70px] px-1 py-1 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Stock"
                  value={item.stock}
                  name="stock"
                  onKeyDown={(e) => {
                    if (
                      !/[0-9]/.test(e.key) &&
                      e.key !== "." &&
                      e.key !== "Backspace"
                    ) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => updateSize(index, "stock", e.target.value)}
                  className="w-[70px] px-1 py-1 rounded-md"
                />
                <button
                  onClick={() => removeSize(index)}
                  className="px-2 py-1 bg-red-500 text-white rounded-md hover:scale-105 duration-300"
                >
                  Remove
                </button>
              </div>
            ))}
          </>
        )}

        {addCategory ? (
          <>
            {metaData_Category.length === meta_data_state.length ? (
              <button
                onClick={savecategory_databse}
                className="w-full p-2 MainBgColor rounded-md flex gap-1 items-center justify-center mt-3 hover:text-black text-white hover:shadow-md"
              >
                ADD CATEGORY <TbCategoryPlus className="text-[20px]" />
              </button>
            ) : (
              <button
                onClick={handleUpdateCategories}
                className="w-full p-2 bg-blue-600 rounded-md flex gap-1 items-center justify-center mt-3 text-white hover:bg-opacity-50 hover:text-black hover:shadow-md"
              >
                SAVE CHANGES <TbCategoryPlus className="text-[20px]" />
              </button>
            )}
          </>
        ) : (
          <button
            onClick={saveItem_database}
            className="w-full p-2 MainBgColor rounded-md flex gap-1 items-center justify-center mt-3 hover:text-black text-white hover:shadow-md"
          >
            ADD ITEM <IoAdd className="text-[20px]" />
          </button>
        )}
      </form>
    </div>
  );
};

export default AddItems;
