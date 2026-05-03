"use client";

import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Save } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { useChangePassword } from "../hooks";
import { ChangePasswordInput, changePasswordSchema } from "../schemas";

export function ChangePasswordForm() {
  const t = useTranslations("pages.settings.password");
  const { mutate, isPending } = useChangePassword();

  const form = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: ChangePasswordInput) => {
    mutate(
      {
        password: data.password,
        newPassword: data.newPassword,
      },
      {
        onSuccess: () => {
          form.reset();
        },
      },
    );
  };

  return (
    <Card className="p-4 backdrop-blur-md">
      <CardHeader className="px-0 py-0 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2 text-primary">
          <Lock className="size-4" />
          <CardTitle className="text-base font-bold">{t("title")}</CardTitle>
        </div>
      </CardHeader>

      <Form
        methods={form}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Lock className="size-3.5 text-muted-foreground" />
                {t("current_password")}
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={t("placeholders.current")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <Lock className="size-3.5 text-muted-foreground" />
                  {t("new_password")}
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={t("placeholders.new")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <Lock className="size-3.5 text-muted-foreground" />
                  {t("confirm_password")}
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={t("placeholders.confirm")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button className="w-full" type="submit" disabled={isPending}>
          {isPending ? (
            <div className="flex items-center gap-2">
              <div className="size-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
              <span>{t("saving")}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Save className="size-4" />
              <span>{t("save_changes")}</span>
            </div>
          )}
        </Button>
      </Form>
    </Card>
  );
}
