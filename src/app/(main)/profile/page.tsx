'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { users } from '@/lib/placeholder-data';
import type { User } from '@/lib/types';
import { User as UserIcon, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const role = localStorage.getItem('userRole') as 'student' | 'organizer' | 'admin' | null;
    const targetRole = role || 'student';
    const currentUser = users.find(u => u.role === targetRole) || users.find(u => u.role === 'student');
    setUser(currentUser || null);
  }, []);

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <Button variant="ghost" asChild className="pl-0 text-muted-foreground hover:bg-transparent hover:text-primary">
        <Link href="/dashboard">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
      </Button>

      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
        <p className="text-muted-foreground">Manage your public profile and university information.</p>
      </div>

      <Card className="border-none shadow-xl">
        <CardHeader>
          <CardTitle>Profile Details</CardTitle>
          <CardDescription>Update your personal information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center border-4 border-background shadow-md">
              <UserIcon className="h-12 w-12 text-primary" />
            </div>
          </div>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Display Name</Label>
              <Input id="name" defaultValue={user.name} className="h-11" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">University Email</Label>
              <Input id="email" defaultValue={user.email} disabled className="h-11 bg-muted/50" />
              <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Email is managed by your institution.</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Campus Role</Label>
              <Input id="role" defaultValue={user.role} disabled className="capitalize h-11 bg-muted/50" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="department">Academic Department</Label>
              <Input id="department" defaultValue={user.department} disabled className="h-11 bg-muted/50" />
              <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Assigned at enrollment.</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="enrollment">Student ID / Enrollment Number</Label>
              <Input id="enrollment" defaultValue={user.enrollmentNumber} disabled className="h-11 bg-muted/50" />
              <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Unique university identifier.</p>
            </div>
          </div>
          <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 h-11 px-8 font-bold">Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
}
