import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Ticket, Users, Bot, CalendarDays } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Ticket className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-bold">EventVerse</h1>
        </Link>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Log In</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        <section className="relative w-full py-20 md:py-32 lg:py-40 bg-primary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-primary-foreground">
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Your Universe of Events
            </h2>
            <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl">
              From concerts to conferences, EventVerse is your all-in-one platform to create, manage, and discover amazing events.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/login">Get Started</Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/dashboard">Browse Events</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-card">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold">Everything You Need</h3>
              <p className="text-muted-foreground mt-2">Powerful features for organizers and attendees alike.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="mt-4">User & Access Control</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Manage roles and permissions with ease for users, managers, and admins.</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit">
                    <CalendarDays className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="mt-4">Event Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Create, publish, and oversee events with our intuitive tools and calendar.</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit">
                    <Ticket className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="mt-4">Simple Booking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Users can easily browse, find details, and book tickets for any event.</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit">
                    <Bot className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="mt-4">AI-Powered Forms</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Generate any form you need instantly with our intelligent form creation tool.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-card border-t">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} EventVerse. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
