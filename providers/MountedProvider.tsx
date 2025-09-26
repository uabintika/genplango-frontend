"use client";

import FullPageLoader from "@/components/FullPageLoader";
import { useMounted } from "@/hooks/useMounted";

export default function MountedProvider({ children }: Children) {
  const mounted = useMounted();
  if (!mounted) return <FullPageLoader />;
  return children;
}
