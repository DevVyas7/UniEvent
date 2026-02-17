'use client';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserNav } from '@/components/layout/user-nav';
import type { User } from '@/lib/types';
import Link from 'next/link';
import { Ticket } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

export function Header({ user }: { user: User }) {
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-card px-4 sm:px-6">
      <SidebarTrigger className="md:hidden" />

      {isMobile && (
        <div className="flex-1">
           <Link href="/dashboard" className="flex items-center gap-2">
              <Ticket className="w-6 h-6 text-primary" />
              <span className="font-bold text-lg">EventVerse</span>
            </Link>
        </div>
      )}

      <div className="flex flex-1 items-center justify-end gap-4">
        {/* Can add a search bar or other header items here */}
      </div>
      <UserNav user={user} />
    </header>
  );
}
