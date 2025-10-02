"use client";

import React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ROUTES } from "@/routes";
import GPGLogo from "@/components/gpg-logo";
import Link from "next/link";

const HeaderLogo = () => {
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  return (
    !isDesktop && (
      <Link href={ROUTES.ADMIN.DASHBOARD} className="flex gap-2 items-center">
        <GPGLogo />
      </Link>
    )
  );
};

export default HeaderLogo;
