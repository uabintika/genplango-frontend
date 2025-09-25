"use client";

import Loader from "@/components/Loader";
import { useMounted } from "@/hooks/useMounted";

export default function MountedProvider({ children }: Children) {
  const mounted = useMounted();
  if (!mounted) return <Loader />;
  return children;
}
