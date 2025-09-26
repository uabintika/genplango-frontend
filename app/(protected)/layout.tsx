"use client";

import { useAuth } from "@/contexts/AuthContext";
import { ROUTES } from "@/routes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import FullPageLoader from "@/components/FullPageLoader";

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

  // If the user is authenticated, render the actual page content.
  if (user) {
    return <>{children}</>;
  }

  // Render null while the redirect is in flight to prevent showing anything.
  return <>here</>;
}
