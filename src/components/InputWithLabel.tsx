import React from "react";

const InputWithLabel: React.FC<{
  labelTitle: string;
  placeholder: string;
}> = ({ labelTitle, placeholder }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="-text--Medium-Grey font-bold text-xs">
        {labelTitle}
      </label>
      <input
        placeholder={placeholder}
        className="px-4 py-2 text-sm font-medium -text--Black border -border--Medium-Grey border-opacity-25 rounded-md"
      />
    </div>
  );
};

export default InputWithLabel;
