"use client";

import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { EnteredForm, LogInDto, SignUpDto } from "../types";
import { useSignUp } from "../hooks";
import { validateForm } from "../utils";
import { formState } from "../stores";

const AuthForm = () => {
  const [enteredForm, setEnteredForm] = useState<EnteredForm>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isValidForm, setIsValidForm] = useState(true);

  const { mutate: signUp, isLoading, isError } = useSignUp();

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
    const signUpFormData: SignUpDto = {
      email: enteredForm.email,
      password: enteredForm.password,
      confirmPassword: enteredForm.confirmPassword,
    };
    if (!validateForm("signUp", enteredForm)) {
      setIsValidForm(false);
      return;
    }
    signUp(signUpFormData);
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
      <button className="-bg--Main-Purple -text--White font-bold py-2 rounded-full hover:-bg--main-purple-hover">
        submit
      </button>
    </form>
  );
};

export default AuthForm;
