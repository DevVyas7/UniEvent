'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { events } from "@/lib/placeholder-data";
import { ArrowRight, MapPin, Calendar as CalendarIcon, Award, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

export default function DashboardPage() {
  const [userRole, setUserRole] = useState<'student' | 'organizer' | 'admin' | null>(null);
  const [userName, setUserName] = useState<string>("Student");

  useEffect(() => {
    const role = localStorage.getItem('userRole') as any;
    setUserRole(role || 'student');
    // For demo purposes, we'll assume the student is Alice Smith
    if (role === 'student' || !role) {
        setUserName("Alice Smith");
    }
  }, []);

  const upcomingEvents = events.slice(0, 3);
  const myJoinedEvents = events.slice(3, 5);

  const isStudent = userRole === 'student' || !userRole;

  return (
    <div className="space-y-12 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-card p-6 rounded-2xl shadow-sm border border-border/50">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-primary">UniEvent Portal</h1>
          <p className="text-muted-foreground text-lg mt-1">Empowering your university journey through departmental collaboration.</p>
        </div>
        <div className="flex items-center gap-4 bg-primary/5 px-6 py-3 rounded-xl border border-primary/10 self-start md:self-center">
          <div className="bg-primary/10 p-2 rounded-full">
            <CheckCircle2 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Active Student</p>
            <p className="font-bold text-primary text-lg">{userName}</p>
          </div>
        </div>
      </div>

      {/* Live Events Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">Explore Live Events</h2>
            <p className="text-sm text-muted-foreground">New workshops and seminars from various departments.</p>
          </div>
          <Button variant="outline" className="rounded-full gap-2" asChild>
            <Link href="/events">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {upcomingEvents.map((event) => (
            <Card key={event.id} className="flex flex-col h-full border-none shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 px-3">{event.department}</Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">{event.name}</CardTitle>
                <CardDescription className="flex items-center gap-1.5 text-sm text-muted-foreground mt-2">
                  <CalendarIcon className="h-4 w-4 text-accent" />
                  {new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex items-start gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                  <p>{event.location}</p>
                </div>
                <p className="mt-4 text-sm line-clamp-2 text-muted-foreground leading-relaxed">{event.description}</p>
              </CardContent>
              <CardFooter className="pt-4 border-t border-border/50 flex justify-between items-center">
                <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full uppercase tracking-wider">Free Access</span>
                {isStudent && (
                  <Button asChild size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-6">
                    <Link href={`/events/${event.id}`}>Join Now</Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="my-10" />

      {/* Participated Events Section */}
      {isStudent && (
        <section className="bg-primary/5 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-12 rounded-[2rem] border border-primary/10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-primary p-2 rounded-lg">
                <Award className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="space-y-1">
                <h2 className="text-3xl font-bold tracking-tight">My Participations</h2>
                <p className="text-muted-foreground">Track your academic engagement and collect certificates.</p>
              </div>
            </div>
            
            <div className="grid gap-4">
                {myJoinedEvents.map((event) => (
                    <Card key={event.id} className="flex flex-col sm:flex-row items-stretch sm:items-center border-none shadow-sm hover:shadow-md transition-all overflow-hidden bg-card/80 backdrop-blur-sm">
                        <div className="flex-1 p-6">
                            <div className="flex items-center gap-3 mb-2">
                               <Badge variant="secondary" className="text-[10px] h-5 bg-primary/10 text-primary border-none uppercase tracking-widest">{event.department}</Badge>
                               <span className="text-xs text-muted-foreground font-medium">Joined on {new Date(event.date).toLocaleDateString()}</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2">{event.name}</h3>
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1.5"><CalendarIcon className="w-4 h-4 text-primary" /> {event.time}</span>
                                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-primary" /> {event.location}</span>
                            </div>
                        </div>
                        <div className="p-6 bg-muted/20 flex flex-col sm:flex-row gap-3 items-center justify-center border-t sm:border-t-0 sm:border-l border-border/50">
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
                                        <DialogTitle className="text-2xl font-bold text-center">Participation Achievement</DialogTitle>
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
                                            <div className="pt-8 no-print">
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
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
