'use client';

import { useState, useEffect } from "react";
import { users } from "@/lib/placeholder-data";
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
import { Search, User as UserIcon, GraduationCap, Building2 } from "lucide-react";
import type { User } from "@/lib/types";

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

  const students = users.filter(u => u.role === 'student');
  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.enrollmentNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Student Roster</h1>
        <p className="text-muted-foreground">View all students registered for events in the {department} department.</p>
      </div>

      <div className="flex items-center gap-4 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by name or student ID..." 
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
              <TableHead className="font-bold">Student ID</TableHead>
              <TableHead className="font-bold">Home Department</TableHead>
              <TableHead className="font-bold text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id} className="hover:bg-muted/10 transition-colors border-b last:border-none">
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                      <UserIcon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="grid gap-0.5">
                      <span className="font-bold text-sm">{student.name}</span>
                      <span className="text-[10px] text-muted-foreground uppercase">{student.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm font-mono">{student.enrollmentNumber}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-sm font-medium">{student.department}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-[10px]">
                    Verified Student
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
            {filteredStudents.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-20 text-muted-foreground italic">
                  No students found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
