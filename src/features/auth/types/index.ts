export type LogInDto = {
  email: string;
  password: string;
};

export type SignUpDto = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type EnteredForm = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type FormState = {
  state: "login" | "signUp";
  isLoading: boolean;
  isError: boolean;
  loginData: [
    {
      name: "email";
      type: "email";
      label: "email";
    },
    {
      name: "password";
      type: "password";
      label: "password";
    },
  ];
  signUpData: [
    {
      name: "email";
      type: "email";
      label: "email";
    },
    {
      name: "password";
      type: "password";
      label: "password";
    },
    {
      name: "confirmPassword";
      type: "password";
      label: "confirm password";
    },
  ];
};
