import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { events } from "@/lib/placeholder-data";
import { Search, MapPin, Calendar as CalendarIcon, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function EventsPage() {
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
        {events.map((event) => (
          <Card key={event.id} className="flex flex-col h-full border-none shadow-md overflow-hidden">
            <CardHeader className="pb-2">
              <Badge variant="secondary" className="mb-2 w-fit bg-primary/10 text-primary border-none">{event.department}</Badge>
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
              <Button asChild size="sm" variant="secondary" className="h-8">
                <Link href={`/events/${event.id}`}>Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
