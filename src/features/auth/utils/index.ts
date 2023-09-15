import { EnteredForm } from "../types";

const isEmailValid = (email: string): boolean => {
  const emailRegex: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
};

const isPasswordValid = (password: string, confirmPassword?: string) => {
  if (!confirmPassword) {
    return password.trim().length > 0;
  }
  return password.trim() === confirmPassword.trim();
};

export const validateForm = (
  type: "email" | "password" | "confirmPassword" | "login" | "signUp",
  enteredForm: EnteredForm,
) => {
  switch (type) {
    case "email":
      return isEmailValid(enteredForm.email);
    case "password":
      return isPasswordValid(enteredForm.password);
    case "confirmPassword":
      return isPasswordValid(enteredForm.confirmPassword, enteredForm.password);
    case "login":
      return (
        isEmailValid(enteredForm.email) && isPasswordValid(enteredForm.password)
      );
    case "signUp":
      return (
        isEmailValid(enteredForm.email) && isPasswordValid(enteredForm.password)
      );
  }
};
