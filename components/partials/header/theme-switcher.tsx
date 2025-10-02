"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("HeaderPartial.ThemeSwitcher");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          rounded="full"
          className=" md:bg-secondary bg-transparent  text-secondary-foreground hover:ring-0  md:h-8 md:w-8 h-auto w-auto  hover:bg-secondary hover:ring-offset-0"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 " />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">{t("change_theme")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="p-2">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={cn(
            "p-2 font-medium text-sm text-default-600 cursor-pointer mb-[2px] ",
            {
              "bg-default text-default-foreground": theme === "light",
            }
          )}
        >
          <Sun className="w-5 h-5 me-2" />
          <span className="me-2">{t("light")}</span>
          <Check
            className={cn("w-4 h-4 flex-none ms-auto ", {
              hidden: theme !== "light",
            })}
          />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={cn(
            "p-2 font-medium text-sm text-default-600 hover:bg-default hover:text-default-foreground  dark:hover:bg-background cursor-pointer mb-[2px]",
            {
              "bg-default text-default-foreground": theme === "dark",
            }
          )}
        >
          <Moon className="w-5 h-5 me-2" />
          <span className="me-2">{t("dark")}</span>
          <Check
            className={cn("w-4 h-4 flex-none ms-auto text-default-700", {
              hidden: theme !== "dark",
            })}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeButton;
