import React from "react";

const SizePicker = ({ handleOptionalSizes_function, isOptional }) => {
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
    </div>
  );
};

export default SizePicker;
