"use client";

import React from "react";
import { useConfig } from "@/hooks/use-config";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";

const FooterContent = ({ children }: { children: React.ReactNode }) => {
  const [config] = useConfig();
  const isMobile = useMediaQuery("(min-width: 768px)");

  if (!isMobile) {
    return (
      <footer className="bg-card dark:bg-default-300 bg-no-repeat  shadow-md  backdrop-filter backdrop-blur-[40px] fixed left-0 w-full z-50 bottom-0 py-[12px] px-4">
        {children}
      </footer>
    );
  }

  return (
    <footer
      className={cn(
        "flex-none bg-card relative py-4 px-6   xl:ms-[248px] bottom-0 z-50 shadow-base",
        {
          "xl:ms-[72px]": config.collapsed,
          "xl:ms-0": config.menuHidden,
        }
      )}
    >
      {children}
    </footer>
  );
};

export default FooterContent;
