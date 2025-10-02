"use client";

import { useConfig } from "@/hooks/use-config";
import React from "react";
import { cn } from "@/lib/utils";

const LayoutContentProvider = ({ children }: { children: React.ReactNode }) => {
  const [config, setConfig] = useConfig();

  return (
    <>
      <main
        className={cn(
          "flex-1 xl:ml-[248px] bg-default-100 dark:bg-background",
          {
            "xl:ml-[72px]": config.collapsed,
          }
        )}
      >
        <div className={cn("mb-24 md:mb-0 p-6")}>{children}</div>
      </main>
    </>
  );
};

export default LayoutContentProvider;
