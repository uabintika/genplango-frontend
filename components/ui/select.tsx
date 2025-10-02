"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { InputColor, size } from "@/types/ui-types";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const selectVariants = cva(
  "w-full px-3 h-10 text-sm flex [&>svg]:h-5 [&>svg]:w-5 rounded-md border border-input justify-between items-center read-only:bg-background disabled:cursor-not-allowed disabled:opacity-50 transition duration-300",
  {
    variants: {
      color: {
        default:
          "border-default-200 text-default-500 focus:outline-hidden focus:border-default-500/50 disabled:bg-default-200 placeholder:text-accent-foreground/50 [&>svg]:stroke-default-600",
        primary:
          "border-primary text-primary focus:outline-hidden focus:border-primary/70 disabled:bg-primary/30 disabled:placeholder:text-primary placeholder:text-primary/70 [&>svg]:stroke-primary",
        secondary:
          "border-secondary text-secondary focus:outline-hidden focus:border-secondary/70 disabled:bg-primary/30 disabled:placeholder:text-primary placeholder:text-primary/70 [&>svg]:stroke-primary",
        info: "border-info/50 text-info focus:outline-hidden focus:border-info/70 disabled:bg-info/30 disabled:placeholder:text-info placeholder:text-info/70",
        warning:
          "border-warning/50 text-warning focus:outline-hidden focus:border-warning/70 disabled:bg-warning/30 disabled:placeholder:text-info placeholder:text-warning/70",
        success:
          "border-success/50 text-success focus:outline-hidden focus:border-success/70 disabled:bg-success/30 disabled:placeholder:text-info placeholder:text-success/70",
        destructive:
          "border-destructive/50 text-destructive focus:outline-hidden focus:border-destructive/70 disabled:bg-destructive/30 disabled:placeholder:text-destructive placeholder:text-destructive/70",
      },

      size: {
        sm: "h-8 text-xs",
        default: "h-9 text-xs",
        md: "h-10 text-sm",
        lg: "h-12 text-base",
      },
    },

    defaultVariants: {
      color: "default",
      size: "default",
    },
  }
);

interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>,
    VariantProps<typeof selectVariants> {
  size?: size;
  color?: InputColor;
  ref?: React.Ref<HTMLButtonElement>;
}

const SelectTrigger = ({
  className,
  children,
  color,
  size,
  ref,
  ...rest
}: SelectTriggerProps) => {
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(selectVariants({ color, size }), className)}
      {...rest}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="h-4 w-4 " />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
};

interface SelectScrollUpButtonProps
  extends React.ComponentPropsWithoutRef<
    typeof SelectPrimitive.ScrollUpButton
  > {
  ref?: React.Ref<HTMLDivElement>;
}

const SelectScrollUpButton = ({
  className,
  ref,
  ...rest
}: SelectScrollUpButtonProps) => {
  return (
    <SelectPrimitive.ScrollUpButton
      ref={ref}
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...rest}
    >
      <ChevronUp className="h-4 w-4" />
    </SelectPrimitive.ScrollUpButton>
  );
};

interface SelectScrollDownButtonProps
  extends React.ComponentPropsWithoutRef<
    typeof SelectPrimitive.ScrollDownButton
  > {
  ref?: React.Ref<HTMLDivElement>;
}
const SelectScrollDownButton = ({
  className,
  ref,
  ...rest
}: SelectScrollDownButtonProps) => {
  return (
    <SelectPrimitive.ScrollDownButton
      ref={ref}
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...rest}
    >
      <ChevronDown className="h-4 w-4 " />
    </SelectPrimitive.ScrollDownButton>
  );
};

interface SelectContentProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> {
  ref?: React.Ref<HTMLDivElement>;
}

const SelectContent = ({
  className,
  children,
  ref,
  position = "popper",
  ...rest
}: SelectContentProps) => {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cn(
          "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        {...rest}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
};

interface SelectLabelProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label> {
  ref?: React.Ref<HTMLDivElement>;
}

const SelectLabel = ({ className, ref, ...rest }: SelectLabelProps) => {
  return (
    <SelectPrimitive.Label
      ref={ref}
      className={cn("py-1.5 ps-4 pr-2 text-sm font-semibold", className)}
      {...rest}
    />
  );
};

interface SelectItemProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {
  ref?: React.Ref<HTMLDivElement>;
}

const SelectItem = ({ className, children, ref, ...rest }: SelectItemProps) => {
  return (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 ps-4 pe-2 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
        className
      )}
      {...rest}
    >
      <span className="absolute end-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </SelectPrimitive.ItemIndicator>
      </span>

      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
};

interface SelectSeparatorProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator> {
  ref?: React.Ref<HTMLDivElement>;
}
const SelectSeparator = ({ className, ref, ...rest }: SelectSeparatorProps) => {
  return (
    <SelectPrimitive.Separator
      ref={ref}
      className={cn("-mx-1 my-1 h-px bg-muted", className)}
      {...rest}
    />
  );
};

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
