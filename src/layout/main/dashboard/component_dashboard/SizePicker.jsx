import React from "react";

const SizePicker = ({
  handleSizeChange,
  handleOptionalSizes_function,
  handlePriceChange,
  sizePrices,
  selectedSizes,
  isOptional,
}) => {
  return (
    <div className="flex flex-col gap-1 ">
      <div className="flex gap-1 items-center">
        <span>Opional Sizes</span>
        <input
          checked={isOptional}
          onChange={() => handleOptionalSizes_function()}
          type="checkbox"
          className="flex h-[15px] w-[15px]"
        />
      </div>
      {isOptional && (
        <div className="flex justify-evenly flex-wrap">
          <div className="items-center flex gap-1">
            <span>Small</span>
            <input
              type="checkbox"
              className="flex h-[15px] w-[15px]"
              checked={selectedSizes.includes("Small")}
              onChange={() => handleSizeChange("Small")}
            />
          </div>
          <div className="items-center flex gap-1">
            <span>Medium</span>
            <input
              type="checkbox"
              className="flex h-[15px] w-[15px]"
              checked={selectedSizes.includes("Medium")}
              onChange={() => handleSizeChange("Medium")}
            />
          </div>
          <div className="items-center flex gap-1">
            <span>Large</span>
            <input
              type="checkbox"
              className="flex h-[15px] w-[15px]"
              checked={selectedSizes.includes("Large")}
              onChange={() => handleSizeChange("Large")}
            />
          </div>
          <div className="items-center flex gap-1">
            <span>Extra Large</span>
            <input
              type="checkbox"
              className="flex h-[15px] w-[15px]"
              checked={selectedSizes.includes("Extra Large")}
              onChange={() => handleSizeChange("Extra Large")}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SizePicker;
