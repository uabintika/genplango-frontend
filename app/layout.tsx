import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "../contexts/auth-context";
import { ThemeProvider } from "@/providers/ThemeProvider";
import MountedProvider from "@/providers/MountedProvider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { cookies } from "next/headers";
import { AxiosInterceptor } from "@/lib/axios";

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
          <AuthProvider>
            <AxiosInterceptor>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <MountedProvider>{children}</MountedProvider>
              </ThemeProvider>
            </AxiosInterceptor>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
