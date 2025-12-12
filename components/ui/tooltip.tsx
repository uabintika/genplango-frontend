"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { color } from "@/types/ui-types";

const tooltipVariants = cva(
  "z-50 overflow-hidden rounded-md px-3 py-1.5 text-sm shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      color: {
        default: "bg-default text-default-foreground",
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        warning: "bg-warning text-warning-foreground",
        info: "bg-info text-info-foreground",
        success: "bg-success text-success-foreground",
      },
    },
    defaultVariants: {
      color: "default",
    },
  }
);

const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipArrow = TooltipPrimitive.Arrow;

type ToolTipProviderProps = React.ComponentPropsWithoutRef<
  typeof TooltipPrimitive.Provider
>;

const TooltipProvider = ({
  delayDuration = 0,
  ...props
}: ToolTipProviderProps) => {
  return <TooltipPrimitive.Provider {...props} delayDuration={delayDuration} />;
};

interface ToolTipProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
    VariantProps<typeof tooltipVariants> {
  color?: color;
  ref?: React.Ref<HTMLDivElement>;
}

const TooltipContent = ({
  className,
  sideOffset = 4,
  color,
  children,
  ref,
  ...rest
}: ToolTipProps) => {
  return (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(tooltipVariants({ color }), className, {})}
      {...rest}
    >
      {children}
    </TooltipPrimitive.Content>
  );
};

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  TooltipArrow,
};
