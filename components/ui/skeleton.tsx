import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-default-200 dark:bg-default-300",
        className
      )}
      {...rest}
    />
  );
}

export { Skeleton };
