"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const labelVariants = cva(
  "text-sm text-default-500 dark:text-default-600 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

export interface LabelProps extends LabelPrimitive.LabelProps {
  ref?: React.Ref<HTMLLabelElement>;
}

export default function Label({ className, ref, ...rest }: LabelProps) {
  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(labelVariants(), className)}
      {...rest}
    />
  );
}
