"use client";

import useSWR from "swr";
import api from "@/lib/axios";
import { API_ROUTES } from "@/routes/api";
import { apiURL } from "@/config";
import { useTranslations } from "next-intl";
import LoginForm from "@/components/partials/auth/LoginForm";

const csrfCookieFetcher = async (url: string) => await api.get(url);

export default function LoginPage() {
  const t = useTranslations("LoginPage");

  const { error, mutate } = useSWR(
    apiURL + API_ROUTES.AUTH.CSRF,
    csrfCookieFetcher,
    { shouldRetryOnError: false, revalidateOnFocus: false }
  );

  return (
    <>
      <div className="flex w-full items-center overflow-hidden min-h-dvh h-dvh basis-full">
        <div className="overflow-y-auto flex flex-wrap w-full h-dvh">
          <div className="flex-1 relative">
            <div className="h-full flex flex-col bg-default-50">
              <div className="max-w-[524px] md:px-[42px] md:py-[44px] p-7  mx-auto w-full text-2xl text-default-900  mb-3 h-full flex flex-col justify-center">
                <div className="flex justify-center items-center text-center mb-6 lg:hidden ">
                  LOGOTIPAS
                </div>
                <div className="text-center 2xl:mb-10 mb-4">
                  <h4 className="font-medium">{t("heading")}</h4>
                </div>
                <LoginForm />
              </div>
            </div>
          </div>
          <div className="lg:block hidden flex-1 overflow-hidden text-[40px] leading-[48px] text-default-600  bg-cover bg-no-repeat bg-center bg-slate-500">
            <div className="flex flex-col h-full justify-center">
              <div className="flex-1 flex flex-col justify-center items-center">
                LOGO WHITE
              </div>
              <div>
                <div className="text-[40px] leading-[48px] text-white max-w-[525px] mx-auto pb-20 text-center">
                  <span className="text-white font-bold ms-1">
                    {t("project_name")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
