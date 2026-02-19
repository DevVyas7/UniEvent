'use client';

import { AppSidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useState, useEffect } from 'react';
import { users } from '@/lib/placeholder-data';
import type { User } from '@/lib/types';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem('userRole') as 'student' | 'organizer' | 'admin' | null;
    // Default to 'student' if no role is found in localStorage
    const targetRole = role || 'student';
    const currentUser = users.find(u => u.role === targetRole) || users.find(u => u.role === 'student');
    
    if (currentUser) {
        setUser(currentUser);
    }
    setIsLoading(false);
  }, []);

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground font-medium">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p>Loading UniEvent...</p>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar userRole={user.role} />
      <div className="flex flex-col flex-1 min-h-screen overflow-hidden">
        <Header user={user} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-background">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
