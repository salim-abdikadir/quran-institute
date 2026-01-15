"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  HomeIcon, 
  GridIcon, 
  UserIcon, 
  SettingsIcon, 
  MessageCircleIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/profile/events", label: "Events", icon: GridIcon },
  { href: "/profile", label: "Profile", icon: UserIcon },
  { href: "/profile/contact", label: "Contact", icon: MessageCircleIcon },
  { href: "/profile/settings", label: "Settings", icon: SettingsIcon },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-background/95 backdrop-blur-xl border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50 flex items-center justify-around px-2 pb-safe">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link 
              key={item.href}
              href={item.href} 
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full transition-all gap-1",
                isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
              )}
            >
              <div className={cn(
                "p-1.5 rounded-xl transition-all",
                isActive ? "bg-primary/10" : ""
              )}>
                <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={cn(
                "text-[10px] font-bold tracking-tight transition-all",
                isActive ? "opacity-100" : "opacity-60"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Desktop Navigation Aspects (Integrated into Layout Header) */}
      <div className="hidden md:flex items-center gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Button
              key={item.href}
              variant="ghost"
              asChild
              className={cn(
                "rounded-full px-4 h-9",
                isActive ? "bg-primary/10 text-primary hover:bg-primary/20" : "text-muted-foreground hover:text-primary hover:bg-primary/5"
              )}
            >
              <Link href={item.href} className="flex items-center gap-2">
                <item.icon size={16} />
                <span className="font-medium text-sm">{item.label}</span>
              </Link>
            </Button>
          );
        })}
      </div>
    </>
  );
}
