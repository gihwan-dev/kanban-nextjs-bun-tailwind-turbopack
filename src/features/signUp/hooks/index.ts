import { SignUpDto } from "../types";
import { useMutation } from "@tanstack/react-query";
import { singUpFetcher } from "../api";

export const useSignUp = () => {
  return useMutation({
    mutationKey: ["signUp"],
    mutationFn: (signUpDto: SignUpDto) => singUpFetcher(signUpDto),
  });
};
