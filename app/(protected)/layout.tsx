"use client";

import { useAuth } from "@/contexts/auth-context";
import { ROUTES } from "@/routes";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import FullPageLoader from "@/components/full-page-loader";

export default function ProtectedLayout({ children }: Children) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push(ROUTES.AUTH.LOGIN);
    }
  }, [user, loading, router]);

  if (loading) {
    return <FullPageLoader />;
  }

  if (!user) {
    redirect(ROUTES.AUTH.LOGIN);
  }

  return (
    <div className="flex min-h-svh w-full flex-col bg-default-100 dark:bg-background">
      {children}
    </div>
  );
}
