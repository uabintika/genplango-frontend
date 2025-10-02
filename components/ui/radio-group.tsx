"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { color, size } from "@/types/ui-types";

const radioVariants = cva(
  "aspect-square h-[18px] w-[18px] rounded-full border border-default-400 data-[state=checked]:text-default-700 ring-offset-background disabled:cursor-not-allowed disabled:bg-default-100 disabled:border-default-400 disabled:opacity-50 [&_svg]:fill-current [&_svg]:text-current transition-all duration-100",
  {
    variants: {
      color: {
        default:
          "data-[state=checked]:border-default data-[state=checked]:text-default",
        primary:
          "data-[state=checked]:border-primary data-[state=checked]:text-primary",
        secondary:
          "data-[state=checked]:border-default-300 data-[state=checked]:text-default-300",
        info: "data-[state=checked]:border-info data-[state=checked]:text-info",
        warning:
          "data-[state=checked]:border-warning data-[state=checked]:text-warning",
        success:
          "data-[state=checked]:border-success data-[state=checked]:text-success",
        destructive:
          "data-[state=checked]:border-destructive data-[state=checked]:text-destructive",
      },
      size: {
        sm: "h-4 w-4 [&_svg]:h-3 [&_svg]:w-3",
        default: "h-5 w-5 [&_svg]:h-4 [&_svg]:w-4",
        md: "h-6 w-6 [&_svg]:h-5 [&_svg]:w-5",
        lg: "h-7 w-7 [&_svg]:h-6 [&_svg]:w-6",
      },
    },
    defaultVariants: {
      color: "default",
    },
  }
);

interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  ref?: React.Ref<HTMLDivElement>;
}

const RadioGroup = ({ className, ref, ...rest }: RadioGroupProps) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    className={cn("grid gap-2", className)}
    {...rest}
  />
);

interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
    VariantProps<typeof radioVariants> {
  icon?: React.ReactNode;
  color?: color;
  size?: size;
  ref?: React.Ref<HTMLButtonElement>;
}

const RadioGroupItem = ({
  className,
  color,
  size,
  icon,
  ref,
  ...rest
}: RadioGroupItemProps) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(radioVariants({ color, size }), className)}
    {...rest}
  >
    <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
      {icon || <Circle className="h-2.5 w-2.5 fill-current text-current" />}
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
);

export { RadioGroup, RadioGroupItem };
