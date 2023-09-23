import { atom, selector } from "recoil";
import { FormState } from "../types";

const initialAuthState: FormState = {
  isLoading: false,
  isError: false,
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
