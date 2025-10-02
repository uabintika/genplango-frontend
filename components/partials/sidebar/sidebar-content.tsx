"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useConfig } from "@/hooks/use-config";
import { useMenuHoverConfig } from "@/hooks/use-menu-hover";

const SidebarContent = ({ children }: { children: React.ReactNode }) => {
  const [config] = useConfig();
  const [hoverConfig, setHoverConfig] = useMenuHoverConfig();

  return (
    <aside
      onMouseEnter={() => setHoverConfig({ hovered: true })}
      onMouseLeave={() => setHoverConfig({ hovered: false })}
      className={cn(
        "fixed z-50 w-[248px] bg-sidebar shadow-base xl:block hidden h-full start-0 dark:theme-dark",
        {
          "w-[72px]": config.collapsed,
          "w-[248px]": hoverConfig.hovered,
        }
      )}
    >
      <div className="relative flex flex-col h-full">{children}</div>
    </aside>
  );
};

export default SidebarContent;
