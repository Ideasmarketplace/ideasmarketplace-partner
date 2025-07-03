"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/use-user";

const Header = () => {
  const { userData, logoutUser } = useUser();
  const router = useRouter();

  return (
    <div>
      <header className="w-full flex justify-between h-20 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2">
          <div className="cursor-pointer">
            <Image src={Logo} alt="logo" className="" width={70} height={70} />
          </div>
        </div>
        <div className="px-4 flex items-center gap-3">
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="text-xs font-semibold">
              {userData?.companyName}
            </span>
          </div>
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="h-8 w-8 rounded-lg cursor-pointer">
                  <AvatarImage
                    src={""}
                    alt={userData?.companyName.charAt(0).toUpperCase()}
                  />
                  <AvatarFallback className="rounded-lg">
                    {userData?.companyName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-30">
                <div className="grid gap-2">
                  <div
                    onClick={logoutUser}
                    className="text-sm md:text-xs cursor-pointer"
                  >
                    Logout
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
