import LogoDark from "@/assets/logo-dark";

const SignInHeader = () => {
  return (
    <header className="flex flex-col gap-4">
      <LogoDark />
      <h1 className="font-bold text-2xl">Sign in</h1>
    </header>
  );
};

export default SignInHeader;
