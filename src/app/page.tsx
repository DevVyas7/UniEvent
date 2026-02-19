import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Users, Bot, CalendarDays } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <GraduationCap className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-bold">UniEvent</h1>
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
              Connect Your Campus
            </h2>
            <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl">
              The dedicated portal for inter-university events. Organize departmental festivals, workshops, and competitions for students, absolutely free.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90 border-none shadow-lg">
                <Link href="/login">Explore Events</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-card">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold">Empowering University Life</h3>
              <p className="text-muted-foreground mt-2">Designed for departments to engage students effectively.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center border-none shadow-md">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit">
                    <GraduationCap className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="mt-4">Student Hub</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Students can join events from any department with a single click.</p>
                </CardContent>
              </Card>
              <Card className="text-center border-none shadow-md">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit">
                    <CalendarDays className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="mt-4">Dept. Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Coordinators can manage departmental events and participant lists effortlessly.</p>
                </CardContent>
              </Card>
              <Card className="text-center border-none shadow-md">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="mt-4">Free Participation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Promoting zero-cost participation to encourage widespread student engagement.</p>
                </CardContent>
              </Card>
              <Card className="text-center border-none shadow-md">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit">
                    <Bot className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="mt-4">AI Assistance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Use AI to generate compelling event posters, descriptions, and registration forms.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-card border-t">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} UniEvent. Built for the future of campus collaboration.</p>
        </div>
      </footer>
    </div>
  );
}
