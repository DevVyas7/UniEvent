'use client';

import React, { useEffect, useState, use } from "react";
import { events } from "@/lib/placeholder-data";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ClockIcon, MapPinIcon, TicketIcon, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Event } from "@/lib/types";

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [userRole, setUserRole] = useState<'user' | 'manager' | 'admin' | null>(null);
  const [event, setEvent] = useState<Event | null | undefined>(undefined);

  useEffect(() => {
    const role = localStorage.getItem('userRole') as 'user' | 'manager' | 'admin' | null;
    setUserRole(role || 'user');
    const foundEvent = events.find((e) => e.id === id);
    setEvent(foundEvent);
  }, [id]);

  if (event === undefined) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-muted-foreground">Loading event details...</p>
      </div>
    );
  }
  
  if (!event) {
    notFound();
  }

  const eventDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const isUser = userRole === 'user';

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Button variant="ghost" asChild className="pl-0 text-muted-foreground">
        <Link href="/events">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Events
        </Link>
      </Button>

      <div className="bg-card rounded-lg border shadow-sm overflow-hidden p-6 md:p-10">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">{event.name}</h1>
            <p className="text-primary font-medium">{event.category}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 pt-6 border-t">
            <div className="md:col-span-2 space-y-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">About this event</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{event.description}</p>
              </div>
            </div>
            
            <div className="space-y-6 bg-muted/30 p-6 rounded-xl h-fit border">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CalendarIcon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-sm">Date</h3>
                    <p className="text-muted-foreground text-sm">{eventDate}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ClockIcon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-sm">Time</h3>
                    <p className="text-muted-foreground text-sm">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPinIcon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-sm">Location</h3>
                    <p className="text-muted-foreground text-sm">{event.location}</p>
                  </div>
                </div>
              </div>

              {isUser && (
                <div className="pt-4 border-t space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">Ticket Price</span>
                    <span className="font-bold text-xl">{event.price > 0 ? `$${event.price.toFixed(2)}` : 'Free'}</span>
                  </div>
                  <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 gap-2">
                    <TicketIcon className="h-4 w-4" />
                    Book Ticket
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
