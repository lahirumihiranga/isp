import {
  Bot,
  CreditCard,
  GalleryVerticalEnd,
  LayoutDashboard,
  Link,
  Link2,
  Map,
  PieChart,
  Settings,
} from "lucide-react";

export const NavLinks = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "App Name",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  NavUser: [
    {
      title: "Generate Link",
      url: "/dashboard/generate-link",
      icon: Link,
    },
    {
      title: "Manage Links",
      url: "/dashboard/manage-links",
      icon: Link2,
    },
    {
      title: "Billing",
      url: "/dashboard/billing",
      icon: CreditCard,
    },
    {
      title: "Support",
      url: "/dashboard/support",
      icon: Map,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
    },
  ],
  navSecondary: [
    {
      title: "Analytics",
      url: "#",
      icon: PieChart,
    },
    {
      title: "API",
      url: "#",
      icon: Bot,
    },
    {
      title: "Support",
      url: "/dashboard/support",
      icon: Map,
    },
  ],
};
