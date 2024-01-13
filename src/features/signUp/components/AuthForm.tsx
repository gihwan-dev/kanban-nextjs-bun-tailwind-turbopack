"use client";

import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { EnteredForm, LogInDto, SignUpDto } from "../types";
import { useSignUp } from "../hooks";
import { validateForm } from "../utils";
import { formState } from "../stores";
import { useRouter } from "next/navigation";
import Link from "next/link";

const AuthForm = () => {
  const [enteredForm, setEnteredForm] = useState<EnteredForm>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isValidForm, setIsValidForm] = useState(true);

  const { mutate: signUp } = useSignUp();

  const router = useRouter();

  const formStateData = useRecoilValue(formState);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsValidForm(true);
    setEnteredForm(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const signUpFormData: SignUpDto = {
      email: enteredForm.email,
      password: enteredForm.password,
      confirmPassword: enteredForm.confirmPassword,
    };
    if (!validateForm("signUp", enteredForm)) {
      setIsValidForm(false);
      return;
    }
    signUp(signUpFormData, {
      onSuccess: data => {
        if (data.ok) {
          router.push("/signIn");
          return;
        }
        window.alert("Fail to sign up... try again.");
      },
    });
  };

  return (
    <form className="flex flex-col w-full gap-4" onSubmit={onSubmitHandler}>
      {formStateData.signUpData.map(item => {
        return (
          <div className="flex flex-col gap-2" key={`${"Sign up"}${item.name}`}>
            <label
              className={`font-bold text-sm ${
                validateForm(item.name, enteredForm)
                  ? "-text--Medium-Grey"
                  : "-text--Red"
              }`}
            >
              {item.label}
            </label>
            <input
              className={`focus: outline-none px-1 py-2 border rounded-md text-sm ${
                validateForm(item.name, enteredForm)
                  ? "-border--lines-light"
                  : "-border--Red"
              }`}
              onChange={onChangeHandler}
              type={item.type}
              name={item.name}
            />
          </div>
        );
      })}
      {isValidForm ? (
        ""
      ) : (
        <p className="text-sm -text--Red font-bold">check form validation</p>
      )}
      <button
        type="submit"
        className="-bg--Main-Purple -text--White font-bold py-2 rounded-full hover:-bg--main-purple-hover"
      >
        submit
      </button>
      <Link className="text-center font-bold" href="/signIn">
        Sign in
      </Link>
    </form>
  );
};

export default AuthForm;
