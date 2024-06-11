import React, { useState } from "react";
import {
  writeNewItem,
  writeDataCategory,
} from "../../../../components/firebase";
import { v4 as uuidv4 } from "uuid";
import { IoAdd, IoClose } from "react-icons/io5";
import { MdOutlineAddBox } from "react-icons/md";
import { TbCategoryPlus } from "react-icons/tb";
import SizePicker from "../component_dashboard/SizePicker";

const AddItems = ({ metaData_Category }) => {
  const [addCategory, setaddCategory] = useState(false);
  const [isCatergories, setCategories] = useState("");
  const [isOptional, setisOptional] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [sizePrices, setSizePrices] = useState([]);
  const [formData, setFormData] = useState({
    item_name: "",
    item_price: "",
    item_quantity: "",
    item_category: "",
  });

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

    if (formData.item_category !== "") {
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
    }
  };

  const savecategory_databse = (e) => {
    e.preventDefault();
    const saveUUID = uuidv4();
    writeDataCategory(isCatergories, saveUUID);
    alert("New Category Added Succesfuly!");
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

  return (
    <div className="w-[500px] h-full py-5 px-1 bg-slate-300 rounded-md shadow-md flex flex-col items-center">
      <label className="w-full text-center font-semibold text-[20px] underline underline-offset-2">
        ADD ITEMS
      </label>

      <form className="px-2 mt-5 space-y-3 w-full h-[70vh] overflow-y-auto">
        <div className="gap-1 flex items-center justify-between">
          <label>CATEGORY:</label>
          <div className="flex items-center justify-between">
            {addCategory ? (
              <div className="w-full flex">
                <input
                  required
                  type="text"
                  className="ItemInput"
                  value={isCatergories}
                  onChange={(e) => setCategories(e.target.value)}
                />
                <IoClose
                  onClick={() => setaddCategory(!addCategory)}
                  className="text-[30px] MainTextColor hover:text-blue-600 cursor-pointer"
                />
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
                  <option></option>
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
        {addCategory ? (
          <button
            onClick={savecategory_databse}
            className="w-full p-2 MainBgColor rounded-md flex gap-1 items-center justify-center mt-3 hover:text-slate-100 hover:shadow-md"
          >
            ADD CATEGORY <TbCategoryPlus className="text-[20px]" />
          </button>
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
