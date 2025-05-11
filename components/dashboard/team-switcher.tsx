"use client";

import * as React from "react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ThemeSwitcher } from "../ui/theme-switcher";
import Link from "next/link";
import { SiteLogo } from "../landing/logos";

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string;
    logo: React.ElementType;
    plan: string;
  }[];
}) {
  const { isMobile } = useSidebar();
  const [activeTeam, setActiveTeam] = React.useState(teams[0]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex size-7 items-center justify-center">
            <Link href="/" target="_blank"><SiteLogo/></Link>
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <Link href="/" target="_blank"><span className="truncate font-semibold cursor-pointer">{activeTeam.name}</span></Link>
            {/* <span className="truncate text-xs">{activeTeam.plan}</span> */}
          </div>
          <ThemeSwitcher/>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
