import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircleIcon, MailIcon, PhoneIcon, MapPinIcon } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-primary">Contact Us</h1>
          <p className="text-muted-foreground font-medium">We are here to support your spiritual journey.</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <ContactCard 
            icon={MailIcon} 
            title="Email Support" 
            value="support@jimciyatquran.com"
          />
          <ContactCard 
            icon={PhoneIcon} 
            title="Call Us" 
            value="+252 61 XXX XXXX"
          />
          <ContactCard 
            icon={MapPinIcon} 
            title="Visit Us" 
            value="Mosque Complex, Mogadishu, Somalia"
          />
        </div>

        <Card className="border-none shadow-xl shadow-primary/5 rounded-[2.5rem] bg-primary text-primary-foreground p-4 overflow-hidden relative">
           <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <MessageCircleIcon size={120} />
           </div>
           <CardHeader>
             <CardTitle className="text-2xl font-black">Send a Message</CardTitle>
             <CardDescription className="text-primary-foreground/80 font-medium">
               Have a specific question? Send us a direct message and we'll get back to you.
             </CardDescription>
           </CardHeader>
           <CardContent>
             <Button variant="secondary" className="w-full rounded-2xl h-12 font-bold bg-white text-primary hover:bg-white/90">
               Start Live Chat
             </Button>
           </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ContactCard({ icon: Icon, title, value }: { icon: any, title: string, value: string }) {
  return (
    <div className="flex items-center gap-4 p-6 bg-card border border-border/50 rounded-[2rem] shadow-sm">
      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
        <Icon size={20} />
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground/60">{title}</p>
        <p className="text-base font-bold">{value}</p>
      </div>
    </div>
  );
}
