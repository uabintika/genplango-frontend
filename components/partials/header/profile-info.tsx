import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/auth-context";
import { ChevronDown, Power } from "lucide-react";
import { ROUTES } from "@/routes";
import Link from "next/link";
import { useTranslations } from "next-intl";

const ProfileInfo = () => {
  const { user, logout } = useAuth();
  const t = useTranslations("HeaderPartial.ProfileDropdown");

  return (
    <div className="md:block hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <div className="flex items-center gap-3 text-default-800">
            <div className="text-sm font-medium lg:block hidden">
              {user?.firstName + " " + user?.lastName}
            </div>
            <span className="text-base me-2.5 lg:inline-block hidden">
              <ChevronDown />
            </span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 p-0" align="end">
          <DropdownMenuLabel className="flex gap-2 items-center mb-1 p-3">
            <div>
              <div className="text-sm font-medium text-default-800">
                {user?.firstName + " " + user?.lastName}
              </div>
              <div className="text-xs text-default-600 hover:text-primary">
                {user?.email}
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuGroup>
            {[
              {
                name: t("profile"),
                // icon: "heroicons:user",
                href: ROUTES.ADMIN.PROFILE,
              },
            ].map((item, index) => (
              <Link
                href={item.href}
                key={`info-menu-${index}`}
                className="cursor-pointer"
              >
                <DropdownMenuItem className="flex items-center gap-2 text-sm font-medium text-default-600 px-3 py-1.5 cursor-pointer">
                  {/* <Icon icon={item.icon} className="w-4 h-4" /> */}
                  {item.name}
                </DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="mb-0 dark:bg-background" />
          <DropdownMenuItem className="flex items-center gap-2 text-sm font-medium text-default-600 my-1 px-3 cursor-pointer">
            <div>
              <form
                action={async () => {
                  await logout();
                }}
              >
                <button
                  type="submit"
                  className="w-full flex items-center gap-2"
                >
                  <Power className="w-4 h-4" />
                  {t("logout")}
                </button>
              </form>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileInfo;
