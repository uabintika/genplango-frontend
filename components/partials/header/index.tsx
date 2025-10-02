import React from "react";
import HeaderContent from "./header-content";
import ProfileInfo from "./profile-info";
import ThemeSwitcher from "./theme-switcher";
import { SheetMenu } from "@/components/partials/sidebar/menu/sheet-menu";

const Header = () => {
  return (
    <>
      <HeaderContent>
        <div className="flex gap-3 items-center">
          {/* <HeaderLogo /> */}
          {/* <SidebarToggle /> */}
        </div>
        <div className="nav-tools flex items-center md:gap-4 gap-3">
          {/* <LocaleSwitcher /> */}
          <ThemeSwitcher />
          <ProfileInfo />
          <SheetMenu />
        </div>
      </HeaderContent>
    </>
  );
};

export default Header;
