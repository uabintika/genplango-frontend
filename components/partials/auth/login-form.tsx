"use client";

import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import { apiURL } from "@/config";
import { useAuth } from "@/contexts/auth-context";
import api from "@/lib/axios";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/routes";
import { API_ROUTES } from "@/routes/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const schema = z.object({
  email: z.email({ message: "invalid_email" }),
  password: z.string().min(1, { message: "required" }),
});

export default function LoginForm() {
  const [isPending, startTransition] = React.useTransition();
  const [passwordType, setPasswordType] = React.useState("password");
  const t = useTranslations();
  const router = useRouter();
  const { setUser } = useAuth();

  const togglePasswordType = () => {
    if (passwordType === "text") {
      setPasswordType("password");
    } else if (passwordType === "password") {
      setPasswordType("text");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    startTransition(async () => {
      try {
        const response = await api.post(apiURL + API_ROUTES.AUTH.LOGIN, data);

        if (response?.status === 200) {
          setUser(response.data.user);
          router.push(ROUTES.ADMIN.DASHBOARD);
          toast.success(t("LoginPage.messages.login_success"));
        }
      } catch (err: any) {
        if (err.response?.status === 422) {
          toast.error(t("LoginPage.messages.invalid_credentials"));
        } else {
          toast.error(t("Misc.uncaught_error"));
        }
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-5 2xl:mt-7 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="font-medium text-default-600">
          {t("LoginPage.form.fields.email") + " "}
        </Label>
        <Input
          size="lg"
          disabled={isPending}
          {...register("email")}
          type="email"
          id="email"
          color="primary"
          className={cn("", {
            "border-destructive ": errors.email,
          })}
        />
      </div>
      {errors.email && (
        <div className="text-destructive mt-2 text-sm">
          {t(`LoginPage.form.validation_messages.${errors.email.message}`)}
        </div>
      )}

      <div className="mt-3.5 space-y-2">
        <Label htmlFor="password" className="mb-2 font-medium text-default-600">
          {t("LoginPage.form.fields.password") + " "}
        </Label>
        <div className="relative">
          <Input
            size="lg"
            disabled={isPending}
            {...register("password")}
            type={passwordType}
            id="password"
            className="peer"
            placeholder=" "
          />

          <div
            className="absolute top-1/2 -translate-y-1/2 ltr:right-4 rtl:left-4 cursor-pointer"
            onClick={togglePasswordType}
          >
            {passwordType === "password" ? (
              <Eye className="w-5 h-5 text-default-400" />
            ) : (
              <EyeOff className="w-5 h-5 text-default-400" />
            )}
          </div>
        </div>
      </div>
      {errors.password && (
        <div className="text-destructive mt-2 text-sm">
          {t(`LoginPage.form.validation_messages.${errors.password.message}`)}
        </div>
      )}

      <Button fullWidth={true} disabled={isPending}>
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isPending ? `${t("Misc.loading")}...` : t("LoginPage.button_text")}
      </Button>
    </form>
  );
}
