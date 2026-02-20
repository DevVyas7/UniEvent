'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { events } from "@/lib/placeholder-data";
import { ArrowRight, MapPin, Calendar as CalendarIcon, Award } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

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
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">University Portal</h1>
          <p className="text-muted-foreground">Discover what's happening across different departments. Join events to expand your skills.</p>
        </div>
        <div className="bg-primary/5 border border-primary/10 px-4 py-2 rounded-lg">
          <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Logged in as</p>
          <p className="font-semibold text-primary">{userName}</p>
        </div>
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
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">My Participations</h2>
          <div className="grid gap-4">
              {myJoinedEvents.map((event) => (
                  <Card key={event.id} className="flex flex-col sm:flex-row items-start sm:items-center border-none shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex-1 p-4">
                          <div className="flex items-center gap-2 mb-1">
                             <h3 className="font-semibold">{event.name}</h3>
                             <Badge variant="secondary" className="text-[10px] h-4">{event.department}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{new Date(event.date).toLocaleDateString()} at {event.time}</p>
                          <p className="text-sm text-muted-foreground">{event.location}</p>
                      </div>
                      <div className="p-4 flex gap-2 w-full sm:w-auto">
                          <Button variant="outline" size="sm" className="flex-1 sm:flex-none" asChild>
                              <Link href={`/events/${event.id}`}>View Info</Link>
                          </Button>
                          
                          <Dialog>
                              <DialogTrigger asChild>
                                  <Button size="sm" className="bg-primary/10 text-primary hover:bg-primary/20 border-none flex-1 sm:flex-none gap-1.5">
                                      <Award className="h-4 w-4" />
                                      Certificate
                                  </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                  <div className="p-8 border-4 border-double border-primary/20 rounded-lg text-center space-y-6 relative overflow-hidden bg-white text-black">
                                      {/* Certificate Pattern */}
                                      <div className="absolute top-0 left-0 w-24 h-24 bg-primary/5 rounded-br-full -z-10" />
                                      <div className="absolute bottom-0 right-0 w-24 h-24 bg-primary/5 rounded-tl-full -z-10" />
                                      
                                      <div className="space-y-2">
                                          <h2 className="text-4xl font-serif text-primary">Certificate of Participation</h2>
                                          <p className="text-sm uppercase tracking-widest text-muted-foreground">Inter-University Event Management System</p>
                                      </div>
                                      
                                      <div className="py-6 space-y-4">
                                          <p className="text-lg">This is to certify that</p>
                                          <p className="text-3xl font-bold border-b-2 border-primary/10 inline-block px-10 pb-1">{userName}</p>
                                          <p className="text-lg px-10">has successfully participated in the university event</p>
                                          <p className="text-2xl font-semibold text-primary">"{event.name}"</p>
                                          <p className="text-sm text-muted-foreground">organized by the {event.department} department</p>
                                      </div>
                                      
                                      <div className="pt-10 flex justify-between items-end">
                                          <div className="text-left">
                                              <div className="w-32 border-b border-black/30 h-10 mb-2"></div>
                                              <p className="text-xs font-bold uppercase">Registrar</p>
                                          </div>
                                          <div className="text-center">
                                              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-2 mx-auto">
                                                  <Award className="w-10 h-10 text-primary" />
                                              </div>
                                              <p className="text-[10px] text-muted-foreground">{new Date().toLocaleDateString()}</p>
                                          </div>
                                          <div className="text-right">
                                              <div className="w-32 border-b border-black/30 h-10 mb-2 italic text-xs flex items-center justify-center">Digital Seal</div>
                                              <p className="text-xs font-bold uppercase">Dept. Coordinator</p>
                                          </div>
                                      </div>
                                      <div className="pt-6">
                                          <Button size="sm" variant="ghost" className="text-[10px] uppercase tracking-tighter text-muted-foreground" onClick={() => window.print()}>
                                              Click here to save as PDF / Print
                                          </Button>
                                      </div>
                                  </div>
                              </DialogContent>
                          </Dialog>
                      </div>
                  </Card>
              ))}
          </div>
        </section>
      )}
    </div>
  )
}
