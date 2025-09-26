"use client";

import FullPageLoader from "@/components/FullPageLoader";
import { useAuth } from "@/contexts/AuthContext";
import { ROUTES } from "@/routes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({ children }: Children) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace(ROUTES.ADMIN.DASHBOARD);
    }
  }, [user, loading, router]);

  if (loading) {
    return <FullPageLoader />;
  }

  if (!user) {
    return <>{children}</>;
  }

  return null;
}
