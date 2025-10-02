"use client";

import React from "react";
import FooterContent from "./footer-content";

const Footer = () => {
  return (
    <FooterContent>
      <div className="flex justify-center xl:justify-end text-default-600">
        <div className="text-center text-sm">
          {new Date().getFullYear()}&copy; GenPlanGo
        </div>
      </div>
    </FooterContent>
  );
};

export default Footer;
