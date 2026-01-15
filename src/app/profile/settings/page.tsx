import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SettingsIcon, UserIcon, BellIcon, ShieldIcon } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-primary">Settings</h1>
          <p className="text-muted-foreground font-medium">Manage your account preferences and notifications.</p>
        </div>

        <div className="space-y-4">
          <SectionItem 
            icon={UserIcon} 
            title="Account Information" 
            description="Update your personal details and contact info."
          />
          <SectionItem 
            icon={BellIcon} 
            title="Notifications" 
            description="Choose how you want to be notified about events."
          />
          <SectionItem 
            icon={ShieldIcon} 
            title="Privacy & Security" 
            description="Manage your password and security settings."
          />
        </div>
      </div>
    </div>
  );
}

function SectionItem({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <Card className="border-none shadow-xl shadow-primary/5 rounded-[2rem] hover:bg-accent/5 transition-colors cursor-pointer group">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          <Icon size={20} />
        </div>
        <div className="space-y-1">
          <CardTitle className="text-lg font-bold">{title}</CardTitle>
          <CardDescription className="font-medium">{description}</CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
}
