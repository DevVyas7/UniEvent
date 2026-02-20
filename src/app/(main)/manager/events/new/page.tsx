'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Loader2, Sparkles, GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateEventDescription } from "@/ai/flows/generate-event-description";
import { Badge } from "@/components/ui/badge";

export default function NewDepartmentEventPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    time: '',
    location: '',
    department: '',
    category: '',
    isCredit: false,
  });

  const handleAiGenerateDescription = async () => {
    if (!formData.name) {
      toast({
        title: "Missing Info",
        description: "Please enter an event name first so the AI has context.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateEventDescription({
        eventName: formData.name,
        eventDate: formData.date || "TBD",
        eventTime: formData.time || "TBD",
        eventLocation: formData.location || "TBD",
        eventType: formData.category || "University Event",
        targetAudience: "University Students",
        keyFeatures: formData.isCredit ? "Academic growth, Networking, Knowledge sharing, ECTS Credits" : "Academic growth, Networking, Knowledge sharing",
        additionalNotes: `Organized by the ${formData.department || 'Academic'} department. ${formData.isCredit ? 'This is a credit-bearing event.' : ''}`
      });
      setFormData(prev => ({ ...prev, description: result.description }));
      toast({
        title: "AI Help Received",
        description: "Academic description generated successfully.",
      });
    } catch (error) {
      toast({
        title: "AI Failed",
        description: "Could not generate description at this time.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePublish = () => {
    toast({
      title: "Event Published!",
      description: "Your departmental event is now live for all students.",
    });
    router.push('/manager/dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto">
        <Card className="border-none shadow-xl">
            <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                    <GraduationCap className="w-6 h-6 text-primary" />
                    <CardTitle>Create Departmental Event</CardTitle>
                </div>
                <CardDescription>All university events are free for participants. Fill in the details to invite students.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                      <Label htmlFor="eventName">Event Title</Label>
                      <Input 
                        id="eventName" 
                        placeholder="e.g., Computer Science Hackathon" 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                  </div>
                  <div className="space-y-2">
                      <Label>Credit Type</Label>
                      <div className="flex items-center space-x-4 h-10 px-3 border rounded-md bg-muted/5">
                        <Switch 
                          id="isCredit" 
                          checked={formData.isCredit}
                          onCheckedChange={(v) => setFormData({ ...formData, isCredit: v })}
                        />
                        <Label htmlFor="isCredit" className="flex items-center gap-2 cursor-pointer font-bold">
                          {formData.isCredit ? (
                            <>
                              <GraduationCap className="w-4 h-4 text-primary" />
                              Academic Credit
                            </>
                          ) : (
                            <span className="text-muted-foreground font-normal">Non-Credit Event</span>
                          )}
                        </Label>
                      </div>
                  </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="description">Detailed Description</Label>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-primary gap-1.5 hover:bg-primary/10"
                        onClick={handleAiGenerateDescription}
                        disabled={isGenerating}
                      >
                        {isGenerating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
                        AI Write Description
                      </Button>
                    </div>
                    <Textarea 
                      id="description" 
                      placeholder="Outline the goals, prerequisites, and what students will gain." 
                      rows={6}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="date">Event Date</Label>
                        <Input 
                          id="date" 
                          type="date" 
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="time">Time Slot</Label>
                        <Input 
                          id="time" 
                          type="text" 
                          placeholder="e.g., 2:00 PM - 5:00 PM"
                          value={formData.time}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="location">Campus Location</Label>
                        <Input 
                          id="location" 
                          placeholder="e.g., Science Block B, Room 301" 
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="department">Organizing Department</Label>
                        <Input 
                          id="department" 
                          placeholder="e.g., Computer Science" 
                          value={formData.department}
                          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        />
                    </div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select onValueChange={(v) => setFormData({ ...formData, category: v })}>
                            <SelectTrigger id="category">
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Tech">Technical</SelectItem>
                                <SelectItem value="Workshop">Workshop</SelectItem>
                                <SelectItem value="Seminar">Seminar</SelectItem>
                                <SelectItem value="Cultural">Cultural</SelectItem>
                                <SelectItem value="Sports">Sports</SelectItem>
                                <SelectItem value="Social">Social Event</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                 <div className="flex justify-end gap-4 border-t pt-6">
                    <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={handlePublish}>Publish to Students</Button>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
