"use client";

import { useAuth } from "@/hooks/use-auth";
import { User } from "@/payload-types";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { UserCircleIcon, LogOutIcon } from "lucide-react";

const UserAccountNav = ({ user }: { user: User }) => {
  const { signOut } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="overflow-visible">
        <Button variant="ghost" size="sm" className="relative">
          Tài khoản
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-white " align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex justify-center space-x-2">
            <UserCircleIcon />
            <p className="font-medium text-sm text-black">
              {user.email.split("@")[0]}
            </p>
          </div>
        </div>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={signOut}
          className="cursor-pointer space-x-2"
        >
          <LogOutIcon />
          <p className="font-medium text-sm text-black">Thoát</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
