import Modal from "@/components/Modal";

const SuccessModal = () => {
  return (
    <Modal onBackdropClick={() => {}}>
      <div className={"w-full h-full flex justify-center items-center"}>
        <h1 className={"font-bold text-2xl -text--Main-Purple"}>Success!</h1>
      </div>
    </Modal>
  );
};

export default SuccessModal;
