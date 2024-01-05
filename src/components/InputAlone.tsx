import IconCross from "@/assets/icon-cross";
import React from "react";

const InputAlone: React.FC<{
  onClick: () => void;
  placeholder?: string;
}> = ({ onClick, placeholder = "" }) => {
  return (
    <div className="flex flex-row gap-4 items-center justify-between w-full">
      <input
        placeholder={placeholder}
        className="w-full px-4 py-2 text-sm font-medium -text--Black border -border--Medium-Grey border-opacity-25 rounded-md"
      />
      <IconCross onClick={onClick} />
    </div>
  );
};

export default InputAlone;
