"use client";

import React from "react";
import FooterContent from "./footer-content";

const Footer = () => {
  return (
    <FooterContent>
      <div className="md:flex md:justify-end text-default-600 hidden">
        <div className="text-center text-sm">
          {new Date().getFullYear()}&copy; GenPlanGo
        </div>
      </div>
    </FooterContent>
  );
};

export default Footer;
