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
import { MoreHorizontal, PlusCircle, Users as UsersIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import type { Event, User } from "@/lib/types";

export default function ManagerDashboardPage() {
  const { toast } = useToast();
  const [managerEvents, setManagerEvents] = useState(
    events.filter(e => e.managerId === '2' || e.managerId === '5')
  );
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  const [viewingParticipantsEvent, setViewingParticipantsEvent] = useState<Event | null>(null);
  const [isParticipantsDialogOpen, setIsParticipantsDialogOpen] = useState(false);

  // Mock participants - in a real app, this would be a join table query
  const mockParticipants = users.filter(u => u.role === 'user').slice(0, 3);

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
      title: "Event Deleted",
      description: "The event has been removed from your list.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Events</h1>
          <p className="text-muted-foreground">Manage, edit, and create your events.</p>
        </div>
        <Button asChild>
          <Link href="/manager/events/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Event
          </Link>
        </Button>
      </div>

      <div className="bg-card rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
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
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.name}</TableCell>
                  <TableCell>{eventDate.toLocaleDateString()}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>{event.price > 0 ? `$${event.price.toFixed(2)}` : 'Free'}</TableCell>
                  <TableCell>
                    <Badge variant={isUpcoming ? "default" : "secondary"} className={isUpcoming ? "bg-green-600 hover:bg-green-700" : ""}>
                      {isUpcoming ? "Upcoming" : "Past"}
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
                          View Participants
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditClick(event)}>
                          Edit Event
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-destructive focus:text-destructive focus:bg-destructive/10"
                          onClick={() => handleDeleteEvent(event.id)}
                        >
                          Delete Event
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
            <DialogTitle>Edit Event</DialogTitle>
            <DialogDescription>
              Make changes to your event details here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          {editingEvent && (
            <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
              <div className="grid gap-2">
                <Label htmlFor="name">Event Name</Label>
                <Input
                  id="name"
                  value={editingEvent.name}
                  onChange={(e) => setEditingEvent({ ...editingEvent, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editingEvent.description}
                  onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                  rows={4}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={editingEvent.location}
                  onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })}
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
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={editingEvent.price}
                    onChange={(e) => setEditingEvent({ ...editingEvent, price: parseFloat(e.target.value) || 0 })}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="border-t pt-4">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateEvent} className="bg-accent text-accent-foreground hover:bg-accent/90">Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Participants Dialog */}
      <Dialog open={isParticipantsDialogOpen} onOpenChange={setIsParticipantsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Participants List</DialogTitle>
            <DialogDescription>
              Users currently registered for {viewingParticipantsEvent?.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="bg-muted/50 rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockParticipants.map((participant) => (
                    <TableRow key={participant.id}>
                      <TableCell className="font-medium">{participant.name}</TableCell>
                      <TableCell>{participant.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">Confirmed</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                  {mockParticipants.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                        No participants registered yet.
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
