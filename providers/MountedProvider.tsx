"use client";

import FullPageLoader from "@/components/full-page-loader";
import { useMounted } from "@/hooks/use-mounted";

export default function MountedProvider({ children }: Children) {
  const mounted = useMounted();
  if (!mounted) return <FullPageLoader />;
  return children;
}
