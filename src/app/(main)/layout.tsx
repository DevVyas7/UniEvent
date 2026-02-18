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
    const role = localStorage.getItem('userRole') as 'user' | 'manager' | 'admin' | null;
    const currentUser = users.find(u => u.role === (role || 'user')) || users.find(u => u.role === 'user');
    if(currentUser) {
        setUser(currentUser);
    }
    setIsLoading(false);
  }, []);

  if (isLoading || !user) {
    return <div className="flex min-h-screen items-center justify-center bg-background text-foreground font-medium">Loading EventVerse...</div>;
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
