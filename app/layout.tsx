import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "../contexts/auth-context";
import { ThemeProvider } from "@/providers/theme-provider";
import MountedProvider from "@/providers/mounted-provider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { cookies } from "next/headers";
import { Toaster } from "@/components/ui/sonner";
import BaseSWRConfig from "@/providers/swr-provider";

export const metadata: Metadata = {
  title: "GenPlanGo",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();
  const store = await cookies();
  const locale = store.get("locale")?.value || "lt";

  return (
    <html lang={locale} suppressHydrationWarning>
      <head></head>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <BaseSWRConfig>
            <AuthProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <MountedProvider>{children}</MountedProvider>
                <Toaster />
              </ThemeProvider>
            </AuthProvider>
          </BaseSWRConfig>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
