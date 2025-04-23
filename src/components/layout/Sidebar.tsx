
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, Users, Plus, CreditCard, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  active?: boolean;
}

function SidebarItem({ icon: Icon, label, href, active }: SidebarItemProps) {
  return (
    <Link to={href} className="w-full">
      <Button
        variant={active ? "secondary" : "ghost"}
        className={cn(
          "w-full justify-start gap-3",
          active && "bg-splitwisely-primary/10 text-splitwisely-primary"
        )}
      >
        <Icon className={cn("h-5 w-5", active && "text-splitwisely-primary")} />
        {label}
      </Button>
    </Link>
  );
}

export default function Sidebar() {
  // Simple hook to get current path to highlight active link
  const currentPath = window.location.pathname;

  const isActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true;
    if (path !== "/" && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r bg-white p-4 gap-1 sticky top-16 h-[calc(100vh-4rem)]">
      <Button 
        className="mb-4 bg-splitwisely-primary hover:bg-splitwisely-secondary"
        onClick={() => {
          const event = new CustomEvent('open-add-expense');
          window.dispatchEvent(event);
        }}
      >
        <Plus className="h-5 w-5 mr-2" />
        Add Expense
      </Button>

      <div className="space-y-1">
        <SidebarItem
          icon={Home}
          label="Dashboard"
          href="/"
          active={isActive("/")}
        />
        <SidebarItem
          icon={Users}
          label="Groups"
          href="/groups"
          active={isActive("/groups")}
        />
        <SidebarItem
          icon={CreditCard}
          label="Expenses"
          href="/expenses"
          active={isActive("/expenses")}
        />
        <SidebarItem
          icon={Settings}
          label="Settings"
          href="/settings"
          active={isActive("/settings")}
        />
      </div>
    </aside>
  );
}
