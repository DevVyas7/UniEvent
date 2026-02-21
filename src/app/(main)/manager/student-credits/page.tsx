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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, GraduationCap, ArrowLeft, TrendingUp } from "lucide-react";
import Link from "next/link";
import type { User } from "@/lib/types";

export default function StudentCreditsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [department, setDepartment] = useState("");

  useEffect(() => {
    const role = localStorage.getItem('userRole') || 'organizer';
    const user = users.find(u => u.role === role) || users.find(u => u.role === 'organizer');
    if (user) {
      setDepartment(user.department || "Academic");
    }
  }, []);

  // Mock calculation of credits for students in the same department
  const studentCreditData = useMemo(() => {
    const studentsInDept = users.filter(u => u.role === 'student' && u.department === department);
    
    // We'll mock some credit values for the students
    // In a real app, this would be a sum of isCredit events from a participations table
    return studentsInDept.map(student => ({
      ...student,
      // Random but deterministic credits for demo (0.0 to 5.0)
      credits: (parseInt(student.id) % 5) + (parseInt(student.id) % 2 === 0 ? 0.5 : 0)
    }))
    // Sort by credits in ASCENDING order as requested
    .sort((a, b) => a.credits - b.credits);
  }, [department]);

  const filteredStudents = studentCreditData.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.enrollmentNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <Button variant="ghost" asChild className="pl-0 text-muted-foreground hover:bg-transparent hover:text-primary">
        <Link href="/manager/dashboard">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
      </Button>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Credit Rankings</h1>
          <p className="text-muted-foreground">Students in {department} sorted by earned academic credits (Ascending).</p>
        </div>
        <div className="flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full border border-accent/20">
          <TrendingUp className="h-4 w-4 text-accent" />
          <span className="text-sm font-bold text-accent uppercase tracking-tighter">Engagement Tracking active</span>
        </div>
      </div>

      <div className="flex items-center gap-4 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search student or ID..." 
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
              <TableHead className="font-bold text-center">Department</TableHead>
              <TableHead className="font-bold text-right pr-10">Total Credits</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id} className="hover:bg-muted/10 transition-colors border-b last:border-none">
                <TableCell className="py-4">
                  <div className="grid gap-0.5">
                    <span className="font-bold text-sm">{student.name}</span>
                    <span className="text-[10px] text-muted-foreground uppercase">{student.email}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm font-mono">{student.enrollmentNumber}</span>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 text-[10px]">
                    {student.department}
                  </Badge>
                </TableCell>
                <TableCell className="text-right pr-10">
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-lg font-black">{student.credits.toFixed(1)}</span>
                    <GraduationCap className="h-4 w-4 text-primary" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filteredStudents.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-20 text-muted-foreground italic">
                  No students found for this department.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="bg-muted/30 p-6 rounded-2xl border border-dashed text-center">
        <p className="text-sm text-muted-foreground italic">
          Tip: Sorting in ascending order helps you identify students who may need additional academic support or event invitations.
        </p>
      </div>
    </div>
  );
}
