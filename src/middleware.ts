import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      if (req.nextUrl.pathname !== "/auth") {
        return true;
      }
      return !!token;
    },
  },
});

export const config = {
  matcher: ["/api"],
};
