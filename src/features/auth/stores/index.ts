import { atom, selector } from "recoil";
import { FormState } from "../types";

const initialAuthState: FormState = {
  state: "login",
  isLoading: false,
  isError: false,
  loginData: [
    {
      name: "email",
      type: "email",
      label: "email",
    },
    {
      name: "password",
      type: "password",
      label: "password",
    },
  ],
  signUpData: [
    {
      name: "email",
      type: "email",
      label: "email",
    },
    { name: "password", type: "password", label: "password" },
    {
      name: "confirmPassword",
      type: "password",
      label: "confirm password",
    },
  ],
};

export const formState = atom({
  key: "formState",
  default: initialAuthState,
});

export const getCurrentFormState = selector({
  key: "currentFormState",
  get: ({ get }) => {
    const currentState = get(formState);

    switch (currentState.state) {
      case "login":
        return currentState.loginData;
      case "signUp":
        return currentState.signUpData;
      default:
        return currentState.loginData;
    }
  },
});

export const getCurrentFormTitle = selector({
  key: "currentFormTitle",
  get: ({ get }) => {
    const currentState = get(formState);

    return currentState.state;
  },
});

export const getFormFetchingState = selector({
  key: "formLoadingState",
  get: ({ get }) => {
    const formData = get(formState);
    return {
      isLoading: formData.isLoading,
      isError: formData.isError,
    };
  },
});
