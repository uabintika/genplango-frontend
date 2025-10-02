"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  ref?: React.Ref<HTMLSpanElement>;
}

const Slider = ({ className, ref, ...rest }: SliderProps) => {
  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...rest}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-default-200 dark:bg-default-300">
        <SliderPrimitive.Range className="absolute h-full bg-default" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-default bg-background disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
  );
};

export { Slider };
