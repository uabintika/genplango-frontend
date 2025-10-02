"use client";

import React from "react";
import { Link } from "@/components/navigation";
import Logo from "@/components/logo";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ROUTES } from "@/routes";
import GPGLogo from "@/components/gpg-logo";

const HeaderLogo = () => {
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  return (
    !isDesktop && (
      <Link href={ROUTES.ADMIN.DASHBOARD} className="flex gap-2 items-center">
        <GPGLogo />
        <h1 className="text-xl font-semibold text-default-900 lg:block hidden">
          DashCode
        </h1>
      </Link>
    )
  );
};

export default HeaderLogo;
