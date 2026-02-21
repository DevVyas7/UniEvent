
'use client';

import React, { useEffect, useState, use } from "react";
import { events } from "@/lib/placeholder-data";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ClockIcon, MapPinIcon, GraduationCap, ArrowLeft, Building2, CheckCircle2, Award } from "lucide-react";
import Link from "next/link";
import type { Event } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { toast } = useToast();
  const [userRole, setUserRole] = useState<'student' | 'organizer' | 'admin' | null>(null);
  const [event, setEvent] = useState<Event | null | undefined>(undefined);

  useEffect(() => {
    const role = localStorage.getItem('userRole') as any;
    setUserRole(role || 'student');
    const foundEvent = events.find((e) => e.id === id);
    setEvent(foundEvent);
  }, [id]);

  if (event === undefined) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-muted-foreground animate-pulse">Fetching details...</p>
      </div>
    );
  }
  
  if (!event) {
    notFound();
  }

  const handleJoin = () => {
    toast({
      title: "Successfully Joined",
      description: `You have joined ${event.name}. See you there!`,
    });
  };

  const eventDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const isStudent = userRole === 'student' || !userRole;
  // Mock logic: events 4 and 5 are "joined" in our placeholder data slice used across the app
  const isJoined = id === '4' || id === '5';

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Button variant="ghost" asChild className="pl-0 text-muted-foreground hover:bg-transparent hover:text-primary">
        <Link href="/events">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Events
        </Link>
      </Button>

      <div className="bg-card rounded-2xl border-none shadow-xl overflow-hidden p-6 md:p-10">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-accent text-accent-foreground border-none px-4 py-1">{event.department}</Badge>
              {event.isCredit ? (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-4 py-1">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Academic Credit (1.0)
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-muted text-muted-foreground border-none px-4 py-1">
                  Non-Credit Event
                </Badge>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">{event.name}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="w-4 h-4" />
                <span className="text-sm font-medium">Organized by {event.department} Department</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 pt-8 border-t">
            <div className="md:col-span-2 space-y-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Description</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{event.description}</p>
              </div>

              {event.isCredit && (
                <div className="bg-green-50/50 border border-green-100 p-6 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 text-green-800 font-bold">
                    <Award className="w-5 h-5" />
                    Academic Value
                  </div>
                  <p className="text-sm text-green-700 leading-relaxed">
                    This event is recognized by the academic board. Successful participation grants **1.0 credit hour** towards your supplementary academic records.
                  </p>
                </div>
              )}
            </div>
            
            <div className="space-y-6 bg-muted/20 p-6 rounded-2xl h-fit border border-muted">
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <CalendarIcon className="h-5 w-5 text-primary shrink-0" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">When</h3>
                    <p className="text-muted-foreground text-sm">{eventDate}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                   <div className="bg-primary/10 p-2 rounded-lg">
                    <ClockIcon className="h-5 w-5 text-primary shrink-0" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Time</h3>
                    <p className="text-muted-foreground text-sm">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                   <div className="bg-primary/10 p-2 rounded-lg">
                    <MapPinIcon className="h-5 w-5 text-primary shrink-0" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Where</h3>
                    <p className="text-muted-foreground text-sm">{event.location}</p>
                  </div>
                </div>
              </div>

              {isStudent && (
                <div className="pt-6 border-t space-y-4">
                  {isJoined ? (
                    <div className="bg-primary/5 text-primary px-3 py-6 rounded-xl text-center border border-primary/20 space-y-3">
                       <CheckCircle2 className="w-8 h-8 mx-auto text-primary" />
                       <div>
                        <p className="font-bold text-sm uppercase tracking-tight">You've Joined This Event</p>
                        <p className="text-[10px] text-muted-foreground mt-1">Your participation is recorded for departmental records.</p>
                       </div>
                       <Button variant="outline" size="sm" className="w-full text-[10px] uppercase font-bold tracking-widest" asChild>
                          <Link href="/participations">View in Participations</Link>
                       </Button>
                    </div>
                  ) : (
                    <>
                      <Button onClick={handleJoin} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 gap-2 h-12 text-lg font-bold shadow-lg">
                        <GraduationCap className="h-5 w-5" />
                        Join Event
                      </Button>
                      <p className="text-[10px] text-center text-muted-foreground italic">Joining confirms your participation for departmental records.</p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
