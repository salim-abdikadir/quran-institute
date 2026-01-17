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
    <div className="min-h-screen bg-muted/40">
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Recent Events</h1>
            <p className="text-muted-foreground">Stay updated with our latest activities and workshops.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.length === 0 ? (
            <div className="col-span-full py-20 text-center">
              <h2 className="text-xl font-semibold text-muted-foreground">No upcoming events found.</h2>
              <p>Check back later for new programs!</p>
            </div>
          ) : (
            events.map((event) => (
              <Card key={event.id} className="overflow-hidden border-primary/5 hover:border-primary/20 transition-all hover:shadow-md">
                <div className="h-48 bg-primary/5 relative">
                  {event.imageUrl ? (
                    <Image src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-primary/20">
                      <CalendarIcon size={48} />
                    </div>
                  )}
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start gap-2">
                    <CardTitle className="leading-tight">{event.title}</CardTitle>
                  </div>
                  <CardDescription className="line-clamp-2">{event.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarIcon size={16} className="text-primary" />
                    {format(new Date(event.date), "PPP")}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPinIcon size={16} className="text-primary" />
                    {event.location}
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button className="w-full" asChild>
                    <Link href={`/events/${event.id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
