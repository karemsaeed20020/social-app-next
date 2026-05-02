"use client";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from "@/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound, Loader2, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { AuthCard } from "../../shared";
import { useLogin } from "../hooks";
import { loginSchema, LoginSchema } from "../schemas";

export function LoginForm() {
  const t = useTranslations("pages.auth.login");
  const { mutate, isPending } = useLogin();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginSchema) => mutate(data);

  return (
    <AuthCard activeTab="login">
      <Form
        methods={form}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder={t("form.email")}
                  autoComplete="email"
                  startIcon={<User size={18} />}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t("form.password")}
                  type="password"
                  autoComplete="current-password"
                  startIcon={<KeyRound size={18} />}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              {t("form.submitting")}
            </>
          ) : (
            t("form.submit")
          )}
        </Button>
      </Form>
    </AuthCard>
  );
}
