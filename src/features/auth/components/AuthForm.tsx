"use client";

import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { getCurrentFormState, getCurrentFormTitle } from "../stores";
import { EnteredForm, LogInDto, SignUpDto } from "../types";
import { useLogin, useSignUp } from "../hooks";
import { validateForm } from "../utils";

const AuthForm = () => {
  const [enteredForm, setEnteredForm] = useState<EnteredForm>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isValidForm, setIsValidForm] = useState(true);

  const login = useLogin();
  const { mutate: signUp, isLoading, isError } = useSignUp();

  const formState = useRecoilValue(getCurrentFormState);
  const title = useRecoilValue(getCurrentFormTitle);

  useEffect(() => {
    setEnteredForm({
      email: "",
      password: "",
      confirmPassword: "",
    });
  }, [title]);

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
    switch (title) {
      case "login":
        const loginFormData: LogInDto = {
          email: enteredForm.email,
          password: enteredForm.password,
        };
        if (!validateForm("login", enteredForm)) {
          setIsValidForm(false);
          return;
        }
        login(loginFormData);
        break;
      case "signUp":
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
        break;
      default:
        return;
    }
  };

  return (
    <form className="flex flex-col w-full gap-4" onSubmit={onSubmitHandler}>
      {formState.map(item => {
        return (
          <div className="flex flex-col gap-2" key={`${title}${item.name}`}>
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
