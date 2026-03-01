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
  CheckCircle2,
  XCircle,
  User as UserIcon,
  ShieldCheck
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
      const deptEvents = events.filter(e => e.department === user.department);
      setManagerEvents(deptEvents.length > 0 ? deptEvents : events.filter(e => e.organizerId === '2'));
    }
  }, []);

  const totalParticipants = managerEvents.length * 12; 
  const upcomingEventsCount = managerEvents.filter(e => {
    const eventDate = new Date(e.date);
    return eventDate > new Date() && e.status !== 'completed';
  }).length;

  const handleEditClick = (event: Event) => {
    setEditingEvent({ ...event });
    setTimeout(() => {
      setIsEditDialogOpen(true);
    }, 100);
  };

  const handleViewParticipants = (event: Event) => {
    setViewingParticipantsEvent(event);
    setTimeout(() => {
      setIsParticipantsDialogOpen(true);
    }, 100);
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

  const handleStatusChange = (id: string, newStatus: Event['status']) => {
    setManagerEvents(prev => prev.map(e => e.id === id ? { ...e, status: newStatus } : e));
    toast({
      title: "Status Updated",
      description: `Event has been marked as ${newStatus}.`,
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

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-none shadow-md bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Upcoming Events</CardTitle>
            <CalendarDays className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black">{upcomingEventsCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Live activities scheduled</p>
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
            <CardTitle className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Total Events Hosted</CardTitle>
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black">{managerEvents.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Total activities created</p>
          </CardContent>
        </Card>
      </div>

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
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">{event.category} • {event.isCredit ? 'Credit' : 'Non-Credit'}</span>
                          <Badge variant="outline" className="text-[8px] h-3.5 px-1.5 uppercase font-black tracking-tighter border-muted-foreground/20">
                            {event.participationType}
                          </Badge>
                        </div>
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
                        {event.participationType === 'team' ? '4 Teams' : '12 Students'}
                       </Badge>
                    </TableCell>
                    <TableCell>
                      {event.status === 'completed' ? (
                        <Badge className="bg-blue-500 hover:bg-blue-600 border-none">Completed</Badge>
                      ) : event.status === 'cancelled' ? (
                        <Badge variant="destructive" className="border-none">Cancelled</Badge>
                      ) : (
                        <Badge variant={isUpcoming ? "default" : "secondary"} className={isUpcoming ? "bg-green-500 hover:bg-green-600 border-none" : "border-none"}>
                          {isUpcoming ? "Active" : "Archived"}
                        </Badge>
                      )}
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
                          <DropdownMenuItem 
                            onSelect={() => handleViewParticipants(event)} 
                            className="gap-2"
                          >
                            <UsersIcon className="h-4 w-4" />
                            Enrollment List
                          </DropdownMenuItem>
                          {event.status !== 'completed' && (
                            <DropdownMenuItem 
                              onSelect={() => handleStatusChange(event.id, 'completed')} 
                              className="gap-2 text-primary font-bold"
                            >
                              <CheckCircle2 className="h-4 w-4" />
                              Mark as Completed
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem 
                            onSelect={() => handleEditClick(event)} 
                            className="gap-2"
                          >
                            <CalendarDays className="h-4 w-4" />
                            Edit Details
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive focus:text-destructive focus:bg-destructive/10 gap-2"
                            onSelect={() => handleDeleteEvent(event.id)}
                          >
                            <XCircle className="h-4 w-4" />
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

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Update Event Details</DialogTitle>
            <DialogDescription>
              Modify information for this departmental event.
            </DialogDescription>
          </DialogHeader>
          {editingEvent && (
            <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
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

      <Dialog open={isParticipantsDialogOpen} onOpenChange={setIsParticipantsDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black">Student Enrollment Progress</DialogTitle>
            <DialogDescription className="text-base">
              Viewing participation records for: <span className="font-bold text-primary">{viewingParticipantsEvent?.name}</span>
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-6">
            {viewingParticipantsEvent?.participationType === 'team' ? (
              <div className="space-y-8">
                {[
                  { name: "Team Alpha", members: users.filter(u => u.role === 'student').slice(0, 3) },
                  { name: "Code Warriors", members: users.filter(u => u.role === 'student').slice(1, 4) }
                ].map((team, idx) => (
                  <div key={idx} className="space-y-3">
                    <div className="flex items-center gap-2 px-1">
                      <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center">
                        <UsersIcon className="h-4 w-4 text-accent" />
                      </div>
                      <h3 className="font-bold text-lg">{team.name}</h3>
                      <Badge variant="outline" className="text-[10px] ml-auto uppercase">{team.members.length} Members</Badge>
                    </div>
                    <div className="bg-muted/30 rounded-2xl border border-muted overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow className="hover:bg-transparent">
                            <TableHead className="font-bold">Member Name</TableHead>
                            <TableHead className="font-bold">Roll Number</TableHead>
                            <TableHead className="font-bold">Department</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {team.members.map((member, mIdx) => (
                            <TableRow key={mIdx} className="hover:bg-muted/50 transition-colors">
                              <TableCell className="font-semibold py-4">
                                <div className="flex items-center gap-2">
                                  {mIdx === 0 && <ShieldCheck className="h-3.5 w-3.5 text-accent" />}
                                  {member.name}
                                </div>
                              </TableCell>
                              <TableCell className="text-xs font-mono">{member.enrollmentNumber || `UNI-${1000 + mIdx}`}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className="text-[10px] font-medium bg-background">{member.department || 'Academic'}</Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-muted/30 rounded-2xl border border-muted overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="font-bold py-4 pl-6">Student Identity</TableHead>
                      <TableHead className="font-bold">Student ID</TableHead>
                      <TableHead className="font-bold pr-6">Home Department</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.filter(u => u.role === 'student').map((participant) => (
                      <TableRow key={participant.id} className="hover:bg-muted/50 transition-colors border-b last:border-none">
                        <TableCell className="font-semibold py-5 pl-6">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <UserIcon className="h-4 w-4 text-primary" />
                            </div>
                            {participant.name}
                          </div>
                        </TableCell>
                        <TableCell className="text-xs font-mono">{participant.enrollmentNumber || 'UNI-9921'}</TableCell>
                        <TableCell className="pr-6">
                          <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5">{participant.department || 'Academic'}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
          
          <DialogFooter className="border-t pt-6">
            <Button onClick={() => setIsParticipantsDialogOpen(false)} className="rounded-full px-8 h-11 font-bold">
              Close Enrollment View
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
