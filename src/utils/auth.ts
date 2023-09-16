import { Session } from "next-auth";

export const validateUser = (
  session: Session | null,
): session is Session & { user: { email: string } } => {
  if (!session) {
    return false;
  }
  if (!session.user) {
    return false;
  }
  if (!session.user.email) {
    return false;
  }
  return true;
};
