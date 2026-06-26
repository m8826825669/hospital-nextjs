"use client";

import { Bell, Menu, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { CurrentUser } from "@/features/auth/types/auth.types";
import { UserMenu } from "./user-menu";
import { GlobalSearch } from "./global-search";

type AppHeaderProps = {
  user: CurrentUser;
  onMenuClick: () => void;
};

export function AppHeader({ user, onMenuClick }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background/95 px-4 backdrop-blur lg:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="mr-2 lg:hidden"
        onClick={onMenuClick}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* <div className="relative hidden w-full max-w-lg md:block">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          className="h-9 pl-9"
          placeholder="Search patients, appointments, invoices..."
        />
      </div> */}
      <GlobalSearch />  
      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Bell className="h-4 w-4" />
        </Button>

        <UserMenu user={user} />
      </div>
    </header>
  );
}