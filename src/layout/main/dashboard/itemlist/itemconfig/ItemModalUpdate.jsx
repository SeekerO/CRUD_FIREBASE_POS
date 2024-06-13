import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { GrDocumentUpdate } from "react-icons/gr";
import { updateItem } from "../../../../../components/firebase";
import { NotifyWarning } from "../../../../../components/Notify";

const ItemModalUpdate = ({ item, setisEdit, isEdit, metaData_Category }) => {
  const [formData, setformData] = useState({
    item_name: "",
    item_price: "",
    item_quantity: "",
    item_category: "",
  });
  const [sizesPrice, setSizesPrice] = useState([]);
  const [isOptional, setOptional] = useState(false);

  useEffect(() => {
    if (Array.isArray(item.item_sizes)) {
      setSizesPrice(item.item_sizes);
    }
    setformData({
      id: item.id,
      item_name: item.item_name,
      item_price: item.item_price,
      item_quantity: item.item_quantity,
      item_category: item.item_category,
    });

    if (sizesPrice.length !== 0) setOptional(true);
    else setOptional(false);
  }, [item, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setformData({
      ...formData,
      [name]: value,
    });
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (
      (sizesPrice.length === 0 &&
        formData.item_price !== "" &&
        formData.item_quantity !== "") ||
      (sizesPrice.length !== 0 &&
        formData.item_price === "" &&
        formData.item_quantity === "")
    ) {
      const updatedData = { ...formData, item_sizes: sizesPrice };
      await updateItem(item.id, updatedData);
      setisEdit(false);
    } else {
      const warning = "Cannot update..";
      NotifyWarning(warning);
    }
  };

  const addSize = (e) => {
    e.preventDefault();
    setSizesPrice((prevState) => [
      ...prevState,
      { size: "", price: "", stock: "" },
    ]);
  };

  const removeSize = (index) => {
    setSizesPrice((prevState) => prevState.filter((_, i) => i !== index));
  };

  const updateSize = (index, field, value) => {
    setSizesPrice((prevState) =>
      prevState.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const handleCheckboxChange = () => {
    setOptional(!isOptional);
    setformData({
      ...formData,
      item_name: formData.item_name,
      item_price: "",
      item_quantity: "",
      item_category: formData.item_category,
    });
    setSizesPrice([]);
  };

  if (!isEdit) return null;

  return (
    <div className="h-full w-full bg-gray-800 fixed inset-0 bg-opacity-10 backdrop-blur-[3px] flex justify-center">
      <div className="w-auto h-fit bg-slate-100 rounded-md mt-40 shadow-md p-2">
        <div className="justify-end flex">
          <IoClose
            className="text-[30px] cursor-pointer hover:text-red-500"
            onClick={() => setisEdit(!isEdit)}
          />
        </div>

        <form className="flex flex-col gap-2">
          <div className="flex gap-2 w-full">
            <div className="flex flex-col gap-2 w-full">
              <label className="font-semibold">Categories</label>
              <select
                required
                className="p-1 outline-none rounded-md"
                name="item_category"
                value={formData.item_category}
                onChange={handleChange}
              >
                {metaData_Category.map((cate, index) => (
                  <option
                    key={index}
                    value={cate.category}
                    className="lowercase"
                  >
                    {cate.category}
                  </option>
                ))}
              </select>
              <label className="font-semibold">Name</label>
              <input
                required
                type="text"
                onChange={handleChange}
                name="item_name"
                value={formData.item_name}
                className="ItemInput"
              />
              {!isOptional && (
                <>
                  <label className="font-semibold">Price</label>
                  <input
                    required
                    type="number"
                    onKeyDown={(e) => {
                      if (
                        !/[0-9]/.test(e.key) &&
                        e.key !== "." &&
                        e.key !== "Backspace"
                      ) {
                        e.preventDefault();
                      }
                    }}
                    onChange={handleChange}
                    name="item_price"
                    value={formData.item_price}
                    className="ItemInput"
                  />
                  <label className="font-semibold">Quantity</label>
                  <input
                    required
                    type="number"
                    onKeyDown={(e) => {
                      if (
                        !/[0-9]/.test(e.key) &&
                        e.key !== "." &&
                        e.key !== "Backspace"
                      ) {
                        e.preventDefault();
                      }
                    }}
                    onChange={handleChange}
                    name="item_quantity"
                    value={formData.item_quantity}
                    className="ItemInput"
                  />
                </>
              )}

              <div className="flex items-center gap-1">
                <span>Optional Sizes</span>
                <input
                  type="checkbox"
                  checked={isOptional}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4"
                />
              </div>
            </div>

            {(isOptional || sizesPrice.length) !== 0 && (
              <div className="border-s-2 border-gray-200 px-2">
                <label className="font-semibold">Optional Sizes</label>
                <div className="">
                  {sizesPrice.map((item, index) => (
                    <div key={index} className="flex gap-x-2 mt-5">
                      <input
                        type="text"
                        placeholder="Size"
                        value={item.size}
                        onChange={(e) =>
                          updateSize(index, "size", e.target.value)
                        }
                        className="w-[100px] px-1 py-1 rounded-md"
                      />
                      <input
                        type="number"
                        placeholder="Price"
                        value={item.price}
                        onKeyDown={(e) => {
                          if (
                            !/[0-9]/.test(e.key) &&
                            e.key !== "." &&
                            e.key !== "Backspace"
                          ) {
                            e.preventDefault();
                          }
                        }}
                        onChange={(e) =>
                          updateSize(index, "price", e.target.value)
                        }
                        className="w-[100px] px-1 py-1 rounded-md"
                      />
                      <input
                        type="number"
                        placeholder="Stock"
                        value={item.stock}
                        onKeyDown={(e) => {
                          if (
                            !/[0-9]/.test(e.key) &&
                            e.key !== "." &&
                            e.key !== "Backspace"
                          ) {
                            e.preventDefault();
                          }
                        }}
                        onChange={(e) =>
                          updateSize(index, "stock", e.target.value)
                        }
                        className="w-[100px] px-1 py-1 rounded-md"
                      />
                      <button
                        onClick={() => removeSize(index)}
                        className="px-2 py-1 bg-red-500 text-white rounded-md hover:scale-105 duration-300"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addSize}
                    className="mt-5 px-2 py-1 bg-green-500 text-white rounded-md"
                  >
                    Add Size
                  </button>
                </div>
              </div>
            )}
          </div>
          <button
            onClick={handleUpdate}
            className="flex items-center gap-2 bg-blue-500 p-1 font-semibold rounded-md justify-center text-white hover:text-black hover:bg-opacity-80 duration-300"
          >
            UPDATE ITEM <GrDocumentUpdate />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ItemModalUpdate;
