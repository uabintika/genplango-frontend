"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { ROUTES } from "@/routes";
import GPGLogo from "./gpg-logo";
import Link from "next/link";
import { useConfig } from "@/hooks/use-config";
import { useMenuHoverConfig } from "@/hooks/use-menu-hover";

const Logo = () => {
  const t = useTranslations("Misc");
  const [config, setConfig] = useConfig();
  const [hoverConfig, setHoverConfig] = useMenuHoverConfig();

  return (
    <>
      <Link href={ROUTES.ADMIN.DASHBOARD} className="flex gap-2 items-center">
        <GPGLogo />
        {(!config.collapsed || hoverConfig.hovered) && (
          <h1 className="text-xl font-semibold text-default-900">
            {t("project_name")}
          </h1>
        )}
      </Link>
    </>
  );
};

export default Logo;
