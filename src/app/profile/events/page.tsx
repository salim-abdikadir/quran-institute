import { getSession } from "@/server/better-auth/server";
import { api } from "@/trpc/server";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CalendarIcon, MapPinIcon } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";

export default async function EventsPage() {
  const session = await getSession();
  const events = await api.event.getAll();

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-primary">Recent Events</h1>
          <p className="text-muted-foreground font-medium">Stay updated with our latest activities and workshops.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.length === 0 ? (
          <div className="col-span-full py-24 text-center bg-card rounded-[3rem] border border-dashed border-primary/20">
            <h2 className="text-xl font-bold text-muted-foreground">No upcoming events found.</h2>
            <p className="text-sm font-medium">Check back later for new programs!</p>
          </div>
        ) : (
          events.map((event) => (
            <Card key={event.id} className="overflow-hidden border-none shadow-xl shadow-primary/5 rounded-[2.5rem] hover:translate-y-[-4px] transition-all duration-300">
              <div className="h-52 bg-primary/5 relative">
                {event.imageUrl ? (
                  <Image src={event.imageUrl} alt={event.title} width={400} height={200} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-primary/20">
                    <CalendarIcon size={64} strokeWidth={1.5} />
                  </div>
                )}
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold leading-tight">{event.title}</CardTitle>
                <CardDescription className="line-clamp-2 font-medium">{event.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 pb-6">
                <div className="flex items-center gap-3 text-sm font-semibold text-muted-foreground">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <CalendarIcon size={16} />
                  </div>
                  {format(new Date(event.date), "PPP")}
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold text-muted-foreground">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                    <MapPinIcon size={16} />
                  </div>
                  {event.location}
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button className="w-full rounded-2xl h-12 font-bold shadow-lg shadow-primary/10" asChild>
                  <Link href={`/profile/events/${event.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          )
        ))}
      </div>
    </div>
  );
}
