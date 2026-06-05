"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function GeneratingRedirect({ target }: { target: string }) {
  const router = useRouter();

  useEffect(() => {
    router.prefetch(target);
    const timer = setTimeout(() => {
      router.replace(target);
    }, 1800);
    return () => clearTimeout(timer);
  }, [router, target]);

  return null;
}
