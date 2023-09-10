"use client";

import Modal from "@/UI/Modal";
import { inputClassName, labelClassName } from "./auth-tailwind";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (response?.error === null) {
        router.refresh();
        onClose();
        return;
      }

      window.alert(response?.error ?? "로그인 실패");
      return;
    } catch (error) {
      if (error instanceof Error) {
        window.alert(error.message);
        return;
      }
      console.error(error);
    }
  };

  return (
    <Modal onBackdropClick={onClose}>
      <form
        onSubmit={onSubmitHandler}
        className={
          "-bg--White px-8 py-4 -translate-x-1/2 -translate-y-1/2 flex flex-col rounded-md w-fit"
        }
      >
        <header className={"mb-4 text-xl font-bold"}>로그인</header>
        <label
          htmlFor="email"
          className={labelClassName.className}
        >
          email
        </label>
        <input
          onChange={emailChangeHandler}
          id="email"
          className={inputClassName.className}
          type="email"
        />
        <label
          htmlFor="password"
          className={labelClassName.className}
        >
          password
        </label>
        <input
          onChange={passwordChangeHandler}
          id="password"
          className={inputClassName.className}
          type="password"
        />
        <div className={"flex flex-row justify-end gap-4"}>
          <button
            onClick={onClose}
            type="button"
            className="font-bold"
          >
            close
          </button>
          <button
            type="submit"
            className="font-bold"
          >
            submit
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default LoginForm;
