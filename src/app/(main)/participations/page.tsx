'use client';

import { events } from "@/lib/placeholder-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Award, Calendar as CalendarIcon, MapPin, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ParticipationsPage() {
  const [userName, setUserName] = useState<string>("Student");
  
  useEffect(() => {
    // For demo purposes, we'll assume the student is Alice Smith
    setUserName("Alice Smith");
  }, []);

  const myJoinedEvents = events.slice(3, 5);

  return (
    <div className="space-y-8">
      <Button variant="ghost" asChild className="pl-0 text-muted-foreground hover:bg-transparent hover:text-primary">
        <Link href="/dashboard">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
      </Button>

      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Participations</h1>
        <p className="text-muted-foreground">Track your academic engagement and collect your achievement certificates.</p>
      </div>

      <div className="grid gap-6">
        {myJoinedEvents.map((event) => (
          <Card key={event.id} className="flex flex-col sm:flex-row items-stretch sm:items-center border-none shadow-md overflow-hidden bg-card hover:shadow-lg transition-all duration-300">
            <div className="flex-1 p-6">
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="secondary" className="text-[10px] h-5 bg-primary/10 text-primary border-none uppercase tracking-widest">{event.department}</Badge>
                <span className="text-xs text-muted-foreground font-medium">Joined on {new Date(event.date).toLocaleDateString()}</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">{event.name}</h3>
              <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5 font-medium"><CalendarIcon className="w-4 h-4 text-primary" /> {event.time}</span>
                <span className="flex items-center gap-1.5 font-medium"><MapPin className="w-4 h-4 text-primary" /> {event.location}</span>
              </div>
            </div>
            <div className="p-6 bg-muted/20 flex flex-col sm:flex-row gap-4 items-center justify-center border-t sm:border-t-0 sm:border-l border-border/50 min-w-[240px]">
              <Button variant="ghost" size="sm" className="w-full sm:w-auto hover:bg-primary/10 hover:text-primary font-semibold" asChild>
                <Link href={`/events/${event.id}`}>View Details</Link>
              </Button>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 gap-2 px-6 shadow-lg shadow-primary/20">
                    <Award className="h-4 w-4" />
                    Get Certificate
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl p-0 overflow-hidden border-none">
                  <DialogHeader className="bg-primary p-6 text-primary-foreground">
                    <DialogTitle className="text-2xl font-bold text-center text-primary-foreground">Participation Achievement</DialogTitle>
                  </DialogHeader>
                  <div className="p-1 bg-gradient-to-br from-primary via-accent to-primary">
                    <div className="p-12 bg-white text-black text-center space-y-8 relative overflow-hidden rounded-lg">
                      {/* Certificate Decorations */}
                      <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-br-full -z-10" />
                      <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/5 rounded-tl-full -z-10" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] -z-10 pointer-events-none">
                        <Award className="w-[400px] h-[400px]" />
                      </div>
                      
                      <div className="space-y-3">
                        <h2 className="text-5xl font-serif italic text-primary">Certificate</h2>
                        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-bold">Of Academic Participation</p>
                      </div>
                      
                      <div className="py-8 space-y-6">
                        <p className="text-lg font-medium italic">This honor is proudly presented to</p>
                        <div className="space-y-1">
                          <p className="text-4xl font-bold border-b-2 border-primary/20 inline-block px-12 pb-2 uppercase tracking-wide">{userName}</p>
                          <p className="text-xs text-muted-foreground mt-2">Student ID: UNI-{Math.floor(1000 + Math.random() * 9000)}</p>
                        </div>
                        <p className="text-lg max-w-md mx-auto leading-relaxed">For their successful participation and contribution to the event</p>
                        <p className="text-3xl font-extrabold text-primary uppercase tracking-tight">"{event.name}"</p>
                        <p className="text-sm font-semibold text-muted-foreground italic">Organized by the {event.department} Department</p>
                      </div>
                      
                      <div className="pt-12 flex justify-between items-end border-t border-primary/10">
                        <div className="text-left space-y-1">
                          <div className="w-36 border-b border-black/20 h-8"></div>
                          <p className="text-[10px] font-black uppercase tracking-widest">University Registrar</p>
                        </div>
                        <div className="text-center">
                          <div className="w-24 h-24 bg-primary/5 rounded-full border-4 border-double border-primary/20 flex items-center justify-center mb-2 mx-auto shadow-inner">
                            <Award className="w-12 h-12 text-primary" />
                          </div>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase">{new Date().toLocaleDateString()}</p>
                        </div>
                        <div className="text-right space-y-1">
                          <div className="w-36 border-b border-black/20 h-8 flex items-center justify-center italic text-[10px] text-primary/40 font-serif">Verified Digital Seal</div>
                          <p className="text-[10px] font-black uppercase tracking-widest">Dept. Coordinator</p>
                        </div>
                      </div>
                      <div className="pt-8 no-print flex items-center justify-center gap-4">
                        <DialogClose asChild>
                          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                          </Button>
                        </DialogClose>
                        <Button size="sm" variant="outline" className="text-[10px] uppercase font-bold tracking-widest hover:bg-primary hover:text-primary-foreground transition-all rounded-full" onClick={() => window.print()}>
                          Print to PDF / Save Record
                        </Button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </Card>
        ))}

        {myJoinedEvents.length === 0 && (
          <div className="text-center py-20 bg-muted/20 rounded-2xl border-2 border-dashed">
            <Award className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-20" />
            <p className="text-xl font-medium text-muted-foreground">You haven't participated in any events yet.</p>
            <Button asChild variant="link" className="mt-2">
              <Link href="/events">Explore Campus Events</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
