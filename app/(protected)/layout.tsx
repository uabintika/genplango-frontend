"use client";

import { useAuth } from "@/contexts/auth-context";
import { ROUTES } from "@/routes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import FullPageLoader from "@/components/full-page-loader";

export default function ProtectedLayout({ children }: Children) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace(ROUTES.AUTH.LOGIN);
    }
  }, [user, loading, router]);

  if (loading) {
    return <FullPageLoader />;
  }

  if (user) {
    return <>{children}</>;
  }

  // Render null while the redirect is in flight to prevent showing anything.
  // redirect(ROUTES.AUTH.LOGIN);
  return <></>;
}
