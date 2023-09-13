import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.main
      className={`w-full h-full -bg--light-grey-light-bg -border-b--lines-light pt-6 px-6 pb-12 flex flex-row overflow-x-scroll gap-6 box-border`}
    ></motion.main>
  );
}
