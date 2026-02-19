'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { events } from "@/lib/placeholder-data";
import { ArrowRight, MapPin, Calendar as CalendarIcon, UserCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const [userRole, setUserRole] = useState<'student' | 'organizer' | 'admin' | null>(null);

  useEffect(() => {
    const role = localStorage.getItem('userRole') as any;
    setUserRole(role || 'student');
  }, []);

  const upcomingEvents = events.slice(0, 3);
  const myJoinedEvents = events.slice(3, 5);

  const isStudent = userRole === 'student' || !userRole;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">University Portal</h1>
        <p className="text-muted-foreground">Discover what's happening across different departments. Join events to expand your skills.</p>
      </div>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Live Events</h2>
          <Button variant="ghost" asChild>
            <Link href="/events">
              Explore All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {upcomingEvents.map((event) => (
            <Card key={event.id} className="flex flex-col h-full border-none shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5">{event.department}</Badge>
                </div>
                <CardTitle className="text-lg">{event.name}</CardTitle>
                <CardDescription className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                  <CalendarIcon className="h-3.5 w-3.5" />
                  {new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex items-start gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                  <p>{event.location}</p>
                </div>
                <p className="mt-4 text-sm line-clamp-2 text-muted-foreground">{event.description}</p>
              </CardContent>
              <CardFooter className="pt-0 flex justify-between items-center mt-auto">
                <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">Open Access</span>
                {isStudent && (
                  <Button asChild size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link href={`/events/${event.id}`}>Join Now</Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {isStudent && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Joined Participations</h2>
          <div className="space-y-4">
              {myJoinedEvents.map((event) => (
                  <Card key={event.id} className="flex items-center border-none shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex-1 p-4">
                          <div className="flex items-center gap-2 mb-1">
                             <h3 className="font-semibold">{event.name}</h3>
                             <Badge variant="secondary" className="text-[10px] h-4">{event.department}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{new Date(event.date).toLocaleDateString()} at {event.time}</p>
                          <p className="text-sm text-muted-foreground">{event.location}</p>
                      </div>
                      <div className="p-4">
                          <Button variant="outline" size="sm" asChild>
                              <Link href={`/events/${event.id}`}>View Info</Link>
                          </Button>
                      </div>
                  </Card>
              ))}
          </div>
        </section>
      )}
    </div>
  )
}
