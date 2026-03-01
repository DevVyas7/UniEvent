'use client';

import React, { useEffect, useState, use } from "react";
import { events } from "@/lib/placeholder-data";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ClockIcon, MapPinIcon, GraduationCap, ArrowLeft, Building2, CheckCircle2, Award, Clock, Users, Plus, Trash2, UserPlus, ShieldCheck } from "lucide-react";
import Link from "next/link";
import type { Event } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type TeamMember = {
  name: string;
  rollNumber: string;
  department: string;
};

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { toast } = useToast();
  const [userRole, setUserRole] = useState<'student' | 'organizer' | 'admin' | null>(null);
  const [event, setEvent] = useState<Event | null | undefined>(undefined);
  const [isTeamDialogOpen, setIsTeamDialogOpen] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [newMember, setNewMember] = useState<TeamMember>({ name: '', rollNumber: '', department: '' });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const role = localStorage.getItem('userRole') as any;
    setUserRole(role || 'student');
    const foundEvent = events.find((e) => e.id === id);
    setEvent(foundEvent);
  }, [id]);

  if (event === undefined) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-muted-foreground">Fetching details...</p>
        </div>
      </div>
    );
  }
  
  if (!event) {
    notFound();
  }

  const handleJoin = () => {
    if (event.participationType === 'team') {
      if (!teamName) {
        toast({
          title: "Missing Team Name",
          description: "Please provide a name for your team.",
          variant: "destructive",
        });
        return;
      }
      if (teamMembers.length === 0) {
        setIsTeamDialogOpen(true);
        return;
      }
    }

    toast({
      title: event.participationType === 'team' ? `Registration Confirmed: ${teamName}` : "Successfully Joined",
      description: `You ${event.participationType === 'team' ? 'and your team' : ''} have joined ${event.name}. See you there!`,
    });
    setIsTeamDialogOpen(false);
    // Reset form
    setTeamName('');
    setTeamMembers([]);
  };

  const addTeamMember = () => {
    if (!newMember.name || !newMember.rollNumber || !newMember.department) {
      toast({
        title: "Incomplete Details",
        description: "Please fill in all member information.",
        variant: "destructive",
      });
      return;
    }
    setTeamMembers([...teamMembers, newMember]);
    setNewMember({ name: '', rollNumber: '', department: '' });
  };

  const removeTeamMember = (index: number) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  const eventDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const isStudent = userRole === 'student' || !userRole;
  const isJoined = id === '4' || id === '5';
  const isCompleted = event.status === 'completed';

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Button variant="ghost" asChild className="pl-0 text-muted-foreground hover:bg-transparent hover:text-primary transition-colors">
        <Link href="/events">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Events
        </Link>
      </Button>

      <div className="bg-card rounded-3xl border-none shadow-2xl overflow-hidden p-6 md:p-10">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-primary/10 text-primary border-none px-4 py-1">{event.department}</Badge>
              <Badge variant="outline" className="px-4 py-1 gap-1.5 border-muted-foreground/20">
                {event.participationType === 'team' ? <Users className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                {event.participationType === 'team' ? 'Team Event' : 'Individual Event'}
              </Badge>
              {isCompleted && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-4 py-1">
                  <Clock className="w-4 h-4 mr-2" />
                  Completed
                </Badge>
              )}
              {event.isCredit && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-4 py-1">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Academic Credit (1.0)
                </Badge>
              )}
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">{event.name}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="w-4 h-4" />
                <span className="text-sm font-medium">Organized by {event.department} Department</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-12 pt-10 border-t border-muted">
            <div className="md:col-span-2 space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Event Overview</h2>
                <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-wrap">{event.description}</p>
              </div>

              {event.isCredit && (
                <div className="bg-primary/5 border border-primary/10 p-8 rounded-3xl space-y-4 shadow-sm">
                  <div className="flex items-center gap-3 text-primary font-bold text-xl">
                    <Award className="w-6 h-6" />
                    Academic Recognition
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Participation in this event provides verifiable institutional value. Upon completion, **1.0 academic credit** will be added to your departmental supplementary records.
                  </p>
                </div>
              )}
            </div>
            
            <div className="space-y-6 bg-muted/30 p-8 rounded-3xl h-fit border border-muted/50 shadow-inner">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-background p-2.5 rounded-xl shadow-sm border border-muted">
                    <CalendarIcon className="h-6 w-6 text-primary shrink-0" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Date</h3>
                    <p className="font-semibold text-base">{eventDate}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                   <div className="bg-background p-2.5 rounded-xl shadow-sm border border-muted">
                    <ClockIcon className="h-6 w-6 text-primary shrink-0" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Time Slot</h3>
                    <p className="font-semibold text-base">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                   <div className="bg-background p-2.5 rounded-xl shadow-sm border border-muted">
                    <MapPinIcon className="h-6 w-6 text-primary shrink-0" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Campus Location</h3>
                    <p className="font-semibold text-base">{event.location}</p>
                  </div>
                </div>
              </div>

              {isMounted && isStudent && (
                <div className="pt-8 border-t border-muted space-y-4">
                  {isJoined ? (
                    <div className="bg-primary/5 text-primary px-4 py-8 rounded-2xl text-center border border-primary/20 space-y-4">
                       <CheckCircle2 className="w-10 h-10 mx-auto" />
                       <div>
                        <p className="font-black text-sm uppercase tracking-widest">Registration Verified</p>
                        <p className="text-[10px] text-muted-foreground mt-2 font-medium">Your participation is recorded in the university central database.</p>
                       </div>
                       <Button variant="outline" size="sm" className="w-full text-[10px] uppercase font-bold tracking-widest rounded-full" asChild>
                          <Link href="/participations">View in My Participations</Link>
                       </Button>
                    </div>
                  ) : isCompleted ? (
                    <div className="bg-muted text-muted-foreground px-4 py-8 rounded-2xl text-center border border-muted space-y-3">
                       <Clock className="w-10 h-10 mx-auto opacity-30" />
                       <p className="font-bold text-sm uppercase tracking-widest">Event Concluded</p>
                       <p className="text-[10px] italic">Registration is closed for this activity.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {event.participationType === 'team' ? (
                        <Dialog open={isTeamDialogOpen} onOpenChange={setIsTeamDialogOpen}>
                          <DialogTrigger asChild>
                            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-3 h-14 text-lg font-black rounded-2xl shadow-xl shadow-primary/20">
                              <UserPlus className="h-5 w-5" />
                              Register Team
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                              <DialogTitle className="text-2xl font-bold">Team Registration</DialogTitle>
                              <DialogDescription>
                                Set your team identity and add members for <strong>{event.name}</strong>.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-6 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="teamName" className="text-xs font-bold uppercase tracking-widest text-primary">Team Name</Label>
                                <Input 
                                  id="teamName" 
                                  placeholder="e.g. The Coding Knights" 
                                  value={teamName}
                                  onChange={(e) => setTeamName(e.target.value)}
                                  className="h-11 border-primary/20 focus:border-primary shadow-sm"
                                />
                              </div>

                              <div className="grid gap-4 p-4 border rounded-2xl bg-muted/20">
                                <div className="flex items-center gap-2 mb-1">
                                  <UserPlus className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Add Team Member</span>
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="memberName" className="text-[10px] font-bold uppercase tracking-tight">Full Name</Label>
                                  <Input 
                                    id="memberName" 
                                    placeholder="e.g. John Doe" 
                                    value={newMember.name}
                                    onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                  <div className="grid gap-2">
                                    <Label htmlFor="roll" className="text-[10px] font-bold uppercase tracking-tight">Roll Number</Label>
                                    <Input 
                                      id="roll" 
                                      placeholder="UNI-123" 
                                      value={newMember.rollNumber}
                                      onChange={(e) => setNewMember({...newMember, rollNumber: e.target.value})}
                                    />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor="dept" className="text-[10px] font-bold uppercase tracking-tight">Department</Label>
                                    <Input 
                                      id="dept" 
                                      placeholder="CS, ME, etc." 
                                      value={newMember.department}
                                      onChange={(e) => setNewMember({...newMember, department: e.target.value})}
                                    />
                                  </div>
                                </div>
                                <Button onClick={addTeamMember} variant="secondary" className="w-full gap-2 font-bold">
                                  <Plus className="h-4 w-4" />
                                  Add to Roster
                                </Button>
                              </div>

                              <div className="space-y-3">
                                <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground px-1">Added Members ({teamMembers.length})</h4>
                                <div className="max-h-[200px] overflow-y-auto space-y-2 pr-2">
                                  {teamMembers.map((member, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 rounded-xl border bg-card">
                                      <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-primary/5 flex items-center justify-center">
                                          <ShieldCheck className="h-4 w-4 text-primary" />
                                        </div>
                                        <div className="grid gap-0.5">
                                          <p className="text-sm font-bold">{member.name}</p>
                                          <p className="text-[10px] text-muted-foreground uppercase">{member.rollNumber} • {member.department}</p>
                                        </div>
                                      </div>
                                      <Button variant="ghost" size="icon" onClick={() => removeTeamMember(i)} className="text-destructive hover:bg-destructive/10">
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  ))}
                                  {teamMembers.length === 0 && <p className="text-center py-6 text-sm text-muted-foreground italic border border-dashed rounded-xl">No team members added yet.</p>}
                                </div>
                              </div>
                            </div>
                            <DialogFooter className="pt-4 border-t">
                              <Button variant="outline" onClick={() => setIsTeamDialogOpen(false)}>Cancel</Button>
                              <Button 
                                onClick={handleJoin} 
                                disabled={!teamName || teamMembers.length === 0} 
                                className="bg-primary text-primary-foreground font-bold shadow-lg min-w-[140px]"
                              >
                                Confirm Registration
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      ) : (
                        <Button onClick={handleJoin} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 gap-3 h-14 text-lg font-black rounded-2xl shadow-xl shadow-accent/20">
                          <Plus className="h-5 w-5" />
                          Join Individual
                        </Button>
                      )}
                      <p className="text-[10px] text-center text-muted-foreground font-medium italic">Joining confirms your participation for institutional records.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
