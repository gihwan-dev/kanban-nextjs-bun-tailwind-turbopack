"use client";

import Modal from "@/UI/Modal";
import { inputClassName, labelClassName } from "./auth-tailwind";
import axios from "axios";
import { SERVER_URL } from "@/const";
import { StatusCodes } from "http-status-codes";

const SignUpForm: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const isValidForm = (password: string, confirmPassword: string) => {
    if (password.trim() !== confirmPassword.trim()) {
      return false;
    }

    return true;
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const form = e.target as HTMLFormElement;
      const emailElement = form.elements[0] as HTMLInputElement;
      const passwordElement = form.elements[1] as HTMLInputElement;
      const passwordConfirmElement = form.elements[2] as HTMLInputElement;

      if (!isValidForm(passwordElement.value, passwordConfirmElement.value)) {
        window.alert("비밀번호가 일치하지 않습니다.");
        return;
      }

      const response = await axios.post<{ message: string }>(
        `${SERVER_URL}/auth/signUp`,
        {
          email: emailElement.value,
          password: passwordElement.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === StatusCodes.CREATED) {
        onClose();
        window.alert(response.data.message);
        return;
      }

      window.alert(response.data.message);
      return;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        window.alert(
          error.response?.data.message ?? "Failed to sign up try again."
        );
        return;
      }
      window.alert("Failed to sign up try again.");
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
        <header className={"mb-4 text-xl font-bold"}>회원가입</header>
        <label className={labelClassName.className}>email</label>
        <input
          className={inputClassName.className}
          type="email"
        />
        <label className={labelClassName.className}>password</label>
        <input
          className={inputClassName.className}
          type="password"
        />
        <label className={labelClassName.className}>confirm password</label>
        <input
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

export default SignUpForm;
