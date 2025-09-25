"use client";

import React from "react";

export default function LayoutProvider({ children }: Children) {
  return (
    <div className="flex min-h-svh w-full flex-col bg-default-100 dark:bg-background">
      {children}
    </div>
  );
}
