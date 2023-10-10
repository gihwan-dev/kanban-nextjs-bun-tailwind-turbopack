import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignInBody = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      });
      if (result?.ok) {
        router.push("/main");
      }
    } catch (error) {
      if (error instanceof Error) {
        window.alert(error.message);
        return;
      }
      window.alert("Fail to sign in... try again.");
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2">
      <label htmlFor="email-input" className="font-bold">
        email
      </label>
      <input
        id="email-input"
        type="text"
        name="email"
        onChange={onChange}
        className="w-72 border -border--Medium-Grey px-2 py-2 rounded-lg border-opacity-30"
      />
      <label className="font-bold" htmlFor="password-input">
        password
      </label>
      <input
        id="password-input"
        type="password"
        name="password"
        onChange={onChange}
        className="w-72 border -border--Medium-Grey px-2 py-2 rounded-lg border-opacity-30"
      />
      <button
        type="submit"
        className="w-full -bg--Main-Purple -text--White font-bold py-2 rounded-full hover:-bg--main-purple-hover"
      >
        Submit
      </button>
    </form>
  );
};

export default SignInBody;
