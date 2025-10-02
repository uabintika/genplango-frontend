"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "./index";
import { useMobileMenuConfig } from "@/hooks/use-mobile-menu";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useConfig } from "@/hooks/use-config";
import { Link } from "@/components/navigation";
import { useTranslations } from "next-intl";
import GPGLogo from "@/components/gpg-logo";
import { ROUTES } from "@/routes";
import { MenuIcon } from "lucide-react";

export function SheetMenu() {
  const [mobileMenuConfig, setMobileMenuConfig] = useMobileMenuConfig();
  const [config, setConfig] = useConfig();
  const { isOpen } = mobileMenuConfig;
  const t = useTranslations("Misc");

  const isDesktop = useMediaQuery("(min-width: 1280px)");
  if (isDesktop) return null;
  return (
    <Sheet
      open={isOpen}
      onOpenChange={() => setMobileMenuConfig({ isOpen: !isOpen })}
    >
      <SheetTrigger className="xl:hidden" asChild>
        <Button
          className="h-8"
          variant="ghost"
          size="icon"
          onClick={() =>
            setConfig({
              ...config,
              collapsed: false,
            })
          }
        >
          <MenuIcon className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-72 px-3 h-full flex flex-col" side="left">
        <SheetHeader>
          <Link
            href={ROUTES.ADMIN.DASHBOARD}
            className="flex gap-2 items-center"
          >
            <GPGLogo />
            <h1 className="text-xl font-semibold text-default-900">
              {t("project_name")}
            </h1>
          </Link>
        </SheetHeader>
        <Menu />
      </SheetContent>
    </Sheet>
  );
}
