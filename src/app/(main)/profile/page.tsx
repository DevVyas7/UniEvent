'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { users } from '@/lib/placeholder-data';
import type { User } from '@/lib/types';
import { User as UserIcon } from 'lucide-react';

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
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
        <p className="text-muted-foreground">Manage your public profile and university information.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Details</CardTitle>
          <CardDescription>Update your personal information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
              <UserIcon className="h-10 w-10 text-muted-foreground" />
            </div>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Display Name</Label>
              <Input id="name" defaultValue={user.name} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">University Email</Label>
              <Input id="email" defaultValue={user.email} disabled />
              <p className="text-xs text-muted-foreground">Email is managed by your institution.</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Campus Role</Label>
              <Input id="role" defaultValue={user.role} disabled className="capitalize" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="department">Department</Label>
              <Input id="department" defaultValue={user.department} disabled />
              <p className="text-xs text-muted-foreground">Your assigned academic department.</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="enrollment">Enrollment / ID Number</Label>
              <Input id="enrollment" defaultValue={user.enrollmentNumber} disabled />
              <p className="text-xs text-muted-foreground">Unique identifier provided by the university.</p>
            </div>
          </div>
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
}
