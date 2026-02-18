'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Ticket,
  Users,
  Bot,
  Shield,
  Briefcase,
} from 'lucide-react';

interface AppSidebarProps {
  userRole: 'user' | 'manager' | 'admin';
}

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['user', 'manager', 'admin'] },
  { href: '/events', label: 'Browse Events', icon: Ticket, roles: ['user', 'manager', 'admin'] },
];

const managerMenuItems = [
    { href: '/manager/dashboard', label: 'My Events', icon: Briefcase, roles: ['manager', 'admin'] },
];

const adminMenuItems = [
  { href: '/admin/dashboard', label: 'Admin Dashboard', icon: Shield, roles: ['admin'] },
  { href: '/admin/users', label: 'User Management', icon: Users, roles: ['admin'] },
  { href: '/admin/form-generator', label: 'Form Generator', icon: Bot, roles: ['admin'] },
];

export function AppSidebar({ userRole }: AppSidebarProps) {
  const pathname = usePathname();

  const isUser = userRole === 'user';
  const isManager = userRole === 'manager';
  const isAdmin = userRole === 'admin';

  const allMenuItems = [
    ...menuItems,
    ...(isManager || isAdmin ? managerMenuItems : []),
    ...(isAdmin ? adminMenuItems : []),
  ];

  return (
    <Sidebar className="border-r" collapsible="offcanvas">
      <SidebarHeader className="p-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Ticket className="w-8 h-8 text-primary" />
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-sidebar-foreground">EventVerse</h1>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {allMenuItems.map((item) =>
            item.roles.includes(userRole) ? (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  className="w-full justify-start py-6"
                >
                  <Link href={item.href}>
                    <item.icon className="h-5 w-5" />
                    <span className="text-base">{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ) : null
          )}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t">
        <p className="text-xs text-muted-foreground text-center italic">
          Accessing as {userRole}
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
