import Link from "next/link";
import { HomeIcon, GridIcon, UserIcon, SearchIcon, SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProfileBottomNav = () => {
    return (
        <nav className="md:hidden fixed bottom-6 left-6 right-6 h-16 bg-background/90 backdrop-blur-xl border border-white/20 shadow-2xl rounded-full z-50 flex items-center justify-around px-2">
        <Link href="/" className="flex flex-col items-center justify-center w-12 h-12 rounded-full text-muted-foreground hover:text-primary transition-colors">
          <HomeIcon size={20} />
          <span className="text-[8px] font-bold mt-1">Home</span>
        </Link>
        <Link href="/profile/events" className="flex flex-col items-center justify-center w-12 h-12 rounded-full text-muted-foreground hover:text-primary transition-colors">
          <GridIcon size={20} />
          <span className="text-[8px] font-bold mt-1">Events</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center justify-center w-14 h-14 -mt-6 bg-primary text-primary-foreground shadow-lg shadow-primary/30 rounded-full transform transition-transform hover:scale-105 active:scale-95">
          <UserIcon size={22} strokeWidth={2.5} />
        </Link>
        <Button variant="ghost" size="icon" className="flex flex-col items-center justify-center w-12 h-12 rounded-full text-muted-foreground">
          <SearchIcon size={20} />
          <span className="text-[8px] font-bold mt-1">Search</span>
        </Button>
        <Button variant="ghost" size="icon" className="flex flex-col items-center justify-center w-12 h-12 rounded-full text-muted-foreground">
          <SettingsIcon size={20} />
          <span className="text-[8px] font-bold mt-1">Settings</span>
        </Button>
      </nav>
    )
}
export default ProfileBottomNav