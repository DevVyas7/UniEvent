'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { events } from "@/lib/placeholder-data";
import { ArrowRight, MapPin, Calendar as CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [userRole, setUserRole] = useState<'user' | 'manager' | 'admin' | null>(null);

  useEffect(() => {
    const role = localStorage.getItem('userRole') as 'user' | 'manager' | 'admin' | null;
    setUserRole(role || 'user');
  }, []);

  const upcomingEvents = events.slice(0, 3);
  const bookedEvents = events.slice(3, 5);

  const isUser = userRole === 'user';

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome to EventVerse!</h1>
        <p className="text-muted-foreground">Here's what's happening. Discover, book, and manage your events all in one place.</p>
      </div>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Upcoming Events</h2>
          <Button variant="ghost" asChild>
            <Link href="/events">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {upcomingEvents.map((event) => (
            <Card key={event.id} className="flex flex-col h-full">
              <CardHeader>
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
                <p className="font-semibold text-primary">{event.price > 0 ? `$${event.price.toFixed(2)}` : 'Free'}</p>
                {isUser && (
                  <Button asChild size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link href={`/events/${event.id}`}>Book Now</Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {isUser && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">My Booked Events</h2>
          <div className="space-y-4">
              {bookedEvents.map((event) => (
                  <Card key={event.id} className="flex items-center">
                      <div className="flex-1 p-4">
                          <h3 className="font-semibold">{event.name}</h3>
                          <p className="text-sm text-muted-foreground">{new Date(event.date).toLocaleDateString()} at {event.time}</p>
                          <p className="text-sm text-muted-foreground">{event.location}</p>
                      </div>
                      <div className="p-4">
                          <Button variant="outline" asChild>
                              <Link href={`/events/${event.id}`}>View Details</Link>
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
