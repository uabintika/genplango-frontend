"use client";

import { cn } from "@/lib/utils";
import { FieldError } from "react-hook-form";

type ValidationErrorProps = {
  className?: string;
  validationError: FieldError | undefined;
  message: string | undefined;
};

export default function ValidationError({
  className,
  validationError,
  message,
}: ValidationErrorProps) {
  return (
    validationError?.message && (
      <div className={cn("text-destructive mt-2 text-sm", className)}>
        {message}
      </div>
    )
  );
}
