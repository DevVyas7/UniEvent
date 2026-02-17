import { AppSidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  // In a real app, you'd get the user from a session.
  // We'll simulate it for now.
  const userRole = 'admin'; // 'user', 'manager', or 'admin'

  return (
    <SidebarProvider>
      <AppSidebar userRole={userRole} />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-background">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
