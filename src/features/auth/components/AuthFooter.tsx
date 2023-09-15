"use client";

import { useRecoilState } from "recoil";
import { formState } from "../stores";

const AuthFooter = () => {
  const [formStateValue, setFormState] = useRecoilState(formState);

  let content;

  const onClickHandler = (state: "login" | "signUp") => {
    setFormState(prev => {
      return {
        ...prev,
        state,
      };
    });
  };

  switch (formStateValue.state) {
    case "login":
      return (
        <p className="text-sm">
          {"Don't you have account?"}{" "}
          <button
            className="font-bold"
            onClick={() => onClickHandler("signUp")}
          >
            SignUp
          </button>
        </p>
      );
    case "signUp":
      return (
        <p className="text-sm">
          {"If you have account"}{" "}
          <button className="font-bold" onClick={() => onClickHandler("login")}>
            Login
          </button>
        </p>
      );
    default:
      <p className="text-sm">
        {"Don't you have account?"}{" "}
        <button className="font-bold">SignUp</button>
      </p>;
  }

  return <footer>{content}</footer>;
};

export default AuthFooter;
