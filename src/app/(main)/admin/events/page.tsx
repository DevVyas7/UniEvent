'use client';

import { useState } from "react";
import { events, users } from "@/lib/placeholder-data";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  MoreHorizontal, 
  Search, 
  ArrowLeft, 
  Building2, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  Users,
  User,
  ShieldCheck,
  User as UserIcon
} from "lucide-react";
import Link from 'next/link';
import { useToast } from "@/hooks/use-toast";
import type { Event } from "@/lib/types";

export default function AdminEventsPage() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [allEvents, setAllEvents] = useState<Event[]>(events);
  const [viewingParticipantsEvent, setViewingParticipantsEvent] = useState<Event | null>(null);
  const [isParticipantsDialogOpen, setIsParticipantsDialogOpen] = useState(false);

  const filteredEvents = allEvents.filter(e => 
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusUpdate = (id: string, status: Event['status']) => {
    setAllEvents(prev => prev.map(e => e.id === id ? { ...e, status } : e));
    toast({
      title: "System Action Successful",
      description: `Event status globally updated to ${status}.`,
    });
  };

  const handleViewParticipants = (event: Event) => {
    setViewingParticipantsEvent(event);
    setTimeout(() => {
      setIsParticipantsDialogOpen(true);
    }, 100);
  };

  const handleDeleteEvent = (id: string) => {
    setAllEvents(prev => prev.filter(e => e.id !== id));
    toast({
      title: "Event Removed",
      description: "The event has been permanently removed from the university portal.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-8">
      <Button variant="ghost" asChild className="pl-0 text-muted-foreground hover:bg-transparent hover:text-primary">
        <Link href="/admin/dashboard">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Admin Dashboard
        </Link>
      </Button>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Global Event Oversight</h1>
          <p className="text-muted-foreground">Monitor and moderate activities across all university departments.</p>
        </div>
        <div className="bg-amber-50 text-amber-700 px-4 py-2 rounded-lg border border-amber-200 flex items-center gap-2 text-sm font-medium">
            <AlertTriangle className="h-4 w-4" />
            Super Admin Access: System-wide control active
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search by event or department..." 
          className="pl-9 h-11"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-card rounded-2xl shadow-lg border-none overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="font-bold py-5">Event Title</TableHead>
              <TableHead className="font-bold">Organizing Department</TableHead>
              <TableHead className="font-bold">Type</TableHead>
              <TableHead className="font-bold">Date</TableHead>
              <TableHead className="font-bold text-center">Status</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEvents.map((event) => (
              <TableRow key={event.id} className="hover:bg-muted/10 transition-colors border-b last:border-none">
                <TableCell className="py-4">
                  <div className="grid gap-0.5">
                    <span className="font-bold text-sm">{event.name}</span>
                    <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">{event.category}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-sm font-medium">{event.department}</span>
                  </div>
                </TableCell>
                <TableCell>
                   <Badge variant="outline" className="capitalize text-[10px] gap-1 px-2 border-muted-foreground/20">
                    {event.participationType === 'team' ? (
                      <Users className="h-3 w-3" />
                    ) : (
                      <User className="h-3 w-3" />
                    )}
                    {event.participationType}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">{new Date(event.date).toLocaleDateString()}</span>
                </TableCell>
                <TableCell className="text-center">
                  <Badge 
                    variant={event.status === 'completed' ? 'secondary' : event.status === 'cancelled' ? 'destructive' : 'default'}
                    className="capitalize border-none px-3"
                  >
                    {event.status || 'Active'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuItem onClick={() => handleViewParticipants(event)} className="gap-2">
                        <Users className="h-4 w-4" />
                        View Enrollment List
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusUpdate(event.id, 'completed')} className="gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        Force Mark Completed
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusUpdate(event.id, 'cancelled')} className="gap-2">
                        <XCircle className="h-4 w-4 text-amber-600" />
                        Cancel Event (Policy)
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDeleteEvent(event.id)} 
                        className="text-destructive focus:text-destructive focus:bg-destructive/10 gap-2"
                      >
                        <XCircle className="h-4 w-4" />
                        Delete Permanently
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {filteredEvents.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-20 text-muted-foreground italic">
                  No campus events found matching your oversight criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isParticipantsDialogOpen} onOpenChange={setIsParticipantsDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black">Global Participation Record</DialogTitle>
            <DialogDescription className="text-base">
              System Audit for: <span className="font-bold text-primary">{viewingParticipantsEvent?.name}</span>
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
                        <Users className="h-4 w-4 text-accent" />
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
              Close Audit View
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
