'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { events } from "@/lib/placeholder-data";
import { Search, MapPin, Calendar as CalendarIcon, CheckCircle2, GraduationCap, ArrowLeft, Plus, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export default function EventsPage() {
  const router = useRouter();
  const { toast } = useToast();
  
  useEffect(() => {
    const role = localStorage.getItem('userRole');
    if (role === 'organizer') {
      router.push('/manager/dashboard');
    }
  }, [router]);

  // Mock joined events are IDs 4 and 5
  const joinedEventIds = ['4', '5'];

  const handleJoinEvent = (eventName: string) => {
    toast({
      title: "Participation Confirmed!",
      description: `You have successfully joined ${eventName}. It has been added to your academic record.`,
    });
  };

  return (
    <div className="space-y-8">
      <Button variant="ghost" asChild className="pl-0 text-muted-foreground hover:bg-transparent hover:text-primary">
        <Link href="/dashboard">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
      </Button>

      <div>
        <h1 className="text-3xl font-bold tracking-tight">University Events</h1>
        <p className="text-muted-foreground">Browse workshops, seminars, and cultural meets from all departments.</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input placeholder="Search by event name or department..." className="pl-10 w-full md:w-1/2 lg:w-1/3" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {events.map((event) => {
          const isJoined = joinedEventIds.includes(event.id);
          const isCompleted = event.status === 'completed';
          
          return (
            <Card key={event.id} className="flex flex-col h-full border-none shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex flex-col gap-1.5">
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-none w-fit">{event.department}</Badge>
                    {event.isCredit ? (
                      <Badge variant="outline" className="text-[10px] h-5 bg-green-50 text-green-700 border-green-200 uppercase tracking-tighter">
                        <GraduationCap className="w-3 h-3 mr-1" />
                        Academic Credit
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-[10px] h-5 bg-muted text-muted-foreground border-none uppercase tracking-tighter">
                        Non-Credit
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {isJoined && (
                      <Badge className="bg-green-500/10 text-green-600 border-none flex gap-1 items-center px-2">
                        <CheckCircle2 className="w-3 h-3" />
                        Joined
                      </Badge>
                    )}
                    {isCompleted && (
                      <Badge className="bg-blue-500/10 text-blue-600 border-none flex gap-1 items-center px-2">
                        <Clock className="w-3 h-3" />
                        Completed
                      </Badge>
                    )}
                  </div>
                </div>
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
              <CardFooter className="pt-2 flex justify-between items-center gap-2 border-t mt-auto">
                <Button asChild size="sm" variant="ghost" className="h-8 text-xs underline-offset-4 hover:underline">
                  <Link href={`/events/${event.id}`}>View Details</Link>
                </Button>
                {isCompleted ? (
                  <Button size="sm" variant="outline" disabled className="h-8 gap-1 px-4 opacity-50">
                    <Clock className="w-3.5 h-3.5" />
                    Completed
                  </Button>
                ) : !isJoined ? (
                  <Button 
                    size="sm" 
                    onClick={() => handleJoinEvent(event.name)}
                    className="h-8 bg-accent text-accent-foreground hover:bg-accent/90 gap-1 px-4"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Join Event
                  </Button>
                ) : (
                  <Button size="sm" variant="outline" disabled className="h-8 gap-1 px-4 opacity-50">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Joined
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
