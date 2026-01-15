import { redirect } from "next/navigation";
import { getSession } from "@/server/better-auth/server";
import { api } from "@/trpc/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { 
  UserIcon, 
  MapPinIcon, 
  PhoneIcon, 
  GraduationCapIcon, 
  BriefcaseIcon, 
  CalendarIcon, 
  LogOutIcon,
  HomeIcon,
  SearchIcon,
  GridIcon,
  SettingsIcon,
  ChevronRight
} from "lucide-react";
import { headers } from "next/headers";
import { auth } from "@/server/better-auth";
import { EditProfileDialog } from "@/components/profile/edit-profile-dialog";
import { ModeToggle } from "@/components/mode-toggle";

export default async function ProfilePage() {
  const session = await getSession();

  if (!session) {
    redirect("/auth");
  }

  const profile = await api.member.getProfile();
  const stats = await api.admin.getStats().catch(() => ({ memberCount: 0 }));

  /**
   * Action item for mobile list style
   */
  const InfoItem = ({ icon: Icon, label, value }: { icon: any, label: string, value: string | React.ReactNode }) => (
    <div className="flex items-center gap-4 py-3 border-b last:border-0 border-border/50">
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
        <Icon size={16} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground/70">{label}</p>
        <div className="text-sm font-medium truncate">{value}</div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 md:py-8 lg:px-0">
      <div className="max-w-xl mx-auto space-y-8 pt-8 md:pt-0">
        
        {/* Mobile Header Title - Simplified since layout has header */}
        <div className="md:hidden pb-4">
          <h1 className="text-2xl font-black tracking-tight">Account</h1>
        </div>

        {/* Hero Profile Section */}
        <div className="flex flex-col items-center md:flex-row md:items-center gap-6 px-4 md:px-0 text-center md:text-left">
          <div className="relative group">
            <div className="h-24 w-24 md:h-20 md:w-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary shadow-inner border border-primary/20 rotate-3 group-hover:rotate-0 transition-transform duration-300">
              <UserIcon size={40} className="-rotate-3 group-hover:rotate-0 transition-transform duration-300" />
            </div>
            <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-green-500 border-2 border-background" />
          </div>
          
          <div className="flex-1 space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">
              {profile?.fullName ?? session.user.name}
            </h2>
            <p className="text-muted-foreground text-sm font-medium">{session.user.email}</p>
            {profile && (
              <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-1">
                <Badge variant="secondary" className="bg-primary/5 text-primary border-primary/10 rounded-full px-3 py-0.5 text-[10px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mr-1.5 animate-pulse" />
                  Active Member
                </Badge>
              </div>
            )}
          </div>

          {profile && (
            <div className="md:ml-auto w-full md:w-auto pt-2 md:pt-0 px-8 md:px-0">
              <EditProfileDialog initialData={{
                fullName: profile.fullName,
                address: profile.address,
                phoneNumber: profile.phoneNumber,
                ageGroup: profile.ageGroup,
                educationLevel: profile.educationLevel,
                employmentStatus: profile.employmentStatus,
                employmentTitle: profile.employmentTitle ?? "",
              }} />
            </div>
          )}
        </div>

        {!profile ? (
          <Card className="border-none bg-gradient-to-br from-primary/10 to-accent/10 shadow-none rounded-[2rem] p-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold text-primary">Incomplete Profile</CardTitle>
              <CardDescription className="text-sm font-medium">
                Join our community of {stats.memberCount > 0 ? stats.memberCount : "many"} members to access exclusive events.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full rounded-2xl h-12 text-sm font-bold shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/register">Register Now</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6 px-2 md:px-0 pb-12">
            {/* Profile Sections as app-like lists */}
            <div className="space-y-3">
              <h3 className="px-2 text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Personal Details</h3>
              <div className="bg-card border border-border/50 rounded-[2rem] p-6 shadow-sm">
                <InfoItem icon={UserIcon} label="Full Name" value={profile.fullName} />
                <InfoItem icon={MapPinIcon} label="Address" value={profile.address} />
                <InfoItem icon={PhoneIcon} label="Phone Number" value={profile.phoneNumber} />
                <InfoItem icon={CalendarIcon} label="Age Group" value={<Badge variant="outline" className="text-[10px] rounded-full">{profile.ageGroup} years</Badge>} />
              </div>
            </div>

            <div className="space-y-3 pb-8">
              <h3 className="px-2 text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Education & Work</h3>
              <div className="bg-card border border-border/50 rounded-[2rem] p-6 shadow-sm">
                <InfoItem icon={GraduationCapIcon} label="Education Level" value={profile.educationLevel} />
                <InfoItem icon={BriefcaseIcon} label="Current Status" value={profile.employmentStatus} />
                {profile.employmentTitle && (
                  <InfoItem icon={BriefcaseIcon} label="Job Title" value={profile.employmentTitle} />
                )}
                <div className="pt-4 flex items-center justify-center gap-2 text-[10px] font-bold text-muted-foreground/50 uppercase tracking-tighter">
                  Since {new Date(profile.createdAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
