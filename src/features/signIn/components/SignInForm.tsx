"use client";

import SignInBody from "./SignInBody";
import SignInFooter from "./SignInFooter";
import SignInHeader from "./SignInHeader";

const SignInForm = () => {
  return (
    <section className="flex flex-col gap-4 -bg--White px-6 py-8 rounded-lg">
      <SignInHeader />
      <SignInBody />
      <SignInFooter />
    </section>
  );
};

export default SignInForm;
