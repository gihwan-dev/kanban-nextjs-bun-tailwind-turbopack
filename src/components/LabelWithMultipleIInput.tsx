import InputAlone from "./InputAlone";

const LabelWithMultipleInput: React.FC<{
  labelTitle: string;
  placeholder: string;
  inputList: string[];
  onClickDelete: (index: number) => void;
  onClickAdd: () => void;
}> = ({ labelTitle, placeholder, inputList, onClickDelete, onClickAdd }) => {
  const onClickDeleteHandler = (index: number) => {
    onClickDelete(index);
  };

  return (
    <div className="flex flex-col gap-2">
      <label
        placeholder={placeholder}
        className="-text--Medium-Grey font-bold text-xs"
      >
        {labelTitle}
      </label>
      <div className="flex flex-col gap-3">
        {inputList.map((item, index) => {
          return (
            <InputAlone
              key={item}
              onClick={() => onClickDeleteHandler(index)}
            />
          );
        })}
        <button
          type="button"
          onClick={onClickAdd}
          className="py-2 -bg--Main-Purple bg-opacity-10 -text--Main-Purple font-bold rounded-full w-full hover:-bg--White"
        >
          + Add New Subtask
        </button>
      </div>
    </div>
  );
};

export default LabelWithMultipleInput;
