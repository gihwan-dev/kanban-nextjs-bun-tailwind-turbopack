import Link from "next/link";

const SignInFooter = () => {
  return (
    <footer className="flex flex-row gap-2">
      Don{"'"}t you have account?
      <Link className="font-semibold" href="/signUp">
        SignUP!
      </Link>
    </footer>
  );
};

export default SignInFooter;
