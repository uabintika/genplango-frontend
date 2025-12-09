"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Home } from "lucide-react";
import { useMobileMenuConfig } from "@/hooks/use-mobile-menu";
import { useMenuHoverConfig } from "@/hooks/use-menu-hover";
import Link from "next/link";

interface MenuItemProps {
  id: string;
  href: string;
  label: string;
  icon: React.JSX.Element | null;
  active: boolean;
  collapsed: boolean;
}

const MenuItem = ({
  href,
  label,
  icon,
  active,
  id,
  collapsed,
}: MenuItemProps) => {
  const [hoverConfig] = useMenuHoverConfig();
  const { hovered } = hoverConfig;
  const [mobileMenuConfig, setMobileMenuConfig] = useMobileMenuConfig();

  return (
    <Button
      id={id}
      onClick={() =>
        setMobileMenuConfig({ ...mobileMenuConfig, isOpen: false })
      }
      variant={active ? "default" : "ghost"}
      fullWidth
      color={active ? "primary" : "secondary"}
      className={cn("hover:ring-transparent hover:ring-offset-0", {
        "justify-start text-sm font-medium capitalize h-auto py-3 md:px-3 px-3":
          !collapsed || hovered,
      })}
      asChild
      size={collapsed && !hovered ? "icon" : "default"}
    >
      <Link href={href}>
        {icon &&
          React.cloneElement(icon, {
            className: cn("h-5 w-5 ", {
              "me-2": !collapsed || hovered,
            }),
          })}
        {(!collapsed || hovered) && (
          <p className={cn("max-w-[200px] truncate")}>{label}</p>
        )}
      </Link>
    </Button>
  );
};

export default MenuItem;
