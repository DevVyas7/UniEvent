'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  Award, 
  CalendarDays, 
  ArrowRight, 
  CheckCircle2, 
  User as UserIcon,
  BookOpen
} from "lucide-react";
import { events, users } from "@/lib/placeholder-data";
import type { User } from "@/lib/types";

export default function DashboardPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const role = localStorage.getItem('userRole') || 'student';
    const foundUser = users.find(u => u.role === role) || users.find(u => u.role === 'student');
    if (foundUser) {
      setCurrentUser(foundUser);
    }
  }, []);

  const joinedEvents = events.slice(3, 5); 
  const totalParticipated = joinedEvents.length;
  const upcomingEventsCount = events.length - totalParticipated;

  if (!currentUser) return null;

  return (
    <div className="space-y-8 pb-10">
      <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-12 text-primary-foreground shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-md">
              <GraduationCap className="h-4 w-4" />
              <span>University Student Portal</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Welcome back, <span className="text-accent">{currentUser.name}</span>!
            </h1>
            <p className="max-w-xl text-lg opacity-90">
              Stay updated with your campus activities, track your departmental participations, and download your achievements.
            </p>
          </div>
          <div className="flex gap-4">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full font-bold shadow-lg">
              <Link href="/events">Explore Events</Link>
            </Button>
          </div>
        </div>
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Joined Events</CardTitle>
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black">{totalParticipated}</div>
            <p className="text-xs text-muted-foreground mt-1">Confirmed participations</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Achievements</CardTitle>
            <Award className="h-5 w-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black">{totalParticipated}</div>
            <p className="text-xs text-muted-foreground mt-1">Verified certificates</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Live Events</CardTitle>
            <CalendarDays className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black">{upcomingEventsCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Available to join today</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">GPA / Credits</CardTitle>
            <BookOpen className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black">N/A</div>
            <p className="text-xs text-muted-foreground mt-1">Workshop credits pending</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-1 border-none shadow-xl overflow-hidden">
          <CardHeader className="bg-muted/30 pb-8">
             <div className="flex flex-col items-center text-center space-y-4">
                <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center border-4 border-background shadow-md">
                   <UserIcon className="h-12 w-12 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{currentUser.name}</h3>
                  <Badge variant="outline" className="mt-2 bg-primary/5 text-primary border-primary/20">{currentUser.department || 'Academic Dept'}</Badge>
                </div>
             </div>
          </CardHeader>
          <CardContent className="pt-8 space-y-6">
            <div className="space-y-4">
               <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Student ID:</span>
                  <span className="font-bold">{currentUser.enrollmentNumber || 'TBD'}</span>
               </div>
               <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Semester:</span>
                  <span className="font-bold">Fall 2024</span>
               </div>
               <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Account Status:</span>
                  <span className="text-green-600 font-bold flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Active
                  </span>
               </div>
            </div>
            <Button variant="outline" className="w-full rounded-xl" asChild>
              <Link href="/profile">View Full Profile</Link>
            </Button>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Link href="/participations" className="block group">
              <Card className="border-none shadow-md bg-white hover:bg-muted/5 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center mb-2">
                    <Award className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-xl">My Certificates</CardTitle>
                  <CardDescription>Download and view your achievement records from joined events.</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-end">
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
                </CardContent>
              </Card>
            </Link>

            <Link href="/events" className="block group">
              <Card className="border-none shadow-md bg-white hover:bg-muted/5 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <CalendarDays className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Browse Events</CardTitle>
                  <CardDescription>Discover new workshops, seminars, and festivals organized across campus.</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-end">
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
                </CardContent>
              </Card>
            </Link>
          </div>

          <Card className="border-none shadow-md bg-gradient-to-r from-muted/30 to-background">
             <CardHeader>
                <CardTitle className="text-lg">Quick Academic Tip</CardTitle>
             </CardHeader>
             <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Did you know participating in inter-departmental workshops can earn you up to 5 additional academic credits? Join an event today to start building your professional portfolio.
                </p>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
