"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  // TODO 랜딩 페이지 구현
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    router.push("/main");
  }, [router]);

  return <main></main>;
}
