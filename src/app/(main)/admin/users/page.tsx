'use client';

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { users } from "@/lib/placeholder-data";
import { 
  User as UserIcon, 
  ArrowLeft, 
  Mail, 
  Building2, 
  Fingerprint, 
  ShieldCheck,
  CircleUserRound
} from "lucide-react";
import Link from 'next/link';
import type { User } from "@/lib/types";

export default function AdminUsersPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleViewDetails = (user: User) => {
    setSelectedUser(user);
    setIsDetailsOpen(true);
  };

  return (
    <div className="space-y-8">
      <Button variant="ghost" asChild className="pl-0 text-muted-foreground hover:bg-transparent hover:text-primary">
        <Link href="/admin/dashboard">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Admin Dashboard
        </Link>
      </Button>

       <div>
        <h1 className="text-3xl font-bold tracking-tight">User Directory</h1>
        <p className="text-muted-foreground">View and audit all registered campus accounts.</p>
      </div>
      
      <div className="bg-card rounded-2xl shadow-lg border-none overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="font-bold py-5">User Identity</TableHead>
              <TableHead className="font-bold">System Role</TableHead>
              <TableHead className="text-right pr-6 font-bold">Audit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="hover:bg-muted/10 transition-colors border-b last:border-none">
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                      <UserIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="grid gap-0.5">
                      <p className="font-bold text-sm">{user.name}</p>
                      <p className="text-[10px] text-muted-foreground uppercase font-medium tracking-wider">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={user.role === 'admin' ? 'destructive' : user.role === 'organizer' ? 'default' : 'secondary'}
                    className="capitalize px-3 border-none font-semibold text-[10px]"
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell className="text-right pr-6">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 gap-2 rounded-full border-primary/20 hover:bg-primary/5 hover:text-primary font-bold text-xs px-4"
                    onClick={() => handleViewDetails(user)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[425px] overflow-hidden p-0 border-none shadow-2xl">
          {selectedUser && (
            <>
              <div className="bg-primary/5 p-8 flex flex-col items-center border-b border-primary/10">
                <div className="h-24 w-24 rounded-full bg-background flex items-center justify-center border-4 border-primary/20 shadow-inner mb-4">
                  <CircleUserRound className="h-14 w-14 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-center">{selectedUser.name}</h2>
                <Badge 
                  variant={selectedUser.role === 'admin' ? 'destructive' : selectedUser.role === 'organizer' ? 'default' : 'secondary'}
                  className="mt-2 px-4 py-1 uppercase tracking-widest text-[10px] font-black shadow-sm"
                >
                  {selectedUser.role}
                </Badge>
              </div>
              <div className="p-6 space-y-6">
                <DialogHeader className="sr-only">
                  <DialogTitle>User Profile: {selectedUser.name}</DialogTitle>
                  <DialogDescription>Full institutional record for the selected user.</DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4">
                  <div className="flex items-center gap-4 p-3 rounded-xl bg-muted/30 border border-muted transition-colors hover:bg-muted/50">
                    <div className="bg-background p-2 rounded-lg shadow-sm">
                      <Mail className="h-4 w-4 text-primary" />
                    </div>
                    <div className="grid gap-0.5">
                      <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-tighter">University Email</span>
                      <span className="text-sm font-medium">{selectedUser.email}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 rounded-xl bg-muted/30 border border-muted transition-colors hover:bg-muted/50">
                    <div className="bg-background p-2 rounded-lg shadow-sm">
                      <Building2 className="h-4 w-4 text-primary" />
                    </div>
                    <div className="grid gap-0.5">
                      <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-tighter">Academic Department</span>
                      <span className="text-sm font-medium">{selectedUser.department || "General Administration"}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 rounded-xl bg-muted/30 border border-muted transition-colors hover:bg-muted/50">
                    <div className="bg-background p-2 rounded-lg shadow-sm">
                      <Fingerprint className="h-4 w-4 text-primary" />
                    </div>
                    <div className="grid gap-0.5">
                      <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-tighter">Institutional Identifier</span>
                      <span className="text-sm font-mono">{selectedUser.enrollmentNumber || "N/A"}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 rounded-xl bg-muted/30 border border-muted transition-colors hover:bg-muted/50">
                    <div className="bg-background p-2 rounded-lg shadow-sm">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                    </div>
                    <div className="grid gap-0.5">
                      <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-tighter">Account Status</span>
                      <span className="text-sm font-bold text-green-600 flex items-center gap-1.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-600 animate-pulse" />
                        Verified Institutional Access
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-center">
                  <Button 
                    variant="outline" 
                    className="w-full rounded-xl h-11 font-bold"
                    onClick={() => setIsDetailsOpen(false)}
                  >
                    Close Profile
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
