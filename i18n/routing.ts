import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
import { locales } from "@/config";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: locales,
  // Don't prefix url with locale
  localePrefix: "never",
  // Used when no locale matches
  defaultLocale: "lt",
  localeCookie: {
    // Custom cookie name
    name: "USER_LOCALE",
    // Expire in one year
    maxAge: 60 * 60 * 24 * 365,
  },
});

// Lightweight wrappers around Next.js' navigation APIs
export const { Link, redirect, usePathname, useRouter } = createNavigation({
  defaultLocale: routing.defaultLocale,
});
