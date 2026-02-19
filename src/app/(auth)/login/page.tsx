'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [role, setRole] = useState('student');
  const router = useRouter();

  const handleLogin = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('userRole', role);
      if (role === 'admin') {
        router.push('/admin/dashboard');
      } else if (role === 'organizer') {
        router.push('/manager/dashboard');
      } else {
        router.push('/dashboard');
      }
    }
  };

  return (
    <Card className="border-none shadow-2xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">University SSO Bypass</CardTitle>
        <CardDescription>
          Select your campus role to enter the system.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
            <Label htmlFor="role" className="text-xs font-bold uppercase text-muted-foreground">Select Role</Label>
            <Select value={role} onValueChange={setRole}>
                <SelectTrigger id="role" className="h-12">
                    <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="organizer">Department Organizer</SelectItem>
                    <SelectItem value="admin">University Administrator</SelectItem>
                </SelectContent>
            </Select>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button onClick={handleLogin} className="w-full bg-primary hover:bg-primary/90 h-12 text-lg shadow-lg">Enter UniEvent</Button>
      </CardFooter>
    </Card>
  );
}
