"use client";

import { cn } from "@/core";
import { Eye, EyeOff } from "lucide-react";
import { ComponentProps, ReactNode, useState } from "react";
import { Button } from "./button";

interface InputProps extends ComponentProps<"input"> {
  startIcon?: ReactNode;
}

function Input({ className, type, startIcon, ...props }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  const inputElement = (
    <div className="relative w-full">
      {startIcon && (
        <span className="pointer-events-none absolute inset-s-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 transition-colors">
          {startIcon}
        </span>
      )}
      <input
        type={isPassword && showPassword ? "text" : type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-text-muted-foreground h-10 w-full min-w-0 rounded-lg border bg-muted py-2 text-base text-start shadow-xs transition-all outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          startIcon ? "ps-11" : "px-4",
          isPassword && "pe-10",
          className,
        )}
        {...props}
      />
      {isPassword && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-e-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground rounded-lg h-8 w-8"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="size-4" />
          ) : (
            <Eye className="size-4" />
          )}
        </Button>
      )}
    </div>
  );

  return inputElement;
}

export { Input };
