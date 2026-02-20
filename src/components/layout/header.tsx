'use client';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserNav } from '@/components/layout/user-nav';
import type { User } from '@/lib/types';
import Link from 'next/link';
import { GraduationCap, Menu } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';

export function Header({ user }: { user: User }) {
  const isMobile = useIsMobile();
  const { toggleSidebar } = useSidebar();

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-card px-4 sm:px-6 shadow-sm">
      <Button variant="ghost" size="icon" onClick={toggleSidebar} className="hover:bg-accent">
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      <div className="flex flex-1 items-center gap-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-primary" />
          {!isMobile && <span className="font-bold text-xl tracking-tight">UniEvent</span>}
        </Link>
      </div>

      <div className="flex items-center justify-end gap-4">
        {/* Additional header actions can go here */}
      </div>
      <UserNav user={user} />
    </header>
  );
}
