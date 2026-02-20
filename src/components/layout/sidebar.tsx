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
  GraduationCap,
  Users,
  Bot,
  Shield,
  Briefcase,
  Award,
} from 'lucide-react';

interface AppSidebarProps {
  userRole: 'student' | 'organizer' | 'admin';
}

const menuItems = [
  { href: '/dashboard', label: 'Student Portal', icon: LayoutDashboard, roles: ['student', 'organizer', 'admin'] },
  { href: '/events', label: 'Campus Events', icon: GraduationCap, roles: ['student', 'organizer', 'admin'] },
  { href: '/participations', label: 'My Participations', icon: Award, roles: ['student'] },
];

const organizerMenuItems = [
    { href: '/manager/dashboard', label: 'My Department', icon: Briefcase, roles: ['organizer', 'admin'] },
];

const adminMenuItems = [
  { href: '/admin/dashboard', label: 'System Admin', icon: Shield, roles: ['admin'] },
  { href: '/admin/users', label: 'User Directory', icon: Users, roles: ['admin'] },
  { href: '/admin/form-generator', label: 'Smart Forms', icon: Bot, roles: ['admin'] },
];

export function AppSidebar({ userRole }: AppSidebarProps) {
  const pathname = usePathname();

  const isStudent = userRole === 'student';
  const isOrganizer = userRole === 'organizer';
  const isAdmin = userRole === 'admin';

  const allMenuItems = [
    ...menuItems,
    ...(isOrganizer || isAdmin ? organizerMenuItems : []),
    ...(isAdmin ? adminMenuItems : []),
  ];

  return (
    <Sidebar className="border-r" collapsible="offcanvas">
      <SidebarHeader className="p-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <GraduationCap className="w-8 h-8 text-primary" />
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-sidebar-foreground">UniEvent</h1>
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
                  className="w-full justify-start py-6 hover:bg-primary/5 data-[active=true]:bg-primary/10 data-[active=true]:text-primary"
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
        <p className="text-[10px] text-muted-foreground text-center font-medium uppercase tracking-widest">
          {userRole} session
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
