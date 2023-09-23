import { SERVER_URL } from "@/const";
import { SignUpDto } from "../types";

export const singUpFetcher = async (signUpDto: SignUpDto) =>
  fetch(`${SERVER_URL}/auth/signUp`, {
    method: "POST",
    body: JSON.stringify({
      email: signUpDto.email,
      password: signUpDto.password,
    }),
  });
