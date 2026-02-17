'use client';

import Image from "next/image";
import { events } from "@/lib/placeholder-data";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ClockIcon, MapPinIcon, TicketIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const [userRole, setUserRole] = useState<'user' | 'manager' | 'admin' | null>(null);

  useEffect(() => {
    const role = localStorage.getItem('userRole') as 'user' | 'manager' | 'admin' | null;
    setUserRole(role || 'user');
  }, []);
  
  const event = events.find((e) => e.id === params.id);

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
    <div className="bg-card rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-64 md:h-96 w-full">
        <Image src={event.image} alt={event.name} layout="fill" objectFit="cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground tracking-tight">{event.name}</h1>
        </div>
      </div>
      <div className="p-6 md:p-8 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold border-b pb-2 mb-4">About this event</h2>
          <p className="text-muted-foreground leading-relaxed">{event.description}</p>
        </div>
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <CalendarIcon className="h-6 w-6 text-primary mt-1" />
            <div>
              <h3 className="font-semibold">Date</h3>
              <p className="text-muted-foreground">{eventDate}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <ClockIcon className="h-6 w-6 text-primary mt-1" />
            <div>
              <h3 className="font-semibold">Time</h3>
              <p className="text-muted-foreground">{event.time}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <MapPinIcon className="h-6 w-6 text-primary mt-1" />
            <div>
              <h3 className="font-semibold">Location</h3>
              <p className="text-muted-foreground">{event.location}</p>
            </div>
          </div>
          {isUser && (
            <div className="flex items-center justify-between bg-secondary p-4 rounded-lg">
              <div className="flex items-center gap-2">
                  <TicketIcon className="h-6 w-6 text-primary"/>
                  <span className="font-semibold text-lg">{event.price > 0 ? `$${event.price.toFixed(2)}` : 'Free'}</span>
              </div>
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                Book Ticket
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
