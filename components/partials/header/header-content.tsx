"use client";

import React from "react";
import { useConfig } from "@/hooks/use-config";
import { cn } from "@/lib/utils";

const HeaderContent = ({ children }: Children) => {
  const [config] = useConfig();

  return (
    <header
      className={cn("xl:ml-[248px] sticky top-0 z-40", {
        "xl:ml-[72px]": config.collapsed,
      })}
    >
      <div className="bg-header backdrop-blur-lg md:px-6 px-[15px] py-3 lg:ms-[248px] flex items-center justify-between relative shadow-base">
        {children}
      </div>
    </header>
  );
};

export default HeaderContent;
