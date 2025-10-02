"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

const Card = ({ className, ref, ...rest }: CardProps) => {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg bg-card text-card-foreground shadow-base",
        className
      )}
      {...rest}
    />
  );
};

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

const CardHeader = ({ className, ref, ...rest }: CardHeaderProps) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...rest}
  />
);

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  ref?: React.Ref<HTMLHeadingElement>;
}

const CardTitle = ({ className, ref, ...rest }: CardTitleProps) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...rest}
  />
);

interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  ref?: React.Ref<HTMLParagraphElement>;
}

const CardDescription = ({ className, ref, ...rest }: CardDescriptionProps) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...rest}
  />
);

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

const CardContent = ({ className, ref, ...rest }: CardContentProps) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...rest} />
);

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

const CardFooter = ({ className, ref, ...rest }: CardFooterProps) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...rest}
  />
);

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
