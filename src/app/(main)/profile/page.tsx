'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { users } from '@/lib/placeholder-data';
import type { User } from '@/lib/types';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const role = localStorage.getItem('userRole') as any;
    const currentUser = users.find(u => u.role === (role || 'user')) || users.find(u => u.role === 'user');
    setUser(currentUser || null);
  }, []);

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
        <p className="text-muted-foreground">Manage your public profile and account information.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Details</CardTitle>
          <CardDescription>Update your personal information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <Button variant="outline">Change Avatar</Button>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Display Name</Label>
              <Input id="name" defaultValue={user.name} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" defaultValue={user.email} disabled />
              <p className="text-xs text-muted-foreground">Email cannot be changed in the prototype.</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Account Role</Label>
              <Input id="role" defaultValue={user.role} disabled className="capitalize" />
            </div>
          </div>
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
}
