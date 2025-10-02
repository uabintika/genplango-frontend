import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";

const Pagination = ({ className, ...rest }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...rest}
  />
);

interface PaginationContentProps extends React.ComponentPropsWithoutRef<"ul"> {
  ref?: React.Ref<HTMLUListElement>;
}

const PaginationContent = ({
  className,
  ref,
  ...rest
}: PaginationContentProps) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...rest}
  />
);

interface PaginationItemProps extends React.ComponentPropsWithoutRef<"li"> {
  ref?: React.Ref<HTMLLIElement>;
}

const PaginationItem = ({ className, ref, ...rest }: PaginationItemProps) => (
  <li ref={ref} className={cn("", className)} {...rest} />
);

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">;

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...rest
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "shadow" : "outline",
        size,
      }),
      className
    )}
    {...rest}
  />
);

const PaginationPrevious = ({
  className,
  ...rest
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 ps-2.5", className)}
    {...rest}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
);

const PaginationNext = ({
  className,
  ...rest
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 pr-2.5", className)}
    {...rest}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
);

const PaginationEllipsis = ({
  className,
  ...rest
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...rest}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
