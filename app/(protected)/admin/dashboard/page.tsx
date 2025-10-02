"use client";

import { useAuth } from "@/contexts/auth-context";

export default function Dashboard() {
  const { user } = useAuth();

  return <>{user?.firstName + " " + user?.lastName}</>;
}
