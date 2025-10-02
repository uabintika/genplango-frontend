"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
  ref?: React.Ref<HTMLDivElement>;
}

const TabsList = ({ className, ref, ...rest }: TabsListProps) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "flex gap-5 flex-wrap items-center rounded-md p-1",
      className
    )}
    {...rest}
  />
);

interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  ref?: React.Ref<HTMLButtonElement>;
}

const TabsTrigger = ({ className, ref, ...rest }: TabsTriggerProps) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex items-center justify-center whitespace-nowrap text-default-500 px-1 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-xs",
      className
    )}
    {...rest}
  />
);

interface TabsContentProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {
  ref?: React.Ref<HTMLDivElement>;
}

const TabsContent = ({ className, ref, ...rest }: TabsContentProps) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2.5 text-sm font-normal text-default-600 ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...rest}
  />
);

export { Tabs, TabsList, TabsTrigger, TabsContent };
