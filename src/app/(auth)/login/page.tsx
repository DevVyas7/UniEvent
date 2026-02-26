'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { users } from '@/lib/placeholder-data';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate network delay for a more realistic feel
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        
        if (user) {
          localStorage.setItem('userRole', user.role);
          if (user.role === 'admin') {
            router.push('/admin/dashboard');
          } else if (user.role === 'organizer') {
            router.push('/manager/dashboard');
          } else {
            router.push('/dashboard');
          }
        } else {
          toast({
            title: "Authentication Error",
            description: "Invalid credentials. Try using 'admin@uni.edu', 'cs@uni.edu', or 'alice@uni.edu'.",
            variant: "destructive",
          });
          setIsLoading(false);
        }
      }
    }, 800);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Card className="border-none shadow-2xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
        <CardDescription className="text-center">
          Enter your university credentials to access the portal.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleLogin}>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">University Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="name@uni.edu" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12"
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="text-xs text-primary hover:underline">Forgot password?</Link>
            </div>
            <Input 
              id="password" 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90 h-12 text-lg shadow-lg font-bold"
            disabled={isLoading}
          >
            {isLoading ? "Authenticating..." : "Sign In"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
