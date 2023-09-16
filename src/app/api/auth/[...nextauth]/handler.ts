import { comparePassword } from "@/utils/hash";

type AuthHandlerResponse = {
  email: string;
  password: string;
};

export const authenticate = async (
  email: string,
  password: string,
): Promise<AuthHandlerResponse | null> => {
  // TODO 인증 로직 설치(아이디 패스워드 받아와서 검증)
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      email: true,
      password: true,
    },
  });
  if (!user) {
    return null;
  }
  const isValid = await comparePassword(password, user.password);
  if (!isValid) {
    return null;
  }
  return user;
};
