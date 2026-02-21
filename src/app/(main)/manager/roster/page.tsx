'use client';

import { useState, useEffect, useMemo } from "react";
import { users, events } from "@/lib/placeholder-data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, User as UserIcon, Building2, Calendar } from "lucide-react";

export default function StudentRosterPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [department, setDepartment] = useState("");

  useEffect(() => {
    const role = localStorage.getItem('userRole') || 'organizer';
    const user = users.find(u => u.role === role) || users.find(u => u.role === 'organizer');
    if (user) {
        setDepartment(user.department || "Academic");
    }
  }, []);

  // Generate a mock list of participations based on departmental events
  const rosterData = useMemo(() => {
    if (!department) return [];

    const students = users.filter(u => u.role === 'student');
    const deptEvents = events.filter(e => e.department === department);

    // Create a flat list where each entry is a Student + Event pair
    return deptEvents.flatMap(event => {
      // Deterministically pick 2-3 unique students for each event for demo consistency
      const eventIdNum = parseInt(event.id);
      // Ensure we don't pick more students than exist in our placeholder data
      const studentCount = Math.min((eventIdNum % 2) + 1, students.length); 
      const startIdx = eventIdNum % students.length;
      
      const participants = [];
      for (let i = 0; i < studentCount; i++) {
        // Use an offset to pick different students but keep it deterministic
        const studentIndex = (startIdx + i) % students.length;
        const student = students[studentIndex];
        
        participants.push({
          ...student,
          eventName: event.name,
          eventDate: event.date,
          participationId: `${student.id}-${event.id}`
        });
      }
      return participants;
    });
  }, [department, department]);

  const filteredRoster = rosterData.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.enrollmentNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.eventName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Student Roster</h1>
        <p className="text-muted-foreground">View students and the specific events they've joined in the {department} department.</p>
      </div>

      <div className="flex items-center gap-4 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search name, ID, or event..." 
            className="pl-9 h-11"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-card rounded-2xl border-none shadow-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="py-5 font-bold">Student Name</TableHead>
              <TableHead className="font-bold">Participated Event</TableHead>
              <TableHead className="font-bold">Student ID</TableHead>
              <TableHead className="font-bold">Home Department</TableHead>
              <TableHead className="font-bold text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRoster.map((entry) => (
              <TableRow key={entry.participationId} className="hover:bg-muted/10 transition-colors border-b last:border-none">
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                      <UserIcon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="grid gap-0.5">
                      <span className="font-bold text-sm">{entry.name}</span>
                      <span className="text-[10px] text-muted-foreground uppercase">{entry.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="grid gap-1">
                    <span className="text-sm font-semibold text-primary">{entry.eventName}</span>
                    <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {new Date(entry.eventDate).toLocaleDateString()}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm font-mono">{entry.enrollmentNumber}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-sm font-medium">{entry.department}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-[10px]">
                    Verified Join
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
            {filteredRoster.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-20 text-muted-foreground italic">
                  No participation records found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
