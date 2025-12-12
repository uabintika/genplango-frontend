"use client";

import React from "react";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, HouseHeart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { Submenu } from "@/lib/menus";

import { useMobileMenuConfig } from "@/hooks/use-mobile-menu";
import { useMenuHoverConfig } from "@/hooks/use-menu-hover";
import { usePathname } from "next/navigation";

interface CollapseMenuButtonProps {
  icon: React.JSX.Element;
  label: string;
  active: boolean;
  submenus: Submenu[];
  collapsed: boolean | undefined;
  id: string;
}

export function CollapseMenuButton({
  icon,
  label,
  active,
  submenus,
  collapsed,
  id,
}: CollapseMenuButtonProps) {
  const pathname = usePathname();
  const isSubmenuActive = submenus.some(
    (submenu) => submenu.active || pathname.startsWith(submenu.href)
  );
  const [isCollapsed, setIsCollapsed] = useState<boolean>(isSubmenuActive);
  const [mobileMenuConfig, setMobileMenuConfig] = useMobileMenuConfig();
  const [hoverConfig] = useMenuHoverConfig();
  const { hovered } = hoverConfig;

  React.useEffect(() => {
    setIsCollapsed(isSubmenuActive);
  }, [isSubmenuActive, pathname]);

  return !collapsed || hovered ? (
    <Collapsible open={isCollapsed} onOpenChange={setIsCollapsed}>
      <CollapsibleTrigger className="" asChild>
        <div className="peer flex items-center group [&[data-state=open]>button>div>div>svg]:rotate-180">
          <Button
            variant={active ? "default" : "ghost"}
            color="primary"
            className="justify-start capitalize group h-auto py-3 md:px-3 px-3 ring-offset-sidebar group-data-[state=open]:bg-secondary hover:ring-transparent"
            fullWidth
          >
            <div className="w-full items-center flex justify-between">
              <div className="flex items-center">
                <span className="me-4">
                  <HouseHeart className="h-5 w-5" />
                </span>
                <p
                  className={cn(
                    "max-w-[150px] truncate",
                    !collapsed || hovered
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-96 opacity-0"
                  )}
                >
                  {label}
                </p>
              </div>
              <div
                className={cn(
                  "whitespace-nowrap inline-flex items-center justify-center rounded-full h-5 w-5 bg-menu-arrow text-menu-menu-foreground group-hover:bg-menu-arrow-active transition-all duration-300",
                  !collapsed || hovered
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-96 opacity-0",
                  {
                    "bg-menu-arrow-active": active,
                  }
                )}
              >
                <ChevronDown
                  size={16}
                  className="transition-transform duration-200"
                />
              </div>
            </div>
          </Button>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        {submenus.map(({ href, label, active, children: subChildren }, index) =>
          subChildren?.length === 0 ? (
            <Button
              onClick={() =>
                setMobileMenuConfig({ ...mobileMenuConfig, isOpen: false })
              }
              key={index}
              color="secondary"
              variant="ghost"
              className={cn(
                "w-full  justify-start h-auto hover:bg-transparent hover:ring-offset-0 capitalize text-sm font-normal mb-2 last:mb-0 first:mt-3 md:px-5 px-5",
                {
                  "font-medium": active,
                  "dark:opacity-80": !active,
                }
              )}
              asChild
            >
              <Link href={href}>
                <span
                  className={cn(
                    "h-1.5 w-1.5 me-3 rounded-full  transition-all duration-150 ring-1 ring-secondary-foreground ",
                    {
                      "ring-4 bg-default ring-default/30": active,
                    }
                  )}
                ></span>
                <p
                  className={cn(
                    "max-w-[170px] truncate",
                    !collapsed || hovered
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-96 opacity-0"
                  )}
                >
                  {label}
                </p>
              </Link>
            </Button>
          ) : (
            <React.Fragment key={index}>
              {/* <MultiCollapseMenuButton
                label={label}
                active={active}
                submenus={subChildren as any}
              /> */}
            </React.Fragment>
          )
        )}
      </CollapsibleContent>
    </Collapsible>
  ) : (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant={active ? "default" : "ghost"}
                color="secondary"
                className="w-full justify-center"
                size="icon"
              >
                <HouseHeart className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="right" align="start" alignOffset={2}>
            {label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent
        side="right"
        sideOffset={20}
        align="start"
        className={` border-sidebar space-y-1.5`}
      >
        <DropdownMenuLabel className="max-w-[190px] truncate">
          {label}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-default-300" />
        <DropdownMenuGroup>
          {submenus.map(({ href, label, icon, active, children }, index) =>
            children?.length === 0 ? (
              <DropdownMenuItem
                key={index}
                asChild
                className={cn("focus:bg-secondary", {
                  "bg-secondary text-secondary-foreground ": active,
                })}
              >
                <Link className="cursor-pointer flex-flex gap-3" href={href}>
                  {icon && <HouseHeart className=" h-4 w-4" />}
                  <p className="max-w-[180px] truncate">{label} </p>
                </Link>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuSub key={index}>
                <DropdownMenuSubTrigger>
                  <span>{label}</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <ScrollArea className="h-[200px]">
                      {children?.map(({ href, label, active }, index) => (
                        <DropdownMenuItem key={`nested-index-${index}`}>
                          <Link href={href}>{label}</Link>
                        </DropdownMenuItem>
                      ))}
                    </ScrollArea>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            )
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
