'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Sparkles, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateEventDescription } from "@/ai/flows/generate-event-description";

export default function NewEventPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    time: '',
    location: '',
    price: '',
    category: '',
    image: '',
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
        eventType: formData.category || "General Event",
        targetAudience: "General Public",
        keyFeatures: "Live entertainment, Networking, Great vibes",
      });
      setFormData(prev => ({ ...prev, description: result.description }));
      toast({
        title: "Magic happened!",
        description: "AI has generated a description for your event.",
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
      description: "Your event is now live on EventVerse.",
    });
    router.push('/manager/dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto">
        <Card>
            <CardHeader>
                <CardTitle>Create a New Event</CardTitle>
                <CardDescription>Fill out the details below to publish your event on EventVerse.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="eventName">Event Name</Label>
                    <Input 
                      id="eventName" 
                      placeholder="e.g., Summer Music Fest" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="description">Description</Label>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-primary gap-1.5"
                        onClick={handleAiGenerateDescription}
                        disabled={isGenerating}
                      >
                        {isGenerating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
                        AI Generate
                      </Button>
                    </div>
                    <Textarea 
                      id="description" 
                      placeholder="Tell attendees about your event." 
                      rows={5}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>
                
                <div className="space-y-2">
                    <Label htmlFor="image">Event Header Image URL</Label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="image" 
                          placeholder="https://images.unsplash.com/..." 
                          className="pl-10"
                          value={formData.image}
                          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        />
                      </div>
                      <Button variant="outline" onClick={() => setFormData({...formData, image: 'https://picsum.photos/seed/' + Math.random() + '/800/600'})}>
                        Randomize
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">Provide a direct link to an image (e.g., from Unsplash or Picsum).</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Input 
                          id="date" 
                          type="date" 
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="time">Time</Label>
                        <Input 
                          id="time" 
                          type="text" 
                          placeholder="e.g., 6:00 PM"
                          value={formData.time}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location" 
                      placeholder="e.g., Central City Park" 
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="price">Ticket Price</Label>
                         <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">$</span>
                            <Input 
                              id="price" 
                              type="number" 
                              placeholder="25.00" 
                              className="pl-7" 
                              value={formData.price}
                              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            />
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select onValueChange={(v) => setFormData({ ...formData, category: v })}>
                            <SelectTrigger id="category">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Music">Music</SelectItem>
                                <SelectItem value="Tech">Tech</SelectItem>
                                <SelectItem value="Workshop">Workshop</SelectItem>
                                <SelectItem value="Community">Community</SelectItem>
                                <SelectItem value="Sports">Sports</SelectItem>
                                <SelectItem value="Webinar">Webinar</SelectItem>
                                <SelectItem value="Art">Art</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                 <div className="flex justify-end gap-4 border-t pt-6">
                    <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
                    <Button className="bg-accent text-accent-foreground hover:bg-accent/90" onClick={handlePublish}>Publish Event</Button>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
