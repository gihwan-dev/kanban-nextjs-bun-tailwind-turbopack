const EmptyColumn = () => {
  return (
    <section className="w-full h-full flex flex-col items-center justify-center px-8 text-center gap-6">
      <p className={"-text--Medium-Grey font-bold text-lg"}>
        This board is empty. Create a new column to get started.
      </p>
      <button
        className={
          "flex -text--White rounded-full -bg--Main-Purple font-bold text-base p-4 hover:-bg--main-purple-hover"
        }
      >
        +Add New Column
      </button>
    </section>
  );
};

export default EmptyColumn;
