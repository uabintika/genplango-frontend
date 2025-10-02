"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

interface AccordionItemProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> {
  ref?: React.Ref<HTMLDivElement>;
}

const AccordionItem = ({ className, ref, ...rest }: AccordionItemProps) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      "border border-default-200 dark:border-default-300 rounded-md mb-4",
      className
    )}
    {...rest}
  />
);

interface AccordionTriggerProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {
  ref?: React.Ref<HTMLButtonElement>;
}

const AccordionTrigger = ({
  className,
  children,
  ref,
  ...rest
}: AccordionTriggerProps) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between p-4 bg-default-100 text-default-900 font-medium transition-all duration-200 [&[data-state=open]>svg]:rotate-180 rounded-md data-[state=open]:rounded-b-none",
        className
      )}
      {...rest}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform easy-in-out duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
);

interface AccordionContentProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> {
  ref?: React.Ref<HTMLDivElement>;
}

const AccordionContent = ({
  className,
  children,
  ref,
  ...rest
}: AccordionContentProps) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm text-default-700 p-4 transition-all duration-200 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...rest}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
);

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
