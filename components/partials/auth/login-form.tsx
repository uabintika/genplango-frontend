"use client";

import { Button } from "@/components/ui/button";
import { Form, FormFieldWrapper } from "@/components/ui/form";
import Input from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { apiURL } from "@/config";
import { useAuth } from "@/contexts/auth-context";
import useApi from "@/hooks/use-api";
import api from "@/lib/axios";
import { ROUTES } from "@/routes";
import { API_ROUTES } from "@/routes/api";
import { User } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
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

type LoginSchemaType = z.infer<typeof schema>;

const loginFetcher = (url: string, body?: LoginSchemaType) =>
  api.post(url, body);

export default function LoginForm() {
  const [passwordType, setPasswordType] = React.useState("password");
  const { data, isLoading, error, execute } = useApi<User, LoginSchemaType>(
    apiURL + API_ROUTES.AUTH.LOGIN,
    loginFetcher
  );
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

  const form = useForm({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchemaType) => {
    await execute(data);
  };

  React.useEffect(() => {
    if (!isLoading && data) {
      setUser(data);
      router.push(ROUTES.ADMIN.DASHBOARD);
      toast.success(t("LoginPage.messages.login_success"));
    }

    if (!isLoading && error) {
      if (error?.response?.status === 422) {
        toast.error(t("LoginPage.messages.invalid_credentials"));
      } else {
        toast.error(t("Misc.uncaught_error"));
      }
    }
  }, [isLoading, data, error]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-5 2xl:mt-7 space-y-4"
      >
        <FormFieldWrapper
          control={form.control}
          formField={{
            name: "email",
            label: t("LoginPage.form.fields.email"),
            render: ({ field }) => (
              <Input {...field} size="lg" disabled={isLoading} />
            ),
          }}
        />

        <div className="mt-3.5">
          <FormFieldWrapper
            control={form.control}
            formField={{
              name: "password",
              label: t("LoginPage.form.fields.password"),
              render: ({ field }) => (
                <InputGroup className="h-auto">
                  <InputGroupInput
                    {...field}
                    disabled={isLoading}
                    type={passwordType}
                    size="lg"
                    className="flex-1"
                    // data-slot="input-group-control"
                  />
                  <InputGroupAddon
                    className="cursor-pointer flex"
                    align="inline-end"
                    onClick={togglePasswordType}
                  >
                    {passwordType === "password" ? (
                      <Eye className="peer-focus:text-default-400" />
                    ) : (
                      <EyeOff className="text-default-400" />
                    )}
                  </InputGroupAddon>
                </InputGroup>
              ),
            }}
          />{" "}
        </div>

        <Button fullWidth={true} isLoading={isLoading}>
          {t("LoginPage.button_text")}
        </Button>
      </form>
    </Form>
  );
}
