import Link from "next/link";

const MainPage = async () => {
  // TODO 권한이 없다면 이 페이지로
  return (
    <section className="flex flex-col justify-center items-center h-full -bg--light-grey-light-bg gap-2">
      <h1 className="text-lg font-bold -text--Black">Not authorized</h1>
      <Link
        href="/signIn"
        className="font-bold -text--Main-Purple hover:-text--main-purple-hover"
      >
        Try to login
      </Link>
    </section>
  );
};

export default MainPage;
