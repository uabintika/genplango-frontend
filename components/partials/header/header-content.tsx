"use client";

import React from "react";

const HeaderContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <header className="xl:ml-[248px] sticky top-0 z-40">
      <div className="bg-header backdrop-blur-lg md:px-6 px-[15px] py-3 lg:ms-[248px] flex items-center justify-between relative shadow-base">
        {children}
      </div>
    </header>
  );
};

export default HeaderContent;
