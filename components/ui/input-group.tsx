import * as React from "react";
import { cn } from "@/lib/utils";

interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  merged?: boolean;
  ref?: React.Ref<HTMLDivElement>;
}

const InputGroup = ({ className, merged, ref, ...rest }: InputGroupProps) => (
  <div
    ref={ref}
    className={cn(
      "flex relative flex-wrap items-stretch w-full group input-group ltr:flex-row rtl:flex-row-reverse group-focus-within:border-default dark:group-focus-within:border-default-500",
      className,
      { merged: merged }
    )}
    {...rest}
  />
);

interface InputGroupButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

const InputGroupButton = ({
  className,
  ref,
  ...rest
}: InputGroupButtonProps) => (
  <div
    ref={ref}
    className={cn(
      "first:*:rounded-r-none last:*:rounded-l-none focus:border-default dark:focus:border-default-500",
      className
    )}
    {...rest}
  />
);

interface InputGroupTextProps extends React.HTMLAttributes<HTMLDivElement> {
  color?:
    | "primary"
    | "secondary"
    | "warning"
    | "info"
    | "success"
    | "destructive";
  ref?: React.Ref<HTMLDivElement>;
}

const InputGroupText = ({
  className,
  color,
  ref,
  ...rest
}: InputGroupTextProps) => (
  <div
    ref={ref}
    className={cn(
      "border border-default-200 text-default-500 text-sm font-normal bg-background flex items-center justify-center px-3 first:border-r-0 last:border-l-0 first:rounded-l-md last:rounded-r-md group-focus-within:border-default dark:group-focus-within:border-default-500 ring-default transition duration-300",
      className,
      {
        "border-primary/50": color === "primary",
        "border-secondary/50": color === "secondary",
        "border-warning/50": color === "warning",
        "border-info/50": color === "info",
        "border-success/50": color === "success",
        "border-destructive/50": color === "destructive",
      }
    )}
    {...rest}
  />
);

export { InputGroup, InputGroupButton, InputGroupText };
