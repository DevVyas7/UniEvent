'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { events } from "@/lib/placeholder-data";
import { Search, MapPin, Calendar as CalendarIcon, CheckCircle2, GraduationCap, ArrowLeft, Plus, Clock, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export default function EventsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    const role = localStorage.getItem('userRole');
    if (role === 'organizer') {
      router.push('/manager/dashboard');
    }
  }, [router]);

  // Mock joined events are IDs 4 and 5
  const joinedEventIds = ['4', '5'];

  const handleJoinEvent = (eventName: string, participationType: string) => {
    if (participationType === 'team') {
      router.push(`/events/${events.find(e => e.name === eventName)?.id}`);
      return;
    }
    toast({
      title: "Participation Confirmed!",
      description: `You have successfully joined ${eventName}. It has been added to your academic record.`,
    });
  };

  const filteredEvents = events.filter(e => 
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <Button variant="ghost" asChild className="pl-0 text-muted-foreground hover:bg-transparent hover:text-primary transition-colors">
        <Link href="/dashboard">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
      </Button>

      <div className="space-y-2">
        <h1 className="text-4xl font-black tracking-tight">Campus Events</h1>
        <p className="text-muted-foreground text-lg">Discovery academic activities, workshops, and team challenges across all departments.</p>
      </div>

      <div className="relative max-w-xl">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input 
          placeholder="Search by name, department, or keyword..." 
          className="pl-10 h-12 rounded-2xl shadow-sm border-muted-foreground/10 focus:ring-primary/20" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredEvents.map((event) => {
          const isJoined = joinedEventIds.includes(event.id);
          const isCompleted = event.status === 'completed';
          const isTeam = event.participationType === 'team';
          
          return (
            <Card key={event.id} className="flex flex-col h-full border-none shadow-lg hover:shadow-2xl transition-all duration-300 rounded-3xl overflow-hidden bg-card">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex flex-col gap-1.5">
                    <Badge variant="secondary" className="bg-primary/5 text-primary border-none w-fit font-bold">{event.department}</Badge>
                    <div className="flex flex-wrap gap-1">
                      {event.isCredit && (
                        <Badge variant="outline" className="text-[9px] h-4 bg-green-50 text-green-700 border-green-200 uppercase font-black">
                          Credit
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-[9px] h-4 bg-muted text-muted-foreground border-none uppercase font-black flex gap-1">
                        {isTeam ? <Users className="w-2.5 h-2.5" /> : <Plus className="w-2.5 h-2.5" />}
                        {isTeam ? 'Team' : 'Indiv'}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {isJoined && (
                      <Badge className="bg-green-500/10 text-green-600 border-none flex gap-1 items-center px-2 py-0.5 text-[10px] font-bold">
                        <CheckCircle2 className="w-3 h-3" />
                        Joined
                      </Badge>
                    )}
                    {isCompleted && (
                      <Badge className="bg-blue-500/10 text-blue-600 border-none flex gap-1 items-center px-2 py-0.5 text-[10px] font-bold">
                        <Clock className="w-3 h-3" />
                        Done
                      </Badge>
                    )}
                  </div>
                </div>
                <CardTitle className="text-xl font-bold line-clamp-2 leading-tight h-14">{event.name}</CardTitle>
                <CardDescription className="flex items-center gap-1.5 text-xs text-muted-foreground mt-2 font-medium">
                  <CalendarIcon className="h-3.5 w-3.5" />
                  {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 pb-4">
                <div className="flex items-start gap-2 text-sm text-muted-foreground bg-muted/20 p-3 rounded-2xl">
                  <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                  <p className="line-clamp-2 text-xs font-semibold">{event.location}</p>
                </div>
              </CardContent>
              <CardFooter className="pt-4 flex justify-between items-center gap-2 border-t mt-auto px-6">
                <Button asChild size="sm" variant="ghost" className="h-9 text-xs font-bold text-primary hover:bg-primary/5">
                  <Link href={`/events/${event.id}`}>Details</Link>
                </Button>
                {isCompleted ? (
                  <Button size="sm" variant="outline" disabled className="h-9 gap-1 px-5 opacity-40 rounded-full text-xs font-bold">
                    Finished
                  </Button>
                ) : !isJoined ? (
                  <Button 
                    size="sm" 
                    onClick={() => handleJoinEvent(event.name, event.participationType)}
                    className="h-9 bg-accent text-accent-foreground hover:bg-accent/90 gap-1.5 px-5 rounded-full text-xs font-black shadow-lg shadow-accent/20"
                  >
                    {isTeam ? <Users className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    Join
                  </Button>
                ) : (
                  <Button size="sm" variant="outline" disabled className="h-9 gap-1.5 px-5 opacity-50 rounded-full text-xs font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Joined
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
        {filteredEvents.length === 0 && (
          <div className="col-span-full py-20 text-center space-y-4 bg-muted/20 rounded-3xl border-2 border-dashed border-muted">
            <Search className="h-12 w-12 text-muted-foreground/30 mx-auto" />
            <p className="text-muted-foreground font-medium">No events found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
