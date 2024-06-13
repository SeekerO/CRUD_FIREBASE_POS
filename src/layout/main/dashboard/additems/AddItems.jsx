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
import SizePicker from "../component_dashboard/SizePicker";
import { NotifyWarning } from "../../../../components/Notify";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { isMobile } from "react-device-detect";

const AddItems = ({ metaData_Category, HandleDeviceScreen, deviceType }) => {
  const [addCategory, setaddCategory] = useState(false);
  const [isOptional, setisOptional] = useState(false);
  const [inputCatergories, setCategories] = useState("");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [sizePrices, setSizePrices] = useState([]);
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
    var saveUUID = uuidv4();

    if (formData.item_category !== "" && formData.item_name !== "") {
      if (formData.item_price !== "" && formData.item_quantity !== "") {
        writeNewItem(formData, saveUUID, setFormData, sizePrices);
        setFormData({
          item_name: "",
          item_price: "",
          item_quantity: "",
          item_category: "",
        });
        setisOptional(false);
        setSelectedSizes([]);
        setSizePrices([]);
        setCategories("");
      } else {
        const warning = "Please fill the a price and quantity";
        NotifyWarning(warning);
      }
    } else {
      const warning = "Please select a category and name";
      NotifyWarning(warning);
    }
  };

  const savecategory_databse = (e) => {
    e.preventDefault();
    const saveUUID = uuidv4();
    writeDataCategory(inputCatergories, saveUUID);
    setCategories(""); // Clear category input
  };

  const handleSizeChange = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
      setSizePrices(sizePrices.filter((prize) => prize.size !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
      setSizePrices([...sizePrices, { size, price: "", stock: "" }]);
    }
  };

  const handleOptionalSizes_function = () => {
    setisOptional(!isOptional);
    setSelectedSizes([]);
    setSizePrices([]);
  };

  const handlePriceChange = (size, field, value) => {
    const newSizePrices = sizePrices.map((item) =>
      item.size === size ? { ...item, [field]: value } : item
    );
    setSizePrices(newSizePrices);
  };

  const handleRemoveItem = (id) => {
    set_meta_data_state(meta_data_state.filter((item) => item.id !== id));
  };

  const handleUpdateCategories = (e) => {
    e.preventDefault();
    UpdateCategory_Database(meta_data_state);
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

        <label className="w-full mt-4 font-semibold text-[18px] underline underline-offset-2">
          ADD ITEMS
        </label>
      </div>
      <form className="px-2 mt-5 space-y-3 w-full  overflow-y-auto flex-flex-col">
        <div className="gap-1 flex items-center justify-between">
          <label>CATEGORY:</label>
          <div className="flex items-center justify-between">
            {addCategory ? (
              <div className="flex flex-col w-full h-full">
                <div className="w-full flex">
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
                </div>
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
            {!isOptional && (
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
            <SizePicker
              handleSizeChange={handleSizeChange}
              handleOptionalSizes_function={handleOptionalSizes_function}
              handlePriceChange={handlePriceChange}
              sizePrices={sizePrices}
              selectedSizes={selectedSizes}
              isOptional={isOptional}
            />
            <div>
              <label className="block mb-2">Prizes:</label>
              {sizePrices.map((prize, index) => (
                <div key={index} className="mb-2 flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Size"
                    value={prize.size}
                    readOnly
                    className="w-[100px] px-1 py-1 rounded-md"
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={prize.price}
                    onChange={(e) =>
                      handlePriceChange(prize.size, "price", e.target.value)
                    }
                    className="w-[100px] px-1 py-1 rounded-md"
                  />
                  <input
                    type="number"
                    placeholder="Stock"
                    value={prize.stock}
                    onChange={(e) =>
                      handlePriceChange(prize.size, "stock", e.target.value)
                    }
                    className="w-[100px] px-1 py-1 rounded-md"
                  />
                  <IoClose
                    onClick={() => handleSizeChange(prize.size)}
                    className="text-[20px] cursor-pointer text-red-500"
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {addCategory && (
          <div className="">
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

        {addCategory ? (
          <>
            {metaData_Category.length === meta_data_state.length ? (
              <button
                onClick={savecategory_databse}
                className="w-full p-2 MainBgColor rounded-md flex gap-1 items-center justify-center mt-3 hover:text-slate-100 hover:shadow-md"
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
            className="w-full p-2 MainBgColor rounded-md flex gap-1 items-center justify-center mt-3 hover:text-slate-100 hover:shadow-md"
          >
            ADD ITEM <IoAdd className="text-[20px]" />
          </button>
        )}
      </form>
    </div>
  );
};

export default AddItems;
