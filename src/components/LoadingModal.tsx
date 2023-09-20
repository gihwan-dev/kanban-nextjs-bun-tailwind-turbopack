import { Spinner } from "@nextui-org/react";

const LoadingModal = () => {
  return (
    <div
      className={
        "fixed top-0 left-0 w-full h-full flex items-center justify-center"
      }
    >
      <Spinner size={"lg"} />
    </div>
  );
};

export default LoadingModal;
