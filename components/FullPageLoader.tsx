"use client";

import { useMounted } from "@/hooks/useMounted";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

type PageLoaderProps = {
  isLoading?: boolean;
};

export default function FullPageLoader({ isLoading = true }: PageLoaderProps) {
  const mounted = useMounted();
  const t = useTranslations("Misc");

  return mounted && !isLoading ? null : (
    <div className="h-screen flex items-center justify-center flex-col space-y-2">
      <div className="flex gap-2 items-center">
        <h1 className="text-xl font-semibold text-default-900">GenPlanGo</h1>
      </div>
      <span className="inline-flex gap-1 items-center">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        {t("loading")}...
      </span>
    </div>
  );
}
