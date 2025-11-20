import { locales } from "@/config";
import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const store = await cookies();
  let locale = store.get("USER_LOCALE")?.value ?? "lt";

  // Validate that the found locale is supported
  if (!locale || !locales.includes(locale)) {
    locale = "lt";
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
