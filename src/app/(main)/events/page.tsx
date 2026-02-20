import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { events } from "@/lib/placeholder-data";
import { Search, MapPin, Calendar as CalendarIcon, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function EventsPage() {
  // Mock joined events are IDs 4 and 5
  const joinedEventIds = ['4', '5'];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">University Events</h1>
        <p className="text-muted-foreground">Browse workshops, seminars, and cultural meets from all departments.</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input placeholder="Search by event name or department..." className="pl-10 w-full md:w-1/2 lg:w-1/3" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {events.map((event) => {
          const isJoined = joinedEventIds.includes(event.id);
          
          return (
            <Card key={event.id} className="flex flex-col h-full border-none shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-none">{event.department}</Badge>
                  {isJoined && (
                    <Badge className="bg-green-500/10 text-green-600 border-none flex gap-1 items-center px-2">
                      <CheckCircle2 className="w-3 h-3" />
                      Joined
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg line-clamp-1">{event.name}</CardTitle>
                <CardDescription className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                  <CalendarIcon className="h-3 w-3" />
                  {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 pb-2">
                <div className="flex items-start gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                  <p className="line-clamp-2">{event.location}</p>
                </div>
              </CardContent>
              <CardFooter className="pt-0 flex justify-between items-center">
                <span className="text-[10px] font-bold text-accent uppercase tracking-wider">Free Access</span>
                <Button asChild size="sm" variant={isJoined ? "outline" : "secondary"} className="h-8">
                  <Link href={`/events/${event.id}`}>Details</Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
