'use client';

import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { events, users } from "@/lib/placeholder-data";
import { MoreHorizontal, PlusCircle, Users as UsersIcon, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import type { Event, User } from "@/lib/types";

export default function OrganizerDashboardPage() {
  const { toast } = useToast();
  const [managerEvents, setManagerEvents] = useState(
    events.filter(e => e.organizerId === '2' || e.organizerId === '5')
  );
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  const [viewingParticipantsEvent, setViewingParticipantsEvent] = useState<Event | null>(null);
  const [isParticipantsDialogOpen, setIsParticipantsDialogOpen] = useState(false);

  const mockParticipants = users.filter(u => u.role === 'student').slice(0, 3);

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

    setManagerEvents(prev =>
      prev.map(e => (e.id === editingEvent.id ? editingEvent : e))
    );

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

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Departmental Events</h1>
          <p className="text-muted-foreground">Manage and oversee the events organized by your department.</p>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90">
          <Link href="/manager/events/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Event
          </Link>
        </Button>
      </div>

      <div className="bg-card rounded-2xl border-none shadow-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="font-bold">Event Name</TableHead>
              <TableHead className="font-bold">Date</TableHead>
              <TableHead className="font-bold">Location</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {managerEvents.map((event) => {
              const eventDate = new Date(event.date);
              const isUpcoming = eventDate > new Date();
              return (
                <TableRow key={event.id} className="hover:bg-muted/20">
                  <TableCell className="font-semibold">{event.name}</TableCell>
                  <TableCell>{eventDate.toLocaleDateString()}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>
                    <Badge variant={isUpcoming ? "default" : "secondary"} className={isUpcoming ? "bg-green-500 hover:bg-green-600 border-none" : "border-none"}>
                      {isUpcoming ? "Live" : "Past"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewParticipants(event)}>
                          View Participant List
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditClick(event)}>
                          Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-destructive focus:text-destructive focus:bg-destructive/10"
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
          </TableBody>
        </Table>
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
                <Label htmlFor="location">Location / Lab / Hall</Label>
                <Input
                  id="location"
                  value={editingEvent.location}
                  onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Scheduled Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={editingEvent.date}
                    onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                   <Input
                    id="category"
                    value={editingEvent.category}
                    onChange={(e) => setEditingEvent({ ...editingEvent, category: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="border-t pt-4">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateEvent} className="bg-primary text-primary-foreground hover:bg-primary/90">Save Updates</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Participants Dialog */}
      <Dialog open={isParticipantsDialogOpen} onOpenChange={setIsParticipantsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Student Participant List</DialogTitle>
            <DialogDescription>
              Students who have joined {viewingParticipantsEvent?.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="bg-muted/30 rounded-xl border border-muted overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Student Email</TableHead>
                    <TableHead>Role</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockParticipants.map((participant) => (
                    <TableRow key={participant.id}>
                      <TableCell className="font-medium">{participant.name}</TableCell>
                      <TableCell>{participant.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 capitalize">Student</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                  {mockParticipants.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                        No students have joined yet.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
          <DialogFooter className="border-t pt-4">
            <Button onClick={() => setIsParticipantsDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
