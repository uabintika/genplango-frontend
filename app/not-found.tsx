"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const t = useTranslations("NotFoundPage");
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center py-20 bg-background">
      <Image src="/images/all-img/404-2.svg" alt="" height={300} width={300} />
      <div className="max-w-[546px] mx-auto w-full mt-12">
        <h4 className="text-default-900 mb-4">{t("header")}</h4>
        <div className="dark:text-white text-base font-normal mb-10">
          {t("body")}
        </div>
      </div>
      <div className="max-w-[300px] mx-auto w-full">
        <Button onClick={() => router.back()} fullWidth>
          {t("go_back")}
        </Button>
      </div>
    </div>
  );
}
