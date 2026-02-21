'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { events, users } from "@/lib/placeholder-data";
import { 
  MoreHorizontal, 
  PlusCircle, 
  Users as UsersIcon, 
  Building2, 
  CalendarDays, 
  GraduationCap, 
  TrendingUp,
  Briefcase,
  ArrowLeft
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import type { Event, User } from "@/lib/types";

export default function OrganizerDashboardPage() {
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [managerEvents, setManagerEvents] = useState<Event[]>([]);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [viewingParticipantsEvent, setViewingParticipantsEvent] = useState<Event | null>(null);
  const [isParticipantsDialogOpen, setIsParticipantsDialogOpen] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem('userRole') || 'organizer';
    const user = users.find(u => u.role === role) || users.find(u => u.role === 'organizer');
    if (user) {
      setCurrentUser(user);
      // Filter events by the organizer's department for a realistic feel
      const deptEvents = events.filter(e => e.department === user.department);
      setManagerEvents(deptEvents.length > 0 ? deptEvents : events.filter(e => e.organizerId === '2'));
    }
  }, []);

  const totalParticipants = managerEvents.length * 12; // Mock scaling logic for total joined students
  const totalCreditsIssued = managerEvents.filter(e => e.isCredit).length * 1.0;

  const handleEditClick = (event: Event) => {
    setEditingEvent({ ...event });
    setIsEditDialogOpen(true);
  };

  const handleViewParticipants = (event: Event) => {
    setViewingParticipantsEvent(event);
    setIsParticipantsDialogOpen(true);
  };

  const handleUpdateEvent = () => {
    if (!editingEvent) return;
    setManagerEvents(prev => prev.map(e => (e.id === editingEvent.id ? editingEvent : e)));
    setIsEditDialogOpen(false);
    toast({
      title: "Event Updated",
      description: `${editingEvent.name} has been successfully updated.`,
    });
  };

  const handleDeleteEvent = (id: string) => {
    setManagerEvents(prev => prev.filter(e => e.id !== id));
    toast({
      title: "Event Removed",
      description: "The event has been deleted from the portal.",
      variant: "destructive",
    });
  };

  if (!currentUser) return null;

  return (
    <div className="space-y-8 pb-10">
      <Button variant="ghost" asChild className="pl-0 text-muted-foreground hover:bg-transparent hover:text-primary">
        <Link href="/dashboard">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Student Portal
        </Link>
      </Button>

      {/* Department Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-8 py-10 text-white shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <Briefcase className="h-3.5 w-3.5 text-accent" />
              <span>Department Head Portal</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              {currentUser.department} <span className="text-accent">Management</span>
            </h1>
            <p className="max-w-xl text-sm opacity-80">
              Overseeing student engagement, event planning, and academic credit verification for the department.
            </p>
          </div>
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full font-bold shadow-lg">
            <Link href="/manager/events/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Event
            </Link>
          </Button>
        </div>
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-none shadow-md bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Departmental Events</CardTitle>
            <CalendarDays className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black">{managerEvents.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Live and upcoming activities</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Total Students Joined</CardTitle>
            <UsersIcon className="h-5 w-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black">+{totalParticipants}</div>
            <p className="text-xs text-muted-foreground mt-1">Cumulative student participation</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Student Credits Issued</CardTitle>
            <GraduationCap className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black">{totalCreditsIssued.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground mt-1">Academic credits verified to date</p>
          </CardContent>
        </Card>
      </div>

      {/* Event Management Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">Active Event Catalog</h2>
            <p className="text-sm text-muted-foreground">Manage activities and view real-time student enrollment progress.</p>
          </div>
          <div className="flex items-center gap-2">
             <TrendingUp className="h-4 w-4 text-green-500" />
             <span className="text-xs font-bold text-green-600 uppercase tracking-tighter">Engagement +12% this month</span>
          </div>
        </div>

        <div className="bg-card rounded-2xl border-none shadow-lg overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="font-bold py-5">Event Details</TableHead>
                <TableHead className="font-bold">Date & Time</TableHead>
                <TableHead className="font-bold">Location</TableHead>
                <TableHead className="font-bold text-center">Engagement</TableHead>
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {managerEvents.map((event) => {
                const eventDate = new Date(event.date);
                const isUpcoming = eventDate > new Date();
                return (
                  <TableRow key={event.id} className="hover:bg-muted/10 transition-colors border-b last:border-none">
                    <TableCell className="py-4">
                      <div className="grid gap-1">
                        <span className="font-bold text-sm leading-none">{event.name}</span>
                        <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">{event.category} • {event.isCredit ? 'Credit' : 'Non-Credit'}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="grid gap-0.5">
                        <span className="text-sm font-medium">{eventDate.toLocaleDateString()}</span>
                        <span className="text-xs text-muted-foreground">{event.time}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium">{event.location}</span>
                    </TableCell>
                    <TableCell className="text-center">
                       <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 text-[10px]">
                        12 Joined
                       </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={isUpcoming ? "default" : "secondary"} className={isUpcoming ? "bg-green-500 hover:bg-green-600 border-none" : "border-none"}>
                        {isUpcoming ? "Active" : "Archived"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem onClick={() => handleViewParticipants(event)} className="gap-2">
                            <UsersIcon className="h-4 w-4" />
                            Enrollment List
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditClick(event)} className="gap-2">
                            <CalendarDays className="h-4 w-4" />
                            Edit Details
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive focus:text-destructive focus:bg-destructive/10 gap-2"
                            onClick={() => handleDeleteEvent(event.id)}
                          >
                            Cancel Event
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
              {managerEvents.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-20 text-muted-foreground italic">
                    No departmental events found. Start by creating a new activity for your students.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Edit Event Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Update Event Details</DialogTitle>
            <DialogDescription>
              Modify information for this departmental event.
            </DialogDescription>
          </DialogHeader>
          {editingEvent && (
            <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
              <div className="grid gap-2">
                <Label htmlFor="name">Event Title</Label>
                <Input
                  id="name"
                  value={editingEvent.name}
                  onChange={(e) => setEditingEvent({ ...editingEvent, name: e.target.value })}
                  className="h-11"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Detailed Description</Label>
                <Textarea
                  id="description"
                  value={editingEvent.description}
                  onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                  rows={4}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Campus Location</Label>
                <Input
                  id="location"
                  value={editingEvent.location}
                  onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })}
                  className="h-11"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={editingEvent.date}
                    onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                    className="h-11"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                   <Input
                    id="category"
                    value={editingEvent.category}
                    onChange={(e) => setEditingEvent({ ...editingEvent, category: e.target.value })}
                    className="h-11"
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="border-t pt-4">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateEvent} className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold">Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Participants Enrollment Dialog */}
      <Dialog open={isParticipantsDialogOpen} onOpenChange={setIsParticipantsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Student Enrollment Progress</DialogTitle>
            <DialogDescription>
              Viewing students enrolled in: <span className="font-bold text-primary">{viewingParticipantsEvent?.name}</span>
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="bg-muted/30 rounded-xl border border-muted overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Home Department</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.filter(u => u.role === 'student').slice(0, 4).map((participant) => (
                    <TableRow key={participant.id} className="border-b last:border-none">
                      <TableCell className="font-semibold py-4">{participant.name}</TableCell>
                      <TableCell className="text-xs font-mono">{participant.enrollmentNumber || 'UNI-9921'}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5">{participant.department || 'Academic'}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          <DialogFooter className="border-t pt-4">
            <Button onClick={() => setIsParticipantsDialogOpen(false)} className="rounded-full px-8">Close Enrollment View</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
