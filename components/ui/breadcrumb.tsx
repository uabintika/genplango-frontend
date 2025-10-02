import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";

interface BreadcrumbProps extends React.ComponentPropsWithoutRef<"nav"> {
  ref?: React.Ref<HTMLElement>;
  separator?: React.ReactNode;
}

const Breadcrumb = ({ ref, ...rest }: BreadcrumbProps) => (
  <nav ref={ref} aria-label="breadcrumb" {...rest} />
);

interface BreadcrumbListProps extends React.ComponentPropsWithoutRef<"ol"> {
  ref?: React.Ref<HTMLOListElement>;
}

const BreadcrumbList = ({ className, ref, ...rest }: BreadcrumbListProps) => (
  <ol
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
      className
    )}
    {...rest}
  />
);

interface BreadcrumbItemProps extends React.ComponentPropsWithoutRef<"li"> {
  ref?: React.Ref<HTMLLIElement>;
}

const BreadcrumbItem = ({ className, ref, ...rest }: BreadcrumbItemProps) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center gap-1.5", className)}
    {...rest}
  />
);

interface BreadcrumbLinkProps extends React.ComponentPropsWithoutRef<"a"> {
  ref?: React.Ref<HTMLAnchorElement>;
  asChild?: boolean;
}

const BreadcrumbLink = ({
  asChild,
  className,
  ref,
  ...rest
}: BreadcrumbLinkProps) => {
  const Comp = asChild ? Slot : "a";
  return (
    <Comp
      ref={ref}
      className={cn("transition-colors hover:text-foreground", className)}
      {...rest}
    />
  );
};

interface BreadcrumbPageProps extends React.ComponentPropsWithoutRef<"span"> {
  ref?: React.Ref<HTMLSpanElement>;
}

const BreadcrumbPage = ({ className, ref, ...rest }: BreadcrumbPageProps) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn("font-normal text-foreground", className)}
    {...rest}
  />
);

const BreadcrumbSeparator = ({
  children,
  className,
  ...rest
}: React.ComponentProps<"li">) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:size-5", className)}
    {...rest}
  >
    {children ?? <ChevronRight />}
  </li>
);

const BreadcrumbEllipsis = ({
  className,
  ...rest
}: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...rest}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
);

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
