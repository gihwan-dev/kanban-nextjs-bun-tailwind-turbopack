import AuthForm from "./AuthForm";
import AuthHeader from "./AuthHeader";

const AuthRoot = () => {
  return (
    <main className="flex flex-col items-center -bg--light-grey-light-bg px-6 py-8 rounded-lg w-full max-w-md gap-4">
      <AuthHeader />
      <AuthForm />
    </main>
  );
};

export default AuthRoot;
