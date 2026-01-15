import Link from "next/link";
import { getSession } from "@/server/better-auth/server";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, Calendar, UserIcon } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { DashboardNav } from "@/components/navigation/dashboard-nav";
import type React from "react";

export default async function Home() {
  const session = await getSession();

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 pb-16 md:pb-0">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-border bg-background/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          <Link href="/" className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Jimciyat Alquran
          </Link>
          
          {/* Mobile Profile Icon (Top Right) */}
          <div className="flex items-center gap-2 md:hidden">
            <ModeToggle />
            {session && (
              <Link href="/profile" className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <UserIcon size={16} />
              </Link>
            )}
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/profile/events" className="text-muted-foreground hover:text-foreground transition-colors">Events</Link>
            <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">About Us</Link>
            <div className="flex items-center gap-4">
              <ModeToggle />
              {session ? (
                <div className="flex items-center gap-4">
                  <Link href="/profile" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all group">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <UserIcon size={16} />
                    </div>
                    <span>My Profile</span>
                  </Link>
                  <Button asChild variant="outline" className="border-primary/20 hover:bg-primary/5 rounded-full px-6">
                    <Link href="/register">Membership</Link>
                  </Button>
                </div>
              ) : (
                <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 rounded-full px-8">
                  <Link href="/auth">Join Now</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-primary/20 blur-[120px] rounded-full opacity-50 pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-medium text-primary mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Registration for 2026 is now open
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
              Elevate Your Soul with the <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Wisdom of Quran</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Join Jimciyat Alquran, a community dedicated to the preservation, study, and 
              application of Islamic teachings in modern life. Register today to become a 
              member and access exclusive programs.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button size="lg" className="h-14 px-8 text-base font-semibold bg-primary hover:bg-primary/90 w-full sm:w-auto" asChild>
                <Link href={session ? "/register" : "/auth"}>
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-base font-semibold border-border hover:bg-accent bg-transparent w-full sm:w-auto" asChild>
                <Link href="/events">Explore Events</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Community Growth",
              desc: "Be part of a vibrant community that values spiritual and academic excellence.",
              icon: Users,
            },
            {
              title: "Quality Events",
              desc: "Participate in workshops, seminars, and spiritual retreats throughout the year.",
              icon: Calendar,
            },
            {
              title: "Structured Learning",
              desc: "Access diverse programs tailored for different age groups and education levels.",
              icon: BookOpen,
            }
          ].map((feature, i) => (
            <FeatureCard key={i} Icon={feature.icon} {...feature} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border mt-20">
        <div className="container mx-auto px-6 text-center text-muted-foreground text-sm">
          <p>© 2026 Jimciyat Alquran. All rights reserved.</p>
        </div>
      </footer>
      <DashboardNav />
    </div>
  );
}
type IconType = React.ComponentType<{ className?: string }>;
function FeatureCard({ title, desc,  Icon }: { title: string; desc: string; Icon: IconType }) {
  return(<div className="group p-8 rounded-3xl border border-border bg-card hover:bg-accent transition-all">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Icon className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">{title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{desc}</p>
            </div>)
}
  