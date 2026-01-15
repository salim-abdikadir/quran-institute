import { redirect } from "next/navigation";
import { getSession } from "@/server/better-auth/server";
import { DashboardNav } from "@/components/navigation/dashboard-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import Link from "next/link";
import { auth } from "@/server/better-auth";
import { headers } from "next/headers";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/auth");
  }

  return (
    <div className="min-h-screen bg-muted/30 pb-24 md:pb-12">
      {/* Sticky Top Header - Responsive */}
      <header className="bg-background/80 backdrop-blur-md border-b sticky top-0 z-30">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent shrink-0">
              Jimciyat Alquran
            </Link>
            
            {/* Dashboard Navigation - Responsive */}
            <DashboardNav />
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <ModeToggle />
            
            <form>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-full hidden md:flex"
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
              <Button 
                variant="ghost" 
                size="icon"
                className="text-destructive rounded-full md:hidden"
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
      </header>

      <main>
        {children}
      </main>
    </div>
  );
}
