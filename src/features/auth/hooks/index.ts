import { useRecoilState } from "recoil";
import { formState } from "../stores";
import { LogInDto, SignUpDto } from "../types";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { singUpFetcher } from "../api";

export const useLogin = () => {
  const [_, setFormState] = useRecoilState(formState);

  const router = useRouter();

  const login = async (loginForm: LogInDto) => {
    setFormState(prev => {
      return {
        ...prev,
        isLoading: true,
      };
    });

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: loginForm.email,
        password: loginForm.password,
      });
      if (!result) {
        throw new Error();
      }
      router.push("/main");
    } catch (error) {
      setFormState(prev => {
        return {
          ...prev,
          isError: true,
        };
      });
      setTimeout(() => {
        setFormState(prev => {
          return {
            ...prev,
            isError: false,
          };
        });
      }, 2000);
    } finally {
      setFormState(prev => ({
        ...prev,
        isLoading: false,
      }));
    }
  };

  return login;
};

export const useSignUp = () => {
  return useMutation({
    mutationKey: ["signUp"],
    mutationFn: (signUpDto: SignUpDto) => singUpFetcher(signUpDto),
  });
};
