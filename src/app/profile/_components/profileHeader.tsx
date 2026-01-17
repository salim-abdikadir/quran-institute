import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { auth } from "@/server/better-auth";
import { LogOutIcon} from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
const ProfileHeader = () => {
    return (
    <div className="">
        <header className="bg-background/80 backdrop-blur-md border-b sticky top-0 z-30 hidden md:block">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                  <Link href="/" className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    Jimciyat Alquran
                  </Link>
                  <div className="flex items-center gap-4">
                    <ModeToggle />
                    <Button variant="ghost" asChild>
                      <Link href="/events">Events</Link>
                    </Button>
                    <form>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-full"
                        formAction={async () => {
                          "use server";
                          await auth.api.signOut({
                            headers: await headers(),
                          });
                          redirect("/");
                        }}
                      >
                        <LogOutIcon size={16} className="mr-2" />
                        Sign Out
                      </Button>
                    </form>
                  </div>
                </div>
              </header>
        
              {/* Mobile Header Title */}
              <div className="md:hidden pt-8 pb-4 px-6 flex items-center justify-between">
                <h1 className="text-2xl font-black tracking-tight">Account</h1>
                <div className="flex items-center gap-2">
                  <ModeToggle />
                  <form>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-destructive rounded-full"
                      formAction={async () => {
                        "use server";
                        await auth.api.signOut({
                          headers: await headers(),
                        });
                        redirect("/");
                      }}
                    >
                      <LogOutIcon size={18} />
                    </Button>
                  </form>
                </div>
              </div>
        </div>)
}
export default ProfileHeader